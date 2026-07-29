/**
 * Fonte única de conteúdo do portal.
 * Estrutura preparada para futura substituição por CMS headless / painel admin:
 * cada bloco abaixo espelha um "content type".
 */

export const parish = {
  name: "Paróquia Nossa Senhora Aparecida",
  shortName: "NS Aparecida",
  city: "Maringá — PR",
  archdiocese: "Arquidiocese de Maringá",
  patron: "Nossa Senhora Aparecida",
  address: "Paróquia Nossa Senhora Aparecida — Maringá, Paraná",
  email: "secretaria@paroquiaaparecidamga.com.br",
  phone: "(44) 3267-0484",
  whatsapp: "https://wa.me/5544984230760",
  whatsappChannel: "https://whatsapp.com/channel/",
  instagram: "https://instagram.com/pnsa_mga",
  facebook: "https://facebook.com/pnsa.maringa",
  youtube: "https://youtube.com/",
  maps: "https://www.google.com/maps/search/?api=1&query=Paróquia+Nossa+Senhora+Aparecida+Maringá",
  mapsEmbed:
    "https://www.google.com/maps?q=Par%C3%B3quia%20Nossa%20Senhora%20Aparecida%20Maring%C3%A1&output=embed",
  calendarUrl: "https://agendamento.p7group.cloud/calendario?paroquia_id=1&mes=2026-07",
  shopUrl: "https://www.nuvemshop.com.br/",
  ticketsUrl: "https://nomineingressos.com/pnsa_mga/",
};

export const nav = [
  { label: "Início", to: "/" },
  { label: "A Paróquia", to: "/a-paroquia" },
  { label: "História", to: "/historia" },
  { label: "Notícias", to: "/noticias" },
  { label: "Agenda", to: "/agenda" },
  { label: "AVE12", to: "/ave12" },
  { label: "Camisetas", to: "/camisetas" },
  { label: "Show de Prêmios", to: "/show-de-premios" },
  { label: "Premiações", to: "/premiacoes" },
  { label: "Galeria", to: "/galeria" },
  { label: "Horários", to: "/horarios" },
  { label: "Regulamento", to: "/regulamento" },
  { label: "FAQ", to: "/faq" },
  { label: "Contato", to: "/contato" },
] as const;

export type NewsCategory =
  | "Paróquia"
  | "Arquidiocese"
  | "Liturgia"
  | "Eventos"
  | "Catequese"
  | "Juventude"
  | "PASCOM"
  | "Comunicados";

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: NewsCategory;
  author: string;
  date: string;
  cover: "igreja" | "interior" | "comunidade";
}

