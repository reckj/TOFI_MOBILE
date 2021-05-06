import P5 from 'p5'
//import 'p5/lib/addons/p5.sound'
//import * as Tone from 'tone'

class Note {
  constructor (P, Tone, midiNote, x, y, diameter, color, envelopes) {
    this.p = P
    this.midiNote = midiNote
    this.NoteFlag = false // playing or notep
    this.envelope = new Tone.AmplitudeEnvelope({
              attack: 0.11,
              decay: 0.21,
              sustain: 0.5,
              release: 1.2,
     }).toDestination()

     this.oscillator = new Tone.Oscillator({
              partials: [3, 2, 1],
              type: "custom",
              frequency: Tone.Midi(this.midiNote).toFrequency(),
              volume: -8,
     }).connect(this.envelope).start()

    envelopes.push(this.envelope)
    this.HSBColor = color
     this.freq = 261
    //this.oscillator.freq(this.freq)// set frequency
    //this.oscillator.start() // start oscillating
    this.diameter = diameter
    this.amp = 0 // simulate amplitude
    this.x = x
    this.y = y
  }

  draw () {
    let offset = 0
    if (this.amp > 5) {
      this.amp *= 0.99
      let angle = this.p.millis() * (this.freq / 1000) * (this.p.PI * 2)
      offset = this.p.sin(this.p.radians(angle)) * this.amp
    } else {
      this.amp = 5
    }
    /*
     if (this.NoteFlag) {
        this.p.fill(this.HSBColor, 255, this.amp)
      } else {
        this.p.fill(this.HSBColor, 255, 5)
      }
    */
    this.p.fill(this.HSBColor, 255, this.amp)
    this.p.noStroke()
    this.p.ellipse(this.x, this.y + offset, this.diameter, this.diameter)
  }

  checkMouseOver () {
    // mouse check
    let dist = this.p.dist(this.x, this.p.height / 2, this.p.mouseX, this.p.mouseY)
    if (dist <= this.diameter / 4) {
      return true
    } else {
      return false
    }
  }

  trigger () {
    if (this.NoteFlag === false) {
      this.NoteFlag = true
      this.envelope.triggerAttack()
     // this.envelope.play()
      this.amp = 100
      return true
    }
  }

  release () {
    if (this.NoteFlag === true) {
      this.NoteFlag = false
      this.envelope.triggerRelease()
    }
  }
}
export default Note
