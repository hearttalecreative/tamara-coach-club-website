# 10-performance

## Objetivo

Aplicar estrategia performance-first para mantener carga rapida con media pesada y motion moderno.

## Reglas operativas

- Definir Tier 0/1/2 para recursos criticos y diferidos
- Usar poster optimizado como candidato LCP en hero
- Evitar iframes de YouTube/Vimeo en critical path
- Usar lazy loading en recursos no criticos sin romper UX
- Congelar dimensiones para prevenir CLS
- Verificar LCP, CLS e INP antes de cerrar cambios
