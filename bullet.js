 // Variables
const bulletImg = new Image();
bulletImg.src = './assets/bullets.png'
const bulletPixelX = 320;
const bulletWidth = 60;
const bulletHeight = 10;
const spriteExploseSize = 40;
xGunPosition = 18;
yGunPosition = 30;
let bullets = [];
const speedBullet = 2;

class Bullet {
    constructor(){
        this.x = player.x + xGunPosition;
        this.y = player.y + yGunPosition;
        this.bulletId = 0;
        this.isHit = false;
        this.bulletTravelMax = getRandomInt(350,450);
        console.log(this.bulletTravelMax);
        this.explose = false;
        this.delete = false;
    };

    update(){
        if (this.x <= this.bulletTravelMax) {
            this.x += speedBullet;
        } else if (this.explose === false){
            this.explose = true;
        } else if (this.explose === true){
            explosions.push(new explosion(bulletImg, spriteExploseSize, this.x + bulletWidth, this.y + bulletHeight / 2));
            this.delete = true;
        }
    }

    draw(){
        ctx.drawImage(bulletImg, bulletPixelX, this.bulletId * bulletHeight, bulletWidth, bulletHeight, this.x, this.y, bulletWidth, bulletHeight);

    }
}


function bulletSpaw(){
    bullets.push(bullet = new Bullet());
}