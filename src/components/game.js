import Element from './Element'
import { randomArrayItem, numberBetween } from './Utilities'

export default class Game {

	canvas = {
    ctx: null,
    width: null,
    height: null
  }

  images = [
  'src/images/icon.png',
  'src/images/icon.png',
  'src/images/icon.png',
  'src/images/smiley.gif'
	]

  mousePosition = {
    x: null,
    y: null
  }

  elements = []
	score = null
	spawnChance = 0.015
	id = null

  constructor (ctx, canvasWidth, canvasHeight) {
    this.canvas.ctx = ctx
    this.canvas.width = canvasWidth
    this.canvas.height = canvasHeight
    this.id = 0
    this.score = 0

    this.registerEventListeners()

    this.init()
    this.animate()
  }

	addScore (points) {
  		this.score += points
	}

	generate() {
		if (Math.random() < this.spawnChance && this.elements.length < 2) {
    	const x = numberBetween(10, this.canvas.width - 100)
    	const y = -100
    	const dy = 3
    	const img = randomArrayItem(this.images)

    	const element = new Element(this.canvas.ctx, this.id, x, y, dy, img)
    	element.init()

    	this.id++
  
    	this.elements.push(element)
    }
	}

  checkHit(x, y) {
		this.elements = this.elements.filter((element) => {
		    if (
		      x >= element.x &&
		      x <= element.x + element.image.width &&
		      y >= element.y &&
		      y <= element.y + element.image.height
		    ) {
		      const points = this.canvas.height - element.y
		      this.addScore(points)

		      return false
		    }
		    return true
  	})
  }

  registerEventListeners () {
    addEventListener('click', event => {
      this.mousePosition.x = event.clientX
      this.mousePosition.y = event.clientY

      this.checkHit(this.mousePosition.x, this.mousePosition.y)
		})
	}

	init() {
	  this.elements = []
  	this.id = 0
	}

  animate () {
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    this.canvas.ctx.font = "20px Arial"
		this.canvas.ctx.fillStyle = "white"
  	this.canvas.ctx.textAlign = "left"
  	this.canvas.ctx.fillText("score: " + this.score, 10 , 25)
    
    this.elements.forEach(element => {
      element.update()
    })

    this.generate()

    this.elements = this.elements.filter(element => element.y < this.canvas.height)

    requestAnimationFrame(this.animate.bind(this))
  }
}
