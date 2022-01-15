class Ball {
  constructor (p, x, y, Tone, envelopes) {
    this.p = p
    this.x = x
    this.y = y
    this.Tone = Tone
    let angle = p.random(0, 2 * p.PI)
    this.xspeed = p.random(2, 5) * Math.cos(angle)
    this.yspeed = p.random(2, 5) * Math.sin(angle)
    this.r = p.random(0, 1)
    this.rad = this.r*30
    this.Xangle = p.random(p.PI)
    this.Yangle = p.random(p.PI)
    this.speed = 0.003
    this.Xamp = p.random(120)
    this.Yamp = p.random(120)
    this.dx = 0
    this.dy = 0
    /*
    this.notes = ["C2", "E2", "G2", "A2",
      "C3", "D3", "E3", "G3", "A3", "B3",
      "C4", "D4", "E4", "G4", "A4", "B4", "C5"];
    */
    this.notes1 = ["F2"];
    this.notes2 = ["C3", "D3", "F3", "G3", "A3"];
    this.notes3 = ["D4", "F4", "G4", "A4"];
    this.notes4 = ["A4", "C5", "D5", "F5"];
    this.soundSetup(Tone,envelopes)
  }

  update (p) {
    this.Xangle += this.speed
    this.Yangle += this.speed
    this.x = this.p.sin(this.Xangle) * this.Xamp
    this.y = this.p.cos(this.Yangle) * this.Yamp
    // this.addXamp(0.1)
    // this.addYamp(0.1)
    this.move(this.x / this.p.width,  this.y/ this.p.height)
  }
  addXamp(Xamp) {
    this.Xamp *= 0.99
    this.Xamp += (Xamp * 0.01)
    //this.FX1.delayTime = Xamp*10
  }
  addYamp(Yamp) {
    this.Yamp *= 0.99
    this.Yamp += (Yamp * 0.01)
    //this.FX1.depth = Yamp*10
  }
  addSpeed(speed) {
    this.speed *= 0.99
    this.speed += (speed * 0.01)
  }
  addRadius(r) {
    this.rad *= 0.99
    this.rad += (r * 0.01)
    this.r = 30 + (this.rad * 400)
    //this.synth.volume.value = (-50*this.rad) -30
  }
  draw (p) {
    p.noFill()
    p.stroke(0)
    p.strokeWeight(4)
    p.ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }

  soundSetup(Tone, envelopes) {
    ////--Sound Setup Johannes--////
    //Control Variables
    //1
    let chorus1Speed = "16n";
    let chorus1DelayInterval = 4;
    let chorus1Depth = 0.05;
    let reverb1Decay = 4;
    let distortion1Wet = 0;

    //2
    let chorus2Speed = "16n";
    let chorus2DelayInterval = 4;
    let chorus2Depth = 0.05;
    let reverb2Decay = 4;

    //3
    let chorus3Speed = "16n";
    let chorus3DelayInterval = 4;
    let chorus3Depth = 0.05;
    let reverb3Decay = 4;
    let delay3Interval = "8n";
    let delay3Feedback = 0.3;
    let delay3Wet = 0.3;

    //4
    let chorus4Speed = "16n";
    let chorus4DelayInterval = 4;
    let chorus4Depth = 0.05;
    let reverb4Decay = 4;
    let delay4Interval = "8n";
    let delay4Feedback = 0.3;
    let delay4Wet = 0.3;

    //General
    let filterCutoff = 200;
    let filterResonance = 0;
    let volumeDry = -6;
    let volumeFX = -6;
    let bpmValue = 50;


    //initialize synths and FX's
    this.synth1 = new Tone.MonoSynth();
    this.synth2 = new Tone.MonoSynth();
    this.synth3 = new Tone.MonoSynth();
    this.synth4 = new Tone.MonoSynth();

    this.chorus1 = new Tone.Chorus(chorus1Speed, chorus1DelayInterval, chorus1Depth);
    this.chorus2 = new Tone.Chorus(chorus2Speed, chorus2DelayInterval, chorus2Depth);
    this.chorus3 = new Tone.Chorus(chorus3Speed, chorus3DelayInterval, chorus3Depth);
    this.chorus4 = new Tone.Chorus(chorus4Speed, chorus4DelayInterval, chorus4Depth);

    this.reverb1 = new Tone.Reverb(reverb1Decay);
    this.reverb2 = new Tone.Reverb(reverb2Decay);
    this.reverb3 = new Tone.Reverb(reverb3Decay);
    this.reverb4 = new Tone.Reverb(reverb4Decay);

    this.pingpongDelay3 = new Tone.PingPongDelay(delay3Interval, delay3Feedback);
    this.pingpongDelay4 = new Tone.PingPongDelay(delay4Interval, delay4Feedback);

    this.filter = new Tone.Filter(filterCutoff, "lowpass");

    this.distortion1 = new Tone.Distortion(distortion1Wet);

    this.volDry = new Tone.Volume(volumeDry);
    this.volFX = new Tone.Volume(volumeFX);


    //set parameters for synths and FX's

    //route signals

    //start audio Objects

    //set arpeggios

    /*
    // SYNTH
    // let note = this.notes[Math.floor(Math.random()* this.notes.length)];
    let note = this.notes[0]
    this.synth = new Tone.Oscillator({
      partials: [3, 2, 1],
      type: "custom",
      frequency: Tone.Midi(note).toFrequency(),
      volume: -40,
    }).toDestination().start();

    this.FX1 = new Tone.Panner(1).toDestination();

    // AutoFilter - a filter modulation effect
    this.FX2 = new Tone.Chorus({
          frequency : 20 ,
          delayTime : 4.3,
          depth : 5 ,
          spread : 180
        }
    ).toDestination().start();
    */
                  /*
                  // Tremolo - an amplitude modulation effect
                  this.FX3 = new Tone.PitchShift(0.1).toDestination();
                  this.osc = new Tone.Oscillator({
                    volume: -30,
                    type: "sine2",
                    frequency: "E2"
                  })

                  */
                  // this.osc.connect(this.tremolo)
                  //this.synth.connect(this.FX1)

                  // this.synth.connect(this.FX3)
                  //this.synth.triggerAttack(note);
    /*
    this.synth.connect(this.FX2)
    this.synth.connect(this.FX1)
    envelopes.push(this.synth)
    */
  }
  move(x, y) {
    x = this.p.constrain(x, 0, 1)
    y = this.p.constrain(y, 0, 1)
    // use the x and y values to set the note and vibrato
    //const note = this.notes[Math.round(y * (this.notes.length - 1))];
    //this.synth.frequency.value =  this.Tone.Midi(note).toFrequency()
    //this.FX1.pan.rampTo(1+(x*-2), 0.01);
  }
  
}
export default Ball
