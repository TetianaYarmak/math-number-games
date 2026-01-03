const [fruitsSection, numbersSection] = document.querySelectorAll('section')
const svg = document.querySelector('svg')
const numbers = numbersSection.querySelectorAll('li')
const fruits = fruitsSection.querySelectorAll('li')
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
  } else {
    showPopup("Cпробуй ще")

    setTimeout(() => {
      card1.classList.remove('selected')
      card2.classList.remove('selected')

      if (card1.closest('section') === fruitsSection) {
        card1.classList.add('selected')
      } else if (card2.closest('section') === fruitsSection) {
        card2.classList.add('selected')
      }
    }, 3000)
  }
}
function showPopup(message) {
  const popup = document.createElement('div')
  popup.textContent = message
  popup.style.position = 'fixed'
  popup.style.top = '50%'
  popup.style.left = '50%'
  popup.style.transform = 'translate(-50%, -50%)'
  popup.style.background = 'rgba(237, 10, 10, 0.59)'
  popup.style.color = 'white'
  popup.style.padding = '20px'
  popup.style.borderRadius = '10px'
  popup.style.zIndex = '1000'
  document.body.appendChild(popup)

  setTimeout(() => popup.remove(), 3000)
}


/* function match(card1, card2) {
  const num1 = card1.firstElementChild.getAttribute('src')[7]
  const num2 = card2.firstElementChild.getAttribute('src')[7]
  
  if (num1 === num2) {
    link(card1, card2)
    card1.className = card2.className = 'matched'
    sound.play()
  }
} */