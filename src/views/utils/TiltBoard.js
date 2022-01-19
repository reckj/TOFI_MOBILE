import { Tone } from 'tone/build/esm/core/Tone';

const world = {
    gravity: 9.82,
    friction: 0.02,
    ballhardness: 0.7,
    angleScaling: 20,
    playerSensitivity: 0.005,
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
        this.objectSetup();
        this.perspective = 0.4;
        this.inputThreshold = 0.1;
    }

    objectSetup () {
        board.boardWidth = this.width * 2 / 3;
        board.boardHeight = board.boardWidth;

        player.posX = - board.boardWidth / 200 * 85;
        player.posY = board.boardWidth / 200 * 85;

        obstacle1.posX = board.boardWidth / 200 * 50;
        obstacle1.posY = -board.boardWidth / 200 * 10;
        obstacle1.width = board.boardWidth / 100 * 30;
        obstacle1.height = board.boardWidth / 100 * 4;

        obstacle2.posX = -board.boardWidth / 200 * 60;
        obstacle2.posY = board.boardWidth / 200 * 40;
        obstacle2.width = board.boardWidth / 100 * 8;
        obstacle2.height = board.boardWidth / 100 * 45;

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
        this.p.normalMaterial();
        this.p.push();
            this.p.translate(player.posX, player.posY, player.posZ + player.radius);
            this.p.push();
            // rotate ball
            // rotateX(player.speedY);
            // rotateY(player.speedX);
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
            this.p.fill(229, 204, 255);
            this.p.box(board.boardWidth, board.boardHeight, board.boardThickness);

            this.p.push();
            this.p.translate(obstacle1.posX, obstacle1.posY,0);
            this.p.normalMaterial();
            this.p.box(obstacle1.width, obstacle1.height, obstacle1.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(obstacle2.posX, obstacle2.posY,0);
            this.p.normalMaterial();
            this.p.box(obstacle2.width, obstacle2.height, obstacle2.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallFront.posX, wallFront.posY,0);
            this.p.normalMaterial();
            this.p.box(wallFront.width, wallFront.height, wallFront.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallBack.posX, wallBack.posY,0);
            this.p.normalMaterial();
            this.p.box(wallBack.width, wallBack.height, wallBack.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallLeft.posX, wallLeft.posY,0);
            this.p.normalMaterial();
            this.p.box(wallLeft.width, wallLeft.height, wallLeft.thickness);
            this.p.pop();
            this.p.push();
            this.p.translate(wallRight.posX, wallRight.posY,0);
            this.p.normalMaterial();
            this.p.box(wallRight.width, wallRight.height, wallRight.thickness);
            this.p.pop();
        this.p.pop();
    }

    calculateFriction () {
        player.speedX = player.speedX - world.friction * player.speedX;
        player.speedY = player.speedY - world.friction * player.speedY;
    }

    collisionDetection (collisionObject) {
        if ((collisionObject.posX + collisionObject.width / 2) > (player.posX + player.speedX - player.radius) && (collisionObject.posX - collisionObject.width / 2) < (player.posX + player.speedX + player.radius)) {
            if ((collisionObject.posY + collisionObject.height / 2) > (player.posY + player.speedY - player.radius) && (collisionObject.posY - collisionObject.height / 2) < (player.posY + player.speedY + player.radius)) {
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

    collisionReaction (axis) {
        switch (axis) {
            case "x":
              // console.log("collision x axis");
              player.speedX = - player.speedX * world.ballhardness;
              break;
            case "y":
              // console.log("collision y axis");
              player.speedY = - player.speedY * world.ballhardness;
              break;
          }
    }

    updateInputs () {
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
            // console.log(i + ": " + modifier[i])
        }
        //tilt of two axis only in one direction per axis
        if (modifier[1] >= this.inputThreshold) {
            board.angleX = modifier[1] * world.playerSensitivity;
        }
        else if (modifier[3] >= this.inputThreshold) {
            board.angleX = - modifier[3] * world.playerSensitivity;
        }
        else {
            board.angleX = 0;
        }
        if (modifier[0] >= this.inputThreshold) {
            board.angleY = - modifier[0] * world.playerSensitivity;
        }
        else if (modifier[4] >= this.inputThreshold) {
            board.angleY = modifier[4] * world.playerSensitivity;
        }
        else {
            board.angleY = 0;
        }
    }

    update () {
        this.updateInputs();
        this.calculateFriction();
        this.collisionDetection(obstacle1);
        this.collisionDetection(obstacle2);
        this.collisionDetection(wallLeft);
        this.collisionDetection(wallRight);
        this.collisionDetection(wallFront);
        this.collisionDetection(wallBack);
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
        this.p.rotateX(this.perspective);
        this.update();
        this.drawPlayer();
        this.drawBoard();
    }
}
export default TiltBoard