var iteration_count = 10;

var player;

var steps;
var followDirection;
var scores;
var didScore
var average;
var ranking1;
var ranking2;

function setup() {
    let screen = createCanvas(400,400);
    screen.position(0,0);

    player = new Group();
    player.width = 50;
    player.height = 50;
    player.collider = 'n';


    steps = [];
    steps.length = iteration_count;

    followDirection = [];
    followDirection.length = iteration_count;

    scores = [];
    scores.length = iteration_count;

    didScore = [];
    didScore.length = iteration_count;

    average = [];
    average.length = iteration_count;

    ranking1 = [];
    ranking1.length = iteration_count;

    ranking2 = [];
    ranking2.length = iteration_count;

    for(let i=0; i<iteration_count; i++) {
        new player.Sprite(200,200);

        steps[i] = 0;

        scores[i] = 0;

        didScore[i] = false;

        localStorage.removeItem("path"+(i+1));
    }
}

function draw() {
    background("black");

    if(frameCount % 250 === 0) {
        clear();
    }

    if(steps[0] < 100) {
        for(let i = 0; i<iteration_count; i++) {
            if(frameCount % 5 === 0) {
                moveKeldor(i);
                scoreKeldor(i);
                rankKeldor(i);
                saveKeldor(i);
            }
        }
    }
}

function moveKeldor(iteration) {
    let pickDirection = Math.floor(random(0,4)+1);

    switch(pickDirection) {
        case 1:
            followDirection[iteration] = "up";
            break;
        case 2:
            followDirection[iteration] = "left";
            break;
        case 3:
            followDirection[iteration] = "down";
            break;
        case 4:
            followDirection[iteration] = "right";
            break;
    }

    move(iteration, followDirection[iteration]);
}

function scoreKeldor(iteration) {
    let shouldScore = steps[iteration];
    let desiredDirection;
    if(shouldScore % 4 === 0) {
        desiredDirection = "up";
    }else if(shouldScore % 3 === 0) {
        desiredDirection = "left";
    }else if(shouldScore % 2 === 0) {
        desiredDirection = "down";
    }else if(shouldScore % 1 === 0) {
        desiredDirection = "right";
    }

    if(desiredDirection === followDirection[iteration]) {
        scores[iteration] += 1;
        didScore[iteration] = true;
    }else {
        didScore[iteration] = false;
    }

    average[iteration] = scores[iteration]/steps[iteration];
}

function rankKeldor(iteration) {
    ranking1[iteration] = average[iteration];

    ranking1 = ranking1.sort(function (a, b) {  return a - b; });

    for(let i = 0; i<iteration_count; i++) {
        if(ranking1[i] === average[iteration]) {
            ranking2[iteration] = (i+1);
        }
    }

    console.log("iteration "+(iteration+1)+" is rank "+ ranking2[iteration]);

}


function saveKeldor(iteration) {
    let find_path = localStorage.getItem("path"+(iteration+1));
    let path;

    if(find_path === null){
        path = {
            "path": []
        }
    }else {
       path = JSON.parse(find_path);
    }

    let score = {
        "steps": steps[iteration],
        "direction": followDirection[iteration],
        "score": scores[iteration],
        "didScore": didScore[iteration],
        "score/step": average[iteration],
        "ranking": ranking2[iteration],
        "position": {
            "x": player[iteration].x,
            "y": player[iteration].y
        }
    }

    path["path"].push(score);
    
    let exportPath = JSON.stringify(path);

    localStorage.setItem("path"+(iteration+1), exportPath);
}



function move(iteration,direction) {
    if(direction === "up") {
        player[iteration].y -= 5;
    }
    
    if(direction === "left") {
        player[iteration].x -= 5;
    }
    
    if(direction === "down") {
        player[iteration].y += 5;
    }
    
    if(direction === "right") {
        player[iteration].x += 5;
    }

    steps[iteration] += 1;
}