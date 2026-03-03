# 06-web-animation-interactivity

## Objetivo

Aplicar interactividad avanzada (especialmente parallax) sin romper layout ni rendimiento.

## Patron clave

- Separar `Shell` (layout inmutable) de `Inner` (capa transformable)
- Nunca transformar el mismo nodo que define `Image fill`
- Definir sizing deterministico en contenedor relativo
- Usar overscan cuando el media se mueve para evitar recortes

## Validacion minima

- Sin CLS ni flicker
- Cobertura total de imagen/video en scroll
- Z-index consistente
- Respeta `prefers-reduced-motion`
