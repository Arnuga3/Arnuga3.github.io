var canvas;
var ctx;
var cellSize;
var game;

canvas = document.getElementById('canvas-game');
ctx = canvas.getContext("2d");

// on resize or screen orientation change
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);



// draw a first canvas
function init() {
  canvas.width = window.innerWidth;
  canvas.height = canvas.width/4;

  var seizePoint = canvas.height/3;

  // height and width of an image cell
  cellSize = seizePoint/20;
}
init();


// define a character
var hero = new Character(cellSize);


// resize a canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = canvas.width/4;

  var seizePoint = canvas.height/3;

  // height and width of an image cell
  cellSize = seizePoint/20;

  // resize character images and fit positions
  hero.fitSize(cellSize);
}
resizeCanvas();


// loop function
function run() {
	update((Date.now() - time) / 1000);
	drawScene();
	time = Date.now();
}

function update(mod) {

}

// counter to change run images
var runCounter = 0;

function drawScene() {

  runCounter += 1;
  if (runCounter > 10) {
    hero.runPosition = hero.runPosition == 0 ? 1 : 0;
    runCounter = 0;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hero.runPosition == 0) {
    ctx.drawImage(hero.image_1, hero.posX, hero.posY);
  } else {
    ctx.drawImage(hero.image_2, hero.posX, hero.posY);
  }
}


/// CHARACTER CLASS (Constructor) ///

function Character(cellSize) {

  this.cellSize = cellSize;

  this.posX = this.cellSize*10;
  this.posY = this.cellSize*40;
  this.speed = 100;
  this.runPosition = 0;

  this.image_1;
  this.image_2;
  this.image_3;

  this.px =  [
          [ [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' '],
            [' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
            [' ',' ','#','#',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ',' ',' '],
            [' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' '],
            [' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
            ['#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#',' '],
            ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' '],
            ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' '],
            ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#'],
            ['#','#',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ',' ','#'],
            [' ','#',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ',' ','#'],
            [' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#'],
            [' ','#','#',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#'],
            [' ',' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#',' ','#',' '],
            [' ',' ','#','#',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#',' '],
            [' ',' ',' ','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
            [' ',' ',' ','#','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' '],
            [' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ','#',' ',' ',' '],
            [' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' '],
            [' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' '] ],

            [ [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' '],
              [' ',' ','#','#','#','#','#',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' '],
              [' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
              ['#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#',' '],
              ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' '],
              ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' '],
              ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' '],
              ['#','#',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#',' '],
              [' ','#',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ','#',' '],
              [' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#',' ',' ','#',' '],
              [' ','#','#',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#',' '],
              [' ',' ','#',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#',' '],
              [' ',' ','#','#',' ',' ',' ','#',' ','#',' ','#',' ','#',' ',' ',' ','#',' '],
              [' ',' ',' ','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
              [' ',' ',' ','#','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' '],
              [' ',' ',' ',' ','#',' ','#','#','#','#','#','#','#','#',' ',' ',' ',' ',' '],
              [' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
              [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '] ],

              [ [' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ','#','#',' ',' ',' ',' ',' '],
                [' ',' ',' ','#',' ',' ','#',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' '],
                [' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
                ['#','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#',' '],
                ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' '],
                ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ',' ',' ','#',' '],
                ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#'],
                ['#','#',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ',' ','#'],
                [' ','#',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ',' ','#'],
                [' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#'],
                [' ','#','#',' ',' ',' ',' ','#','#','#','#','#','#','#','#',' ',' ',' ','#'],
                [' ',' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ','#',' '],
                [' ',' ','#','#',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#',' '],
                [' ',' ',' ','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
                [' ',' ',' ','#','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#',' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '] ]
          ];

  this.fitSize = function(cellSize) {
    this.cellSize = cellSize;
    this.posX = this.cellSize*10;
    this.posY = this.cellSize*40;
    this.drawImages();
  };

  this.drawFromArray = function(array, canvasCtx) {
    //start coordinates on the canvas, left-top corner
    var coord_x = 0;
    var coord_y = 0;
    var arrLength = array.length;

    for (var i=0; i<arrLength; i++){		//start from first line of the map array
      var rowLength = array[i].length;

      for (var j=0; j<rowLength; j++){		//check each element in that line

        if (array[i][j] === '#'){
          canvasCtx.fillStyle = '#000000';
          canvasCtx.fillRect(coord_x, coord_y, this.cellSize, this.cellSize);
        }
        coord_x += this.cellSize;
      }
      coord_y += this.cellSize;		//after line check is complete, it goes to next map line
      coord_x = 0;		//sets x to 0, as check of new line start from the beginning
    }
  };

  this.createImage = function(imageNr) {
    // create a character canvas
    var character = document.createElement('canvas');

    // 20 cells width and height
    character.width = this.cellSize*20;
    character.height = this.cellSize*20;
    var characterCtx = character.getContext('2d');

    // draw a character image
    this.drawFromArray(this.px[imageNr], characterCtx);
    return character;
  };

  this.drawImages = function() {
    //draw character images
    this.image_1 = this.createImage(0);
    this.image_2 = this.createImage(1);
    this.image_3 = this.createImage(2);
  };

}

var time = Date.now();
setInterval(run, 20);
