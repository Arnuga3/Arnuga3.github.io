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


window.onclick = function() {
  hero.jump();
};
window.touchstart = function() {
  hero.jump();
};


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


// counter to change run images
var runCounter = 0;

function update(mod) {

  if (!hero.jumping) {

    // if on ground - running
    if (hero.landing == false) {
      runCounter += 1;
      if (runCounter > 7) {
        hero.runPosition = hero.runPosition == 0 ? 1 : 0;
        runCounter = 0;
      }
    }

    hero.posY += hero.speed * mod;
    if (hero.posY + cellSize * 20 >= canvas.height) {
      hero.posY -= hero.speed * mod;
      hero.landing = false;
    }

  } else {
    // in air
    hero.landing = true;
    // reset counter for later use
    runCounter = 0;
    // draw a jumping image
    hero.runPosition = 2;

    // move up
    hero.posY -= hero.speed * mod;
		hero.jumpHeightCounter -= 1;

    // reached jump height
    if (hero.jumpHeightCounter <= 0) {
      hero.jumping = false;
      hero.jumpHeightCounter = hero.jumpHeight;

    }
  }

}

function drawScene() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (hero.runPosition == 0) {
    ctx.drawImage(hero.image_2, hero.posX, hero.posY);
  } else if(hero.runPosition == 1) {
    ctx.drawImage(hero.image_1, hero.posX, hero.posY);
  } else if(hero.runPosition == 2) {
    ctx.drawImage(hero.image_3, hero.posX, hero.posY);
  }
}


/// CHARACTER CLASS (Constructor) ///

function Character(cellSize) {

  this.cellSize = cellSize;

  // image type pointer
  this.runPosition = 0;
  this.jumpHeight = 30;
  this.jumpHeightCounter = this.jumpHeight;

  this.posX = this.cellSize*10;
  this.posY = this.cellSize*40;
  this.speed = this.cellSize*60;
  this.jumping = false;
  this.landing = false;

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

              [ [' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
                [' ',' ',' ','#',' ',' ','#',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' '],
                [' ',' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
                [' ','#','#','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#',' '],
                ['#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' '],
                ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#',' ','#','#',' ',' ','#',' '],
                ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#'],
                ['#','#',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ',' ','#'],
                [' ','#',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ',' ','#'],
                [' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#'],
                [' ','#','#',' ',' ',' ',' ','#','#','#','#','#','#','#','#',' ',' ',' ','#'],
                [' ',' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ','#',' '],
                [' ',' ','#','#',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ','#',' '],
                [' ',' ',' ','#','#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#',' ',' '],
                [' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#',' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '] ]
          ];

  this.fitSize = function(cellSize) {
    this.cellSize = cellSize;
    this.posX = this.cellSize*10;
    this.posY = this.cellSize*40;
    this.speed = this.cellSize*60;
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

  this.jump = function() {
    this.jumping = true;
  };

}

var time = Date.now();
setInterval(run, 20);
