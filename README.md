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

## Notícias no Neon

As notícias são lidas da tabela `news`. Para cada notícia, `category` define o tema, `body` contém os parágrafos em formato JSON e `cover_url` pode guardar a URL pública da imagem. As imagens devem estar hospedadas em um serviço acessível publicamente; o Neon armazena a URL, não o arquivo da imagem. Sem `cover_url`, o site usa uma das imagens padrão definidas em `cover` (`igreja`, `interior` ou `comunidade`). Não execute `npm run db:seed` para atualizar notícias em um banco com conteúdo próprio: o script recria os dados de exemplo.

Antes de usar `cover_url` em um banco existente, execute uma vez o SQL em `database/migrations/001-news-cover-url.sql` no Neon SQL Editor. Para adicionar uma notícia, use o Neon SQL Editor:

Para atualizar os horários de batizados em um banco existente, execute `database/migrations/002-baptism-schedule.sql` no Neon SQL Editor.

```sql
INSERT INTO news (slug, title, excerpt, body, category, author, date, cover, cover_url)
VALUES (
  'encontro-da-juventude',
  'Jovens se preparam para encontro diocesano',
  'A comunidade se prepara para participar do encontro da Arquidiocese.',
  '["Os jovens da paróquia estão organizando a participação no encontro diocesano.", "As inscrições podem ser feitas na secretaria paroquial."]'::jsonb,
  'Juventude',
  'PASCOM Aparecida',
  CURRENT_DATE,
  'comunidade',
  'https://seu-dominio.com/imagens/encontro-da-juventude.jpg'
);
```

Use um `slug` único para cada notícia. A categoria define os filtros e também prioriza notícias do mesmo tema em “Leia também”.

## Programação do Jubileu no Neon

A seção de programação da página do Jubileu de Prata lê os eventos da tabela `agenda` cuja categoria seja `Jubileu de Prata`. Para adicionar uma atividade, use o Neon SQL Editor:

```sql
INSERT INTO agenda (category, title, date, time, place)
VALUES ('Jubileu de Prata', 'NOME DA ATIVIDADE', 'AAAA-MM-DD', 'HORÁRIO', 'LOCAL');
```

Substitua os valores de exemplo e insira uma linha para cada atividade. Não execute `npm run db:seed` em um banco com conteúdo próprio, pois ele apaga e recria os dados de exemplo.

## Deploy na Vercel

1. Envie o projeto para um repositório Git e importe esse repositório na Vercel.
2. Deixe o framework ser detectado como **TanStack Start**. Não configure um diretório de saída estático; o plugin Nitro gera o formato de deploy do servidor.
3. Em **Settings → Environment Variables**, configure `DATABASE_URL` com a conexão do Neon (depois de trocar a credencial que foi compartilhada) para Production, Preview e Development. Não use o prefixo `VITE_` para segredos.
4. Faça o deploy. Depois de alterar uma variável, faça um novo redeploy para ela valer.

O projeto registra o plugin Nitro em `vite.config.ts`; ele é necessário para a Vercel gerar as funções do servidor e atender rotas como `/noticias/slug`. Não rode `npm run db:seed` no deploy, pois ele substitui o conteúdo pelas notícias de exemplo.
