var main2 = document.getElementById('particles')



const app2 = new PIXI.Application({autoResize: true, transparent: true, antialias: true });
main2.appendChild(app2.view);
app2.stage.interactive = true;

/*app2.view.classList.add('hidden')*/

app2.stage.on("pointermove",updateMousePosition);

var _mouseX = 0;
var _mouseY = 0;



var parent = app2.view.parentNode;
app2.renderer.resize(parent.clientWidth, parent.clientHeight);
window.addEventListener("resize", function (event) {
    const parent = app2.view.parentNode;
	app2.renderer.resize(parent.clientWidth, parent.clientHeight);
});

function updateMousePosition(e) {
    //var m = e.data.global;
    var m = app2.renderer.plugins.interaction.mouse.global;
    _mouseX = m.x;
    _mouseY = m.y;
}


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


        var directionCenter = direction(this.x,this.y,app2.renderer.width/2,app2.renderer.height/2);
        var distanceCenter = distance(this.x,this.y,app2.renderer.width/2,app2.renderer.height/2);
        var distanceMouse = distance(this.x,this.y,_mouseX,_mouseY);

        if (distanceMouse < 30) {
            this.x += Math.sin(directionCenter)*1
            this.y -= Math.cos(directionCenter)*1
        } else {
        if (distanceCenter < 50) {
        this.x += Math.sin(directionCenter + Math.PI/2)*1
        this.y -= Math.cos(directionCenter + Math.PI/2)*1

       
       
        } else {
        

        
            this.x += Math.sin(directionCenter + Math.PI)*1
            this.y -= Math.cos(directionCenter + Math.PI)*1
        
        }
    }

        

        
    }

}

var particles = [];

for (var i = 0; i<app2.renderer.width ; i+=app2.renderer.width/5) {
    for (var j = 0; j<app2.renderer.height ; j+=app2.renderer.height/5) {

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



