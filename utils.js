/**
    Control commande
**/
function keyDown(event) {
    if (event.keyCode == 38) {
        player.keyBoost = true;
    }
    if (event.keyCode == 32) {
        fire = true;
        bulletSpaw();
    }
    if(event.key === "Escape") {
        tooglePause();
    }
}

function keyUp(event) {
    if (event.keyCode == 38) {
        player.keyBoost = false;
    }
}

/**
    Functions
**/
function tooglePause(){
    if (gameState === GAMESTATE.RUNNING){
        gameState = GAMESTATE.PAUSE;
    } else {
        gameState = GAMESTATE.RUNNING;
    }
}

/**
    Texts
**/
const lineHeight = 36;
const fontTitle = "36px Arial";
const fontTxt = "24px Arial";

const resumeTxt = {
    en : 'press "Escape" to resume',
    fr : 'appuyez sur la touche "Esc" pour retourner au jeu'
};
const controlKeyTxt = {
    en : 'Press "UP" key to active jetpack - "space" to shoot.',
    fr : 'appuyer sur la touche "UP" pour activer le jetpack - "espace" pour tirer.',
};


/** Background class
    img : image - speedX : horizontal speed
    imgWidth : Width - imgHeight : height
**/

const Backgrounds = ['bg1_1.png', 'bg1_2.png',
    'bg2_1.png', 'bg2_2.png',
    'bg3_1.png', 'bg3_2.png',
    'bg4_1.png', 'bg4_2.png'
];

class Background {
    constructor(img, speedX, imgWidth = 1345, imgHeight = 640) {
        this.bgImg = new Image();
        this.bgImg.src = './assets/bg/' + img;
        this.bgWidth = imgWidth;
        this.bgHeight = imgHeight;
        this.speedX = speedX;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x <= -this.bgImg.width) {
            this.x = 0;
        }
        this.x -= this.speedX;
    }

    draw() {
        ctx.drawImage(this.bgImg, this.x, this.y, this.bgWidth, this.bgHeight);
        ctx.drawImage(this.bgImg, this.x + this.bgWidth, this.y, this.bgWidth, this.bgHeight);
    }

}

/** Explosion class
    imgExplose : image of explosion : bullet - ennemy - player
    posX , posY : explosion position
**/
let explosions = [];

class explosion {
    constructor(imgExplose, spriteExploseSize, posX, posY) {
        this.imgExplose = imgExplose;
        this.spriteExploseSize = spriteExploseSize;
        this.x = posX - this.spriteExploseSize / 2;
        this.y = posY - this.spriteExploseSize / 2;
        this.frameCounter = 0;
        this.frameIndex = 0;
        this.delete = false;
    }

    update() {
        this.frameCounter = this.frameCounter + 1;
        if (this.frameCounter % 10    === 0) {
            this.frameIndex += this.spriteExploseSize;
            if (this.frameIndex > this.spriteExploseSize * 6) {
                this.delete = true;
            }
        }
    }

    draw() {
        ctx.drawImage(this.imgExplose, this.frameIndex, 0, this.spriteExploseSize, this.spriteExploseSize, this.x, this.y, this.spriteExploseSize, this.spriteExploseSize);
    }
}

/** random int
 * @param {int} min : min int value include
 * @param {int} max : max int value exclude
 * @param {0 | 1} operator : 0 max exclude (default) / 1 max include
 * @return {number} random int
 **/
function getRandomInt(min, max, operator = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + operator)) + min;
}

/** random float
 * @param {float} min : min value include
 * @param {float} max : max value exclude
 * @param operator : 0 max exclude (default) / 1 max include
 * @return {number} random float
 **/
function getRandom(min, max, operator = 0) {
    return Math.random() * (max - min + operator) + min;
}

/** random from an array
 * @param {array} arr  array of values to pick from
 * @return {any} random member of array
 **/
function getRandomArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}