var main = document.getElementById('shapes')
const app = new PIXI.Application({autoResize: true, transparent: true, antialias: true });
main.appendChild(app.view);
app.stage.interactive = true;

app.stage.on("pointermove",updateMousePosition);

var mouseX = 0;
var mouseY = 0;
function updateMousePosition(e) {
    var m = e.data.global;
    mouseX = m.x;
    mouseY = m.y;
}

resizeView();

var simplex = new SimplexNoise();

const thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.x = app.renderer.width / 2;
thing.y = app.renderer.height / 2;

var time = 0;





app.ticker.add(() => {
    time += 1;

    thing.clear();
    thing.lineStyle(2, 0xFFFFFF, 1);
    thing.beginFill(0xffFF00, 0);

    //var pos = new PIXI.Point(0,0);
    var size = 40;
    var prec = 10;
    var rotSpeed = 100;

    var noise = 50+simplex.noise2D(0+time/rotSpeed,0)*size;
        let px = 0 + Math.sin(0 + time/rotSpeed) * noise;
        let py = 0 - Math.cos(0 + time/rotSpeed) * noise;
    thing.moveTo(px, py );
    for (var i = 0 ; i < 2*Math.PI ; i+= Math.PI*2/prec) {


        var noise = 50+simplex.noise2D(i+time/rotSpeed,0)*size;
        let px = 0 + Math.sin(i + time/rotSpeed) * noise;
        let py = 0 - Math.cos(i + time/rotSpeed) * noise;

        thing.lineTo(px, py);
    }
    thing.closePath();
});






function resizeView() {
    const parent = app.view.parentNode;
	app.renderer.resize(parent.clientWidth, parent.clientHeight);
}

function distance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
