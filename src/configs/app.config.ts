export const companyInfo = {
  name: "Suport Ideal",
  tagline:
    "Soluções em tecnologia com transparência e confiança. Atendendo Tapira e Araxá desde 2021.",
  phone: "+55 34 98835-6187",
  phoneRaw: "5534988356187",
  instagram: "https://www.instagram.com/suport.ideal/",
  city: "Tapira",
  region: "MG",
  servedCities: ["Tapira", "Araxá"],
  address: "Francisco Rosa Pires, 156",
  postalCode: "38189-000",
  coords: { lat: -19.924209934550014, lng: -46.82101058102371 },
  openingHours: "Seg–Sex · 8h–18h\nSáb · 8h–13h",
  established: "2021",
} as const;

export const navigationLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Montagem PC", href: "#montagem" },
  { label: "Loja", href: "#loja" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

export const processSteps = [
  {
    id: "01",
    phase: "Recepção",
    title: "Avaliação inicial",
    description:
      "Você nos conta o problema via WhatsApp e a gente já adianta o pré-diagnóstico. Resposta média em 10 minutos.",
  },
  {
    id: "02",
    phase: "Diagnóstico",
    title: "Análise técnica",
    description:
      "Avaliação completa do dispositivo com explicação clara do que precisa ser feito e qual peça será usada.",
  },
  {
    id: "03",
    phase: "Orçamento",
    title: "Aprovação aberta",
    description:
      "Orçamento detalhado por escrito. Só seguimos se você aprovar. Sem custos escondidos — sem exceções.",
  },
  {
    id: "04",
    phase: "Entrega",
    title: "Garantia & teste",
    description:
      "Reparo realizado com testes finais e garantia de 90 dias por escrito sobre serviço e peça.",
  },
] as const;

export const quickServices = [
  { label: "Troca de tela", price: "a partir R$ 199" },
  { label: "Troca de bateria", price: "a partir R$ 149" },
  { label: "Formatação", price: "a partir R$ 99" },
  { label: "Montagem PC", price: "orçamento" },
] as const;

export type ServiceSize = "lg" | "md" | "sm";

export const services: ReadonlyArray<{
  id: string;
  numLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
  whatsappText: string;
  size: ServiceSize;
}> = [
  {
    id: "01",
    numLabel: "01 / Mais procurado",
    title: "Troca de tela & display",
    description:
      "Apple, Samsung, Xiaomi, Motorola e Realme. Trabalhamos com peças originais e linhas premium, com garantia integral. Diagnóstico em 30 minutos.",
    ctaLabel: "Orçar troca de tela",
    whatsappText: "Olá! Quero orçamento de troca de tela",
    size: "lg",
  },
  {
    id: "02",
    numLabel: "02",
    title: "Troca de bateria",
    description:
      "Bateria nova, autonomia restaurada. Linha original e premium com 90 dias de garantia.",
    ctaLabel: "Orçar",
    whatsappText: "Olá! Quero orçamento de troca de bateria",
    size: "sm",
  },
  {
    id: "03",
    numLabel: "03",
    title: "Formatação de PC",
    description:
      "Backup dos seus dados, instalação do sistema, drivers e softwares essenciais. Tudo testado.",
    ctaLabel: "Orçar",
    whatsappText: "Olá! Quero orçamento de formatação",
    size: "md",
  },
  {
    id: "04",
    numLabel: "04",
    title: "Limpeza & manutenção preventiva",
    description:
      "Notebook ou desktop com lentidão? Limpeza interna, troca de pasta térmica e revisão completa para devolver a performance.",
    ctaLabel: "Orçar",
    whatsappText: "Olá! Quero orçamento de manutenção preventiva",
    size: "md",
  },
  {
    id: "05",
    numLabel: "05",
    title: "Upgrade — SSD & memória",
    description:
      "Seu PC ou notebook ganha vida nova com SSD NVMe e mais memória. Especificamos a peça certa para o seu hardware.",
    ctaLabel: "Orçar",
    whatsappText: "Olá! Quero orçamento de upgrade SSD/memória",
    size: "md",
  },
  {
    id: "06",
    numLabel: "06",
    title: "Atendimento remoto",
    description:
      "Resolvemos problemas de software à distância via acesso remoto seguro, com você acompanhando.",
    ctaLabel: "Orçar",
    whatsappText: "Olá! Preciso de atendimento remoto",
    size: "md",
  },
  {
    id: "07",
    numLabel: "07",
    title: "Visita técnica empresarial",
    description:
      "Empresas em Tapira e Araxá: vamos até você fazer manutenção, configurar rede ou implantar nova estrutura. Sob demanda.",
    ctaLabel: "Solicitar visita",
    whatsappText: "Olá! Preciso de visita técnica empresarial",
    size: "md",
  },
];

export const brandList = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Motorola",
  "Realme",
  "ASUS",
  "Lenovo",
  "Dell",
] as const;

