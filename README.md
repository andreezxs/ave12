# Nossa Senhora Online

PROJETO: PORTAL OFICIAL DA PARÓQUIA NOSSA SENHORA APARECIDA – AVE12

Desenvolva um portal institucional moderno, premium, altamente responsivo e preparado para expansão utilizando Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React, next/image, next/font, Server Actions e arquitetura escalável.

O projeto deverá seguir padrões profissionais de desenvolvimento, priorizando organização, componentização, performance, SEO, acessibilidade, segurança e facilidade de manutenção.

O objetivo NÃO é apenas criar um website institucional, mas sim um PORTAL DIGITAL OFICIAL da Paróquia Nossa Senhora Aparecida, tornando-se o principal canal de comunicação da comunidade.

O público-alvo contempla adolescentes, jovens, adultos, idosos, visitantes, novos membros, coordenadores, PASCOM e secretaria paroquial.

==================================================================

ARQUITETURA

==================================================================

Utilizar arquitetura limpa e escalável.

Estrutura sugerida:

/app

/components

/components/layout

/components/ui

/components/cards

/components/forms

/components/gallery

/components/news

/components/calendar

/components/admin

/components/home

/components/history

/components/contact

/components/shop

/components/events

/lib

/hooks

/services

/utils

/types

/styles

/public

/public/images

/public/gallery

/public/logo

/public/icons

/public/uploads

Toda a estrutura deverá permitir expansão futura sem necessidade de refatorações.

==================================================================

IDENTIDADE VISUAL

==================================================================

Inspirar-se em:

• Apple

• Vercel

• Stripe

• Linear

• Arc Browser

Visual minimalista, sofisticado e elegante.

Utilizar:

Glassmorphism

Backdrop Blur

Microinterações

Animações suaves

Muito espaço em branco

Ícones minimalistas

Cards premium

Sombras suaves

Bordas arredondadas

Experiência semelhante a aplicativos iOS.

==================================================================

PALETA

==================================================================

Primária

#18ACFF

Secundária

#0016DE

Off White

#F8F8F8

Black

#0A0A0A

White

#FFFFFF

==================================================================

TIPOGRAFIA

==================================================================

Utilizar:

Inter

Mantendo aparência semelhante à SF Pro Display.

==================================================================

RESPONSIVIDADE

==================================================================

Desktop

Notebook

Tablet

iPad

Android

iPhone

Todos os componentes deverão adaptar-se perfeitamente.

==================================================================

MENU PRINCIPAL

==================================================================

• Início

• A Paróquia

• História

• Notícias

• Agenda

• AVE12

• Camisetas

• Show de Prêmios

• Premiações

• Galeria

• Horários

• Regulamento

• FAQ

• Contato

Menu fixo (Sticky)

Glassmorphism

Blur

Transições suaves

==================================================================

HOME

==================================================================

Hero Banner premium

Imagem principal

Título

Subtítulo

Botões:

Comprar Camiseta

Comprar Cartela

Conheça a Paróquia

Próximos eventos

Últimas notícias

Últimas galerias

Vídeo institucional

Mensagem do Pároco

Calendário resumido

Cards rápidos para:

Missas

Secretaria

Confissões

Localização

WhatsApp

Canal do WhatsApp

Instagram

==================================================================

CALENDÁRIO

==================================================================

NÃO criar um calendário próprio.

Integrar o Calendário Oficial da Arquidiocese.

Exibir de forma minimalista na Home mostrando apenas os próximos eventos.

Criar uma página Agenda dedicada contendo:

Calendário incorporado

Filtros

Próximos eventos

Botão para abrir o calendário completo da Arquidiocese.

Caso exista API, RSS ou iCal, preparar a estrutura para futura integração automática.

==================================================================

A PARÓQUIA

==================================================================

Página institucional contendo:

História resumida

Missão

Visão

Valores

Padroeira

Pároco

Diáconos

Comunidades

Fotos institucionais

==================================================================

HISTÓRIA

==================================================================

Criar página exclusiva.

Preparada para textos extensos.

Timeline elegante.

Fotos históricas.

Marcos importantes.

Estrutura preparada para crescimento.

IMPORTANTE:

Criar o conteúdo utilizando informações reais da Paróquia Nossa Senhora Aparecida (Maringá-PR), deixando a estrutura preparada para futuras edições pelo painel administrativo.

==================================================================

NOTÍCIAS

==================================================================

Criar um verdadeiro portal de notícias.

Cada notícia deverá possuir:

Imagem de capa

Título

Resumo

Texto completo

Galeria de imagens

Autor

Categoria

Data

Compartilhamento

SEO individual

Categorias:

Paróquia

Arquidiocese

Liturgia

Eventos

Catequese

Juventude

PASCOM

Comunicados

A página deverá funcionar como um blog profissional.

==================================================================

GALERIA

==================================================================

NÃO armazenar imagens diretamente no projeto.

As imagens serão armazenadas em um servidor próprio semelhante ao Google Photos.

Preparar integração para leitura das imagens através de API ou armazenamento externo.

Organizar álbuns por categorias.

Exemplos:

