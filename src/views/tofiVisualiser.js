import P5 from 'p5'
import Sensor from './Sensor'

// a simple visualisation of the Tofi trainer, and sensor activation for guiding it's use in varous contexts

class tofiVisualiser {

    constructor (p, x, y, width, height, params, Tone) {
        this.p = p
        this.width = width
        this.height = height
        this.params = params
        this.Tone = Tone
        this.sensorLocations = [{"x": 0.3, "y": 0.8}, {"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.33}, {"x": 0.5, "y": 0.55}, {"x": 0.7, "y": 0.8}, {"x": 0.9, "y": 0.8}]; // todo: move these coordinates into local storage
        this.sensorDisplays = []
        this.x = x
        this.y = y
        // load and resize image
        this.img = this.p.loadImage('./img/tofiTopDown.png', img => {
            // fit and presserve aspect ratio pattern
            let ratio = (this.width / img.width)
            let newHeight = img.height * ratio
            if (newHeight < this.height) {
                this.height = newHeight
            } else {
                ratio = (this.height / img.height)
                this.width = img.width*ratio
            }
            img.resize(this.width, this.height); //
        });
    }

    display(option0,option1,option2,option3,option4, option5, option6) {
        let sensorValues = this.params.getNormalisedActiveValues()
        if (this.sensorDisplays.length < 1) {
            // add sensors if they don't exist already
            for (let i = 0; i < sensorValues.length; i++) {
                this.sensorDisplays[i] = new Sensor(this.p,this.width/7, this.Tone)
            }
        }
        // turn on and off sensor display
        if (arguments.length>0) {
            for (let i = 0; i < sensorValues.length; i++) {
                this.sensorDisplays[i].hide(true)
            }
            for (let i = 0, j = arguments.length; i < j; i++) {
                this.sensorDisplays[arguments[i]].hide(false)
            }
        }
        // draw from middle
        this.p.push();
        this.p.translate(this.x-(this.width/2), this.y-(this.height/2));
        this.p.image(this.img, 0, 0);
        for (let i = 0; i < sensorValues.length; i++) {
            // convert from normalised to cartesian coordinates
            let x = this.sensorLocations[i].x * this.width;
            let y = this.sensorLocations[i].y * this.height;
            this.sensorDisplays[i].display(x,y,sensorValues[i], 0.8)
            /*
            if (sensorValues[i].threshold) {
                this.p.fill(0, 255, 120)
            } else {
                this.p.fill(180, 255, 120)
            }
            this.p.ellipse(x, y, 10+sensorValues[i].value*70)
             */
        }
        this.p.pop();
    }
}
export default tofiVisualiser
