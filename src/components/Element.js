export default class Element {
  ctx = null
  id = null
  x = null
  y = null
  dy = null
  imgSrc = null
  image = null
  evil = null
  bonus = null

  constructor(ctx, id, x, y, dy, item) {
    this.ctx = ctx
    this.id = id
    this.x = x
    this.y = y
    this.dy = dy
    this.imgSrc = item[0]
    this.evil = item[1]
    this.bonus = item[2]
    this.image = null
  }

  init() {
    this.image = new Image()

    this.image.onload = function () {
      this.draw = function () {
        this.ctx.drawImage(this.image, this.x, this.y)
      }
    }.bind(this)

    this.image.src = this.imgSrc
  }

  update() {
    this.y += this.dy
    if (typeof this.draw === 'function') {
      this.draw()
    }

  }
}