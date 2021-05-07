var circles = document.getElementsByClassName('window');
var globalAngle = 0;
var previousAngle = 0;
var lerpAngle = 0;
var index = 0;
var swiping = false;
var swipDir = 0;

var screenWidth = window.innerWidth ;
var screenHeight = window.innerHeight;


window.onload = function() {
  //rotateArround();


}

var angles = [];
for (var i = 0 ; i<Math.PI*2 ; i+= (Math.PI*2)/circles.length) {
  angles.push(i);
  console.log(angles);
}

function animate() {

  globalAngle = globalAngle%(2*Math.PI);
  if (globalAngle < 0) globalAngle = 2*Math.PI;
   

    rotateArround();
    
    if (!swiping) {
      var is_clock = false;
      if (swipDir > 0) {is_clock = true;} else {is_clock = false;} 

      var wantedAngle = closest(globalAngle,angles);
      globalAngle = lerp(globalAngle,wantedAngle,0.1);
      previousAngle = wantedAngle;
    } else {
      
    }

    /*if (globalAngle > 2*Math.PI) globalAngle = 0;
    if (globalAngle < 0) globalAngle = Math.PI*2;*/



  // Start next frame
  requestAnimationFrame(animate);
}

// Start animation
animate();

var touchXstart = 0;
var touchYstart = 0;

var touchXend = 0;
var touchYend = 0;



function closest(needle, haystack) {
  return haystack.reduce((a, b) => {
      let aDiff = Math.abs(a - needle);
      let bDiff = Math.abs(b - needle);

      if (aDiff == bDiff) {
          return a > b ? a : b;
      } else {
          return bDiff < aDiff ? b : a;
      }
  });
}

window.addEventListener('touchstart',function(e) {
  touchXstart = e.changedTouches[0].pageX;
  console.log(touchXstart);
});

window.addEventListener('touchmove',function(e){
  var touchobj = e.changedTouches[0]
  touchXend = touchobj.pageX;

  swiping = true;

  var dir = touchXend - touchXstart;
  globalAngle = map_range(dir,-screenWidth/2,screenWidth/2,-Math.PI/2,Math.PI/2) + previousAngle;
});

window.addEventListener('touchend',function(e){
  var touchobj = e.changedTouches[0]

  previousAngle = globalAngle;

  swipDir = Math.sign(touchXend - touchXstart);
 // updateRotation(-swipDir);
  console.log(globalAngle);
  swiping = false;
});



function updateRotation(direction) {
 /* globalAngle -= ((2 * Math.PI) / circles.length) * direction;*/

    index += direction;
    if (index > circles.length-1) index = 0;
    if (index < 0) index = circles.length-1;
}

window.onwheel = function() {
   // updateRotation(detectMouseWheelDirection(););
  }

if ( window.addEventListener ) {
    document.addEventListener( 'DOMMouseScroll', function( e ) {
        /*var scrollDirection = detectMouseWheelDirection( e );*/
      //  updateRotation(detectMouseWheelDirection(););

    });
}

function rotateArround() {

 
  //lerp(lerpAngle, globalAngle, 0.12);
  


  for (var i = 0; i < circles.length; i++) {

    var circle = circles[i];

    var angle = map_range(i, 0, circles.length, 0, Math.PI * 2.0) + globalAngle;

    var x = Math.round(screenWidth  / 2 + Math.sin(angle) * screenWidth / 3 - circle.offsetWidth / 2);
    var y = Math.round(screenHeight / 2 - Math.cos(angle) * -screenWidth / 7 - circle.offsetHeight /2 ) ;

    if (i==index) {
      circle.classList.add('selected') 

    } else {
      if (circle.classList.contains('selected')) {
          circle.classList.remove('selected');
      }
    }

    var size = (1 + Math.sin(angle + Math.PI / 2) * 0.7);
    size = map_range(size, -0.7, 1.7, 0, 1);
   
    var h = size*100;          // 556.845
    h = Math.round(h); // 556
    h = h/100; 

    //console.log(h);

    //size = map_range(y, -100, 100, 0, 1);

    circle.style.zIndex = Math.floor(y);
    circle.style.opacity = h;
    circle.style.filter = "blur(" + (1-(size))*16 + "px)"
    circle.style.transform =  "translate("+(x)+"px,"+(y)+"px)" + "scale(" + h + ")" ;
 
  }
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}
  
function detectMouseWheelDirection(e) {
    var delta = null,
      direction = false;
    if (!e) { // if the event is not provided, we get it from the window object
      e = window.event;
    }
    if (e.wheelDelta) { // will work in most cases
      delta = e.wheelDelta / 60;
    }
    if (e.detail) { // fallback for Firefox
      delta = -e.detail / 2;
    }
    if (delta !== null) {
      direction = delta > 0 ? -1 : 1;
    }
    return direction;
}