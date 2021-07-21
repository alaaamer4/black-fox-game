import {
  Enemy,
  Layer,
  Hero,
  ctx,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "./classes.js";

let id;
let heroId;
let enemyArmy = 5;
let enemyArr = [];

//*******  creating images  ******/
// BACKGROUND
const backgroundLayer1 = new Image();
backgroundLayer1.src = "../assets/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "../assets/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "../assets/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "../assets/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "../assets/layer-5.png";
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.55);
const layer4 = new Layer(backgroundLayer4, 0.7);
const layer5 = new Layer(backgroundLayer5, 0.8);
const gameObject = [layer1, layer2, layer3, layer4, layer5];
// HERO
const heroImage = new Image();
heroImage.src = "../assets/shadow_dog.png";
const hero = new Hero(heroImage);
// ENEMY
const enemyImage = new Image();
enemyImage.src = "../assets/enemy2.png";

export function drowBackground() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObject.forEach((layer) => {
    layer.draw();
  });
  enemyArr.forEach((enemy) => {
    enemy.draw();
  });

  hero.darw();

  requestAnimationFrame(drowBackground);
}

for (let i = 0; i < enemyArmy; i++) {
  enemyArr.push(new Enemy(enemyImage));
}
export function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObject.forEach((layer) => {
    layer.update();
    layer.draw();
  });
  enemyArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });

  hero.updateMove();

  hero.darw();

  id = requestAnimationFrame(animate);
}

export function cancelAnimation() {
  cancelAnimationFrame(id);
  cancelAnimationFrame(heroId);
}
