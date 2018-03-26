import Element from './Element'
import { randomArrayItem, numberBetween } from './Utilities'

export default class Game {

	canvas = {
    ctx: null,
    width: null,
    height: null
  }
  // defines items: source, evil, bonus
  items = [
  ['src/images/item-bomb.png', true, false],
  ['src/images/item-cadeau.png', false, true],
  ['src/images/item-wolk.png',  false, true],
  ['src/images/item-wishlamp.png',  false, true],
  ['src/images/item-couch.png',  false, false],
  ['src/images/item-fireplace.png',  false, false],
  ['src/images/item-table.png',  false, false],
  ['src/images/item-window.png',  false, false]
	]

  mousePosition = {
    x: null,
    y: null
  }
	backgroundVelocity = {
		x: null,
		y: null
	}
	backgroundOffset = {
		x: null,
		y: null
	}

  elements = []
	score = null
	spawnChance = 0.015
	id = null
	background = new Image()
	staticBackground = new Image()

  constructor (ctx, canvasWidth, canvasHeight) {
    this.canvas.ctx = ctx
    this.canvas.width = canvasWidth
    this.canvas.height = canvasHeight
    this.id = 0
    this.score = 0
    this.backgroundOffset = {
    	x: 0,
    	y: -514
    }
    this.backgroundVelocity = {
    	x: 1,
    	y: 0.4
    } // 5 pixels per frame

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
    	const item = randomArrayItem(this.items)

    	const element = new Element(this.canvas.ctx, this.id, x, y, dy, item)
    	element.init()

    	this.id++
  
    	this.elements.push(element)
    }
	}

  checkHit(x, y) {
		this.elements = this.elements.filter((element) => {
    	const points = this.canvas.height - element.y
	    if (x >= element.x &&
	      x <= element.x + element.image.width &&
	      y >= element.y &&
	      y <= element.y + element.image.height) {
	    	if (element.evil) {
	    		this.addScore(-points)	
	    	} else if (element.bonus) {
	      	this.addScore(points * 2)
	    	} else {
	      	this.addScore(points)
	    	}

	      return false
	    }
	    return true
  	})
  }

  registerEventListeners () {
    addEventListener('click', event => {
      this.mousePosition.x = event.offsetX
      this.mousePosition.y = event.offsetY

      this.checkHit(this.mousePosition.x, this.mousePosition.y)
		})
	}

	init() {
	  this.elements = []
  	this.id = 0
	}

  animate () {
    // clears background
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  	
  	// sets source of background images 
  	this.background.src = 'src/images/moving_bg.png'
  	this.staticBackground.src = 'src/images/game_bg.png'
  	// controls background movement
  	if (this.canvas.width + this.backgroundOffset.x < 2528) {
  		this.backgroundOffset.x += this.backgroundVelocity.x
  	}
  	if (this.backgroundOffset.y < -200) {
  		this.backgroundOffset.y += this.backgroundVelocity.y
  	} 
  	// draws moving background
  	this.canvas.ctx.save()
  	this.canvas.ctx.translate(-this.backgroundOffset.x, this.backgroundOffset.y)
  	this.canvas.ctx.drawImage(this.background, 0, 0)
    this.canvas.ctx.restore()

    // draws static background
    
    this.canvas.ctx.drawImage(this.staticBackground, 0, 0)

    // draws score in upper left corner
    this.canvas.ctx.font = "20px Arial"
		this.canvas.ctx.fillStyle = "white"
  	this.canvas.ctx.textAlign = "left"
  	this.canvas.ctx.fillText("score: " + this.score, 10 , 25)
    

  	// draws the falling elements
    this.elements.forEach(element => {
      element.update()
    })

    // generates new elements
    this.generate()

    // removes elements that are beyond the edge of the canvas
    this.elements = this.elements.filter(element => element.y < this.canvas.height)

    // calls animation when next frame is ready
    requestAnimationFrame(this.animate.bind(this))
  }

}
