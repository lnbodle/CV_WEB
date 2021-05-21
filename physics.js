// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.getElementById('physics'),
    canvas: document.getElementById('physics_canvas'),
    options: {
        hasBounds: true,
        wireframes: false,
        width : 300,
        height : 300,
        background: 'transparent',
        wireframeBackground: 'transparent'
    },
    engine: engine
});




var canvas = document.getElementById('physics_canvas');
//var parent = document.getElementById('physics');



var bodies = [];

for (var i = 0 ; i < 20 ; i++) {
    var b;

    var n = i%2;
    if (n == 0) {
        b = Bodies.rectangle(100, 100, 20, 20);
    } else {
        b = Bodies.circle(100, 100, 10, 10); 
    }
    bodies.push(b);
}

// create two boxes and a ground
var boxA = Bodies.rectangle(150, 20, 20, 20);
var boxB = Bodies.rectangle(150, 20, 20, 20);
var boxC = Bodies.circle(150, 50, 10);

var groundBottom = Bodies.rectangle(150, 170, 300, 20, { isStatic: true });
bodies.push(groundBottom);

var groundTop = Bodies.rectangle(150, 300, 300, 20, { isStatic: true });
bodies.push(groundTop );

var groundLeft = Bodies.rectangle(0, 150, 20, 300, { isStatic: true });

bodies.push(groundLeft);

var groundRight = Bodies.rectangle(300, 150, 20, 300, { isStatic: true });
bodies.push(groundRight);




groundBottom.render.visible = false;
groundTop.render.visible = false;
groundLeft.render.visible = false;
groundRight.render.visible = false;





// add all of the bodies to the world
Composite.add(engine.world, bodies);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

var u = 0;
function update() {
    u+= 0.01;
    requestAnimationFrame(update);
}
update();


window.addEventListener('mousemove',function(e) {


    
for (var i = 0 ; i < bodies.length ; i++) {
    var b = bodies[i];
    if (swiping) Body.applyForce( b, {x: b.position.x, y: b.position.y}, {x: swipDirFloat/40, y: 0});
}
  });


resizeView();

window.addEventListener("resize", resizeView)

function resizeView() {
    const parent = canvas.parentNode;
    render.options.width = parent.clientWidth;
    render.options.height = parent.clientWidth;


    Render.setPixelRatio(render, parent.clientWidth / parent.clientWidth);

    Render.lookAt(render, bodies, {
        x: 0,
        y: 0
      });
}
