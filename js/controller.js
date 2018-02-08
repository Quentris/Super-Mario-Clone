let player;

class Controller {

    constructor() {
        console.log("testcontroller");

        this.player = new Player().playerSprite;
    }

    /**
     * controls the players movement
     */
    controlPlayer() {

        if (this.player.velocity.y < 15) {
            this.player.velocity.y += 0.8;
        }
        //TODO - Gravity auf höhe mappen



        // this.player.velocity.x = 0;
        this.player.velocity.x /= 2;

        if (keyWentDown(UP_ARROW) && !jumping) {
            this.player.changeImage("jump");
            this.player.velocity.y = -80;
            jumping = true;
        }

        if (keyIsDown(LEFT_ARROW)) {
            this.player.mirrorX(-1);
            if (!(this.player.position.x - this.player.width / 2 < camera.position.x - 320)) {
                this.player.velocity.x -= moveSpeed;
            }
            if (!jumping) this.player.changeAnimation("move");
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.player.mirrorX(1);
            this.player.velocity.x += moveSpeed;
            if (!jumping) this.player.changeAnimation("move");
            // camera.position.x += 4;
        }

        if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !jumping) {
            this.player.changeImage("stand");
        }
    }

    /**
     * callback function if player collides an obstacle
     */
    collideObstacle() {
        if (this.player.touching.bottom) {
            this.player.velocity.y = 0;
            if (jumping) jumping = false;
        }
    }

    /**
     * resets the player to start position (later maybe reset to save position).
     */
    resetPlayer() {
        this.player.position.x = 200;
        this.player.position.y = nH(64);
        camera.position.x = globalWidth / 2;
        camera.position.y = 320;
    }

    /**
     * manages player dead. Reset or Game Over.
     */
    playerIsDead() {
        if (marioLives <= 1) {
            this.player.velocity.x = 0;
            this.player.velocity.y = 0;
            textSize(40);
            fill(255, 0, 0);
            text("GAME OVER!!!", camera.position.x - 150, 100);
        } else {

            this.player.velocity.x = 0;
            this.player.velocity.y = 0;
            textSize(30);
            fill(255, 69, 0);
            text("1 Leben verloren!", camera.position.x - 150, 100);

            if (keyWentDown(ENTER)) {
                marioLives--;
                resetPlayer();
            }
        }
    }
}