# Portal da Paróquia Nossa Senhora Aparecida

Site institucional da Paróquia Nossa Senhora Aparecida, com informações gerais, agenda litúrgica, horários de missas, notícias, galeria, links de contato e conteúdo do Jubileu de Prata.

## Tecnologias

- React 19
- TypeScript
- Vite
- TanStack Start / TanStack Router
- Tailwind CSS
- shadcn/ui

## Requisitos

- Node.js 20+
- npm

## Instalação

```bash
npm install
```

## Executando localmente

```bash
npm run dev
```

O projeto ficará disponível em http://localhost:3000 (ou na porta informada pelo Vite).

## Scripts disponíveis

```bash
npm run dev      # inicia o ambiente de desenvolvimento
npm run build    # gera a build de produção
npm run preview  # visualiza a build localmente
npm run lint     # executa a análise estática
npm run format   # formata o código com Prettier
```

## Estrutura principal

- src/routes: páginas do site
- src/components: componentes reutilizáveis
- src/data/site.ts: conteúdo centralizado da paróquia
- src/lib: serviços e integrações
- src/assets: imagens e mídias
- public: arquivos estáticos

## Observações

- O conteúdo principal do site, como endereço, telefone, horários e textos institucionais, está centralizado em src/data/site.ts.
- Para alterações visuais gerais, confira os componentes em src/components e os estilos em src/styles.css.
