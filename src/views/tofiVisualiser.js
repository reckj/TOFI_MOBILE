import P5 from 'p5'

class tofiVisualiser {

    constructor (p, x, y, width) {
        this.p = p
        this.width = width
        this.sensorLocations = [{"x": 0.3, "y": 0.8},{"x": 0.5, "y": 0.8}, {"x": 0.5, "y": 0.33}, {"x": 0.5, "y": 0.55}, {"x": 0.7, "y": 0.8}]; //[{"x": 0.5, "y": 0.33}, {"x": 0.5, "y": 0.55}, {"x": 0.5, "y": 0.8}, {"x": 0.3, "y": 0.8}, {"x": 0.7, "y": 0.8}];
        this.x = x
        this.y = y
        // load and resize image
        this.img =  this.p.loadImage('./img/tofiTopDown.png', img => {
            this.height = img.height * (this.width / img.width)
            img.resize(this.width, this.height); // todo: this isn't resizing
        });
    }

    draw (params) {
        // draw from middle
        this.p.push();

        this.p.translate(this.x-(this.width/2), this.y-(this.height/2));
        let sensorValues = params.getNormalisedActive()
        for (let i = 0; i < sensorValues.length; i++) {
            let x = this.sensorLocations[i].x * this.width;
            let y = this.sensorLocations[i].y * this.height;
            if (sensorValues[i].theshold) {
                this.p.fill(0, 255, 120)
            } else {
                this.p.fill(180, 255, 120)
            }
            this.p.ellipse(x, y, 10+sensorValues[i].value*70)
        }
        this.p.image(this.img, 0, 0);
        this.p.pop();
    }
}
export default tofiVisualiser
