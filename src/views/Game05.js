import P5 from 'p5'
import View from './View'
import TiltBoard from "./utils/TiltBoard.js";
import { addBtn } from "./utils/DomButton.js";


class Game05 extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params);
        this.tiltboard = new TiltBoard(p, p.width, p.height, params, Tone, this.Timer.envelopes);
    }

    draw () {
        this.p.clear();
        this.tiltboard.update();
        this.tiltboard.draw();
        // p.background(80, 120, 30)
      //  this.tofiTrainer.display();
        
    }
}
export {Game05}