import P5 from 'p5'
require('../index.js')
import View from './View'
import TextBox from './TextBox'
import tofi from './tofiVisualiser'
import * as EntryPoint from "../index"
import { createMachine } from './StateMachine.js'


class ExamView extends View {

    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        //this.statesMachine = Object.create(machine);
        this.statesMachineNew = this.stateMachine();
        this.totalSensors = this.params.getNoActive()
        this.currentSensor = 0
        this.textBox = new TextBox(this.p,'Please put your TOFI-TRAINER on',0,0,p.width/2,p.height/2)
        this.counterTextBox = new TextBox(this.p,'0',0,0,p.width/4,p.height/4)
        this.counterTextBox.settextSize(40)
        this.counter = 10
        // speed
        this.speedTotal  = 0;
        this.tofiTrainer = new tofi(p,p.width/2, p.height*.6, p.width*0.5,p.height*0.6, this.params, this.Tone)
        this.addBtn(function(){
            //this.statesMachine.dispatch('next')
            let state = this.statesMachineNew.value
            state = this.statesMachineNew.transition(state, 'next')
            this.counter = Math.floor(this.p.millis() / 1000) + 7
        }.bind(this),"I am ready!")
    }

    draw () {
        this.p.clear()
        if (this.statesMachineNew.value === 'intro') {
            this.intro()
        } else if (this.statesMachineNew.value === 'dexterity') {
            this.dexterity()
        } else if (this.statesMachineNew.value === 'speed') {
            this.speed()
        } if (this.statesMachineNew.value === 'endurance') {
            this.intro()
        }
    }

    intro() {
        this.p.fill(255);
        this.textBox.display(this.p.width/2, this.p.height*.2)
        this.tofiTrainer.display(this.currentSensor)
    }

    dexterity() {
        this.p.fill(255);
        this.textBox.display(this.p.width/2, this.p.height*.2)
        this.tofiTrainer.display(this.currentSensor)

    }
    speed() {
        this.p.fill(255);
        this.textBox.display(this.p.width/2, this.p.height*.2)
        this.tofiTrainer.display(this.currentSensor)
        /*
        if (this.p.millis()-this.counter> 2000 ) {
            if (this.currentSensor < this.totalSensors - 1) {
                this.currentSensor++
                this.counter = this.p.millis()
            } else {
                this.currentSensor = 0;
            }
        }
         */
        let threshold = 0.5
        let currentSensorValue = this.params.getNormalisedActive(this.currentSensor)

        if (currentSensorValue > threshold) {
            if (this.currentSensor < this.totalSensors - 1) {
                this.currentSensor = this.p.floor(this.p.random(this.totalSensors))
                // keep a runnong count of time to reach points.
                this.speedTotal += this.p.millis()-this.counter
                this.counter = this.p.millis()
            } else {
                this.currentSensor = 0;
            }
        }
    }

    addBtn(callback, label) {
        const containerElement = document.getElementById('p5-container')
        let div = document.createElement("div");
        div.style.cssText = 'position:absolute; top:85%; left:50%; transform:translate(-50%, -50%);'
        let btn = document.createElement("ons-button")
        btn.innerHTML = label
        btn.onclick = function () {
            containerElement.removeChild(div)
            callback()
        }.bind(this);
        div.appendChild(btn);
        containerElement.appendChild(div)
    }


    stateMachine() {
        let binding = this
        const FSM = createMachine({
            initialState: 'intro',
            intro: {
                actions: {
                    onEnter() {

                        console.log('intro: onEnter')
                    },
                    onExit() {
                        console.log('intro: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'dexterity',
                        action() {
                            console.log('transitionig to Dexterity')
                        },
                    },
                },
            },
            dexterity: {
                actions: {
                    onEnter() {
                        binding.textBox.setText('Move your tongue to the areas indicated')
                        binding.addBtn(function () {
                            let state = this.statesMachineNew.value
                            state = this.statesMachineNew.transition(state, 'next')
                            this.counter = Math.floor(this.p.millis() / 1000) + 7
                        }.bind(binding), "next")
                        console.log('Dexterity: onEnter')
                    },
                    onExit() {
                        console.log('Dexterity: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'speed',
                        action() {
                            console.log('transitionig to Speed')
                        },
                    },
                },
            },
            speed: {
                actions: {
                    onEnter() {
                        binding.counter = binding.p.millis()
                        binding.textBox.setText('Move your tongue to the areas indicated as fast as possible.')
                    },
                    onExit() {
                        console.log('Speed: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'strength',
                        action() {
                            console.log('transition to Strength')
                        },
                    },
                },
            },
            strength: {
                actions: {
                    onEnter() {
                        binding.textBox.setText('Press the sensor indicated with your maximum strength until the counter is finished')
                        console.log('calibrating: onEnter')
                    },
                    onExit() {
                        console.log('Strength: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'endurance',
                        action() {
                            console.log('transition to Endurance')
                        },
                    },
                },
            },
            endurance: {
                actions: {
                    onEnter() {
                        binding.textBox.setText('Press the sensor indicated with your maximum strength until the counter is finished')
                    },
                    onExit() {
                        console.log('Endurance: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'fatigue',
                        action() {
                            console.log('transition to Fatigue')
                        },
                    },
                },
            },
            fatigue: {
                actions: {
                    onEnter() {
                    },
                    onExit() {
                        console.log('Fatigue: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'end',
                        action() {
                            console.log('transition to end')
                        },
                    },
                },
            },
            recovery: {
                actions: {
                    onEnter() {
                    },
                    onExit() {
                        console.log('recovery: onExit')
                    },
                },
                transitions: {
                    next: {
                        target: 'end',
                        action() {
                            console.log('transition to end')
                        },
                    },
                },
            },
            end: {
                actions: {
                    onEnter() {
                        console.log('end: onEnter')
                    },
                    onExit() {
                        console.log('end: onExit')
                    },
                },
            },
        })
        return FSM
    }
}
export default ExamView

