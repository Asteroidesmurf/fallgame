import Game from './components/game'

// Setup canvas.
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Set canvas dimensions.
let canvasWidth = 960
let canvasHeight = 600

canvas.width = canvasWidth
canvas.height = canvasHeight

// Start app.
const game = new Game(ctx, canvasWidth, canvasHeight)
