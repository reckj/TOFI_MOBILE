import P5 from 'p5'
require('../index.js')
import View from './View'
import tofi from './tofiVisualiser'
import * as EntryPoint from "../index";


class CalibrationView extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        this.totalSensors = this.params.getNoActive()
        this.currentSensor = -1
        this.maxValues= []
        this.minValues = []
        for (let i = 0; i<this.totalSensors;i++) {
            this.maxValues[i] = 0
            this.minValues[i] = 0xFFFF
        }
        this.countDown = 10
        this.tofiTrainer = new tofi(p,p.width/2, p.height/2, p.width*0.5,p.height*0.8, this.params, this.Tone)
        this.addBtn(function(){
        }.bind(this),"I am ready!")
    }

    draw () {
        this.p.clear()
        if (this.currentSensor < 0) {
            this.tofiTrainer.display();
        } else if(this.currentSensor >= this.totalSensors) {
            //saving and exiting
            for (let i = 0; i<this.totalSensors;i++) {
                this.params.setMin(i, this.minValues[i])
                this.params.setMax(i, this.maxValues[i])
            }
            this.params.save()
            EntryPoint.backButton()
        } else {
            // calibrating
            let currentSensorValue = this.params.getActive(this.currentSensor)
            for (let i = 0; i<this.totalSensors;i++) {
                let sensorValue = this.params.getActive(i)
                if (sensorValue < this.minValues[i]) {
                    this.minValues[i] = sensorValue;
                }
            }
            if (currentSensorValue > this.maxValues[this.currentSensor]) {
                this.maxValues[this.currentSensor] = currentSensorValue;
            }
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