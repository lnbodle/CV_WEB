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

var count = 0;
app.ticker.add(() => {
    count += 0.005;

    thing.clear();
    thing.lineStyle(2, 0xff0000, 1);
    thing.beginFill(0xffFF00, 1);
    //thing.moveTo(0 + Math.sin(0) * 100, 0 - Math.cos(0) * 100);
    for (var i = 0 ; i < 2*Math.PI ; i+= Math.PI*2/20) {
        let px = 0 + Math.sin(i + count) * (70+simplex.noise2D(i+count,i)*30);
        let py = 0 - Math.cos(i + count) * (70+simplex.noise2D(i+count,i)*30);
        thing.lineTo(px, py);
    }
    thing.closePath();
});

function resizeView() {
    const parent = app.view.parentNode;
	app.renderer.resize(parent.clientWidth, parent.clientHeight);
}

