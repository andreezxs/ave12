/**
 * Fonte única de conteúdo do portal.
 */

export const parish = {
  name: "Paróquia Nossa Senhora Aparecida",
  shortName: "NS Aparecida",
  city: "Maringá — PR",
  archdiocese: "Arquidiocese de Maringá",
  patron: "Nossa Senhora Aparecida",
  address: "Praça Nossa Senhora Aparecida, Vila Esperança, Maringá — PR",
  email: "secretaria@paroquiaaparecidamga.com.br",
  phone: "(44) 3267-0484",
  whatsapp: "https://wa.me/5544999071683",
  whatsappChannel: "https://whatsapp.com/channel/0029Vb7VUmt4IBhKnOpEi73S",
  instagram: "https://instagram.com/pnsa_mga",
  facebook: "https://facebook.com/pnsa.maringa",
  youtube: "https://youtube.com/",
  maps: "https://www.google.com/maps/search/?api=1&query=Paróquia+Nossa+Senhora+Aparecida+Praça+Nossa+Senhora+Aparecida+Vila+Esperança+Maringá",
  mapsEmbed:
    "https://www.google.com/maps?q=Par%C3%B3quia%20Nossa%20Senhora%20Aparecida%20Pra%C3%A7a%20Nossa%20Senhora%20Aparecida%20Vila%20Esperan%C3%A7a%20Maring%C3%A1&output=embed",
  calendarUrl: "https://agendamento.p7group.cloud/calendario?paroquia_id=1&mes=",
  shopUrl: "https://www.nuvemshop.com.br/",
  ticketsUrl: "https://nomineingressos.com/pnsa_mga/",
};

export const nav = [
  { label: "Início", to: "/" },
  { label: "A Paróquia", to: "/a-paroquia" },
  { label: "Capela N. Sra. de Fátima", to: "/capela-nossa-senhora-de-fatima" },
  { label: "História", to: "/historia" },
  { label: "Notícias", to: "/noticias" },
  { label: "Agenda", to: parish.calendarUrl },
  { label: "Jubileu de Prata", to: "/ave12" },
  { label: "Centro Catequético", to: "/centro-catequetico" },
  { label: "Camisetas", to: "/camisetas" },
  { label: "Show de Prêmios", to: "/show-de-premios" },
  { label: "Premiações", to: "/premiacoes" },
  // Galeria removida
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
  | "Comunicados"
  | "Geral"
  | string;

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: NewsCategory;
  author: string;
  date: string;
  cover: "igreja" | "interior" | "comunidade";
  coverUrl?: string;
}

