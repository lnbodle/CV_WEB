//Utilitaries function
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function rLerp (A, B, w){
  let CS = (1-w)*Math.cos(A) + w*Math.cos(B);
  let SN = (1-w)*Math.sin(A) + w*Math.sin(B);
  return Math.atan2(SN,CS);
}
  
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

function resizeView(m) {
    const parent = m.view.parentNode;
	app2.renderer.resize(parent.clientWidth, parent.clientHeight);
}

function distance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function direction(x1,y1,x2,y2) {
    return Math.atan2(y2-y1,x2-x1)- Math.PI/2;
}
