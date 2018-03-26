import Element from './Element'
import { randomArrayItem, numberBetween } from './Utilities'

export default class Game {

	canvas = {
    ctx: null,
    width: null,
    height: null
  }

  images = [
  'images/icon.png',
  'images/icon.png',
  'images/icon.png',
  'images/smiley.gif'
	]

  canvas = {
    ctx: null,
    width: null,
    height: null
  }

  mousePosition = {
    x: null,
    y: null
  }
  
  elements = []
	score = null
	spawnChance = 0.03
	id = null

  constructor (ctx, initialWidth, initialHeight) {
    this.canvas.ctx = ctx
    this.mousePosition.x = initialWidth / 2
    this.mousePosition.y = initialHeight / 2
    this.id = 0

    this.registerEventListeners()

    this.init()
    this.animate()
  }

	addScore (points) {
  		this.score += points
	}

	generate() {
		if (Math.random() < spawnChance) {
    	const x = numberBetween(10, canvas.width - 100)
    	const y = -100
    	const dy = 3

    	img = randomArrayItem(images)

    	element = new Element(this.canvas.ctx, this.id, x, y, dy, img)
    	element.init()

    	this.id++
  
    	this.elements.push(element)
    }
	}

  animate () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.elements.forEach(element => {
      element.update()
    })

    generate();

    requestAnimationFrame(this.animate.bind(this))
  }

  checkHit(x, y) {
		this.elements = this.elements.filter((element) => {
		    if (
		      x >= element.x &&
		      x <= element.x + element.image.width &&
		      y >= element.y &&
		      y <= element.y + element.image.height
		    ) {
		      points = this.canvas.height - element.y
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

}
