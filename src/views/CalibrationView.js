import P5 from 'p5'
import View from './View'
import tofi from './tofiVisualiser'


class CalibrationView extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        this.totalSensors = 5
        this.currentSensor = -1
        this.tofiTrainer = new tofi (p,p.width/2, p.height/2, p.width*0.5, this.params, this.Tone)
        this.addBtn(function(){
        }.bind(this),"I am ready!")
    }

    draw () {
        this.p.clear()
        if (this.currentSensor < 0) {

        } else if(this.currentSensor >= this.totalSensors) {
        } else {
        //if (this.currentSensor-1 < this.totalSensors) {
        this.tofiTrainer.display(this.currentSensor);
        }
    }

    addBtn(callback, label) {
        const containerElement = document.getElementById('p5-container')
        let div = document.createElement("div");
        div.style.cssText = 'position:absolute; top:80%; left:50%; transform:translate(-50%, -50%);'
        let btn = document.createElement("ons-button");
        // btn.onclick = "EntryPoint.toView({\'startgame\': true})\"
        btn.innerHTML = label;                   // Insert text
        btn.onclick = function () {
            containerElement.removeChild(div);
            callback()
            this.currentSensor++
            if (this.currentSensor < this.totalSensors) {
                this.addBtn(function(){
                }.bind(this),"next")
            }
        }.bind(this);
        div.appendChild(btn);
        containerElement.appendChild(div);
    }

    startGame () {
        this.state = this.GameSimon
        this.demoMode = false;
    }
}
export default CalibrationView