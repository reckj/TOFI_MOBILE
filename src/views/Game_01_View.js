// import 'p5/lib/addons/p5.sound'
import Note from './Note'
import View from './View'

// a simple version of the "Simon" audio game using the Tofi Trainer
//todo: notes sound shorter when player controlling than when simon is
class Game_01_View extends View {
    constructor (p, Tone, Timer, params) {
        super(p, Tone, Timer, params)
        this.Notes = []
        this.interval = 700
        this.SimonSequencePlaying = false
        this.SimonSequence = []
        this.SimonSequenceLength = 4
        this.SimonSequenceIndex = 0
        this.midiNotes = [60, 62, 64, 67, 69, 72, 74] // C D E G A C
        this.colorPallet = [196, 330, 36, 159, 312]
        this.noSensors = 5
        this.visualWidth = this.p.windowWidth * 0.7
        this.isConnected = false
        this.demoMode = true
        // states
        this.GamePlayer = 0
        this.GameSimon = 1
        this.state = this.GamePlayer
        this.p.colorMode(this.p.HSB)
        this.p.blendMode(this.p.SCREEN)
        // p.textFont(myFont)
        this.p.textSize(p.width / 100)
        this.p.fill(255)
        this.p.noStroke()
        this.p.textAlign(this.p.CENTER, this.p.CENTER)
        this.setupSoundObjects()
        this.newSimonSequence()
        this.addPlayBtn()
    }

    draw () {
        // let newSensorValues = p.passSensorValues(sensorValues)
       this.p.clear()
        this.p.background(249, 60, 20, 10)
        if (this.state === this.GamePlayer) {
            this.drawGamePlayer(this.params)
        } else if (this.state === this.GameSimon) {
            this.p.background(30, 50, 10, 10)
            this.drawGameSimon()
        }
    }

    newSimonSequence () {
        this.SimonSequence = []
        for (let i = 0; i < this.SimonSequenceLength; i++) {
            this.SimonSequence.push(this.p.floor(this.p.random(this.noSensors)))
        }
    }

    drawGameSimon () {
        if (this.SimonSequence.length === 0) {
            this.newSimonSequence()
            console.log('this.newSimonSequence')
        }
        if (this.SimonSequencePlaying === false) {
            this.SimonSequencePlaying = true
            this.Timer.event = setTimeout(function () { this.playSequence() }.bind(this), this.interval)
        }
        for (let i = 0; i < this.noSensors; i++) {
            this.Notes[i].draw()
        }
    }
    playSequence () {
        if (this.SimonSequenceIndex < this.SimonSequenceLength) {
            this.releaseAllNotes()
            this.Notes[this.SimonSequence[this.SimonSequenceIndex]].trigger()
            this.Timer.event = setTimeout(function () { this.playSequence() }.bind(this), this.interval)
            this.SimonSequenceIndex++
        } else {
            this.SimonSequencePlaying = false
            this.SimonSequenceIndex = 0
            this.state = this.GamePlayer
        }
    }

    drawGamePlayer (params) {
        let sensorValues = params.getNormalisedValues()
        for (let i = 0; i < this.noSensors; i++) {
            this.Notes[i].draw()
            let sensorIndex = (sensorValues.length - 2) - i
            // let radius = p.map(sensorValues[i], 0, 16384, 10, spacing * 0.3)
            if (params.atThreshold(sensorIndex)) {
                if (this.Notes[i].trigger()) {
                    if (this.demoMode === false) {
                        this.checkSequence(i)
                    }
                }
            } else {
                 this.Notes[i].release()
            }
            this.p.stroke(255)
            // this.p.text(sensorValues[sensorIndex], this.Notes[i].x, this.p.height - 50)
        }
    }

    checkSequence (i) {
        if (this.SimonSequence.length > 0) {
            if (i === this.SimonSequence[this.SimonSequenceIndex]) {
                console.log('correct_' + this.SimonSequenceIndex + ' of' + this.SimonSequence.length)
                this.SimonSequenceIndex++
                if (this.SimonSequenceIndex >= this.SimonSequenceLength) {
                    // sequence won
                    this.Timer.event = setTimeout(function () { this.sequenceWon() }.bind(this), 500)
                }
            } else {
                console.log('incorrect')
                // repeat
                this.Timer.event = setTimeout(function () { this.sequenceLost() }.bind(this), 1000)
            }
        } else {
            console.log('no sequence')
        }
    }

    releaseAllNotes () {
        for (let i = 0; i < this.noSensors; i++) {
            this.Notes[i].release()
        }
    }

    sequenceWon () {
        console.log('sequence won')
        this.SimonSequenceIndex = 0
        this.newSimonSequence()
        this.state = this.GameSimon
    }

    sequenceLost () {
        this.SimonSequenceIndex = 0
        console.log('repeat:' + this.SimonSequence)
        this.state = this.GameSimon
    }

    addPlayBtn () {
        const containerElement = document.getElementById('p5-container')
        let div = document.createElement("div");
        div.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);'
        let btn = document.createElement("ons-button");
        // btn.onclick = "EntryPoint.toView({\'startgame\': true})\"
        btn.innerHTML = "StartGame";                   // Insert text
        btn.onclick = function () {
            containerElement.removeChild(div);
            this.startGame()
        }.bind(this);
        div.appendChild(btn);
        containerElement.appendChild(div);
    }
    startGame () {
        this.state = this.GameSimon
        this.demoMode = false;
    }
    setupSoundObjects () {
        // sound
        let initialOffsetX = (this.p.windowWidth - this.visualWidth) / 2
        let diameter = this.visualWidth / (this.noSensors / 2) // slightly overlaping
        let spacing = this.visualWidth / this.noSensors
        initialOffsetX += spacing / 2
        for (let i = 0; i < this.noSensors; i++) {
            this.Notes[i] = new Note(this.p, this.Tone, this.midiNotes[i], (spacing * i) + initialOffsetX, this.p.windowHeight / 2, diameter, this.colorPallet[i], this.Timer.envelopes)
        }
    }
    mouseClicked() {
        for (let i = 0; i < this.noSensors; i++) {
              this.Notes[i].trigger();
        }
    }
}
export default Game_01_View
