var player;

var scores = [
    0,
    0,
     0, 
    0,
]

var arr, max;

var total_score = findTotal();

function setup() {
    let screen = createCanvas(400,400);
    screen.position(0,0);

    player = new Sprite(200,200,50,50);
}

function draw() {
    background("black");
}

function findTotal() {
    let total  = (scores["u"]+scores["l"]+scores["d"]+scores["r"]);
    return total;
}

function findDirection() {
    let directional_wants = [
        Math.floor(random(0,1)),
        Math.floor(random(0,1)),
        Math.floor(random(0,1)),
        Math.floor(random(0,1))
    ]

    let directional_weight = [
        total_score - (scores[0]/total_score),
        total_score - (scores[1]/total_score),
        total_score - (scores[2]/total_score),
        total_score - (scores[3]/total_score),
    ]

    let directional_needs = [
        directional_wants[0] * directional_weight[0],
        directional_wants[1] * directional_weight[1],
        directional_wants[2] * directional_weight[2],
        directional_wants[3] * directional_weight[3],
    ]
}