function Block(cellSize, x, y, speed, pix) {
    this.cellSize = cellSize;
    this._x = x * cellSize;
    this._y = y * cellSize;
    this.pix = pix;
    this._speed = speed * cellSize;
    this._images = [];
}
Block.prototype = {
    // Getters
    get x() {
        return this._x;
    },
    get y() {
        return this._y;
    },
    get speed() {
        return this._speed;
    },
    // Setters
    set x(x) {
        this._x = x;
    },
    set y(y) {
        this._y = y;
    },
    set speed(speed) {
        this._speed = speed;
    },
    drawFromArray: function(array, canvasCtx) {
        var coord_x = 0;
        var coord_y = 0;
        var arrLength = array.length;
        for (var i = 0; i < arrLength; i++) {
            var rowLength = array[i].length;
            for (var j = 0; j < rowLength; j++) {
                if (array[i][j] === '#') {
                    canvasCtx.fillStyle = pixColor;
                    canvasCtx.fillRect(coord_x, coord_y, this.cellSize, this.cellSize);
                }
                coord_x += this.cellSize;
            }
            coord_y += this.cellSize;
            coord_x = 0;
        }
    },
    createImage: function(imageNr) {
        var picture = document.createElement('canvas');
        picture.width = this.cellSize * 20;
        picture.height = this.cellSize * 20;
        var pictureCtx = picture.getContext('2d');
        this.drawFromArray(this.pix[imageNr], pictureCtx);
        return picture;
    },
    drawImages: function() {
        for (var i = 0; i < this.pix.length; i++) {
            var image = this.createImage(i);
            this._images.push(image);
        }
    },
    getImage: function(num) {
        return this._images[num];
    },
    fitSize: function(cellSize, reset) {
        this.cellSize = cellSize;
        this.x = reset.x;
        this.y = reset.y * cellSize;
        this.speed = reset.speed * cellSize;
        this.drawImages();
        this.width = Math.round(this.pix[0][0].length * cellSize);
        this.height = Math.round(this.pix[0].length * cellSize);
    }
}
function Character(cellSize, x, y, speed, pix) {
    Block.call(this, cellSize, x, y, speed, pix);
    this.runPosition = 0;
    this.jumpHeight = 25;
    this.jumpHeightCounter = this.jumpHeight;
    this.jumping = false;
    this.inAir = false;
}
Character.prototype = Object.create(Block.prototype, {
    jump: {
        value: function() {
            this.jumping = true;
        }
    },
});
Character.prototype.constructor = Character;
function Barrier(cellSize, x, y, speed, pix) {
    Block.call(this, cellSize, x, y, speed, pix);
}
Barrier.prototype = new Block();
Barrier.prototype.constructor = Barrier;