export const news: NewsPost[] = [
  {
    slug: "campanha-ave12-mobiliza-comunidade",
    title: "Campanha AVE12 mobiliza a comunidade paroquial",
    excerpt:
      "A campanha reúne fiéis em torno de um compromisso mensal de contribuição e corresponsabilidade com a vida da paróquia.",
    body: [
      "A campanha AVE12 nasceu do desejo de tornar a manutenção e a missão da Paróquia Nossa Senhora Aparecida uma tarefa de toda a comunidade. A proposta é simples: cada família assume uma contribuição ao longo dos doze meses do ano, garantindo previsibilidade para as obras, para a pastoral e para as ações sociais.",
      "Nas últimas semanas, coordenadores de pastorais e movimentos apresentaram a campanha nas missas e nos encontros de catequese. O retorno tem sido expressivo: novas famílias aderiram e antigos colaboradores renovaram o compromisso.",
      "Toda a prestação de contas será publicada neste portal, com relatórios periódicos sobre a destinação dos recursos.",
    ],
    category: "Paróquia",
    author: "PASCOM Aparecida",
    date: "2026-07-20",
    cover: "comunidade",
  },
  {
    slug: "show-de-premios-2026-data-confirmada",
    title: "Show de Prêmios 2026: data confirmada e cartelas à venda",
    excerpt:
      "O tradicional Show de Prêmios da paróquia já tem data marcada. As cartelas podem ser adquiridas pela Nomine Ingressos.",
    body: [
      "O Show de Prêmios é um dos momentos mais aguardados do calendário paroquial. Além de reunir a comunidade em uma tarde de festa, o evento sustenta boa parte das obras pastorais do ano.",
      "As cartelas são vendidas exclusivamente pela plataforma Nomine Ingressos, garantindo segurança na compra e controle de participantes.",
      "Consulte a página de Regulamento para conhecer todas as regras de participação e sorteio.",
    ],
    category: "Eventos",
    author: "Comissão de Eventos",
    date: "2026-07-12",
    cover: "igreja",
  },
  {
    slug: "novos-horarios-de-confissoes",
    title: "Paróquia amplia horários de confissões",
    excerpt:
      "Atendendo aos pedidos dos fiéis, a paróquia amplia o atendimento do sacramento da reconciliação durante a semana.",
    body: [
      "A partir deste mês, o sacramento da reconciliação passa a ser oferecido também nas quartas-feiras à tarde, antes da adoração ao Santíssimo.",
      "A ampliação atende especialmente quem trabalha durante o fim de semana e não conseguia participar nos horários anteriores.",
      "Confira todos os horários atualizados na página Horários deste portal.",
    ],
    category: "Liturgia",
    author: "Secretaria Paroquial",
    date: "2026-07-05",
    cover: "interior",
  },
  {
    slug: "juventude-prepara-encontro-diocesano",
    title: "Juventude prepara encontro diocesano",
    excerpt:
      "Jovens da paróquia se reúnem semanalmente para preparar a participação no encontro promovido pela Arquidiocese.",
    body: [
      "O grupo de jovens da paróquia tem se encontrado às sextas-feiras para formação, oração e organização das equipes de serviço.",
      "A participação está aberta a adolescentes a partir de 15 anos. As inscrições podem ser feitas na secretaria paroquial.",
    ],
    category: "Juventude",
    author: "Setor Juventude",
    date: "2026-06-28",
    cover: "comunidade",
  },
  {
    slug: "catequese-abre-inscricoes",
    title: "Catequese abre inscrições para o novo ciclo",
    excerpt:
      "As inscrições para catequese de crianças, adolescentes e adultos estão abertas na secretaria paroquial.",
    body: [
      "O novo ciclo catequético contempla iniciação à vida cristã, crisma e catequese de adultos.",
      "É necessário apresentar documento de identidade e, quando houver, certidão de batismo.",
    ],
    category: "Catequese",
    author: "Coordenação da Catequese",
    date: "2026-06-15",
    cover: "interior",
  },
  {
    slug: "pascom-lanca-portal-oficial",
    title: "PASCOM lança o portal oficial da paróquia",
    excerpt:
      "Notícias, agenda, galeria e informações institucionais reunidas em um só lugar, com atualização feita pela própria comunidade.",
    body: [
      "O novo portal concentra os canais de comunicação da paróquia e passa a ser a referência oficial para avisos, agenda litúrgica e campanhas.",
      "A equipe da PASCOM será responsável pela atualização dos conteúdos por meio de um painel administrativo protegido.",
    ],
    category: "PASCOM",
    author: "PASCOM Aparecida",
    date: "2026-06-02",
    cover: "igreja",
  },
];

export const agenda = [
  {
    category: "Liturgia",
    title: "Missa de Ação de Graças",
    date: "2026-07-28",
    time: "19h30",
    place: "Igreja Matriz",
  },
  {
    category: "Eventos",
    title: "Encontro de Pastorais",
    date: "2026-07-29",
    time: "14h00",
    place: "Salão Paroquial",
  },
  {
    category: "Formação",
    title: "Catequese para Adultos",
    date: "2026-07-30",
    time: "19h00",
    place: "Centro Pastoral",
  },
  {
    category: "Comunidade",
    title: "Reunião do Conselho Paroquial",
    date: "2026-08-01",
    time: "20h00",
    place: "Sala de Reuniões",
  },
];

export const timeline = [
  {
    year: "1717",
    title: "A imagem encontrada nas águas",
    text: "Pescadores encontram a imagem de Nossa Senhora Conceição Aparecida no Rio Paraíba do Sul. A devoção que atravessa séculos chegaria também ao norte do Paraná com os primeiros colonizadores.",
  },
  {
    year: "1947",
    title: "Fundação de Maringá",
    text: "Com a abertura da região pela Companhia de Terras Norte do Paraná, famílias vindas de vários estados trazem consigo a fé e a devoção à padroeira do Brasil.",
  },
  {
    year: "1956",
    title: "Criação da Diocese de Maringá",
    text: "A cidade recebe sua diocese, mais tarde elevada a Arquidiocese, organizando a vida eclesial da região e permitindo a criação de novas paróquias.",
  },
  {
    year: "Anos 1970",
    title: "Primeiras celebrações da comunidade",
    text: "A comunidade se reúne em uma capela simples, dedicada a Nossa Senhora Aparecida, sustentada pelo trabalho voluntário das famílias do bairro.",
  },
  {
    year: "Anos 1980",
    title: "Ereção canônica da paróquia",
    text: "A comunidade é elevada a paróquia, recebendo pároco próprio e organizando pastorais, catequese e as primeiras comunidades filiais.",
  },
  {
    year: "Anos 2000",
    title: "Ampliação da igreja matriz",
    text: "Mutirões, festas e campanhas viabilizam a ampliação do templo, do salão paroquial e das salas de catequese.",
  },
  {
    year: "Hoje",
    title: "Uma paróquia em missão",
    text: "Com pastorais ativas, comunidades filiais e forte presença digital, a paróquia segue como referência espiritual e social para as famílias da região.",
  },
];

