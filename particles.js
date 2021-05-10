var main2 = document.getElementById('particles')
const app2 = new PIXI.Application({autoResize: true, transparent: true, antialias: true });
main2.appendChild(app2.view);
app2.stage.interactive = true;

app2.stage.on("pointermove",updateMousePosition);

var mouseX = 0;
var mouseY = 0;

function updateMousePosition(e) {
    var m = e.data.global;
    mouseX = m.x;
    mouseY = m.y;
}

resizeView();

window.addEventListener('resize', function(event) {
    resizeView();
}, true);

class Particle {
    constructor(_x,_y,_size,_color) {
        this.graphics = new PIXI.Graphics();
        app2.stage.addChild(this.graphics);
        this.graphics.beginFill(_color,1);
        this.graphics.drawCircle(0,0,_size);
        this.graphics.endFill();
        this.x = _x;
        this.y = _y;
        this.size = _size;

     
    }

    draw() {      
        this.graphics.position.set(this.x, this.y);
        this.x += 1-Math.random()*2;
        this.y += 1-Math.random()*2;
    }

}

var particles = [];

for (var i = 0; i<app2.renderer.width ; i+=app2.renderer.width/20) {
    for (var j = 0; j<app2.renderer.height ; j+=app2.renderer.height/20) {

    var c = 0xFFFFFF;
    particles.push(new Particle(i,j,2 + Math.random()*3,c));
    }
}

var time = 0;
app2.ticker.add(() => {
    time += 1;  
    for (var i = 0 ; i < particles.length ; i++) {
        particles[i].draw();
    }
});

function resizeView() {
    const parent = app2.view.parentNode;
	app2.renderer.resize(parent.clientWidth, parent.clientHeight);
}

function distance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function direction(x1,y1,x2,y2) {
    return Math.atan2(y2-y1,x2-x1)- Math.PI/2;
}


