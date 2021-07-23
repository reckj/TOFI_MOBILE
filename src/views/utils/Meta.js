import Blob from './Blob.js'

class Meta {
  constructor (p, width, height, params) {
    this.params = params
    this.blobs = []
    this.width = width
    this.height = height
    for (let i = 0; i < 6; i++) {
      this.blobs.push(new Blob(p, Math.random(0, width), p.random(0, height)))
    }
  }

  update (p) {
    let sensorValues = this.params.getNormalisedValues()
    // let vOffset = p.windowHeight / 2 - visRadius
    // let hOffset = p.windowWidth / 2 - visRadius

    p.translate(p.width/2, p.height/2)
    for (let i = 0; i < this.blobs.length; i++) {
      //
      p.ellipse(this.blobs[i].x, this.blobs[i].y, this.blobs[i].r, this.blobs[i].r)
    //  this.blobs[i].draw()
      //
    }
    /*
        let img = p.createImage(this.height, this.width)
    img.loadPixels()
    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height; y += 1) {

        let sum = 0
        for (let i = 0; i < this.blobs.length; i++) {
          let xdif = x - this.blobs[i].x - (this.width / 2)
          let ydif = y - this.blobs[i].y - (this.height / 2)
          let d = p.sqrt((xdif * xdif) + (ydif * ydif))
          if (d <= this.blobs[i].r) {
            sum += 10 * this.blobs[i].r / d
          }
        }
        if (sum >= 200) {
          sum = Math.min(sum, 255)
          sum -= 200
          sum *= 4
          let i = (x + (y * this.width)) * 4
          img.pixels[i] = 255
          img.pixels[i + 1] = 254
          img.pixels[i + 2] = 254
          img.pixels[i + 3] = sum
        }
      }
    }
    img.updatePixels()


    // img.resize(this.width * 2, this.height * 2)
    p.image(img, (p.width - this.width) / 2, (p.height - this.height) / 2)
    // p.image(pg, -pg.width / 2, -pg.width / 2)

     */
    for (let i = 0; i < this.blobs.length; i++) {
      this.blobs[i].Xamp = sensorValues[0]*this.width*0.6
      this.blobs[i].Yamp = sensorValues[1]*this.height*0.6
      this.blobs[i].r = 30 + (sensorValues[2]) * 0.025
      this.blobs[i].speed = sensorValues[3]*0.015
      this.blobs[i].update(p)
    }
  }

  minMax (num, min, max) {
    const MIN = min || 1
    const MAX = max || 20
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
  }

  draw (p) {

  }
}
export default Meta
