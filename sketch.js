var iteration_count = 10;

var player;

var steps;
var followDirection;

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

    for(let i=0; i<iteration_count; i++) {
        new player.Sprite(200,200);

        steps[i] = 0;
    }

    localStorage.clear();
}

function draw() {
    background("black");

    if(frameCount % 250 === 0) {
        //clear();
    }

    if(steps[0] < 10) {
        for(let i = 0; i<iteration_count; i++) {
            if(frameCount % 20 === 0) {
                moveKeldor(i);
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

    console.log(followDirection[iteration]);
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
        "position": {
            "x": player[iteration].x,
            "y": player[iteration].y
        }
    }

    path["path"].push(score);

    localStorage.setItem("path"+(iteration+1), JSON.stringify(path));
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