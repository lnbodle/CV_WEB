// Autodetect, create and append the renderer to the body element



var main = document.getElementById('shapes')

var time = 0;

var renderer = PIXI.autoDetectRenderer(256,256, { backgroundColor: 0x000000, antialias: true });
main.appendChild(renderer.view);


var stage = new PIXI.Container();


var graphics = new PIXI.Graphics();


graphics.beginFill(0xe74c3c); 
graphics.drawCircle(0, 0, 40);
graphics.endFill();



stage.addChild(graphics);


animate();
function animate() {

    renderer.render(stage);
    time += 0.05;

    graphics.x = renderer.width/2 + Math.sin(time)*24;
    graphics.y = renderer.height/2 - Math.cos(time)*24;

    const parent = renderer.view.parentNode;
	renderer.resize(parent.clientWidth, parent.clientHeight);

    requestAnimationFrame(animate);
}

var ratio = 1;

