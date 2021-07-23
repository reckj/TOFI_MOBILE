import P5 from 'p5'
import View from './View'
import Meta from './utils/Meta.js'

class Game_03_View extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        this.myMeta = new Meta(p, 200, 200, params)
    }
    draw () {
        this.p.clear()
        this.myMeta.update(this.p)
    }
}
export default Game_03_View