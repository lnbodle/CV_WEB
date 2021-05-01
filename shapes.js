
var shapes = function(p) {
    var time = 0;

  
    p.setup = function() {
        var sketchCanvas = p.createCanvas(256,256,p.WEBGL);
        sketchCanvas.parent('#shapes');
        p.colorMode(p.HSB, 100);
    };
  
    p.draw = function() {
  
        p.background(0,0,0,0);
        time += 0.02;
        
           
              let size = 50;
     
             p.noFill();
            p.stroke(255);
            p.strokeWeight(2);
              strange(0,0,size,20,0);
   
        
        var canvasDiv = document.getElementById('shapes');
        var width = canvasDiv.offsetWidth;
        var height = canvasDiv.offsetHeight;
        p.resizeCanvas(width,height);
    };

    var strange = function(x,y,size,prec,index) {
       
        p.beginShape();
        for (let i = 0 ; i< 2*p.PI ; i+=2*p.PI/prec) {

            let n = -p.noise(i+time/2+index)*size;
            
            let px = x + p.sin(i+time)*(size+n);
            let py = y - p.cos(i+time)*(size+n);

            let d = p.dist(px,py,p.mouseX - p.width/2,p.mouseY-p.height/2);
            if (d<50) {
            px = x + p.sin(i+time)*(size+n)*2;
            py = y - p.cos(i+time)*(size+n)*2;
            }

            p.vertex(px, py);
            
        }
        p.endShape(p.CLOSE);
      };
  };