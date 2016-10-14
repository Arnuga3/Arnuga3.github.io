var canvas;
var ctx;
var cellSize;
var game;
var hero;
var pixColor = 'black';
var animation;
canvas = document.getElementById('canvas-game');
ctx = canvas.getContext("2d");

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
window.onclick = function() {
    if (hero.inAir == false) {
        hero.jump();
    }
}
;
window.touchstart = function() {
    if (hero.inAir == false) {
        hero.jump();
    }
}
;
/// COLLISION FUNCTION ///
function collides(a, b) {
    return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
    );
}
// OBJECTS DEFINITION ///
var heroReset = {
    x: canvas.width / 12,
    y: 40,
    speed: 80
};
hero = new Character(cellSize,heroReset.x,heroReset.y,heroReset.speed,pixCharacter);
var barrierReset = {
    x: 0,
    y: 55,
    speed: 60
};
var barrier1 = new Barrier(cellSize,barrierReset.x,barrierReset.y,barrierReset.speed,pixBarrierHTML);

function init() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width / 4;
    var seizePoint = canvas.height / 3;
    cellSize = seizePoint / 20;
}

init();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.width / 4;
    var seizePoint = canvas.height / 3;
    cellSize = seizePoint / 20;
    barrierReset.x = canvas.width;
    heroReset.x = canvas.width / 12;
    hero.fitSize(cellSize, heroReset);
    barrier1.fitSize(cellSize, barrierReset);
}

resizeCanvas();

function run() {
    animation = requestAnimationFrame(run);
    update(0.02);
    drawScene();
}

var runCounter = 0;
function update(mod) {
    if (!hero.jumping) {
        if (hero.inAir == false) {
            runCounter += 1;
            if (runCounter > 7) {
                hero.runPosition = hero.runPosition == 0 ? 1 : 0;
                runCounter = 0;
            }
        }
        hero.y = hero.y + hero.speed * mod;
        if (hero.y + cellSize * 20 > canvas.height) {
            hero.y = hero.y - hero.speed * mod;
            hero.inAir = false;
        }
    } else {
        hero.inAir = true;
        runCounter = 0;
        hero.runPosition = 2;
        hero.y = hero.y - hero.speed * mod;
        hero.jumpHeightCounter -= 1;
        if (hero.jumpHeightCounter <= 0) {
            hero.jumping = false;
            hero.jumpHeightCounter = hero.jumpHeight;
        }
    }

    /// BARRIERS ///
    barrier1.x = barrier1.x - barrier1.speed * mod;
    if (barrier1.x <= -100) {
        barrier1.x = barrierReset.x;
    }

    /// COLLISIONS ///
    if (collides(hero, barrier1)) {
        window.cancelAnimationFrame(animation);
        hero.runPosition = 3;
    }
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var currentImage = function(obj, nr) {
        ctx.drawImage(obj.getImage(nr), obj.x, obj.y);
    };
    currentImage(hero, hero.runPosition);
    currentImage(barrier1, 0);
}

animation = requestAnimationFrame(run);
