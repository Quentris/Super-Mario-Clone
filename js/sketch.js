const globalWidth = 640;
const globalHeight = 640;
const moveSpeed = 5;
const gravity = 2;
const jumpHeight = 20;
let jumping = false;
let obstacle = [];
let obstacles;
let hoehe = 0;
let ausgabe;
let imgMarioStand;
let imgMarioWalk;
let imgMarioJump;
let imgGroundCrack;
let testImg;
let marioLives = 3;

function preload() {
    imgMarioStand = loadImage("../img/mario_stand.png");
    imgMarioWalk = loadImage("../img/mario_walk.png");
    imgMarioJump = loadImage("../img/mario_jump.png");
    imgGroundCrack = loadImage("../img/ground.png");
}

function setup() {
    createCanvas(globalWidth, globalHeight);

    initWorld();

    ausgabe = createSpan(hoehe);


}

function draw() {
    background(102, 178, 255);

    hoehe = map(player.position.y, globalHeight, 0, 0, globalHeight);


    if (player.position.x > camera.position.x + 25) {
        camera.position.x += 5;
    }

    player.collide(obstacles, collideObstacle);

    //Check death through hole
    if (nH(player.position.y) < 0) {
        playerIsDead();
    } else {
        controlPlayer();
    }
    drawSprites();
    showInfos();

}

/**
 * controls the players movement
 */
function controlPlayer() {

    if (player.velocity.y < 15) {
        player.velocity.y += gravity;
    }

    player.velocity.x = 0;

    if (keyWentDown(UP_ARROW) && !jumping) {
        player.changeImage("jump");
        player.velocity.y -= jumpHeight;
        jumping = true;
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.mirrorX(-1);
        if (!(player.position.x - player.width / 2 < camera.position.x - 320)) {
            player.velocity.x -= moveSpeed;
        }
        if (!jumping) player.changeAnimation("move");
    }
    if (keyIsDown(RIGHT_ARROW)) {
        player.mirrorX(1);
        player.velocity.x += moveSpeed;
        if (!jumping) player.changeAnimation("move");
        // camera.position.x += 4;
    }

    if (!keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW) && !jumping) {
        player.changeImage("stand");
    }
}

/**
 * callback function if player collides an obstacle
 */
function collideObstacle() {
    if (player.touching.bottom) {
        player.velocity.y = 0;
        if (jumping) jumping = false;
    }
}

/**
 * Debugging
 */
function showInfos() {
    ausgabe.html(marioLives);
    ausgabe.show();
}

/**
 * Create Map/Obstacles/Enemies
 */
function initWorld() {

    camera.position.x = globalWidth / 2;
    camera.position.y = 320;

    //Create Player 
    player = createSpriteNorm(200, 64, 25, 26);
    imgMarioStand.resize(player.width, player.height);
    imgMarioWalk.resize(player.width, player.height);
    imgMarioJump.resize(player.width, player.height);
    player.addImage("stand", imgMarioStand);
    player.addAnimation("move", imgMarioStand, imgMarioStand, imgMarioWalk, imgMarioWalk);
    player.addImage("jump", imgMarioJump);

    obstacles = new Group();

    ///TODO - Levelloader bauen mit json
    //Ground
    imgGroundCrack.resize(32, 32);
    for (i = 0; i < 32; i++) {
        obstacle[i] = createSpriteNorm(0 + (i * 32), 0, 32, 32);
        obstacle[i].addImage("crackStone", imgGroundCrack);
    }

    for (i = 0; i < 32; i++) {
        obstacle[i] = createSpriteNorm(0 + (i * 32), 32, 32, 32);
        obstacle[i].addImage("crackStone", imgGroundCrack);
    }
    // obstacle[0] = createSpriteNorm(0, 0, globalWidth, 32);

    //Stone
    // obstacle[32] = createSpriteNorm(400, 32, 64, 32);
    obstacle[32] = createSpriteNorm(500, 64, 32, 64);

    obstacle.forEach(element => {
        obstacles.add(element);
    });
}

/**
 * Transforms the normal parametes to canvas format, 0,0 at Left-Bottom-Corner
 * @param {*} x Start X-Coordinate
 * @param {*} y Start Y-Coordinate
 * @param {*} w Width of Block
 * @param {*} h Height of Block
 */
function createSpriteNorm(x, y, w, h) {
    return createSprite(x + (w / 2), nH(y) - (h / 2), w, h);
}

/**
 * Transforms the normal Height to Canvas Height
 * @param {*} oldVar 
 */
function nH(oldVar) {
    return globalHeight - oldVar;
}

/**
 * resets the player to start position (later maybe reset to save position).
 */
function resetPlayer() {
    player.position.x = 200;
    player.position.y = nH(64);
    camera.position.x = globalWidth / 2;
    camera.position.y = 320;
}

/**
 * manages player dead. Reset or Game Over.
 */
function playerIsDead() {
    if (marioLives <= 1) {
        player.velocity.x = 0;
        player.velocity.y = 0;
        textSize(40);
        fill(255, 0, 0);
        text("GAME OVER!!!", camera.position.x - 150, 100);
    } else {

        player.velocity.x = 0;
        player.velocity.y = 0;
        textSize(30);
        fill(255, 69, 0);
        text("1 Leben verloren!", camera.position.x - 150, 100);

        if (keyWentDown(ENTER)) {
            marioLives--;
            resetPlayer();
        }
    }
}