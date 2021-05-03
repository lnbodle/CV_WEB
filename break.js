
var _break = function(p) {
    var time = 0;
    var blocks = []
    var sketchCanvas;
    var player;
    var ball;
    p.setup = function() {
        sketchCanvas = p.createCanvas(256,256,p.WEBGL);
        sketchCanvas.parent('#_break');

        

        p.colorMode(p.HSB, 100);
        
        for (var i = 0 ; i< 10 ; i++) {
            for (var j = 0 ;  j<2 ; j++) {
             //  blocks.push(new Block(i*68,32+j*36,64,32));
            }
        }

        //player = new Player(0,p.height-64,64,16);
        //ball = new Ball(p.width/2,p.height-100,16);
    };
  
    p.draw = function() {
        p.translate(-p.width/2, -p.height/2);
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2);
        p.background(0,0,0,0);
        for (var i=0 ; i<blocks.length ; i++) {
            //blocks[i].display();
        }
        //player.display();
        //ball.display();
        

        p.ellipse(p.mouseX,p.mouseY,5,5);
        resizeCanvas('_break');
    };

    function resizeCanvas(div) {
        var canvasDiv = document.getElementById(div);
        var w = canvasDiv.offsetWidth;
        var h = canvasDiv.offsetWidth;
        p.resizeCanvas(w,h);
    }

    var circRect = function(cx, cy, rad, rx, ry, rw, rh) {
        let testX = cx;
         let testY = cy;
         
         if (cx < rx)         testX = rx;      // test left edge
         else if (cx > rx+rw) testX = rx+rw;   // right edge
         if (cy < ry)         testY = ry;      // top edge
         else if (cy > ry+rh) testY = ry+rh;   // bottom edge
         
         let d = p.dist(cx, cy, testX, testY);
         
           if (d <= rad) {
           return true;
         }
         return false;
       
    }

    class Block {
        constructor(x,y, width,height) {
          this.x = x;
          this.y = y;
          this.height = height;
          this.width = width;
        }

        display() {
            p.rect(this.x,this.y,this.width,this.height);
        }
    };

    class Player {
        constructor(x,y, width,height) {
            this.x = x;
            this.y = y;
            this.height = height;
            this.width = width;
          }
  
          display() {
              this.x = p.mouseX;
              p.rect(this.x,this.y,this.width,this.height);
          }
    };

    class Ball {
        constructor(x,y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.dir = 0;
            this.speed = 5;
          }
  
          display() {
              this.x += p.sin(this.dir)*this.speed;
              this.y -= p.cos(this.dir)*this.speed;
              p.ellipse(this.x,this.y,this.size);

              for (var i = blocks.length -1 ; i>=0 ; i--) {
                  var b = blocks[i];
                  if (circRect(this.x,this.y,this.size/2,b.x,b.y,b.width,b.height)) {
                      this.dir += p.PI + 1;
                       blocks.splice(i,1);
                  }
              }

              if (p.dist(this.x,this.y,p.width,p.height)>(p.width/2)) {
                  this.dir += p.PI + 1;
              }

              if (circRect(this.x,this.y,this.size/2,player.x,player.y,player.width,player.height)) {
                this.dir += p.PI + 1;
            }
          }
    };

};