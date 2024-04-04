var keldor;
var the_direction;

var steps;

var score;
var scores = {
    "y1": 0,
    "x1": 0,
    "y2": 0,
    "x2": 0,
    "total": 0
};

function setup() {
    createCanvas(400,400);

    keldor = new Sprite(200,200,50,50);

    steps = 0;
    score = 0;
}

function draw() {
    background("black");

    if(frameCount % 5 === 0) {
        keldorMove(findDirection());
        console.log(steps);
        keldorScore();
    }
}

function keldorMove(direction){
    the_direction = direction;
    if(direction === "y1") {
        keldor.y -= 5;
        steps +=1;
    }else if(direction === "x1") {
        keldor.x -= 5;
        steps +=1;
    }else if(direction === "y2") {
        keldor.y += 5;
        steps +=1;
    }else if(direction === "x2") {
        keldor.x += 5;
        steps +=1;
    }else {
        keldor.vel.x = 0;
        keldor.vel.y = 0;
    };
}

function keldorScore() {
    let desired;

    if(steps % 4 === 0) {
        desired = "y1";
    }else if(steps % 3 === 0) {
        desired = "x1";
    }else if(steps % 2 === 0) {
        desired = "y2";
    }else if(steps % 1 === 0) {
        desired = "x2";
    }

    if(the_direction === desired) {
        score += 1;
        scores[the_direction] += 1;
        scores["total"] = score;
        console.log(scores);
    }
}

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
            d = findDirection();
            h = "";
        }
    }else {
        d = findDirection;
        h = "";
    }

    let i = d+h;

    //console.log(i);
    
    return i;
}