export const brandsGrid = [
  { name: "Apple", sub: "Premium" },
  { name: "Samsung", sub: "Galaxy" },
  { name: "Xiaomi", sub: "Redmi · Mi" },
  { name: "Motorola", sub: "Moto · Edge" },
  { name: "Realme", sub: "GT · Note" },
] as const;

export const pcBuildSteps = [
  { id: "01", title: "Briefing & orçamento", meta: "15 min" },
  { id: "02", title: "Seleção de componentes", meta: "curadoria" },
  { id: "03", title: "Montagem & cable management", meta: "~ 4h" },
  { id: "04", title: "Stress test & entrega", meta: "testado" },
] as const;

export type CatalogIcon =
  | "screen"
  | "charger"
  | "peripherals"
  | "cables"
  | "audio"
  | "hardware"
  | "gamer"
  | "soon";

/**
 * Ao trocar PNGs em `public/images/` **sem renomear** (ex.: nova `capa-pelicula.png`), aumente este número.
 * Assim a URL muda (`?cv=…`) e o browser / cache do Next Image deixam de servir o arquivo antigo.
 */
export const catalogCoverAssetVersion = 1;

export const catalogCategories: ReadonlyArray<{
  title: string;
  count: string;
  highlight?: boolean;
  /** Fundo fotográfico do card (demais usam textura em grade). */
  cardCoverSrc?: string;
}> = [
  {
    title: "Películas & capas",
    count: "+ 24 itens",
    cardCoverSrc: "/images/capa-pelicula.png",
  },
  {
    title: "Carregadores",
    count: "+ 18 itens",
    cardCoverSrc: "/images/carregadores.png",
  },
  {
    title: "Periféricos",
    count: "+ 32 itens",
    cardCoverSrc: "/images/perifericos.png",
  },
  {
    title: "Cabos & adaptadores",
    count: "+ 28 itens",
    cardCoverSrc: "/images/cabos-adaptadores.png",
  },
  {
    title: "Áudio & fones",
    count: "+ 16 itens",
    cardCoverSrc: "/images/audio-fones.png",
  },
  {
    title: "Componentes & HW",
    count: "+ 22 itens",
    cardCoverSrc: "/images/componentes-hw.png",
  },
  {
    title: "Gamer & Setup",
    count: "+ 14 itens",
    cardCoverSrc: "/images/gamer-setup.png",
  },
  {
    title: "Em breve",
    count: "Catálogo completo",
    highlight: true,
    cardCoverSrc: "/images/em-breve.png",
  },
];

export const trustStats = [
  {
    big: "5",
    bigUnit: "anos",
    label: "de mercado, atuando ininterruptamente desde 2021",
  },
  {
    big: "10",
    bigUnit: "min",
    label: "tempo médio de primeira resposta no WhatsApp",
  },
  {
    big: "4",
    bigUnit: "h",
    label: "tempo médio de execução para serviços padrão",
  },
  {
    big: "5",
    bigUnit: "★",
    label: "avaliação consistente no Google e em indicações",
  },
] as const;

export const reviews = [
  {
    initials: "RS",
    author: "Rafael S.",
    source: "Google · Tapira-MG",
    text: "Atendimento muito rápido e transparente. Levei meu Samsung com a tela quebrada e o Walison já me passou o orçamento detalhado em minutos. Ficou perfeito.",
  },
  {
    initials: "JP",
    author: "João P.",
    source: "Google · Araxá-MG",
    text: "Montagem do meu PC gamer ficou impecável. Cuidadoso na escolha das peças, no cable management e ainda fez stress test antes de entregar. Recomendo demais.",
  },
  {
    initials: "CM",
    author: "Carolina M.",
    source: "Indicação",
    text: "Já levei dois aparelhos diferentes, sempre resolveu rápido e com preço justo. O diferencial é a honestidade: explica tudo antes de mexer.",
  },
] as const;

export const footerColumns = [
  {
    title: "Serviços",
    links: [
      { label: "Troca de tela", href: "#servicos" },
      { label: "Bateria", href: "#servicos" },
      { label: "Formatação", href: "#servicos" },
      { label: "Upgrade SSD/RAM", href: "#servicos" },
      { label: "Montagem PC", href: "#montagem" },
      { label: "Visita técnica", href: "#servicos" },
    ],
  },
  {
    title: "Loja",
    links: [
      { label: "Películas & capas", href: "#loja" },
      { label: "Carregadores", href: "#loja" },
      { label: "Periféricos", href: "#loja" },
      { label: "Áudio & fones", href: "#loja" },
      { label: "Setup gamer", href: "#loja" },
    ],
  },
] as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${companyInfo.phoneRaw}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
