var canvas;
var canvasWidth;
var ctx;
var seizePoint;
var cellSize;

function init() {
  canvas = document.getElementById('canvas-game');
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");

    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    resizeCanvas();

    //define and start a game
    var game = new Game(cellSize);

  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = canvas.width/4;

  seizePoint = canvas.height/3;

  // height and width of an image cell
  var cellSize = seizePoint/20;

  //define a game
  var game = new Game(cellSize);
  //start a game
  setInterval(game.run.bind(game), 20);

}


/// GAME ///

function Game(cellSize) {

  this.cellSize = cellSize;
  //define a character
  this.hero = new Character(cellSize);
  this.time = Date.now();

  this.run = function() {

  	this.update((Date.now() - this.time) / 1000);
  	this.drawScene();
  	this.time = Date.now();
  };

  this.update = function(mod) {
      this.hero.posY -= this.hero.speed * mod;
  };

  this.drawScene = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.hero.image_1, 0, this.hero.posY);
    ctx.drawImage(this.hero.image_2, this.cellSize*20, this.hero.posY);
    ctx.drawImage(this.hero.image_3, this.cellSize*20*2, this.hero.posY);
  };

  this.start = function() {

    //bind(this) refer an object
    //setInterval(this.run.bind(this), 0);
  };
}


/// CHARACTER ///

function Character(cellSize) {

  this.cellSize = cellSize;

  this.posX = 0;
  this.posY = canvas.height/1.5;
  this.speed = 100;
  this.isJumping = false;

  this.image_1;
  this.image_2;
  this.image_3;

  this.px =  [
          [ [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#','#',' ',' ',' ',' ',' '],
            [' ',' ','#','#','#','#','#',' ',' ',' ',' ',' ',' ','#',' ',' ',' ',' ',' '],
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
            [' ','#','#',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#'],
            [' ',' ','#',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ','#',' '],
            [' ',' ','#','#',' ',' ',' ','#',' ','#',' ','#',' ','#',' ',' ',' ','#',' '],
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
              ['#',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','#','#'],
              ['#','#',' ',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#',' ',' ',' ',' ','#'],
              [' ','#',' ',' ',' ',' ',' ',' ','#','#','#','#','#','#','#',' ',' ',' ','#'],
              [' ','#',' ',' ',' ',' ',' ','#','#','#','#','#','#','#','#','#',' ',' ','#'],
              [' ','#','#',' ',' ',' ','#','#','#','#','#','#','#','#','#','#',' ',' ','#'],
              [' ',' ','#',' ',' ',' ','#','#','#','#','#','#','#','#','#','#',' ','#',' '],
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

  //draw character images
  this.image_1 = this.createImage(0);
  this.image_2 = this.createImage(1);
  this.image_3 = this.createImage(2);

  this.jump = function() {
    this.isJumping = true;
  };

}



init();
