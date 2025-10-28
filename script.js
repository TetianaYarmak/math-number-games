const [numbersSection, fruitsSection] = document.querySelectorAll('section')
const svg = document.querySelector('svg')
const numbers = numbersSection.querySelectorAll('li' )
const fruits = fruitsSection.querySelectorAll('li' )
const sound = document.querySelector('audio')

prepareSVG()
randomizeCardOrder(numbers)
randomizeCardOrder(fruits)

numbersSection.onclick = handleCardClick
fruitsSection.onclick = handleCardClick

function prepareSVG() {
  svg.setAttribute('height', numbersSection.offsetHeight) 
}

function link(card1, card2) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  
  line.setAttribute('x1', 0)
  line.setAttribute('y1', card1.offsetTop + card1.offsetHeight / 2 - 2.5)
  line.setAttribute('x2', '100%')
  line.setAttribute('y2', card2.offsetTop + card2.offsetHeight / 2 - 2.5)
  line.setAttribute('stroke', 'lime')
  line.setAttribute('stroke-width', 5)
  svg.append(line)
}

function handleCardClick(e) {
  const card = e.target.closest('li')
  
  if (!card || card.matches('.matched')) return

  const parent = card.closest('ul')
  const previouslySelected = parent.querySelector('.selected')
  
  previouslySelected?.classList.remove('selected')
  card.classList.add('selected')

  const selected = document.querySelectorAll('.selected')

  if (selected.length === 2) match(...selected)
}

function randomizeCardOrder(cards) {
  const parent = cards[0].parentElement

  cards = Array.from(cards)
  cards.sort(() => Math.random() - 0.5)
  
  parent.append(...cards)
}

function match(card1, card2) {
  const num1 = card1.firstElementChild.getAttribute('src')[7]
  const num2 = card2.firstElementChild.getAttribute('src')[7]
  
  if (num1 === num2) {
    link(card1, card2)
    card1.className = card2.className = 'matched'
    sound.play()
  }
}