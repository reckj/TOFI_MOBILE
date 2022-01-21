import { Tone } from 'tone/build/esm/core/Tone';

const world = {
    gravity: 9.82,
    friction: 0.02,
    ballhardness: 0.7,
    angleScaling: 20,
    playerSensitivity: 0.005,
    collisionBoundary: 1.2,
    perspective: 0.3,
  }
  
  const board = {
    boardWidth: 200,
    boardHeight: 200,
    boardThickness: 50,
    angleX: 0,
    angleY: 0,
  }
  
  const player = {
    radius: 15,
    posX: 0,
    posY: 0,  // m
    posZ: 0,
    accX: 0,  // m/s^2
    accY: 0,
    speedX: 0,  // m/s
    speedY: 0,
    mass: 1,    // kg
    collision: false,
  }
  
  const winningArea = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 1,
    name: "winningArea",
  }

  const obstacle1 = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }
  
  const obstacle2 = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }

  const obstacle3 = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }
  
  const wallLeft = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }
  
  const wallRight = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }
  
  const wallFront = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }
  
  const wallBack = {
    posX: 0,
    posY: 0,
    width: 1,
    height: 1,
    thickness: 100,
  }

class TiltBoard {
    constructor(p, width, height, params, Tone, envelopes) {
        this.params = params;
        this.p = p;
        this.width = width;
        this.height = height;
        this.Tone = Tone;
        this.gameState = "intro";
        this.objectSetup();
        this.soundSetup(Tone);
        this.inputThreshold = 0.1;
        this.sphereTexture = this.p.loadImage('./img/sphere_texture_checkered.jpeg');
        this.p.colorMode(this.p.HSB);
        this.colorPallet = [196, 330, 36, 159, 312, 60, 250];
        this.colorwinningArea = this.p.color(this.colorPallet[4],255,255);
        this.colorWalls = this.p.color(this.colorPallet[6],255,70);
        this.colorBoard = this.p.color(this.colorPallet[0],255,355);
        this.colorObstacle1 = this.p.color(this.colorPallet[2],255,70);
        this.colorObstacle2 = this.p.color(this.colorPallet[2],255,100);
        this.colorObstacle3 = this.p.color(this.colorPallet[5],255,70);
    }

