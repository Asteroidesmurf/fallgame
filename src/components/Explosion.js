export default class Element {
  ctx = null
  width = null
  height = null
  lifetime = 10
  lifetimeLeft = null

  constructor(ctx, width, height) {
    this.ctx = ctx
    this.width = width
    this.height = height
    this.lifetimeLeft = this.lifetime
  }


  update() {
    this.lifetimeLeft -= 1
    this.draw()
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.lifetimeLeft / this.lifetime;
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.restore();
  }
}