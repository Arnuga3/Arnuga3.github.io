var canvas;
var canvasWidth;
var ctx;

function init() {
  canvas = document.getElementById('canvas-game');
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");

    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas();
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

init();
