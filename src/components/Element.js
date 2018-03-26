export default class Element {
  ctx = null
  id = null
  x = null
  y = null
  dy = null
  imgSrc = null
  image = null

  constructor() {
    this.ctx = ctx
    this.id = id
    this.x = x
    this.y = y
    this.dy = dy
    this.imgSrc = imgSrc
    this.image = null
  }

  init() {
    this.image = new Image()

    this.image.onload = function () {
      this.draw = function () {
        ctx.drawImage(this.image, this.x, this.y)
      }
    }.bind(this)

    this.image.src = this.imgSrc
  }

  update() {
    this.y += this.dy
    if (typeof this.draw === 'function') {
      this.draw()
    }

    elements = elements.filter(element => element.y < canvas.height)
  }
}