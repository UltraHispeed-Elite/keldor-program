var keldor;
var the_direction;

var steps;

var scores = {
    "y1": 0,
    "x1": 0,
    "y2": 0,
    "x2": 0,
    "x_total": 0,
    "y_total": 0,
    "total": 0
};

function setup() {
    createCanvas(400,400);

    keldor = new Sprite(200,200,50,50);

    steps = 0;
}

function draw() {
    background("black");

    if(frameCount % 5 === 0) {
        keldorMove(findDirection());
        keldorScore();
    }
}

function keldorMove(direction){
    console.log(direction);
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
        desired = "y2";
    }else if(steps % 3 === 0) {
        desired = "x2";
    }else if(steps % 2 === 0) {
        desired = "y1";
    }else if(steps % 1 === 0) {
        desired = "x1";
    }

    if(the_direction === desired) {
        scores[the_direction] += 1;
        scores["x_total"] = scores["x1"]+scores["x2"];
        scores["y_total"] = scores["y1"]+scores["y2"];
        scores["total"] = scores["x_total"]+scores["y_total"];
       // console.log(scores);
    }
}

function findDirection() {
    let x_w, y_w, x1_w, x2_w, y1_w, y2_w;
    if(scores["total"] !== 0){ 
        x_w = scores["total"] - scores["x_total"];
        y_w = scores["total"] - scores["y_total"];

        let determine_axis = x_w-y_w;

        if(determine_axis > 0) {
            if(scores["x_total" !== 0]){
                x1_w = scores["x_total"] - scores["x1"];
                x2_w = scores["x_total"] - scores["x2"];

                let determine_x = x1_w-x2_w;

                if(determine_x > 0) {
                    return "x1"
                }else {
                    return "x2";
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
        }else if(determine_axis < 0) {
            if(scores["y_total"] !== 0) {
                y1_w = scores["y_total"] - scores["y1"];
                y2_w = scores["y_total"] - scores["y2"];

                let determine_y = y1_w-y2_w;

                if(determine_y > 0) {
                    return "y1"
                }else {
                    return "y2";
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