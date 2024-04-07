var keldor;
var the_direction;

var steps;

var jerry;
var jerry_map;
var jerry_score_map;
var jerry_path_map;

var score_counter;

var iteration;

var scores = {
    "y1": 0,
    "x1": 0,
    "y2": 0,
    "x2": 0,
    "x_total": 0,
    "y_total": 0,
    "total": 0
};

var steps_counter = {
    "y1": 0,
    "x1": 0,
    "y2": 0,
    "x2": 0,
    "x_steps": 0,
    "y_steps": 0,
    "total": 0
}

function setup() {
    let screen = createCanvas(400,400);

    keldor = new Sprite(200,200,50,50);

    jerry = new Group();
    jerry.r = 1;
    jerry.collider = 'n';

    jerry_map = []
    jerry_map.length = screen.height+1;

    jerry_score_map = []
    jerry_score_map.length = screen.height+1;

    jerry_path_map = []
    jerry_path_map.length = screen.height+1;


    for(let i = 0; i < jerry_map.length; i++) {
        jerry_map[i] = [];
        jerry_map[i].length = screen.width+1;

        jerry_score_map[i] = [];
        jerry_score_map[i].length = screen.width+1;

        jerry_path_map[i] = [];
        jerry_path_map[i].length = screen.width+1;

        for(let j = 0; j<jerry_map[i].length; j++) {
            jerry_map[i][j] = 0;
            jerry_score_map[i][j] = 0;
            jerry_path_map[i][j] = {
                "x1":0,
                "y1":0,
                "x2":0,
                "y2":0
            };
        }
    }

    steps = 0;
}

function draw() {
    background("black");

    if(frameCount % 5 === 0) {
        keldorMove(findDirection());
        keldorScore();
        mapJerry();
    }

    if(keldor.x <= 0 || keldor.x >= 400 || keldor.y <= 0 || keldor.y >= 400) {
        let map_data = {
            "moveming_map": jerry_map,
            "direction_map": jerry_path_map,
            "scoring_map": jerry_score_map
        }
        //sessionStorage.setItem("map", JSON.stringify(map_data));
        location.reload();
    }
}

function keldorMove(direction){
    //console.log(direction)
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

    steps_counter[direction]++;
    steps_counter["x_steps"] = steps_counter["x1"]+steps_counter["x2"];
    steps_counter["y_steps"] = steps_counter["y1"]+steps_counter["y2"];
    steps_counter["total"] = steps_counter["x_steps"]+steps_counter["y_steps"];
}

function mapJerry() {
    jerry_map[parseInt(Math.floor(keldor.y))][parseInt(Math.floor(keldor.x))]++;
    jerry_path_map[parseInt(Math.floor(keldor.y))][parseInt(Math.floor(keldor.x))][the_direction]++;

    //console.log(jerry_map[Math.floor(keldor.y)][Math.floor(keldor.x)]);
    if(score_counter === true) {
        jerry_score_map[parseInt(Math.floor(keldor.y))][parseInt(Math.floor(keldor.x))]++;
        //console.log(jerry_score_map[parseInt(Math.floor(keldor.y))][parseInt(Math.floor(keldor.x))])
    }
    new jerry.Sprite(keldor.x, keldor.y);
}

function keldorScore() {
    let desired;

    if(steps % 4 === 0) {
        desired = "x2";
    }else if(steps % 3 === 0) {
        desired = "y2";
    }else if(steps % 2 === 0) {
        desired = "x1";
    }else if(steps % 1 === 0) {
        desired = "y1";
    }

    if(the_direction === desired) {
        scores[the_direction] += 1;
        scores["x_total"] = scores["x1"]+scores["x2"];
        scores["y_total"] = scores["y1"]+scores["y2"];
        scores["total"] = scores["x_total"]+scores["y_total"];
        score_counter = true;
       // console.log(scores);
    }else {
        score_counter = false;
    }
}

function findDirection() {
    let x_w1, x_w2, x_w, y_w1, y_w2, y_w, x1_w1, x1_w2, x1_w, x2_w1, x2_w2, x2_w, y1_w1, y1_w2, y1_w, y2_w1, y2_w2, y2_w;
    if(scores["total"] !== 0){ 
        x_w1 = steps_counter["total"] - steps_counter["x_steps"];
        y_w1 = steps_counter["total"] - steps_counter["y_steps"];
        x_w2 = scores["total"] - scores["x_total"];
        y_w2 = scores["total"] - scores["y_total"];

        x_w = (x_w1*x_w2);
        y_w = (y_w1*y_w2);

        let determine_axis = x_w-y_w;

        if(determine_axis > 0) {
            if(scores["x_total"] !== 0){
                x1_w1 = steps_counter["x_steps"] - steps_counter["x1"];
                x2_w1 = steps_counter["x_steps"] - steps_counter["x1"];
                x1_w2 = scores["x_total"] - scores["x1"];
                x2_w2 = scores["x_total"] - scores["x2"];

                x1_w = (x1_w1*x1_w2);
                x2_w = (x2_w1*x2_w2);

                let determine_x = x1_w-x2_w;

                if(determine_x > 0) {
                    return "x1"
                }else if(determine_x < 0){
                    return "x2";
                }else {
                    let i = Math.floor(random(0,2)+1);

                    switch(i) {
                        case 1:
                            return "x1";
                            break;
                        case 2:
                            return "x2";
                            break;
                    }
                }
            }else {
                let i = Math.floor(random(0,2)+1);

                switch(i) {
                    case 1:
                        return "x1";
                        break;
                    case 2:
                        return "x2";
                        break;
                }
            }
        }else if(determine_axis < 0) {
            if(scores["y_total"] !== 0) {
                y1_w1 = steps_counter["y_steps"] - steps_counter["y1"];
                y2_w1 = steps_counter["y_steps"] - steps_counter["y1"];
                y1_w2 = scores["y_total"] - scores["y1"];
                y2_w2 = scores["y_total"] - scores["y2"];

                y1_w = (y1_w1*y1_w2);
                y2_w = (y2_w1*y2_w2);

                let determine_y = y1_w-y2_w;

                if(determine_y > 0) {
                    return "y1"
                }else if (determine_y < 0){
                    return "y2";
                }else {
                    let i = Math.floor(random(0,2)+1);

                    switch(i) {
                        case 1:
                            return "y1";
                            break;
                        case 2:
                            return "y2";
                            break;
                    }
                }
            }else {
                let i = Math.floor(random(0,2)+1);

                switch(i) {
                    case 1:
                        return "y1";
                        break;
                    case 2:
                        return "y2";
                        break;
                }
            }
        }else {
            let i = Math.floor(random(0,4)+1);

            switch(i) {
                case 1:
                    return "y1";
                    break;
                case 2:
                    return "x1";
                    break;
                case 3:
                    return "y2";
                    break;
                case 4:
                    return "x2";
                    break;
            }
        }
    }else {
        let i = Math.floor(random(0,4)+1);

        switch(i) {
            case 1:
                return "y1";
                break;
            case 2:
                return "x1";
                break;
            case 3:
                return "y2";
                break;
            case 4:
                return "x2";
                break;
        }
    }
}