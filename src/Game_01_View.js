import P5 from 'p5'
import View from './View'

class Game_01_View extends View {
    constructor (p) {
        super(p)
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.colorMode(p.HSB)
        p.blendMode(p.SCREEN)
    }

    draw (p, sensorValues, params) {
        p.clear()
        p.background(80, 120, 30)
        let size = p.sin(p.radians(p.frameCount))* p.width/2
        p.fill(40, 255, 120)
        p.ellipse(p.width / 2, p.height / 2, size,size)
    }
}
export default Game_01_View