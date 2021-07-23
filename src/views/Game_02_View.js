import P5 from 'p5'
import View from './View'
import tofi from './tofiVisualiser'


class Game_02_View extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        this.tofiTrainer = new tofi (p,.5, .5, p.width*0.5,p.height*0.8, this.params, this.Tone)
    }
    draw () {
        this.p.clear()
        // p.background(80, 120, 30)
        this.tofiTrainer.display();
    }
}
export default Game_02_View