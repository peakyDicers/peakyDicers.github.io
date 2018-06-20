let stars = [];
let numStars = 100;
let maxDistance = 150;
let counter = 0;

let r = 50;
let g = 100;
let b = 0;

let toggleR = true;
let toggleG = true;
let toggleB = true;

let canvas = {
    width: window.innerWidth,
    height: window.innerHeight
}

let center = {
    x: canvas.width/2,
    y: canvas.height/2
};

function windowResized() {
    canvas = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    center = {
        x: canvas.width/2,
        y: canvas.height/2
    };
    resizeCanvas(canvas.width, canvas.height);
  }

function setup() {
    background(51);
    var sketch = createCanvas(canvas.width, canvas.height);
    //sketch.position(0,0);
    sketch.parent('sketch-holder');
    //sketch.style('display', 'block');
    translate(canvas.width/2, canvas.height/2);
    center.x = canvas.width/2;
    center.y = canvas.height/2;
    
    for (let i = 0; i < numStars; i++){
        let x = Math.random() * canvas.width - center.x;
        let y = Math.random() * canvas.height - center.y;
        let z = maxDistance;
        stars.push(new Star(x, y, z, 3, 3));
    }
  }

function draw(){
    clear();
    if (counter == 0){
        if (toggleR) 
        r++; 
    else
        r--;

    if (toggleG)
        g++;
    else 
        g--;
        if (r > 120 || r < 20) toggleR = !toggleR;
        if (g > 120 || g < 20) toggleG = !toggleG;
        if (b > 120 || b < 20) toggleB = !toggleB;
    }
    counter++;
    if (counter == 4) counter = 0;
   
    background(r,g,b);
    for (let i = 0; i < stars.length; i++){
        if (stars[i].z != 0)
            stars[i].z--;

        if (stars[i].z < 1)
            stars[i].z = 100;
        let sx = (stars[i].x)/stars[i].z;
        let sy = (stars[i].y)/stars[i].z;

        
        stars[i].x += sx;
        stars[i].y += sy;
        
        if (Math.abs(stars[i].x) >= center.x || Math.abs(stars[i].y) >= center.y){
            stars[i].x = Math.random() * canvas.width - center.x;
            stars[i].y = Math.random() * canvas.height - center.y;
            stars[i].z = maxDistance;
        }

        let scale = stars[i].z/maxDistance;

        rect(stars[i].x + center.x, stars[i].y + center.y, stars[i].width/scale, stars[i].height/scale);
    }
}