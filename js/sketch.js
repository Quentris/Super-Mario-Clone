const globalWidth = 640;
const globalHeight = 640;
const moveSpeed = 3;
const gravity = 0.8;
const jumpHeight = 20;
let jumping = false;
// let obstacle = [];
let obstacles;
let hoehe = 0;
let ausgabe;
let imgGroundCrack;
let marioLives = 3;
let controller;
let imgMarioStand, imgMarioJump, imgMarioWalk;

function preload() {
    imgMarioStand = loadImage("../img/mario_stand.png");
    imgMarioWalk = loadImage("../img/mario_walk.png")
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

    hoehe = map(this.controller.player.position.y, globalHeight, 0, 0, globalHeight);

    //Move Camera
    if (this.controller.player.position.x > camera.position.x + 25) {
        camera.position.x += 5;
    }

    //Check player collision with object
    this.controller.player.collide(this.obstacles, this.controller.collideObstacle());

    //Check death through hole
    if (nH(this.controller.player.position.y) < 0) {
        this.controller.playerIsDead();
    } else {
        this.controller.controlPlayer();
    }
    drawSprites();
    showInfos();

}

/**
 * Debugging
 */
function showInfos(){
    ausgabe.html(this.controller.player.velocity.y);
    
    ausgabe.show();
}

/**
 * Create Map/Obstacles/Enemies
 */
function initWorld() {

    camera.position.x = globalWidth / 2;
    camera.position.y = 320;

    this.controller = new Controller();

    this.obstacles = new Group();
    let obstacle = [];

    //Ground
    imgGroundCrack.resize(32, 32);
    for (i = 0; i < 32; i++) {
        obstacle[i] = createSpriteNorm(i * 32, 0, 32, 32);
        obstacle[i].addImage("crackStone", imgGroundCrack);
    }

    for (i = 0; i < 32; i++) {
        obstacle[i] = createSpriteNorm(i * 32, 32, 32, 32);
        obstacle[i].addImage("crackStone", imgGroundCrack);
    }
    // obstacle[0] = createSpriteNorm(0, 0, globalWidth, 32);

    //Stone
    // obstacle[32] = createSpriteNorm(400, 32, 64, 32);
    obstacle[32] = createSpriteNorm(500, 64, 32, 64);

    obstacle.forEach(element => {
        this.obstacles.add(element);
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
