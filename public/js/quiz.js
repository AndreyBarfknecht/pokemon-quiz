// URL da sua API backend
const API_BASE = '/api'

// Estado do quiz
let state = {
  current: 0,
  selected: null,
  scores: {}
}

// Utilitários de tela
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  document.getElementById(`screen-${name}`).classList.add('active')
}

// Inicializa / reinicia o quiz
function initQuiz() {
  state = {
    current: 0,
    selected: null,
    scores: Object.fromEntries(Object.keys(TYPE_MAP).map(t => [t, 0]))
  }
  renderQuestion()
  showScreen('quiz')
}

// Renderiza a pergunta atual
function renderQuestion() {
  const total = QUESTIONS.length
  const { current } = state
  const q = QUESTIONS[current]

  document.getElementById('progress-fill').style.width = `${(current / total) * 100}%`
  document.getElementById('progress-label').textContent = `${current + 1} / ${total}`
  document.getElementById('q-number').textContent = `Pergunta ${current + 1}`
  document.getElementById('q-text').textContent = q.text

  const letters = ['A', 'B', 'C', 'D']
  const container = document.getElementById('options')
  container.innerHTML = ''

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button')
    btn.className = 'option'
    btn.innerHTML = `
      <span class="opt-letter">${letters[i]}</span>
      <span>${opt.text}</span>
    `
    btn.addEventListener('click', () => selectOption(i))
    container.appendChild(btn)
  })

  state.selected = null
  document.getElementById('btn-next').classList.add('disabled')
}

// Seleciona uma opção
function selectOption(index) {
  state.selected = index
  document.querySelectorAll('.option').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index)
  })
  document.getElementById('btn-next').classList.remove('disabled')
}

// Avança para próxima pergunta ou mostra resultado
function nextStep() {
  if (state.selected === null) return

  const { tags } = QUESTIONS[state.current].options[state.selected]
  Object.entries(tags).forEach(([type, val]) => {
    state.scores[type] = (state.scores[type] || 0) + val
  })

  state.current++

  if (state.current >= QUESTIONS.length) {
    showResult()
  } else {
    renderQuestion()
  }
}

// Calcula o tipo vencedor e busca o Pokémon
async function showResult() {
  showScreen('loading')

  const topType = Object.entries(state.scores)
    .sort((a, b) => b[1] - a[1])[0][0]

  const pool = TYPE_MAP[topType].pokemon
  const pokemonId = pool[Math.floor(Math.random() * pool.length)]

  try {
    const res = await fetch(`${API_BASE}/pokemon/${pokemonId}`)
    if (!res.ok) throw new Error('Erro na API')
    const data = await res.json()
    renderResult(data)
    showScreen('result')
  } catch (err) {
    document.getElementById('r-error').hidden = false
    document.getElementById('r-error').textContent = 'Não foi possível carregar o Pokémon. Tente de novo.'
    showScreen('result')
  }
}

// Renderiza o card de resultado
function renderResult(data) {
  document.getElementById('r-img').src = data.image
  document.getElementById('r-img').alt = data.name
  document.getElementById('r-name').textContent = data.name
  document.getElementById('r-number').textContent = `#${String(data.id).padStart(3, '0')}`
  document.getElementById('r-desc').textContent = data.description

  const typesEl = document.getElementById('r-types')
  typesEl.innerHTML = ''
  data.types.forEach(type => {
    const info = TYPE_MAP[type] || TYPE_MAP['normal']
    const badge = document.createElement('span')
    badge.className = 'type-badge'
    badge.textContent = type
    badge.style.background = info.bg
    badge.style.color = info.color
    typesEl.appendChild(badge)
  })

  const statsEl = document.getElementById('r-stats')
  statsEl.innerHTML = ''
  const statLabels = { hp: 'HP', attack: 'Ataque', defense: 'Defesa', 'special-attack': 'Sp. Atq' }
  data.stats.forEach(stat => {
    const div = document.createElement('div')
    div.className = 'stat-item'
    div.innerHTML = `
      <div class="stat-name">${statLabels[stat.name] || stat.name}</div>
      <div class="stat-value">${stat.value}</div>
    `
    statsEl.appendChild(div)
  })

  document.getElementById('r-error').hidden = true
}

// Event listeners
document.getElementById('btn-start').addEventListener('click', initQuiz)
document.getElementById('btn-next').addEventListener('click', nextStep)
document.getElementById('btn-retry').addEventListener('click', () => {
  initQuiz()
  showScreen('quiz')
})
