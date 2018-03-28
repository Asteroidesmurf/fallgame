import Element from './Element'
import Explosion from './Explosion'

import { randomArrayItem, numberBetween } from './Utilities'

export default class Game {
	canvas = {
    ctx: null,
    width: null,
    height: null
  }
  // defines items: image source, evil, bonus
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
	sounds = {
		normal: "src/sounds/normal.mp3",
		evil: "src/sounds/bad.mp3",
		bonus: "src/sounds/bonus.mp3"
	}

  elements = []
  explosions = []
	score = null
	spawnChance = 0.015
	id = null
	startTime = Date.now()
	time = null
	playTime = null
	maxElementSize = null
	background = new Image()
	staticBackground = new Image()

  constructor (ctx, canvasWidth, canvasHeight) {
    this.canvas.ctx = ctx
    this.canvas.width = canvasWidth
    this.canvas.height = canvasHeight
    this.id = 0
    this.score = 0
    this.maxElementSize = 100
    this.playTime = 3
    this.time = this.playTime
		this.evilSound = new this.sound(this.sounds.evil)
		this.bonusSound = new this.sound(this.sounds.bonus)
    this.normalSound = new this.sound(this.sounds.normal)
    
    this.backgroundOffset = {
    	x: 0,
    	y: -514
    }
    this.backgroundVelocity = {
    	x: 1,
    	y: 0.4
    }

    this.registerEventListeners()
    this.init()
    this.animate()
  }

  // Function for adding score
	addScore (points, multiplier) {
  		this.score += points
	}

	// Function for creating and playing sound elements
	sound (src) {
    this.sound = document.createElement("audio")
    this.sound.src = src
    this.sound.setAttribute("preload", "auto")
    this.sound.setAttribute("controls", "none")
    this.sound.setAttribute("type", "mp3")
    this.sound.style.display = "none"
    document.body.appendChild(this.sound)
    this.play = function() {
    		this.sound.currentTime = 0;
        this.sound.play()
    }
	}

	timer () {
		let elapsed =((Date.now() - this.startTime) / 1000)
		this.time = (this.playTime - elapsed).toFixed(1)
	}

	// Function for generation of elements
		// contains static variables for:
		// spawn y position (y)
		// fall speed (dy)
		//
		// always keeps 10 px clear of sides of canvas
	generate() {
		if (Math.random() < this.spawnChance && this.elements.length < 2) {
    	const x = numberBetween(10, this.canvas.width - (this.maxElementSize + 10))
    	const y = -100
    	const dy = 3
    	const item = randomArrayItem(this.items)

    	const element = new Element(this.canvas.ctx, this.id, x, y, dy, item)
    	element.init()

    	this.id++
    	this.elements.push(element)
    }
	}

	// Function to check if element is hit and handles follow up
  checkHit(x, y) {
		this.elements = this.elements.filter((element) => {
    	// Calculates points to be added or subtracted
    	const points = this.canvas.height - element.y
	    // checks hit
	    if (x >= element.x &&
	      x <= element.x + element.image.width &&
	      y >= element.y &&
	      y <= element.y + element.image.height) {
	    	
	    	// if element is evil
	    	if (element.evil) {
	    		this.addScore(-points)
	    		this.evilSound.play()
 	    		this.explosions.push(new Explosion(this.canvas.ctx, this.canvas.width, this.canvas.height))
	    	} 
	    	// else if sound has bonus
	    	else if (element.bonus) {
	      	this.addScore(points * 2)
	    		this.bonusSound.play()
	    	} 
	    	// else item is normal
	    	else {
	      	this.addScore(points)
	    		this.normalSound.play()
	    	}

	      return false
	    }
	    return true
  	})
  }

  // Registers eventlisteners
  registerEventListeners () {
    addEventListener('click', event => {
      this.mousePosition.x = event.offsetX
      this.mousePosition.y = event.offsetY

      this.checkHit(this.mousePosition.x, this.mousePosition.y)
		})
	}

	// Initialises game by clearing elements array and setting id to 0
	init() {
	  this.elements = []
  	this.id = 0
	}

	// Handles animation of canvas
  animate () {
	  	if(this.time > 0) {
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
	  	this.canvas.ctx.fillText("Score: " + this.score, 10 , 25)
	    
	    // draws timer next to score
	    this.timer()
	    this.canvas.ctx.font = "20px Arial"
			this.canvas.ctx.fillStyle = "white"
	  	this.canvas.ctx.textAlign = "left"
	  	this.canvas.ctx.fillText("Time: " + this.time, 150 , 25)

	  	// draws the falling elements
	    this.elements.forEach(element => {
	      element.update()
	    })
	  	
	  	// draws explosions
	    this.explosions.forEach(explosion => {
	      explosion.update()
	    })

	    // generates new elements
	    this.generate()

	    // removes elements that are beyond the edge of the canvas
	    this.elements = this.elements.filter(element => element.y < this.canvas.height)

	    // removes explosions that are done
	    this.explosions = this.explosions.filter(explosion => explosion.lifetimeLeft > 0)

	    // calls animation when next frame is ready
	    requestAnimationFrame(this.animate.bind(this))
	  }	else {
	  	// Insert end of game screen below
	  }
  }

}
