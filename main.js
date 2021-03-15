// Init Variables
let frames = 0;
let playerChoice = 1;
let backgroundChoice = 3;
const GAMESTATE = {
    MENU: 0,
    RUNNING: 1,
    PAUSE: 2,
    GAMEOVER: 3
}
let gameState = GAMESTATE.RUNNING;

// init Canvas
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 640;
ctx.font = "20pt Calibri,Geneva,Arial";
ctx.strokeStyle = "rgb(255,255,0)";
ctx.fillStyle = "rgb(0,20,180)";

// init keyboard control
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

// init Layers
let layers = [];
layers.push(new Background(Backgrounds[2 * backgroundChoice], 0.05));
layers.push(new Background(Backgrounds[(2 * backgroundChoice) + 1], 0.3));

// init Players
player = new Player(playerChoice);

// UPDATE
function update() {

    // Check PAUSED
    if (gameState === GAMESTATE.PAUSE){
        return;
    }
    // background Update
    layers.forEach(layer => {
        layer.update();
    });

    // GUI Update

    // Ennemies Update
    for (i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        // remove enemies out of screen
        if (enemies[i].onScreen === false || enemies[i].delete === true) {
            enemies.splice(i, 1);
        }
    }
    // Bullet update
    for (i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].isHit === true || bullets[i].delete === true) {
            bullets.splice(i, 1);
        } else {
            bullets[i].update();
        }
    };

    for (i = explosions.length - 1; i >= 0; i--) {
        if (explosions[i].delete === true) {
            explosions.splice(i, 1);
        } else {
            explosions[i].update();
        }
    };

    // Player update
    player.update();
}

// DRAW
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background Draw
    layers.forEach(layer => {
        layer.draw();
    });

    // GUI Draw
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, 64);
    ctx.fillStyle = 'white';
    ctx.strokeText('Press "UP" key to active jetpack - "space" to shoot. lives ' + player.lives, 300, 20);
    //ctx.fillText("Autre exemple", 100, 60);

    // Player and Ennemies Draw
    bullets.forEach(bullet => {
        bullet.draw();
    });

    explosions.forEach(explosion => {
        explosion.draw();
    });

    enemies.forEach(enemy => {
        enemy.draw();
    });


    player.draw();

}

// Game loop
function loop() {
    draw();
    update();
    enemieSpaw();
    frames++;
    requestAnimationFrame(loop);
}

loop();