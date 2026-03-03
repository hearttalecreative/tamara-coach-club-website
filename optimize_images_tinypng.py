#!/usr/bin/env python3
"""Optimize local website images using TinyPNG API.

Usage:
  export TINYPNG_API_KEY="your_api_key"
  python3 optimize_images_tinypng.py

Optional:
  python3 optimize_images_tinypng.py --dry-run
  python3 optimize_images_tinypng.py image1.jpg image2.png
"""

from __future__ import annotations

import argparse
import base64
import pathlib
import re
import sys
import urllib.error
import urllib.request


ROOT = pathlib.Path(__file__).resolve().parent
INDEX_FILE = ROOT / "index.html"
STYLES_FILE = ROOT / "styles.css"
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
TINIFY_SHRINK_URL = "https://api.tinify.com/shrink"


def parse_referenced_images() -> list[pathlib.Path]:
    files = []
    patterns = [
        r'src="([^"]+)"',
        r'url\("([^"]+)"\)',
    ]

    for source_file in (INDEX_FILE, STYLES_FILE):
        if not source_file.exists():
            continue
        text = source_file.read_text(encoding="utf-8")
        for pattern in patterns:
            files.extend(re.findall(pattern, text))

    local_files = []
    seen = set()
    for file_ref in files:
        if file_ref.startswith(("http://", "https://", "data:", "#")):
            continue
        path = (ROOT / file_ref).resolve()
        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue
        if path not in seen and path.exists():
            seen.add(path)
            local_files.append(path)
    return local_files


def build_auth_header(api_key: str) -> str:
    token = base64.b64encode(f"api:{api_key}".encode("utf-8")).decode("utf-8")
    return f"Basic {token}"


def shrink_image(path: pathlib.Path, auth_header: str) -> tuple[int, int]:
    original_size = path.stat().st_size
    data = path.read_bytes()

    request = urllib.request.Request(
        TINIFY_SHRINK_URL,
        data=data,
        method="POST",
        headers={"Authorization": auth_header},
    )

    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            output_url = response.headers.get("Location")
            if not output_url:
                raise RuntimeError(f"TinyPNG did not return output URL for {path.name}")
    except urllib.error.HTTPError as exc:
        error_detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"TinyPNG error for {path.name}: {exc.code} {error_detail}") from exc

    output_request = urllib.request.Request(output_url, headers={"Authorization": auth_header})
    with urllib.request.urlopen(output_request, timeout=120) as result:
        optimized_data = result.read()

    optimized_size = len(optimized_data)
    if optimized_size < original_size:
        path.write_bytes(optimized_data)
    return original_size, optimized_size


def main() -> int:
    parser = argparse.ArgumentParser(description="Optimize website images with TinyPNG.")
    parser.add_argument("images", nargs="*", help="Optional relative image paths to optimize")
    parser.add_argument("--dry-run", action="store_true", help="List files only, without API calls")
    args = parser.parse_args()

    if args.images:
        targets = []
        for rel_path in args.images:
            path = (ROOT / rel_path).resolve()
            if path.exists() and path.suffix.lower() in SUPPORTED_EXTENSIONS:
                targets.append(path)
            else:
                print(f"Skipping invalid image: {rel_path}")
    else:
        targets = parse_referenced_images()

    if not targets:
        print("No valid local images found to optimize.")
        return 0

    print(f"Found {len(targets)} image(s) to process.")
    for path in targets:
        print(f" - {path.relative_to(ROOT)}")

    if args.dry_run:
        return 0

    api_key = __import__("os").environ.get("TINYPNG_API_KEY", "").strip()
    if not api_key:
        print("Error: missing TINYPNG_API_KEY environment variable.")
        print('Example: export TINYPNG_API_KEY="your_api_key"')
        return 1

    auth_header = build_auth_header(api_key)
    total_before = 0
    total_after = 0

    for path in targets:
        try:
            before, after = shrink_image(path, auth_header)
            total_before += before
            total_after += after
            saved_kb = (before - after) / 1024
            status = "optimized" if after < before else "kept original"
            print(f"{path.name}: {before/1024:.1f}KB -> {after/1024:.1f}KB ({saved_kb:.1f}KB saved, {status})")
        except Exception as exc:  # noqa: BLE001
            print(f"Failed: {path.name} ({exc})")

    if total_before > 0:
        total_saved = total_before - total_after
        pct = (total_saved / total_before) * 100
        print(f"\nTotal: {total_before/1024/1024:.2f}MB -> {total_after/1024/1024:.2f}MB ({pct:.1f}% saved)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
