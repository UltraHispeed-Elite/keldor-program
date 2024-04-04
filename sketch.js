function findDirection() {
    let a = Math.floor(random(0,2)); // x
    let b = Math.floor(random(0,2)); // y

    let c = (a*4)+(b*4)-4; // possible: -4,0,4;

    let d

    if(c < 0) {
        d = "x";
    }else if(c > 0) {
        d = "y";
    }else {
        d = "n";
    }

    let e = Math.floor(random(0,2)); // 1
    let f = Math.floor(random(0,2)); // 2

    let g = (e*4)+(f*4)-4; // possible: -4,0,4;

    let h;

    if(d !== "n"){
        if(g !== 0) {
            if(g > 0) {
                h = 1;
            }else if(g < 0) {
                h = 2;
            }
        }else {
            d = "n";
            h = ""
        }
    }else {
        d = "n";
        h = "";
    }

    let i = d+h;

    console.log(i);
    
    return i;
}

var keldor;

function setup() {
    createCanvas(400,400);

    keldor = new Sprite(200,200,50,50);
}

function draw() {
    background("black");

    if(frameCount % 1 === 0) {
        keldorMove(findDirection());
    }
}

function keldorMove(direction){
    if(direction === "y1") {
        keldor.y -= 5;
    }else if(direction === "x1") {
        keldor.x -= 5;
    }else if(direction === "y2") {
        keldor.y += 5;
    }else if(direction === "x2") {
        keldor.x += 5;
    }else {
        keldor.vel.x = 0;
        keldor.vel.y = 0;
    }
}