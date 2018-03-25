// Initial Setup
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// variables
const spawnChance = 0
let score = 0
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

canvas.width = 800
canvas.height = 600

images = [
  'images/icon.png',
  'images/icon.png',
  'images/icon.png',
  'images/smiley.gif'
]

// Event Listeners
addEventListener('click', event => {
  // TODO: Handle offset of canvas.
  mouse.x = event.clientX
  mouse.y = event.clientY
  // When mouse click is over position of item do something

  elements = elements.filter((element) => {
    if (
      mouse.x >= element.x &&
      mouse.x <= element.x + element.image.width &&
      mouse.y >= element.y &&
      mouse.y <= element.y + element.image.height
    ) {
      points = 400 - element.y
      addScore(points)

      return false
    }

    return true
  })

  //if mouse x and mouse y are within object dimensions
  //loop over objects, compare mouse x and y with object x and y + size
  // calculate points by subtracting y from max points

})

// Helper Functions
function randomIntFromRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addScore (points) {
  score += points
}

// Objects
function Element (x, y, dy, imgSrc) {
  // TODO: Give elements an (unique, duh...) id.

  this.x = x
  this.y = 200
  this.dy = 0
  this.imgSrc = imgSrc
  this.image = null

  this.init = function () {
    this.image = new Image()

    this.image.onload = function () {
      this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.fillRect(this.x, this.y, this.image.width, this.image.height)
      }
    }.bind(this)

    this.image.src = this.imgSrc
  }

  this.update = function () {
    // TODO: Remove items that have moved off screen.

    this.y += this.dy
    if (typeof this.draw === 'function') {
      this.draw()
    }

  }
}

var elements

function generateElement () {
  var x = randomIntFromRange(10, canvas.width - 20)
  var y = -100
  var dy = 10
  var imgSrc = images[randomIntFromRange(0, images.length - 1)]

  element = new Element(x, y, dy, imgSrc)
  element.init()

  elements.push(element)
}

function init () {
  elements = []
  generateElement()
  generateElement()
  generateElement()
}

// Animation Loop
function animate () {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (Math.random() <= spawnChance) {
    generateElement()
  }

  elements.forEach(Element => {
    Element.update(elements)
  })
}

init()
animate()