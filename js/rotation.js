var circles = document.getElementsByClassName('window');



var globalAngle = 0;
var previousAngle = 0;
var lerpAngle = 0;
var index = 0;
var swiping = false;
var swipDir = 0;
var swipDirFloat = 0;

var screenWidth = window.innerWidth ;
var screenHeight = window.innerHeight;


//Creating angles list for magnet effect.
var angles = [];
for (var i = 0 ; i<=Math.PI*2 ; i+= (Math.PI*2)/circles.length) {
  angles.push(i);
 // console.log(angles);
}

//Main loop
function animate() {

  
  //globalAngle = globalAngle%(2*Math.PI);
  while (globalAngle < -Math.PI/circles.length) globalAngle += 2*Math.PI;
  while (globalAngle >= 2*Math.PI - 0.001) globalAngle -= 2*Math.PI;

  if (globalAngle > -0.1 && globalAngle < Math.PI/circles.length -0.1) {
    index = 0;
  } else {
    index = Math.round(map_range(globalAngle,0,Math.PI*2,circles.length,0));
  }
 
    rotateArround();
    
    if (!swiping) {
      var wantedAngle = closest(globalAngle,angles);
      previousAngle = wantedAngle;
      globalAngle = rLerp(globalAngle,wantedAngle,0.05);

      
      
    } 
    
  requestAnimationFrame(animate);
}
animate();

var touchXstart = 0;
var touchYstart = 0;

var touchXend = 0;
var touchYend = 0;

function actionStart(e) {
  var touchobj = e.changedTouches[0];
  touchXstart = touchobj.pageX;
}

function actionMove(e) {
  var touchobj = e.changedTouches[0];
  touchXend = touchobj.pageX;
  swiping = true;
  var dir = touchXend - touchXstart;
  globalAngle = map_range(dir,-screenWidth/2,screenWidth/2,-Math.PI/2,Math.PI/2) + previousAngle;

}

function actionEnd(e) {
  var touchobj = e.changedTouches[0];
  previousAngle = globalAngle;

  swipDir = Math.sign(touchXend - touchXstart);
  swiping = false;
}

window.addEventListener('resize',function(e) {
   screenWidth = window.innerWidth ;
   screenHeight = window.innerHeight;
});

//On mobile
window.addEventListener('touchstart',function(e) {
  actionStart(e);
});

window.addEventListener('touchmove',function(e){
  actionMove(e);
});

window.addEventListener('touchend',function(e){
  actionEnd(e);
});


//On computer
window.addEventListener('mousedown',function(e) {
  var mouseobj = e;
  touchXstart = mouseobj.pageX;
  console.log("click");
  swiping = true;
});

window.addEventListener('mousemove',function(e) {
  if (!swiping) return;
  var touchobj = e;
  touchXend = touchobj.pageX;

  var dir = touchXend - touchXstart;
  swipDirFloat = map_range(dir,0,screenWidth,0,1);


  globalAngle = map_range(dir,-screenWidth/2,screenWidth/2,-Math.PI/2,Math.PI/2) + previousAngle;

  console.log("pressed");
});

window.addEventListener('mouseup',function(e) {
  var touchobj = e;
  previousAngle = globalAngle;
  swipDir = Math.sign(touchXend - touchXstart);
  swiping = false;
  console.log("relased");
});


function rotateArround() {
  for (var i = 0; i < circles.length; i++) {

    var circle = circles[i];

    var angle = map_range(i, 0, circles.length, 0, Math.PI * 2.0) + globalAngle;

    var carousselWidth, carousselHeight;
    if (window.innerWidth > window.innerHeight) {

      carousselWidth =   screenWidth / 3;
      carousselHeight =  screenHeight / 7;
     } else {
      carousselWidth =   screenWidth /2;
      carousselHeight =  screenHeight / 7;
    }

    var x = Math.round((screenWidth  / 2 ) + Math.sin(angle) * carousselWidth)- circle.offsetWidth / 2;
    var y = Math.round((screenHeight / 2 ) + Math.cos(angle) * carousselHeight- circle.offsetHeight / 2);

    

    var size = (1 + Math.sin(angle + Math.PI / 2) * 0.7);
    size = map_range(size, -0.7, 1.7, 0, 1);
   
    var h = Math.round(size*100)/100;        
  
    circle.style.zIndex = Math.floor(y);
    circle.style.opacity = h;
    circle.style.filter = "blur(" + (1-(size))*16 + "px)"
    circle.style.transform =  "translate("+(x)+"px,"+(y)+"px)" + "scale(" + h + ")" ;


    if (i==index) {
      circle.classList.add('selected') 
      circle.style.zIndex = Math.floor(9999);
    } 
    else 
    {
      if (circle.classList.contains('selected')) {
          circle.classList.remove('selected');
      }
    }
  }
}