Eventos

Missas

Festas

Corpus Christi

Arraiá

Show de Prêmios

Sacramentos

Comunidade

Fotos Históricas

Utilizar:

Lightbox

Lazy Loading

Infinite Scroll

Next Image

Otimização automática.

==================================================================

CANAL DO WHATSAPP

==================================================================

Criar uma seção exclusiva.

Mostrar:

Últimas publicações

Botão para entrar no canal

Cards elegantes

Preparar integração futura caso exista API disponível.

==================================================================

CAMPANHA AVE12

==================================================================

Página completa explicando:

Objetivos

Como surgiu

Finalidade

Prestação de contas (estrutura preparada)

Imagens

Vídeos

==================================================================

CAMISETAS

==================================================================

Página premium.

Fotos

Descrição

Tabela de tamanhos

Valor

Informações

Botão

Comprar Camiseta

Redirecionar para Nuvemshop.

Não criar checkout.

==================================================================

SHOW DE PRÊMIOS

==================================================================

Página exclusiva.

Banner

Descrição

Premiações

Valor

Data

Horário

Regulamento

Perguntas frequentes

Botão

Comprar Cartela

Redirecionar para Nomine Ingressos.

Não criar sistema próprio.

==================================================================

PREMIAÇÕES

==================================================================

Cards premium.

Imagem

Descrição

Hover

Animações

==================================================================

HORÁRIOS

==================================================================

Página preparada para edição.

Missas

Secretaria

Confissões

Atendimento

Adoração

==================================================================

FAQ

==================================================================

Accordion moderno.

==================================================================

REGULAMENTO

==================================================================

Página preparada para leitura.

Download em PDF.

==================================================================

CONTATO

==================================================================

WhatsApp

Telefone

Instagram

Facebook

YouTube

Canal WhatsApp

E-mail

Endereço

Google Maps

Formulário

==================================================================

RODAPÉ

==================================================================

Logo

Redes sociais

Política de Privacidade

Termos

Copyright

Links rápidos

==================================================================

PAINEL ADMINISTRATIVO

==================================================================

Criar uma área administrativa completa.

Acesso:

/admin

Login protegido.

Autenticação segura.

Controle de permissões.

Somente administradores autorizados poderão acessar.

O painel deverá permitir:

Editar página inicial

Alterar banners

Cadastrar notícias

Editar notícias

Excluir notícias

Cadastrar galerias

Enviar fotos

Editar horários

Editar informações da paróquia

Editar contatos

Editar FAQ

Editar regulamento

Editar links

Cadastrar novas páginas

Gerenciar usuários administradores

Alterar imagens institucionais

Editar textos da História

Editar página AVE12

Editar página Show de Prêmios

Editar página Camisetas

Tudo através de interface gráfica.

Nenhuma alteração deverá exigir conhecimento em programação.

==================================================================

CMS

==================================================================

Utilizar um CMS Headless moderno.

Preferencialmente:

Payload CMS

ou

Sanity

ou

Strapi

A escolha deverá priorizar facilidade de uso para membros da PASCOM.

==================================================================

SEGURANÇA

==================================================================

Autenticação

Proteção das rotas administrativas

Validação de formulários

Rate Limit

Headers seguros

Sanitização

==================================================================

ANIMAÇÕES

==================================================================

Framer Motion.

Fade

Slide

Scale

Hover

Scroll Reveal

Page Transition

Microinterações

==================================================================

SEO

==================================================================

Metadata

Open Graph

Twitter Cards

Schema.org

robots.txt

sitemap.xml

Canonical

Structured Data

==================================================================

PERFORMANCE

==================================================================

Google Lighthouse acima de 95.

Lazy Loading

Server Components

Image Optimization

Code Splitting

Caching

Streaming

==================================================================

ACESSIBILIDADE

==================================================================

Contraste adequado

Navegação por teclado

ARIA Labels

Fonte legível

Compatível com leitores de tela

==================================================================

INTEGRAÇÕES

==================================================================

Nuvemshop

Venda de camisetas.

Nomine Ingressos

Venda das cartelas.

Calendário Oficial da Arquidiocese

Integração ou incorporação.

Servidor externo de imagens

Galeria sincronizada.

Google Maps

YouTube

Instagram

Canal do WhatsApp

==================================================================

OBJETIVO FINAL

==================================================================

Construir um portal oficial moderno, elegante e escalável para a Paróquia Nossa Senhora Aparecida, que concentre notícias, agenda, galeria, campanha AVE12, venda de camisetas, venda de cartelas do Show de Prêmios, história da paróquia, informações institucionais e comunicação com os fiéis.

O portal deverá transmitir credibilidade, facilitar o trabalho da PASCOM e da secretaria, permitir administração completa por meio de um painel protegido por login e senha, integrar serviços externos (Calendário da Arquidiocese, Nuvemshop, Nomine Ingressos, servidor de fotos, YouTube, Instagram e Canal do WhatsApp) e servir como a principal plataforma digital da comunidade pelos próximos anos.

crie para mim

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee45fd44-4d67-446e-bc1a-1bf0487eb0e8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
