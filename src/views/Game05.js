import P5 from 'p5'
import View from './View'
//import Meta from './utils/Meta.js'
import TextBox from "./utils/TextBox";
import { addBtn } from "./utils/DomButton.js";

class Game05 extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
    }
    draw () {
        this.p.clear()
    }
}
export {Game05}