    soundSetup() {
      ////--Sound Setup Johannes--////
      //Control Variables
      //1
      let chorus1Speed = "16n";
      let chorus1DelayInterval = 4;
      let chorus1Depth = 0.05;
      let reverb1Decay = 1;
      let reverb1Wet = 0.3;
  
      //2
      let chorus2Speed = "16n";
      let chorus2DelayInterval = 4;
      let chorus2Depth = 0.05;
      let reverb2Decay = 1;
      let reverb2Wet = 0.3;
  
      //3
      let chorus3Speed = "16n";
      let chorus3DelayInterval = 4;
      let chorus3Depth = 0.05;
      let reverb3Decay = 1;
      let reverb3Wet = 0.3;
  
      //4
      let chorus4Speed = "16n";
      let chorus4DelayInterval = 4;
      let chorus4Depth = 0.05;
      let reverb4Decay = 1;
      let reverb4Wet = 0.3;
  
      //General
      let volumeDry = -8;
      let bpmValue = 80;
      
      this.Tone.start();
  
      this.synth1 = new this.Tone.MonoSynth();
      this.synth2 = new this.Tone.MonoSynth();
      this.synth3 = new this.Tone.MonoSynth();
      this.synth4 = new this.Tone.MonoSynth();
  
      this.chorus1 = new this.Tone.Chorus(chorus1Speed, chorus1DelayInterval, chorus1Depth).start();
      this.chorus2 = new this.Tone.Chorus(chorus2Speed, chorus2DelayInterval, chorus2Depth).start();
      this.chorus3 = new this.Tone.Chorus(chorus3Speed, chorus3DelayInterval, chorus3Depth).start();
      this.chorus4 = new this.Tone.Chorus(chorus4Speed, chorus4DelayInterval, chorus4Depth).start();
  
      this.reverb1 = new this.Tone.Reverb(reverb1Decay);
      this.reverb2 = new this.Tone.Reverb(reverb2Decay);
      this.reverb3 = new this.Tone.Reverb(reverb3Decay);
      this.reverb4 = new this.Tone.Reverb(reverb4Decay);
  
      this.volDry = new this.Tone.Volume(volumeDry);
  
  
      //set parameters for synths and FX's
      // Tone.Transport.bpm.value = bpmValue;
  
      this.reverb1.wet.value = reverb1Wet;
      this.reverb2.wet.value = reverb2Wet;
      this.reverb3.wet.value = reverb3Wet;
      this.reverb4.wet.value = reverb4Wet;
  
      this.synth1.filterEnvelope.attack = 0.2;
      //this.synth1.filter.frequency = 1000;
      this.synth1.envelope.attack = 0.5;
      this.synth1.envelope.decay = 0.0;
      this.synth1.envelope.sustain = 1;
      this.synth1.envelope.attackCurve = "linear";
      this.synth1.envelope.release = 0.8;
      this.synth1.oscillator.type = "triangle";
      this.synth1.volume.value = -2;
  
      this.synth2.filterEnvelope.attack = 0.2;
      //this.synth2.filter.frequency = 400;
      this.synth2.envelope.attack = 0.5;
      this.synth2.envelope.decay = 0.0;
      this.synth2.envelope.sustain = 1;
      this.synth2.envelope.attackCurve = "linear";
      this.synth2.envelope.release = 0.8;
      this.synth2.oscillator.type = "triangle";
      this.synth2.volume.value = -2;
  
      this.synth3.filterEnvelope.attack = 0.2;
      //this.synth3.filter.frequency = 400;
      this.synth3.envelope.attack = 0.5;
      this.synth3.envelope.decay = 0.0;
      this.synth3.envelope.sustain = 1;
      this.synth3.envelope.attackCurve = "linear";
      this.synth3.envelope.release = 0.8;
      this.synth3.oscillator.type = "sawtooth";
      this.synth3.volume.value = -2;
  
      this.synth4.filterEnvelope.attack = 0.2;
      //this.synth4.filter.frequency = 400;
      this.synth4.envelope.attack = 0.5;
      this.synth4.envelope.decay = 0.0;
      this.synth4.envelope.sustain = 1;
      this.synth4.envelope.attackCurve = "linear";
      this.synth4.envelope.release = 0.8;
      this.synth4.oscillator.type = "sawtooth";
      this.synth4.volume.value = -2;
  
  
      //route signals
      this.synth1.chain(this.chorus1, this.reverb1, this.volDry);
      this.synth2.chain(this.chorus2, this.reverb2, this.volDry);
      this.synth3.chain(this.chorus3, this.reverb3, this.volDry);
      this.synth4.chain(this.chorus4, this.reverb4, this.volDry);
      this.volDry.toDestination();

      this.Tone.start();
    }

    objectSetup () {
        if (this.height <= this.width){
          board.boardWidth = this.height * 1 / 3;
          board.boardHeight = board.boardWidth;
        }
        else {
          board.boardWidth = this.width * 2 / 3;
          board.boardHeight = board.boardWidth;
        }

        player.posX = - board.boardWidth / 200 * 85;
        player.posY = board.boardWidth / 200 * 85;

        winningArea.posX = board.boardWidth / 200 * 0;
        winningArea.posY = -board.boardWidth / 200 * 90;
        winningArea.width = board.boardWidth / 100 * 5;
        winningArea.height = board.boardWidth / 100 * 5;
        winningArea.thickness = 1;

        obstacle1.posX = board.boardWidth / 200 * 50;
        obstacle1.posY = -board.boardWidth / 200 * 10;
        obstacle1.width = board.boardWidth / 100 * 30;
        obstacle1.height = board.boardWidth / 100 * 4;

        obstacle2.posX = -board.boardWidth / 200 * 60;
        obstacle2.posY = board.boardWidth / 200 * 40;
        obstacle2.width = board.boardWidth / 100 * 8;
        obstacle2.height = board.boardWidth / 100 * 45;

        obstacle3.posX = - board.boardWidth / 200 * 30;
        obstacle3.posY = - board.boardWidth / 200 * 40;
        obstacle3.width = board.boardWidth / 100 * 30;
        obstacle3.height = board.boardWidth / 100 * 2;

        wallLeft.posX = -board.boardWidth / 2;
        wallLeft.posY = 0;
        wallLeft.width = 3;
        wallLeft.height = board.boardHeight;

        wallRight.posX = board.boardWidth / 2;
        wallRight.posY = 0;
        wallRight.width = 3;
        wallRight.height = board.boardHeight;

        wallFront.posX = 0;
        wallFront.posY = board.boardHeight / 2;
        wallFront.width = board.boardWidth;
        wallFront.height = 3;

        wallBack.posX = 0;
        wallBack.posY = -board.boardHeight / 2;
        wallBack.width = board.boardWidth;
        wallBack.height = 3;
    }

