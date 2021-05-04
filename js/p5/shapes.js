var shapes = function(p) {
    var time = 0;

    p.setup = function() {
        var sketchCanvas = p.createCanvas(256, 256, p.WEBGL);
        sketchCanvas.parent('#shapes');
        p.colorMode(p.HSB, 100);
    };

    p.draw = function() {
        resizeCanvas('shapes');


        p.background(0, 0, 0, 0);
        time += 0.02;
        let size = p.width/2;
        p.fill(255);
        p.noStroke();
        p.strokeWeight(2);
        strange(0, 0, size, 10, 0);
    
    };

    function resizeCanvas(div) {
        var canvasDiv = document.getElementById('shapes');
        var w = canvasDiv.offsetWidth;
        var h = canvasDiv.offsetWidth;
        p.resizeCanvas(w,h);
    }

    function isActive() {
        var parent = document.getElementById('shapes').parentElement;
        
        if (parent.classList.contains('selected')) return true;
        return false;
    }

    var strange = function(x, y, size, prec, index) {
        p.beginShape();
        for (let i = 0; i < 2 * p.PI; i += 2 * p.PI / prec) {
            let n = -p.noise(i + time / 2 + index) * size / 2;
            let px = x + p.sin(i + time) * (size + n);
            let py = y - p.cos(i + time) * (size + n);
      
            if (isActive()) {
    
            let d = p.dist(px, py, p.mouseX - p.width / 2, p.mouseY - p.height / 2);
            if (d < size) {
                px = x + p.sin(i + time) * (d + n);
                py = y - p.cos(i + time) * (d + n);

            }
            }
            p.vertex(px, py);
        }
        p.endShape(p.CLOSE);
    };
};