export const news: NewsPost[] = [
  {
    slug: "jubileu-de-prata-mobiliza-comunidade",
    title: "Jubileu de Prata mobiliza a comunidade paroquial",
    excerpt:
      "O Jubileu de Prata reúne fiéis em torno de um compromisso de contribuição e corresponsabilidade com a vida da paróquia.",
    body: [
      "O Jubileu de Prata nasceu do desejo de tornar a manutenção e a missão da Paróquia Nossa Senhora Aparecida uma tarefa de toda a comunidade. A proposta é simples: cada família assume uma contribuição ao longo dos doze meses do ano, garantindo previsibilidade para as obras, para a pastoral e para as ações sociais.",
      "Nas últimas semanas, coordenadores de pastorais e movimentos apresentaram o projeto nas missas e nos encontros de catequese. O retorno tem sido expressivo: novas famílias aderiram e antigos colaboradores renovaram o compromisso.",
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
      "A equipe da PASCOM será responsável pela atualização dos conteúdos por meio do portal oficial da paróquia.",
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

export const chapelSchedule = {
  title: "Missas na Capela Nossa Senhora de Fátima",
  items: ["Quarta — 20h00", "Domingo — 10h00", "Dia 13 de cada mês — 20h00"],
};

export const schedules = [
  {
    title: "Missas na Igreja Matriz",
    items: ["sexta — 07h00", "Sábado — 19h30", "Domingo — 08h00, 10h00 e 18h00"],
  },
  chapelSchedule,

  {
    title: "Secretaria Paroquial",
    items: [
      "Segunda a sexta — 08h00 às 11h30",
      "Segunda a sexta — 13h30 às 18h00",
      "Sábado — 08h00 às 12h00",
      "Domingo — fechada",
    ],
  },
  {
    title: "Confissões",
    items: ["Quarta-feira — 14h00 às 16h00", "Sexta — 08h30 às 11h00", "Sábado — 08h30 às 11h00"],
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
    items: ["Quarta-feira — 14h00 às 16h00", "Sexta — 08h30 às 11h00", "Sábado — 08h30 às 11h00"],
  },
  {
    title: "Horários de Batizados",
    items: [
      "Capela 8h da manhã - R$ 200,00",
      "1° 3° e 5° Domingo - Diac. Sérgio",
      "2° e 4° Domingo - Diac. Leocir",
      "Matriz - 8h da manhã",
      "2° e 4° Domingo - Diac. Sérgio",
      "3° e 5° Domingo - Diac. Leocir",
      "Para agendar seu casamento - mediante agendamento na Secretaria paroquial",
    ],
  },
];

export interface CatechesisContent {
  slug: string;
  category: string;
  title: string;
  summary: string;
  content: string[];
  reference: string;
  sourceUrl: string;
}

export const catechesisContents: CatechesisContent[] = [
  {
    slug: "caminho-da-catequese",
    category: "Fundamentos",
    title: "O caminho da catequese",
    summary: "Uma caminhada para conhecer Jesus, aprofundar a fé e vivê-la em comunidade.",
    content: [
      "A catequese é uma formação na fé cristã que ajuda a compreender a mensagem de Jesus e a integrar essa mensagem à vida.",
      "Esse caminho envolve escuta da Palavra, oração, celebração e convivência na comunidade. Aprender sobre a fé é também buscar colocá-la em prática no cuidado com o próximo.",
    ],
    reference: "Catecismo da Igreja Católica, §§ 4–10",
    sourceUrl: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
  {
    slug: "biblia-e-palavra-de-deus",
    category: "Bíblia",
    title: "A Bíblia e a Palavra de Deus",
    summary: "As Escrituras apresentam a história da salvação e convidam à escuta de Deus.",
    content: [
      "A Bíblia reúne os livros do Antigo e do Novo Testamento. Para os cristãos, nela se encontra o testemunho da ação de Deus na história e, de modo central, a vida e a mensagem de Jesus Cristo.",
      "A leitura pode ser feita individualmente e em comunidade. Contexto, oração e partilha ajudam a compreender os textos e a relacioná-los com a vida cotidiana.",
    ],
    reference: "Catecismo da Igreja Católica, §§ 101–141",
    sourceUrl: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
  {
    slug: "jesus-cristo",
    category: "Jesus Cristo",
    title: "Jesus Cristo, centro da fé cristã",
    summary:
      "Conhecer a vida, as palavras e as ações de Jesus é essencial para a caminhada cristã.",
    content: [
      "Os Evangelhos narram a vida e a missão de Jesus: seus ensinamentos, sua atenção aos pobres e aos que sofriam, sua morte e sua ressurreição.",
      "A catequese apresenta Jesus e convida cada pessoa a conhecer sua mensagem, cultivar a relação com Ele e seguir seu exemplo de amor, serviço e perdão.",
    ],
    reference: "Catecismo da Igreja Católica, §§ 422–429",
    sourceUrl: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
  {
    slug: "sacramentos",
    category: "Sacramentos",
    title: "Os sacramentos na vida cristã",
    summary: "Sinais celebrados pela Igreja que acompanham a vida de fé.",
    content: [
      "A Igreja Católica celebra sete sacramentos: Batismo, Confirmação, Eucaristia, Reconciliação, Unção dos Enfermos, Ordem e Matrimônio.",
      "Cada sacramento tem uma celebração e um significado próprios. A preparação catequética ajuda a compreender esses sinais e a participar deles com consciência e fé.",
    ],
    reference: "Catecismo da Igreja Católica, §§ 1113–1134",
    sourceUrl: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
  {
    slug: "oracao",
    category: "Oração",
    title: "Aprender a rezar",
    summary: "A oração é diálogo com Deus, vivido em momentos pessoais e comunitários.",
    content: [
      "Rezar pode incluir louvor, agradecimento, pedido, intercessão e silêncio. A oração cristã encontra em Jesus seu modelo e é alimentada pela Palavra de Deus.",
      "Não existe apenas uma forma de rezar: a comunidade cristã conhece orações tradicionais, celebrações litúrgicas e momentos de oração espontânea.",
    ],
    reference: "Catecismo da Igreja Católica, §§ 2558–2565",
    sourceUrl: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
  {
    slug: "liturgia",
    category: "Liturgia",
    title: "A liturgia e a comunidade",
    summary:
      "Na liturgia, a comunidade se reúne para celebrar a fé e participar da vida da Igreja.",
    content: [
      "A liturgia reúne orações, leituras, gestos e sinais. A celebração da Eucaristia ocupa lugar central na vida litúrgica católica.",
      "Participar da liturgia é também escutar, responder, cantar e rezar junto com a comunidade, respeitando os tempos e os símbolos próprios de cada celebração.",
    ],
    reference: "Catecismo da Igreja Católica, §§ 1066–1075",
    sourceUrl: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
];

export interface CatecheticalBook {
  slug: string;
  title: string;
  author: string;
  format: "Livro" | "Documento pontifício";
  theme: string;
  description: string;
  url: string;
}

export interface CatecheticalSource {
  slug: string;
  title: string;
  author: string;
  format: "Formação online" | "Artigo online";
  theme: string;
  description: string;
  url: string;
}

export const catecheticalBooks: CatecheticalBook[] = [
  {
    slug: "catecismo-da-igreja-catolica",
    title: "Catecismo da Igreja Católica",
    author: "Igreja Católica",
    format: "Livro",
    theme: "Fundamentos da fé",
    description: "Apresenta a fé católica, a celebração dos sacramentos, a vida cristã e a oração.",
    url: "https://www.vatican.va/archive/cathechism_po/index_new/prima-pagina-cic_po.html",
  },
  {
    slug: "compendio-do-catecismo",
    title: "Compêndio do Catecismo da Igreja Católica",
    author: "Igreja Católica",
    format: "Livro",
    theme: "Perguntas e respostas",
    description:
      "Uma síntese da fé católica em perguntas e respostas, com orações e referências essenciais.",
    url: "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_po.html",
  },
  {
    slug: "evangelii-gaudium",
    title: "Evangelii Gaudium",
    author: "Papa Francisco",
    format: "Documento pontifício",
    theme: "Evangelização e missão",
    description:
      "Reflexão sobre o anúncio do Evangelho, a vida da comunidade e a missão da Igreja.",
    url: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20131124_evangelii-gaudium.html",
  },
  {
    slug: "laudato-si",
    title: "Laudato Si'",
    author: "Papa Francisco",
    format: "Documento pontifício",
    theme: "Criação e cuidado da casa comum",
    description:
      "Ensinamentos sobre o cuidado da criação e a responsabilidade com as pessoas e o planeta.",
    url: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html",
  },
  {
    slug: "fratelli-tutti",
    title: "Fratelli Tutti",
    author: "Papa Francisco",
    format: "Documento pontifício",
    theme: "Fraternidade e amizade social",
    description: "Uma reflexão sobre fraternidade, diálogo, solidariedade e construção da paz.",
    url: "https://www.vatican.va/content/francesco/pt/encyclicals/documents/papa-francesco_20201003_enciclica-fratelli-tutti.html",
  },
  {
    slug: "christus-vivit",
    title: "Christus Vivit",
    author: "Papa Francisco",
    format: "Documento pontifício",
    theme: "Juventude e vocação",
    description:
      "Uma mensagem aos jovens sobre Jesus Cristo, vocação, discernimento e participação na Igreja.",
    url: "https://www.vatican.va/content/francesco/pt/apost_exhortations/documents/papa-francesco_esortazione-ap_20190325_christus-vivit.html",
  },
  {
    slug: "deus-caritas-est",
    title: "Deus Caritas Est",
    author: "Papa Bento XVI",
    format: "Documento pontifício",
    theme: "Amor cristão e caridade",
    description:
      "Apresenta o amor cristão e a relação entre o amor de Deus e o serviço ao próximo.",
    url: "https://www.vatican.va/content/benedict-xvi/pt/encyclicals/documents/hf_ben-xvi_enc_20051225_deus-caritas-est.html",
  },
];

export const catecheticalSources: CatecheticalSource[] = [
  {
    slug: "cnbb-documento-107-iniciacao-vida-crista",
    title: "Iniciação à vida cristã — Documento 107",
    author: "CNBB · Comissão para a Animação Bíblico-Catequética",
    format: "Formação online",
    theme: "Iniciação à vida cristã",
    description:
      "Apresentação oficial do documento da CNBB e acesso a slides gratuitos para apoiar encontros de formação. A edição integral do documento pode ter condições próprias de acesso.",
    url: "https://www.cnbb.org.br/cnbb-lanca-documento-sobre-iniciacao-a-vida-crista-aprovado-na-ultima-ag/",
  },
  {
    slug: "cnbb-animacao-biblico-catequetica",
    title: "Animação Bíblico-Catequética",
    author: "CNBB",
    format: "Formação online",
    theme: "Catequese e Bíblia",
    description:
      "Notícias, iniciativas e conteúdos de formação da Comissão Episcopal para a Animação Bíblico-Catequética.",
    url: "https://www.cnbb.org.br/categoria/comissoes/animacao-biblico-catequetica/",
  },
  {
    slug: "a12-profetas-menores",
    title: "Quem foram os chamados profetas menores na Bíblia?",
    author: "Redação A12",
    format: "Artigo online",
    theme: "Bíblia e profetas",
    description:
      "Uma apresentação dos doze profetas menores e das mensagens de conversão, justiça, misericórdia e esperança presentes em seus livros.",
    url: "https://a12.com/redacaoa12/igreja/quem-foram-os-chamados-profetas-menores-na-biblia/",
  },
  {
    slug: "a12-oracoes-catolicas",
    title: "Quais são as orações mais rezadas da Igreja Católica?",
    author: "Redação A12",
    format: "Artigo online",
    theme: "Oração",
    description:
      "Conteúdo de espiritualidade que apresenta orações tradicionais e sua relação com a vida de fé.",
    url: "https://a12.com/redacaoa12/espiritualidade/quais-sao-as-oracoes-mais-rezadas-da-igreja-catolica/",
  },
  {
    slug: "a12-espiritualidade",
    title: "Espiritualidade — conteúdos do A12",
    author: "A12 · Rede Aparecida de Comunicação",
    format: "Formação online",
    theme: "Espiritualidade e evangelização",
    description:
      "Artigos e reflexões sobre oração e vivência da fé publicados no portal de evangelização da Rede Aparecida.",
    url: "https://a12.com/redacaoa12/espiritualidade/",
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
    a: "A venda é feita pelo WhatsApp oficial da secretaria da Paróquia Nossa Senhora Aparecida.",
  },
  {
    q: "Quero servir em uma pastoral. Por onde começo?",
    a: "Converse com a secretaria paroquial ou participe de um dos encontros de acolhida. Cada pastoral tem seu processo de formação e acompanhamento.",
  },
];

export const prizes = [
  {
    title: "1º Prêmio - CARTELA CHEIA",
    description: "Fusca Relíquia azul, ano 1973.",
    highlight: true,
  },
  { title: "2º Prêmio - CARTELA CHEIA", description: "TV 50' Polegadas." },
  { title: "3º Prêmio - CARTELA CHEIA", description: "Forno elétrico." },
];

export interface GalleryAlbum {
  slug?: string;
  title: string;
  category: string;
  count: number;
  coverUrl?: string;
}

export const albums: GalleryAlbum[] = [
  { slug: "festa-da-padroeira", title: "Festa da Padroeira", category: "Festas", count: 128 },
  { slug: "corpus-christi", title: "Corpus Christi", category: "Eventos", count: 96 },
  {
    slug: "arraia-da-mae-aparecida",
    title: "Arraiá da Mãe Aparecida",
    category: "Festas",
    count: 74,
  },
  { slug: "show-de-premios", title: "Show de Prêmios", category: "Eventos", count: 61 },
  { slug: "missas-dominicais", title: "Missas Dominicais", category: "Missas", count: 210 },
  { slug: "sacramentos", title: "Sacramentos", category: "Sacramentos", count: 145 },
  {
    slug: "comunidade-em-missao",
    title: "Comunidade em Missão",
    category: "Comunidade",
    count: 88,
  },
  { slug: "fotos-historicas", title: "Fotos Históricas", category: "Fotos Históricas", count: 52 },
  { slug: "catequese", title: "Catequese", category: "Comunidade", count: 39 },
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
