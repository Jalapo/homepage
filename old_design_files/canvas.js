var _stage;
var canvas;
var ticker;
// if (document.readyState !== 'loading') {canvas = document.getElementById("artCanvas");init();} 
// else {document.addEventListener('DOMContentLoaded', () => {canvas = document.getElementById("artCanvas");init();});}
// document.getElementById("artCanvas");

function init() {
    
    canvas.width = window.innerWidth;
    // find end of github button using its offset from the body
    // use this to size canvas height
    let bodyR = document.body.getBoundingClientRect();
    let git = document.getElementById("git");
    let gitR = git.getBoundingClientRect();
    let shieldH = document.getElementById("canv-shield");
    shieldH.style.height = `${gitR.top+git.offsetHeight - bodyR.top}px`; // subtracting bodyR.top is unnecessary in this instance, bodyR.top=0;
    canvas.height = window.innerHeight;
    canvas.style.height = `${canvas.height}px`;
    let stg = new createjs.Stage("artCanvas");

    // black background
    var bg = new createjs.Shape();
    bg.graphics.beginFill("rgba(0,0,0,0)").drawRect(0,0,stg.canvas.width,stg.canvas.height);
    stg.addChild(bg);

    //
    createCircles(stg);
    
    stg.update();
    _stage = stg;
    ticker = createjs.Ticker.addEventListener("tick", handleTick);
}



function createCircles(stage) {
    // let col = "rgba(8, 50, 255, 0.25)";
    let col = "rgba(8, 50, 255, 0.12)";
    let count;
    let r;

    if (window.innerWidth>window.innerHeight) {; // width > height, landscape view (ex: 1920x1080)
        count = 8;
        r = window.innerHeight/8;
    } else { // height > width, portrait view (ex: 360 x 740)
        count = 6;
        r = window.innerWidth/8;
    }
    count = 12
    r=window.innerHeight/10;
    for (let i=0; i<count; i++) {
        let a = randomCircle(stage,col,r);
        stage.addChild(a);
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
}

function resizeCanvas(reveal = 0) {
    canvas=document.getElementById("artCanvas");
    canvas=_stage.canvas;
    if (reveal) {
        canvas.height = document.getElementById("content").getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        // console.log(canvas.height-document.body.getBoundingClientRect().top);
        // canvas.style.height = `${canvas.height}px`;
        // document.getElementById("artCanvas").style.height
        console.log(document.body.getBoundingClientRect().top);
        // console.log('$canvas.height');
        document.getElementById("artCanvas").style.height = `${canvas.height}px`;
    } else {
        canvas.height = window.innerHeight;
        canvas.style.height = `${canvas.height}px`;
    }
}

function handleTick() {
    _stage.children.forEach(item => {
        if (item.accelX) {
            let x = item.graphics.command.x;
            let y = item.graphics.command.y;
            let radi = item.graphics.command.radius;

            x+=item.accelX;
            item.graphics.command.x=x;
            if (x < 0+radi || x>_stage.canvas.width-radi) {
                if (x<0+radi) {
                    if (item.accelX<0) item.accelX*=-1;
                } else {
                    if (item.accelX>0) item.accelX*=-1;
                }
            }

            y+=item.accelY;
            item.graphics.command.y=y;
            if (y < 0+radi || y>_stage.canvas.height-radi) {
                if (y<0+radi) {
                    if (item.accelY<0) item.accelY*=-1;
                } else {
                    if (item.accelY>0) item.accelY*=-1;
                }
            }
        }
    });
    _stage.update();
}