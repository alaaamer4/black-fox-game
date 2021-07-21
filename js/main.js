import { animate, cancelAnimation, drowBackground } from "./animate.js";
import { setPlayerState } from "./classes.js";
let isAnimating = false;

// EVENTS
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === " ") {
    if (isAnimating) {
      cancelAnimation();
      isAnimating = false;
    } else {
      animate();
      isAnimating = true;
    }
  } else if (e.key === "ArrowRight") {
    isAnimating && setPlayerState("move");
  } else if (e.key === "ArrowDown") {
    isAnimating && setPlayerState("roll");
    setTimeout(() => {
      setPlayerState("move");
    }, 800);
  } else if (e.key === "ArrowUp") {
    isAnimating && setPlayerState("startJump");
    setTimeout(() => {
      setPlayerState("endJump");
    }, 1000);
  } else if (e.key === "ArrowLeft") {
    isAnimating && setPlayerState("happy");
    setTimeout(() => {
      setPlayerState("move");
    }, 2000);
  }
});

window.addEventListener("load", () => {
  drowBackground();
});
