function preload() {
    char = loadImage("images/pixil-frame-0");
}

let rectx = 50;
let recty = 300;

let lavx = 130;
let lavy = 430;

let rectsx = 0;
let rectsy = 350;

let winx = 0;
let winy = 550;

let platforms = [
    { x: 210, y: 350, width: 140, height: 20 },
    { x: 400, y: 295, width: 130, height: 20 },
    { x: 580, y: 350, width: 140, height: 20 },
    { x: 770, y: 270, width: 130, height: 20 },
    { x: 950, y: 330, width: 140, height: 20 },
    { x: 1130, y: 250, width: 130, height: 20 },
    //THIS IS THE LONG BOARD
    {x: 1310, y: 70, width: 20, height: 420},
    {x: 1400, y: 100, width: 130, height:20},
    {x: 1330, y: 200, width: 90, height:20},
    {x: 1400, y: 300, width: 130, height:20},
    {x: 1330, y: 400, width: 90, height:20},
    {x: 1400, y: 500, width: 130, height:20},
    {x: 1330, y: 600, width: 200, height:20},
];
//Movement SPEED
let speed = 5;
//THIS IS THE GRAVITY AND JUMPING VARIABLES
let gravity = 0.5;
let verticalSpeed = 0;
let jumpStrength = -15;
let isGrounded = true;
let gameWon = false;

function setup() {
    createCanvas(1500,700);
    background(0);
}
function draw() {
    //FOR the Starting base
//THIS IS THE PLAYER
    background(0);
    fill(255,0,0)
    rect(rectx,recty,50,50);
//THIS IS THE BASE
    fill(255);
    rect(rectsx,rectsy,130,140);
    //THIS IS THE LAVA
    fill(255,165,0);
    rect(lavx,lavy,1190,60);
    //GENERATES THE PLATFORMS #GOATED#AURA
    fill(255);
    for (let platform of platforms) {
        noStroke();
        rect(platform.x, platform.y, platform.width, platform.height);
    }
    //WIN BLOCK
    fill(0,255,0);
    rect(winx,winy,100,100);
//THIS IS THE WINNING CONDITION
    if (gameWon) {
        fill(0, 180);
        rect(0, 0, width, height);
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        textSize(52);
        text("YOU WIN!", width / 2, height / 2 - 25);
        fill(255);
        textSize(20);
        text("Reach the green rectangle to play again", width / 2, height / 2 + 35);
        return;
    }
    //CELLING COLLISION DETECTION
    if(recty < 0) {
        recty = 0;
    }
//THIS IS THE MOVEMENT OF THE PLAYER
    let previousRectx = rectx;
    if (keyIsDown(LEFT_ARROW)) {
        rectx -= speed;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        rectx += speed;
    }
    if (keyIsDown(UP_ARROW) && isGrounded) {
        verticalSpeed = jumpStrength;
        isGrounded = false;
    }
    //THIS IS THE GRAVITY AND COLLISION DETECTION
    let previousRecty = recty;
    verticalSpeed += gravity;
    recty += verticalSpeed;
    //THIS IS THE GROUND COLLISION DETECTION
    isGrounded = false;
    //THIS IS THE BASE COLLISION DETECTION
    if (verticalSpeed >= 0 && rectx + 50 > rectsx && rectx < rectsx + 130 && previousRecty + 50 <= rectsy && recty + 50 >= rectsy) {
        recty = rectsy - 50;
        verticalSpeed = 0;
        isGrounded = true;
    }
    //THIS IS THE PLATFORM COLLISION DETECTION
    for (let platform of platforms) {
        if (verticalSpeed >= 0 && rectx + 50 > platform.x && rectx < platform.x + platform.width && previousRecty + 50 <= platform.y && recty + 50 >= platform.y) {
            recty = platform.y - 50;
            verticalSpeed = 0;
            isGrounded = true;
        }
    }
    //THIS IS THE LEFT WALL COLLISION DETECTION
    if(rectx < 0) {
        rectx = 0;
    }
    if(rectx > 1450) {
        rectx = 1450;
    }
    //THIS IS THE LONG BOARD COLLISION DETECTION
    if (previousRectx + 50 <= 1310 && rectx + 50 > 1310 && recty + 50 > 70 && recty < 490) {
        rectx = 1310 - 50;
    }
    if (previousRectx >= 1330 && rectx < 1330 && recty + 50 > 70 && recty < 490) {
        rectx = 1330;
    }
    //THIS IS THE LAVA COLLISION DETECTION
    if (rectx + 50 > lavx && rectx < lavx + 1190 && recty + 50 >= lavy) {
        rectx = 50;
        recty = 300;
        verticalSpeed = 0;
        isGrounded = true;
    }
    //THIS IS THE WINNING CONDITION
    if (rectx + 50 > winx && rectx < winx + 100 && recty + 50 > winy && recty < winy + 100) {
        gameWon = true;
    }

}

