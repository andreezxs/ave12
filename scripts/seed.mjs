import { lookup } from "node:dns/promises";
import postgres from "postgres";
import { config } from "dotenv";

config();

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL nao configurada");
}

const parsed = new URL(
  url.replace("&channel_binding=require", "").replace("channel_binding=require&", ""),
);
const { address } = await lookup(parsed.hostname, { family: 4 });

const sql = postgres({
  host: address,
  port: Number(parsed.port || 5432),
  database: parsed.pathname.replace(/^\//, ""),
  username: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  ssl: { rejectUnauthorized: false, servername: parsed.hostname },
  max: 1,
  connect_timeout: 15,
});

const news = [
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

const agenda = [
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

const timeline = [
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

const schedules = [
  {
    title: "Missas na Igreja Matriz",
    items: ["sexta — 07h00", "Sábado — 19h30", "Domingo — 08h00, 10h00 e 18h00"],
  },
  {
    title: "Missas na Capela N.Sra de Fátima",
    items: ["Quarta — 20h00", "Domingo — 10h00", "Dia 13 de cada mês — 20h00"],
  },
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
    title: "Batizados e Casamentos",
    items: [
      "Batizados — 2º domingo do mês, 09h00",
      "Encontro de pais e padrinhos — sábado anterior, 16h00",
      "Casamentos — mediante agendamento na Secretaria Paroquial",
    ],
  },
];

const faq = [
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

const prizes = [
  {
    title: "1º Prêmio - CARTELA CHEIA",
    description: "Fusca Relíquia azul, ano 1973.",
    highlight: true,
  },
  { title: "2º Prêmio - CARTELA CHEIA", description: "TV 50' Polegadas.", highlight: false },
  { title: "3º Prêmio - CARTELA CHEIA", description: "Forno elétrico.", highlight: false },
];

const albums = [
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

async function main() {
  await sql`CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    body JSONB NOT NULL DEFAULT '[]'::jsonb,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    date DATE NOT NULL,
    cover TEXT NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS agenda (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    place TEXT NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS timeline (
    id SERIAL PRIMARY KEY,
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`CREATE TABLE IF NOT EXISTS prizes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    highlight BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    cover_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`;

  await sql`TRUNCATE news, agenda, timeline, schedules, faq, prizes, albums RESTART IDENTITY`;

  for (const post of news) {
    await sql`
      INSERT INTO news (slug, title, excerpt, body, category, author, date, cover)
      VALUES (
        ${post.slug},
        ${post.title},
        ${post.excerpt},
        ${post.body},
        ${post.category},
        ${post.author},
        ${post.date},
        ${post.cover}
      )
    `;
  }

  for (const item of agenda) {
    await sql`
      INSERT INTO agenda (category, title, date, time, place)
      VALUES (${item.category}, ${item.title}, ${item.date}, ${item.time}, ${item.place})
    `;
  }

  for (const [index, item] of timeline.entries()) {
    await sql`
      INSERT INTO timeline (year, title, text, sort_order)
      VALUES (${item.year}, ${item.title}, ${item.text}, ${index})
    `;
  }

  for (const [index, item] of schedules.entries()) {
    await sql`
      INSERT INTO schedules (title, items, sort_order)
      VALUES (${item.title}, ${item.items}, ${index})
    `;
  }

  for (const [index, item] of faq.entries()) {
    await sql`
      INSERT INTO faq (question, answer, sort_order)
      VALUES (${item.q}, ${item.a}, ${index})
    `;
  }

  for (const [index, item] of prizes.entries()) {
    await sql`
      INSERT INTO prizes (title, description, highlight, sort_order)
      VALUES (${item.title}, ${item.description}, ${item.highlight}, ${index})
    `;
  }

  for (const [index, item] of albums.entries()) {
    await sql`
      INSERT INTO albums (slug, title, category, count, sort_order)
      VALUES (${item.slug}, ${item.title}, ${item.category}, ${item.count}, ${index})
    `;
  }

  const counts = await sql`
    SELECT
      (SELECT COUNT(*) FROM news) AS news,
      (SELECT COUNT(*) FROM agenda) AS agenda,
      (SELECT COUNT(*) FROM timeline) AS timeline,
      (SELECT COUNT(*) FROM schedules) AS schedules,
      (SELECT COUNT(*) FROM faq) AS faq,
      (SELECT COUNT(*) FROM prizes) AS prizes,
      (SELECT COUNT(*) FROM albums) AS albums
  `;

  console.log("Neon seed ok", counts[0]);
  await sql.end({ timeout: 5 });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
