var circles = document.getElementsByClassName('window');
var globalAngle = 0;
var lerpAngle = 0;
var index = 0;



window.onload = function() {
  rotateArround();
}

function updateRotation() {
  globalAngle -= 2 * Math.PI / circles.length * detectMouseWheelDirection();

    index += detectMouseWheelDirection();
    if (index > circles.length-1) index = 0;
    if (index < 0) index = circles.length-1;
}

window.onwheel = function() {
    updateRotation();
    rotateArround();
  }

if ( window.addEventListener ) {
    document.addEventListener( 'DOMMouseScroll', function( e ) {
        /*var scrollDirection = detectMouseWheelDirection( e );*/
        updateRotation();
        rotateArround();
    });
}

function rotateArround() {

 
  lerpAngle = globalAngle//lerp(lerpAngle, globalAngle, 0.12);
  
  var screenWidth = window.innerWidth ;
  var screenHeight = window.innerHeight;

  for (var i = 0; i < circles.length; i++) {

    var circle = circles[i];

    var angle = map_range(i, 0, circles.length, 0, Math.PI * 2.0) + lerpAngle;

    var x = screenWidth  / 2 + Math.sin(angle) * screenWidth / 3 - circle.offsetWidth / 2;
    var y = screenHeight / 2 - Math.cos(angle) * -screenHeight / 5 - circle.offsetHeight / 2;

    if (i==index) {
      circle.classList.add('selected') 
    } else {
      if (circle.classList.contains('selected')) {
          circle.classList.remove('selected');
      }
    }

    var size = (1 + Math.sin(angle + Math.PI / 2) * 0.7);
    size = map_range(size, -0.3, 1.7, 0, 1);

    circle.style.zIndex = Math.floor(y);
    circle.style.opacity = size;
    circle.style.transform =  "translate("+(x)+"px,"+(y)+"px)" + "scale(" + size + ")" ;
 
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