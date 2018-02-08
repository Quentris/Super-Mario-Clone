class Player {
    
    constructor() {
        console.log("testplayerSprite");

        //Create Player 
        this.playerSprite = createSpriteNorm(200, 64, 25, 26);
        imgMarioStand.resize(this.playerSprite.width, this.playerSprite.height);
        imgMarioWalk.resize(this.playerSprite.width, this.playerSprite.height);
        imgMarioJump.resize(this.playerSprite.width, this.playerSprite.height);        
        this.playerSprite.addImage("stand", imgMarioStand);
        this.playerSprite.addAnimation("move", imgMarioStand, imgMarioStand, imgMarioWalk, imgMarioWalk);
        this.playerSprite.addImage("jump", imgMarioJump);

    }       
}
