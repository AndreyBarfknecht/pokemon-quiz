// Mapeamento tipo → cor e pool de Pokémons
const TYPE_MAP = {
  fire:     { color: '#993C1D', bg: '#FAECE7', pokemon: [6, 59, 136, 257, 392, 637] },
  water:    { color: '#185FA5', bg: '#E6F1FB', pokemon: [9, 131, 134, 258, 395, 503] },
  grass:    { color: '#3B6D11', bg: '#EAF3DE', pokemon: [3, 154, 470, 254, 357, 497] },
  electric: { color: '#BA7517', bg: '#FAEEDA', pokemon: [25, 26, 135, 310, 405, 466] },
  psychic:  { color: '#993556', bg: '#FBEAF0', pokemon: [65, 150, 196, 282, 380, 475] },
  ice:      { color: '#185FA5', bg: '#DBF0FB', pokemon: [91, 131, 144, 378, 471, 478] },
  fighting: { color: '#993C1D', bg: '#FAECE7', pokemon: [68, 107, 237, 448, 499, 534] },
  ghost:    { color: '#534AB7', bg: '#EEEDFE', pokemon: [94, 200, 354, 429, 487, 563] },
  dark:     { color: '#444441', bg: '#F1EFE8', pokemon: [197, 248, 359, 430, 461, 491] },
  fairy:    { color: '#D4537E', bg: '#FBEAF0', pokemon: [39, 122, 176, 303, 468, 700] },
  dragon:   { color: '#534AB7', bg: '#EEEDFE', pokemon: [6, 149, 230, 373, 445, 635] },
  rock:     { color: '#5F5E5A', bg: '#F1EFE8', pokemon: [74, 111, 142, 246, 369, 526] },
  flying:   { color: '#185FA5', bg: '#E6F1FB', pokemon: [17, 142, 163, 277, 334, 430] },
  steel:    { color: '#5F5E5A', bg: '#F1EFE8', pokemon: [81, 205, 227, 374, 385, 476] },
  normal:   { color: '#5F5E5A', bg: '#F1EFE8', pokemon: [143, 113, 137, 234, 242, 446] },
  bug:      { color: '#3B6D11', bg: '#EAF3DE', pokemon: [12, 127, 212, 267, 291, 542] }
}

// Perguntas e pesos por tipo
const QUESTIONS = [
  {
    text: 'Como você reage diante de um desafio?',
    options: [
      { text: 'Enfrento de frente, sem pensar duas vezes', tags: { fire: 2, fighting: 2 } },
      { text: 'Analiso a situação antes de agir',          tags: { psychic: 2, water: 1 } },
      { text: 'Peço ajuda ou espero o momento certo',       tags: { fairy: 2, normal: 1 } },
      { text: 'Fico na minha e deixo passar',               tags: { ghost: 2, dark: 1 } }
    ]
  },
  {
    text: 'Qual ambiente te deixa mais feliz?',
    options: [
      { text: 'Floresta ou mata fechada',   tags: { grass: 3, bug: 1 } },
      { text: 'Praia ou oceano',            tags: { water: 3, ice: 1 } },
      { text: 'Montanha ou lugar alto',     tags: { flying: 2, rock: 1 } },
      { text: 'Cidade movimentada à noite', tags: { electric: 2, dark: 1 } }
    ]
  },
  {
    text: 'O que as pessoas costumam dizer sobre você?',
    options: [
      { text: 'Sou animado e cheio de energia', tags: { electric: 2, fire: 1 } },
      { text: 'Sou calmo e ponderado',           tags: { water: 2, psychic: 1 } },
      { text: 'Sou misterioso e difícil de ler', tags: { dark: 2, ghost: 1 } },
      { text: 'Sou gentil e prestativo',         tags: { fairy: 2, normal: 1 } }
    ]
  },
  {
    text: 'Qual habilidade você usaria em uma batalha?',
    options: [
      { text: 'Ataque físico devastador',   tags: { fighting: 3, dragon: 1 } },
      { text: 'Magia e poderes mentais',    tags: { psychic: 3, fairy: 1 } },
      { text: 'Velocidade e esquiva',       tags: { electric: 2, flying: 1 } },
      { text: 'Defesa e resistência total', tags: { rock: 2, steel: 2 } }
    ]
  },
  {
    text: 'Como você prefere passar seu tempo livre?',
    options: [
      { text: 'Ao ar livre, explorando',      tags: { grass: 2, flying: 1 } },
      { text: 'Em casa, lendo ou estudando',  tags: { psychic: 2, normal: 1 } },
      { text: 'Com amigos, fazendo barulho',  tags: { fire: 2, electric: 1 } },
      { text: 'Sozinho, em silêncio total',   tags: { ghost: 2, ice: 1 } }
    ]
  },
  {
    text: 'Qual é sua maior qualidade?',
    options: [
      { text: 'Coragem',        tags: { fire: 2, fighting: 2 } },
      { text: 'Inteligência',   tags: { psychic: 3 } },
      { text: 'Lealdade',       tags: { normal: 2, fairy: 1 } },
      { text: 'Adaptabilidade', tags: { water: 2, grass: 1 } }
    ]
  },
  {
    text: 'Quando alguém precisa de ajuda, você...',
    options: [
      { text: 'Age imediatamente sem pensar',          tags: { fire: 2, fighting: 1 } },
      { text: 'Oferece suporte emocional',             tags: { fairy: 2, psychic: 1 } },
      { text: 'Resolve na sombra, sem aparecer',       tags: { ghost: 2, dark: 2 } },
      { text: 'Analisa a melhor solução antes de agir', tags: { psychic: 2, water: 1 } }
    ]
  }
]
