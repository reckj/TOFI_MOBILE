import P5 from 'p5'

class Sensor {
    constructor (p, radius, Tone) {
        this.p = p
        this.radius = radius;
        this.osc = null
        this.Tone = Tone
        this.hiden = false
        this.color = this.p.color(180, 255, 120);
        }

    display(x,y, normalisedValue, threshold) {
        let newRadius = this.p.map(normalisedValue,0.0, 1.0, this.radius*0.1, this.radius)
        // this.tone(normalisedValue)

        if (this.hiden) {
            this.p.fill(255,255,255,100)
            this.p.stroke(255)
            this.p.strokeWeight(1)
        } else {
            this.p.fill(255,0,0,100)
            this.p.stroke(255,0,0)
            this.p.strokeWeight(3)
        }
        //outline
        this.p.ellipse(x,y,this.radius+2,this.radius+1)
        if (threshold) {
            this.p.fill(this.color)
        } else {
            this.p.fill(180, 255, 120)
        }
        this.p.noStroke()
        this.p.ellipse(x,y,newRadius,newRadius)

    }
    hide(bool) {
        this.hiden = bool
        if(bool) {
            this.color = this.p.color(255,255,255);
        } else {
            this.color = this.p.color(100, 255, 120);
        }
    }
    tone(normalisedValue) {
        if (normalisedValue>0 && this.osc == null) {
            this.osc = new this.Tone.Oscillator("20", "sine").toDestination().start();
            this.osc.partialCount = 3
        } else if (this.osc != null){
            // Frequency in Hz.
            // Set initial value. (you can use .value=freq if you want)
            this.osc.frequency.value = this.p.map(normalisedValue,0.0, 1.0, 30, 500)
        } else if (normalisedValue<0.2 && this.osc != null) {
            this.osc.stop()
        }
    }
}
export default Sensor
