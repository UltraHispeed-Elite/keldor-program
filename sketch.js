var keldor_program = true;

var position_number;
var steps;
var desired_direction;
var score;
var followDirection;
var didScore;
var compareCount;

var ranking = [];
var ranking2;

var screen;

var player;

var iteration = findIteration();

function findIteration() {
    let find = localStorage.getItem("iteration");

    if(find !== null) {
        return parseInt(find)+1;
    }else {
        return 1
    }
}

var path_data = {
    "iteration": iteration,
    "path": [

    ]
}

console.log(iteration, path_data['iteration']);

function setup() {
    screen = createCanvas(400,400);
    screen.position(0,0);

    player = new Sprite(200,200,50,50);

    position_number = 0;
    steps = 0;
    score = 0;
}

function draw() {
    background('black');

    if(keldor_program === true) {
        keldor()
    }else {
        isUser();
    }
}

function keldor() {
    compareKeldor();
    if(frameCount % 24 === 0) {
        keldorMove();
        scoringKeldor();
        saveKeldor();
    }
}

function keldorMove() {
    let findDirection = Math.floor(random(0,4)+1);
    followDirection

    switch(findDirection) {
        case 1:
            followDirection = "up";
            break;
        case 2:
            followDirection = "left";
            break;
        case 3:
            followDirection = "down";
            break;
        case 4:
            followDirection = "right";
            break;
    }

    move(followDirection);
}

function scoringKeldor() {
    position_number = steps;
    if(position_number % 4 === 0) {
        desired_direction = "up";
    }else if(position_number % 3 === 0) {
        desired_direction = "left";
    }else if(position_number % 2 === 0) {
        desired_direction = "down";
    }else if(position_number % 1 === 0) {
        desired_direction = "right";
    }

    if(desired_direction === followDirection) {
        score += 1;
        console.log(steps, score);
        didScore = true;
    }else {
        didScore = false;
    }
}

function saveKeldor() {
    localStorage.setItem("iteration", iteration);

    path_data["path"].push({"direction":followDirection, "steps":steps, "did_score": didScore, "score":score})

    localStorage.setItem("path"+path_data['iteration'], JSON.stringify(path_data));
}

function compareKeldor() {
    if(iteration > 1) {
        if(kb.presses("p")) {
            for(let j = 0; j<iteration-1; j++) {
                let comparing = localStorage.getItem("path"+(j+1));
                let parse_compare = JSON.parse(comparing);
                let a = parse_compare["path"].length;
                let b = (Math.floor((parse_compare["path"][a-1]["score"]/parse_compare["path"][a-1]["steps"])*1000))/100;

                ranking.push(b);
                ranking.sort((a, b) => b - a);
                
                for(let k=0; k<ranking.length; k++) {
                    if(b === ranking[k]) {
                        if(b === ranking[0]) {
                            ranking2 = parse_compare["iteration"];
                        }
                    }
                }
            }
            console.log("iteration "+ranking2+" is the most efficient");
        }
    }
}

function isUser(){
    playerMovement();
}

function playerMovement() {
    if(kb.pressing('w')) {
        move("up");
    }

    if(kb.pressing('a')) {
        move("left");
    }

    if(kb.pressing('s')) {
        move("down");
    }

    if(kb.pressing('d')) {
        move("right");
    }
}

function move(direction) {
    if(direction === "up") {
        player.y -= 5;
    }else if(direction === "left") {
        player.x -= 5;
    }else if(direction === "down") {
        player.y += 5;
    }else if(direction === "right") {
        player.x += 5;
    }

    steps += 1;
}