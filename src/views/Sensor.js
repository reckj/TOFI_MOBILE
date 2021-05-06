import P5 from 'p5'
//import 'p5/lib/addons/p5.sound'
//import * as Tone from 'tone'

class Sensor {
    constructor (maxRadius, P, Tone, params, ID) {
        this.params = params
        this.p = P
        this.ID = ID
        this.min = this.params.getMin(this.ID);
        this.max= this.params.getMax(this.ID);
        this.maxRadius = maxRadius;
        }

    draw (x,y) {
        let SensorValue = this.params.setSensorValues(this.ID);
        let radius = 10+p.abs(map(SensorValue,this.min, this.max, 0, this.maxRadius))
        this.p.fill(100,100,100)
        this.p.ellipse(x,y,radius,radius)
    }
}
export default Sensor
