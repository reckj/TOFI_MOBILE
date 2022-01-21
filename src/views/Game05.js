import P5 from 'p5'
import View from './View'
import TiltBoard from "./utils/TiltBoard.js";
import { addBtn } from "./utils/DomButton.js";
import { Player } from 'tone';


class Game05 extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params);
        this.tiltboard = new TiltBoard(p, p.width, p.height, params, Tone, this.Timer.envelopes);
    }

    draw () {
        this.p.clear();
        // this.Tone.start();

        if (this.tiltboard.gameState == "intro") {
            this.tiltboard.initializeGame();
            this.tiltboard.gameState = "maze"
        }
        else if (this.tiltboard.gameState == "maze") {
            this.tiltboard.update();
            this.tiltboard.draw();
        }
        else if (this.tiltboard.gameState == "won") {

        }
        else if (this.tiltboard.gameState == "lost") {

        }
        else {
            this.tiltboard.gameState == "intro"
        }
    }
}
export {Game05}