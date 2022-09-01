let _stage;

function init() {
    canvas = document.getElementById("artCanvas");
    canvas.width = window.innerWidth;

    // find end of github button using its offset from the body
    // use this to size canvas height
    let bodyR = document.body.getBoundingClientRect();
    let git = document.getElementById("git");
    let gitR = git.getBoundingClientRect();
    canvas.height = gitR.top+git.offsetHeight - bodyR.top;
    canvas.style.height = `${canvas.height}px`;
    var stage = new createjs.Stage("artCanvas");

    // black background
    var bg = new createjs.Shape();
    bg.graphics.beginFill("rgb(0,0,0)").drawRect(0,0,stage.canvas.width,stage.canvas.height);
    stage.addChild(bg);

    //
    let col = "rgba(8, 50, 255, 0.25)";
    let count;
    let r;
    if (window.innerWidth>window.innerHeight) {; // width > height, landscape view (ex: 1920x1080)
        count = 8;
        r = window.innerHeight/8;
    } else { // height > width, portrait view (ex: 360 x 740)
        count = 6;
        r = window.innerWidth/8;
    }
    for (let i = 0; i<count; i++) {
        let a = randomCircle(stage,col,r);
        stage.addChild(a);
    }
    
    stage.update();
    _stage = stage;
    createjs.Ticker.addEventListener("tick", handleTick);
}


function randomCircle(stage, color = "white", radius = "random") {
    radius = isNaN(parseInt(radius)) ? stage.canvas.height/8 +(-5+Math.random()*10) : radius;
    x = Math.random()*(stage.canvas.width-radius*2)+radius;
    y = Math.random()*(stage.canvas.height-radius*2)+radius;
    color = CSS.supports("color", color) ? color : "white";

    let circle = new createjs.Shape();
    circle.graphics.ss(Math.random()+3).beginStroke(color).drawCircle(x,y,radius);
    circle.accelX = -4+Math.random()*8;
    circle.accelY = -1.5+Math.random()*3;
    return circle;
}

function handleTick() {
    _stage.children.forEach(item => {
        if (item.accelX) {
            let x = item.graphics.command.x;
            let y = item.graphics.command.y;
            let radi = item.graphics.command.radius;

            x+=item.accelX;
            item.graphics.command.x=x;
            if (x < 0+radi || x>_stage.canvas.width-radi) item.accelX*=-1;

            y+=item.accelY;
            item.graphics.command.y=y;
            if (y < 0+radi || y>_stage.canvas.height-radi) item.accelY*=-1;
        }
    });
    _stage.update();
}