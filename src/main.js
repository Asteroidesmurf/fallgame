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
const game = new Game(ctx)
//




// Event Listeners


// let lastTime
// let accumulator = 0
// const millis = performance.now()
// const step = 1/60
// const callback = (millis) => {
//     if (lastTime) {
//         accumulator += (millis - lastTime) /1000;
//         while (accumulator > step) {
//             console.log('updating')
//             accumulator -= step
//         }
//         lastTime = millis
//     }
// }



// Objects

// function init () {
//   elements = []
//   id = 0
//   generateElement()
// }

// // Animation Loop
// function animate () {
//   requestAnimationFrame(animate)
//   ctx.clearRect(0, 0, canvas.width, canvas.height)
//   ctx.font = "20px Arial"
//   ctx.fillStyle = "white"
//   ctx.textAlign = "left"
//   ctx.fillText("score: " + score, 10 , 25)

//   if (Math.random() <= spawnChance) {
//     generateElement()
//   }
  
//   elements.forEach(Element => {
//     Element.update(elements)
//   })

// }

// init()
// animate()