    drawPlayer () {
        // this.p.normalMaterial();
        this.p.texture(this.sphereTexture);
        this.p.push();
            this.p.translate(player.posX, player.posY, player.posZ + player.radius);
            this.p.push();
            // rotate ball
            this.p.rotateY(player.posX * 0.1);
            this.p.rotateX(player.posY * 0.1);
            this.p.sphere(player.radius);
            this.p.pop();
        this.p.pop();
    }

    drawBoard () {
        this.p.normalMaterial();
        this.p.push();
            this.p.translate(0, 0, -board.boardThickness / 2);
            this.p.translate(0, 0, 0);
            this.p.rotateX(-board.angleX * world.angleScaling);
            this.p.rotateY(board.angleY * world.angleScaling);
            this.p.fill(this.colorBoard);
            this.p.box(board.boardWidth, board.boardHeight, board.boardThickness);

        
            this.p.push();
            this.p.translate(obstacle1.posX, obstacle1.posY,0);
            this.p.fill(this.colorObstacle1);
            this.p.box(obstacle1.width, obstacle1.height, obstacle1.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(obstacle2.posX, obstacle2.posY,0);
            this.p.fill(this.colorObstacle2);
            this.p.box(obstacle2.width, obstacle2.height, obstacle2.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(obstacle3.posX, obstacle3.posY,0);
            this.p.fill(this.colorObstacle3);
            this.p.box(obstacle3.width, obstacle3.height, obstacle3.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallFront.posX, wallFront.posY,0);
            this.p.fill(this.colorWalls);
            this.p.box(wallFront.width, wallFront.height, wallFront.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallBack.posX, wallBack.posY,0);
            this.p.fill(this.colorWalls);
            this.p.box(wallBack.width, wallBack.height, wallBack.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallLeft.posX, wallLeft.posY,0);
            this.p.fill(this.colorWalls);
            this.p.box(wallLeft.width, wallLeft.height, wallLeft.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallRight.posX, wallRight.posY,0);
            this.p.fill(this.colorWalls);
            this.p.box(wallRight.width, wallRight.height, wallRight.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(winningArea.posX, winningArea.posY, board.boardThickness / 20 * 11);
            this.p.fill(this.colorwinningArea);
            this.p.circle(0,0,winningArea.width * 2);
            // this.p.box(winningArea.width, winningArea.height, winningArea.thickness);
            this.p.pop();
        this.p.pop();
    }

    calculateFriction () {
        player.speedX = player.speedX - world.friction * player.speedX;
        player.speedY = player.speedY - world.friction * player.speedY;
    }

    collisionDetection (collisionObject) {
        if ((collisionObject.posX + collisionObject.width / 2) > (player.posX + (1 + world.collisionBoundary) * player.speedX - player.radius) && (collisionObject.posX - collisionObject.width / 2) < (player.posX + (1 + world.collisionBoundary) * player.speedX + player.radius)) {
            if ((collisionObject.posY + collisionObject.height / 2) > (player.posY + (1 + world.collisionBoundary) * player.speedY - player.radius) && (collisionObject.posY - collisionObject.height / 2) < (player.posY + (1 + world.collisionBoundary) * player.speedY + player.radius)) {
              if (collisionObject.name == "winningArea"){
                this.gameState = "intro";
              }
              else {
                if ((collisionObject.posY - collisionObject.height / 2) > player.posY + player.radius || (collisionObject.posY + collisionObject.height / 2) < player.posY - player.radius) {
                  this.collisionReaction("y");
                }
                else if ((collisionObject.posX - collisionObject.width / 2) > player.posX + player.radius || (collisionObject.posX + collisionObject.width / 2) < player.posX - player.radius) {
                  this.collisionReaction("x");
                }
                player.collision = true;
              }
            }
          }
    }

    collisionPlacing (collidingObject, collisionObject) {
      if ((collisionObject.posX + collisionObject.width / 2) > (collidingObject.posX - collidingObject.width) && (collisionObject.posX - collisionObject.width / 2) < (collidingObject.posX + collidingObject.width)) {
        if ((collisionObject.posY + collisionObject.height / 2) > (collidingObject.posY + collidingObject.width) && (collisionObject.posY - collisionObject.height / 2) < (collidingObject.posY + collidingObject.width)) {
            // console.log("colliding winningArea");
            return true;
        }
      }
    }

    collisionReaction (axis) {
        switch (axis) {
            case "x":
              // console.log("collision x axis");
              player.posX = player.posX - player.speedX * world.collisionBoundary;
              player.speedX = - player.speedX * world.ballhardness;              
              break;
            case "y":
              // console.log("collision y axis");
              player.posY = player.posY - player.speedY * world.collisionBoundary;
              player.speedY = - player.speedY * world.ballhardness;
              break;
          }
    }

    updateInputs () {
      // this.Tone.start();
      let sensorValues = this.params.getNormalisedActiveValues()
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
      //tilt of two axis only in one direction per axis
      if (modifier[1] >= this.inputThreshold) {
          board.angleX = modifier[1] * world.playerSensitivity;
          // this.synth2.triggerAttack("D3");
      }
      else if (modifier[3] >= this.inputThreshold) {
          board.angleX = - modifier[3] * world.playerSensitivity;
          // this.synth1.triggerAttackRelease("A3","16n");
      }
      else {
        // this.synth2.triggerRelease();
          board.angleX = 0;
      }
      if (modifier[0] >= this.inputThreshold) {
          board.angleY = - modifier[0] * world.playerSensitivity;
          // this.synth4.triggerAttackRelease("F3","16n");
      }
      else if (modifier[4] >= this.inputThreshold) {
          board.angleY = modifier[4] * world.playerSensitivity;
          // this.synth3.triggerAttackRelease("G3","16n");
      }
      else {
          board.angleY = 0;
      }
    }

    generateWinningArea () {
      winningArea.posX = this.p.random( - board.boardWidth / 200 * 90, board.boardWidth / 200 * 90);
      winningArea.posY = this.p.random( - board.boardWidth / 200 * 90, board.boardWidth / 200 * 90);
    }

    initializeGame () {
      this.objectSetup();
      this.generateWinningArea();
      while (this.collisionPlacing(winningArea, obstacle1) == true || this.collisionPlacing(winningArea, obstacle2) == true || this.collisionPlacing(winningArea, obstacle3) == true) {
        this.generateWinningArea();
      }
    }

    update () {
      // this.Tone.start();
      this.updateInputs();
      this.calculateFriction();
      this.collisionDetection(obstacle1);
      this.collisionDetection(obstacle2);
      this.collisionDetection(obstacle3);
      this.collisionDetection(wallLeft);
      this.collisionDetection(wallRight);
      this.collisionDetection(wallFront);
      this.collisionDetection(wallBack);
      this.collisionDetection(winningArea);
      player.collision = false;
      player.accX = world.gravity * Math.sin(board.angleY);
      player.accY = world.gravity * Math.sin(board.angleX);
      player.speedX = player.speedX + player.accX;
      player.speedY = player.speedY + player.accY;
      player.posX = player.posX + player.speedX;
      player.posY = player.posY + player.speedY;
      //fix posZ for two simultanious inputs (wont happen on device)
      player.posZ = -(player.posX * Math.sin(board.angleY * world.angleScaling) + player.posY * Math.sin(board.angleX * world.angleScaling));   
    }


    draw() {
      // this.Tone.start();
      this.p.rotateX(world.perspective);
      this.p.directionalLight(this.colorBoard, 0, 0, -1);
      this.p.ambientLight(255);
      this.update();
      this.drawPlayer();
      this.drawBoard();
    }
}
export default TiltBoard