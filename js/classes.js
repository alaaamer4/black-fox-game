const canvas = document.querySelector(".canvas");
export const ctx = canvas.getContext("2d");
let gameSpeed = 3;
export const CANVAS_WIDTH = (canvas.width = window.screen.width);
export const CANVAS_HEIGHT = (canvas.height = window.screen.availHeight);
export let playerState = "move";
export function setPlayerState(value) {
  playerState = value;
}
export class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = CANVAS_HEIGHT;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.speedModifier * gameSpeed;
  }
  update() {
    this.speed = this.speedModifier * gameSpeed;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

export class Enemy {
  constructor(image) {
    this.image = image;
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.speed = Math.random() * 4 + 1;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.frame = 0;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.angel = Math.random() * 2;
    this.angelSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 6;
    this.gameFrame;
  }
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angel);
    this.angel += this.angelSpeed;
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH;
    if (this.gameFrame % 3 === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
    this.gameFrame++;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

// HEEEEEROOO
export class Hero {
  constructor(image) {
    this.image = image;
    this.spriteWidth = 575;
    this.spriteHeight = 523;
    this.gameFrame = 0;
    this.width = 200;
    this.height = 200;
    this.x = 80;
    this.y = 480;
    this.staggerFrame = 5;
    this.spriteAnimation = [];
    this.animationStates = [
      { name: "stay", frames: 7 },
      { name: "startJump", frames: 7 },
      { name: "endJump", frames: 7 },
      { name: "move", frames: 9 },
      { name: "stun", frames: 11 },
      { name: "happy", frames: 5 },
      { name: "roll", frames: 7 },
      { name: "downAndBack", frames: 7 },
      { name: "upAndDown", frames: 12 },
      { name: "bark", frames: 4 },
    ];
    this.animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      };
      for (let i = 0; i < state.frames; i++) {
        let posX = i * this.spriteWidth;
        let posY = index * this.spriteHeight;
        frames.loc.push({ x: posX, y: posY });
      }
      this.spriteAnimation[state.name] = frames;
    });
    this.position = 0;

    this.spritePosX = 0;
    this.spritePosY = 0;
  }
  darw() {
    ctx.drawImage(
      this.image,
      this.spritePosX,
      this.spritePosY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  updateMove() {
    this.position =
      Math.floor(this.gameFrame / this.staggerFrame) %
      this.spriteAnimation[playerState].loc.length;
    this.spritePosY = this.spriteAnimation[playerState].loc[0].y;
    this.spritePosX = this.position * this.spriteWidth;
    if (playerState === "startJump") {
      this.y -= 2;
      this.x++;
    }
    if (playerState === "endJump" && this.y <= 480) {
      this.y += 3;
    }
    if (playerState === "endJump" && this.y >= 480) {
      playerState = "move";
    }
    if (playerState === "roll" && this.y === 480) {
      this.x++;
    }
    if (playerState === "roll" && this.y < 480) {
      this.y += 3;
    }
    if (playerState === "happy" && this.x > 20) {
      this.x--;
    }
    if (this.y < 480 && playerState != "startJump") {
      this.y++;
    }
    this.gameFrame++;
  }
}
