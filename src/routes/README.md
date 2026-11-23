# Rotas

Este projeto usa o roteamento baseado em arquivos do TanStack Router. Os arquivos de página `.tsx` nesta pasta definem as rotas do site. O caminho da rota declarado em `createFileRoute` deve corresponder ao caminho gerado a partir do arquivo.

## Convenções usadas neste projeto

| Arquivo | URL |
| --- | --- |
| `index.tsx` | `/` |
| `a-paroquia.tsx` | `/a-paroquia` |
| `centro-catequetico.tsx` | `/centro-catequetico` |
| `noticias/index.tsx` | `/noticias/` (acessível como `/noticias`) |
| `noticias/$slug.tsx` | `/noticias/$slug`, por exemplo `/noticias/encontro-da-comunidade` |
| `sitemap[.]xml.ts` | `/sitemap.xml` |
| `__root.tsx` | Layout raiz compartilhado por todas as páginas |

O `$slug` representa um segmento dinâmico da URL. A rota da notícia recebe esse valor em `params.slug`.

## Cuidados

- Mantenha o caminho de `createFileRoute(...)` sincronizado com o arquivo da rota.
- `__root.tsx` envolve as páginas do site; preserve o `<Outlet />` que renderiza a rota atual.
- `routeTree.gen.ts` é gerado automaticamente pelo TanStack Router. Não edite esse arquivo manualmente.
- Este README é apenas documentação e não cria uma rota.