export const schedules = [
  {
    title: "Missas na Igreja Matriz",
    items: [
      "sexta — 07h00",
      "Sábado — 19h30",
      "Domingo — 08h00, 10h00 e 18h00",
    ],
  },

  {
    title: "Missas na Capela N.Sra de Fátima",
    items: [
      "Quarta — 20h00",
      "Domingo — 10h00",
      "Dia 13 de cada mês — 20h00",
    ],
  },
  
  {
    title: "Secretaria Paroquial",
    items: [
      "Terça a sexta — 08h30 às 11h30",
      "Terça a sexta — 13h30 às 17h30",
      "Sábado — 08h30 às 11h30",
      "Domingo e segunda — fechada",
    ],
  },
  {
    title: "Confissões",
    items: [
      "Quarta-feira — 14h00 às 16h00",
      "Sexta — 08h30 às 11h00",
      "Sábado — 08h30 às 11h00",
    ],
  },
  {
    title: "Devoções e terços",
    items: [
      "1° Sábado do mês — 07h00 - Mil Ave-Marias na Igreja Matriz",
      "2° Sábado do mês — 06h00 - Adoração ao Santíssimo na Igreja Matriz",
      "Quinta-feira — 20h00 - Terço dos Homens na Igreja Matriz",
      "Último sábado do mês — 15h00 - Terço da Misericórdia na Igreja Matriz",
    ],
  },
  {
    title: "Atendimento do Pároco",
    items: [
      "Quarta-feira — 14h00 às 16h00",
      "Sexta — 08h30 às 11h00",
      "Sábado — 08h30 às 11h00",
    ],
  },
  {
    title: "Batizados e Casamentos",
    items: [
      "Batizados — 2º domingo do mês, 09h00",
      "Encontro de pais e padrinhos — sábado anterior, 16h00",
      "Casamentos — mediante agendamento na Secretaria Paroquial",
    ],
  },
];

export const faq = [
  {
    q: "Como faço para agendar um batizado?",
    a: "Procure a secretaria paroquial com a certidão de nascimento da criança e os dados dos padrinhos. Os batizados acontecem no segundo domingo de cada mês, sempre precedidos do encontro de preparação.",
  },
  {
    q: "Quais documentos preciso para casamento na igreja?",
    a: "Certidão de batismo atualizada dos noivos, documento de identidade, comprovante do curso de noivos e a habilitação civil.",
  },

  {
    q: "Onde compro as cartelas do Show de Prêmios?",
    a: "As cartelas são vendidas exclusivamente pela plataforma Nomine Ingressos, através do botão disponível na página Show de Prêmios.",
  },
  {
    q: "Como compro a camiseta oficial?",
    a: "A venda é feita pela loja oficial. Consulte a tabela de tamanhos na página Camisetas antes de finalizar o pedido.",
  },
  {
    q: "Quero servir em uma pastoral. Por onde começo?",
    a: "Converse com a secretaria paroquial ou participe de um dos encontros de acolhida. Cada pastoral tem seu processo de formação e acompanhamento.",
  },
  
];

export const prizes = [
  { title: "1º Prêmio - CARTELA CHEIA", description: "Fusca Relíquia azul, ano 1973.", highlight: true },
  { title: "2º Prêmio - CARTELA CHEIA", description: "TV 50' Polegadas." },
  { title: "3º Prêmio - CARTELA CHEIA", description: "Forno elétrico." },

];

export const albums = [
  { title: "Festa da Padroeira", category: "Festas", count: 128 },
  { title: "Corpus Christi", category: "Eventos", count: 96 },
  { title: "Arraiá da Mãe Aparecida", category: "Festas", count: 74 },
  { title: "Show de Prêmios", category: "Eventos", count: 61 },
  { title: "Missas Dominicais", category: "Missas", count: 210 },
  { title: "Sacramentos", category: "Sacramentos", count: 145 },
  { title: "Comunidade em Missão", category: "Comunidade", count: 88 },
  { title: "Fotos Históricas", category: "Fotos Históricas", count: 52 },
  { title: "Catequese", category: "Comunidade", count: 39 },
];

export const galleryCategories = [
  "Todos",
  "Eventos",
  "Missas",
  "Festas",
  "Sacramentos",
  "Comunidade",
  "Fotos Históricas",
];

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return {
    day: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
  };
}

