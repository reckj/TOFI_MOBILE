import Ball from './Ball.js'
// metaball example based on work by Richard Bourne
// https://openprocessing.org/sketch/1229865

let ballCount = 11
// online shader editor http://editor.thebookofshaders.com/

let vertexShader = `
attribute vec3 aPosition;
varying vec2 vPos;
void main() {
  vPos = vec2(aPosition.x,aPosition.y);
	gl_Position = vec4(aPosition,1.0);
}
`;

let fragmentShader = `
precision lowp float; // set low float precision. lowp, mediump, highp
uniform vec2 dim;
uniform vec3 balls[${ballCount}];
varying vec2 vPos;

void main() {
	vec2 coord = ((vPos+1.0) / 2.0) * dim;

	float amplitude = 0.0;
	for (int i = 0; i < ${ballCount}; i++) {
		amplitude += exp(-1.0/balls[i].z * (pow(coord.x - balls[i].x,2.0) + pow(coord.y - balls[i].y,2.0)));
	}
	amplitude = amplitude / 4.0;
	// if (amplitude>1.0) {
	//  amplitude = 1.0;
	// }
	// todo: compare performance of clamp functions to conditionals 
	amplitude = clamp(amplitude,0.0,1.0);
	float alpha = 1.0;
	
	if (amplitude<0.2) {
	  alpha = 0.0;
	}
	
  gl_FragColor = vec4(amplitude,0.3,1.0-amplitude, alpha);
}
`;

let synthNotes = ["C2", "E2", "G2", "A2",
  "C3", "D3", "E3", "G3", "A3", "B3",
  "C4", "D4", "E4", "G4", "A4", "B4", "C5"];


class Meta {

  constructor (p, width, height, params, Tone, envelopes) {
    this.p = p
    this.params = params
    this.balls = []
    this.width = width
    this.height = height
    for (let i = 0; i < ballCount; i++) {
      this.balls.push(new Ball(p, Math.random()*this.width, p.random(0, height),Tone, envelopes))
    }
    this.density = 4 //p.displayDensity()
    this.pg = p.createGraphics(width, height, p.WEBGL)
    this.metaballsShader = this.pg.createShader(vertexShader, fragmentShader);
    //this.soundSetup(Tone,envelopes)
    // sound paramaters
    this.i = 0;
    this.j = 0;
    this.t = 0;
    this.u = 0;
    this.o = 0;
    //
  }

  //panner.frequency.value = parseFloat(e.target.value));
  update () {
    let sensorValues = this.params.getNormalisedActiveValues()
    //p.push()
    let centerW = this.width/2
    let centerH = this.height/2
    // p.translate(centerW, centerH)
    // todo: this is a very messy fix for cases with less than 5 sensors
    let modifier = [];
    modifier[0] = sensorValues[0]
    modifier[1] = sensorValues[0]
    modifier[2] = sensorValues[0]
    modifier[3] = sensorValues[0]
    modifier[4] = sensorValues[0]
    for(let i = 0; i<sensorValues.length;i++) {
        modifier[i] = sensorValues[i]
    }
    let averagePos = this.p.createVector(0, 0);
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].addXamp((modifier[3]+modifier[4])*(this.width))
      this.balls[i].addYamp((modifier[2]+modifier[4])*(this.height))
      this.balls[i].addRadius(modifier[1])
      this.balls[i].addSpeed(modifier[0]*0.5)
      this.balls[i].update()
      averagePos.add(this.balls[i].x, this.balls[i].y)
    }
    averagePos.div(this.balls.length)
    averagePos.div(this.width,this.height)
    let ballsUniformArray = [];
    for (const ball of this.balls) {
      ballsUniformArray.push((ball.x+centerW))
      ballsUniformArray.push((ball.y+centerH))
      ballsUniformArray.push(ball.r*100)
    }
    this.metaballsShader.setUniform("dim",[this.width,this.height]);
    this.metaballsShader.setUniform(`balls`, ballsUniformArray)
    this.render()
    this.p.image(this.pg, 0,0)
  }


  render () {
    this.pg.shader(this.metaballsShader); //Set active shader to metaballsShader
    this.pg.noStroke(); //Remove stroke around quad
    this.pg.quad(-1, -1, 1, -1, 1, 1, -1, 1); //Draw quad filling screen with currently active shader (metaballsShader)
  }

  minMax (num, min, max) {
    const MIN = min || 1
    const MAX = max || 20
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
  }

  draw (p) {

  }
}
export default Meta


