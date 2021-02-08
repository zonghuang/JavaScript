const spinner = document.querySelector("div");
let rotateCount = 0;
let rAF;
let startTime = null;
let spinning = false;

function draw(timestamp) {
  if (!startTime) {
    startTime = timestamp;
  }
  rotateCount = (timestamp - startTime) / 3;
  if (rotateCount > 359) {
    rotateCount %= 360;
  }
  spinner.style.transform = `rotate(${rotateCount}deg)`;
  rAF = requestAnimationFrame(draw);
}

// draw();
// cancelAnimationFrame(rAF);

document.body.addEventListener("click", function () {
  if (spinning) {
    cancelAnimationFrame(rAF);
    spinning = false;
  } else {
    draw();
    spinning = true;
  }
});
