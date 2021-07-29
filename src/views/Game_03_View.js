import P5 from 'p5'
import View from './View'
import Meta from './utils/Meta.js'
import tofi from './tofiVisualiser'

class Game_03_View extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        this.myMeta = new Meta(p, p.width, p.height, params, Tone, this.Timer.envelopes)
       // this.tofiTrainer = new tofi(p,0.5, 0.5, p.width*0.8,p.height*0.8, this.params, this.Tone)
    }
    draw () {
        this.p.clear()
        // this.tofiTrainer.display()
        this.myMeta.update()
    }
}
export default Game_03_View