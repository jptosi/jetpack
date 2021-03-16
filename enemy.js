// Variables
const enemyImg = new Image();
enemyImg.src = './assets/spritesEnemy.png'
const spriteWidth = 120;
const spriteHeight = 64;
const firstRow = 64;
const secondRow = 256;
const thirdRow = 448;
let enemies = [];

class Enemy {
    constructor(row) {
        this.enemyFrame = getRandomInt(0, 5);
        this.x = canvas.width;
        this.y = row + getRandomInt(0, 2, 1) * spriteHeight;
        this.speedx = getRandom(0.3, 0.5);
        this.frameImg = 0;
        this.onScreen = true;
        this.isCollisional = true;
        this.isHit = false;
        this.explose = false;
        this.delete = false;
        this.hp = 3;
    }

    update() {
        this.x -= this.speedx;
        // check if enemies are out of screen
        if (this.x < -spriteWidth) {
            this.onScreen = false;
        }
        if (this.isCollisional === true && player.lives > 0) {
            this.checkColision();
        }

        if (this.isHit === true && this.explose === false) {
            this.explose = true;
        } else if (this.explose === true) {
            this.delete = true;
        }

        // calculate image frame - animation enemy
        if (frames % gameFps === 0) {
            this.frameImg += spriteWidth;
            if (this.frameImg > spriteWidth * 3) {
                this.frameImg = 0;
            }
        }
    }

    draw() {
        ctx.drawImage(enemyImg, this.frameImg, this.enemyFrame * spriteHeight, spriteWidth, spriteHeight, this.x, this.y, spriteWidth, spriteHeight);
    }

    checkColision() {
        // Player Collision
        if (this.x < player.x + spriteSize - boundingbox &&
            this.x + spriteHeight > player.x + boundingbox &&
            this.y < player.y + spriteSize - boundingbox &&
            spriteHeight + this.y > player.y + boundingbox
        ) {
            player.isHit = true;
            player.lives = player.lives - 1;
            this.isCollisional = false;
        }
        // Bullet collision
        bullets.forEach(bullet => {
            if (this.x < bullet.x + bulletWidth &&
                this.x + spriteHeight > bullet.x &&
                this.y < bullet.y + bulletHeight &&
                spriteHeight + this.y > bullet.y
            ) {
                bullet.isHit = true;
                this.isHit = true;
            }
        });
    }
}

function enemieSpaw() {
    if (frames % 200 === 0) {
        enemies.push(enemy = new Enemy(firstRow));
        enemies.push(enemy = new Enemy(secondRow));
        enemies.push(enemy = new Enemy(thirdRow));
    }
}