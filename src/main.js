import Game from './components/game'

// Setup canvas.
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Set canvas dimensions.
let canvasWidth = 800
let canvasHeight = 600

canvas.width = canvasWidth
canvas.height = canvasHeight

// Start app.
const game = new Game(ctx, canvasWidth, canvasHeight)
//



// Objects

// Animation Loop
function animate () {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = "20px Arial"
  ctx.fillStyle = "white"
  ctx.textAlign = "left"
  ctx.fillText("score: " + score, 10 , 25)

  if (Math.random() <= spawnChance) {
    generateElement()
  }
  
  elements.forEach(Element => {
    Element.update(elements)
  })

}

// init()
// animate()
