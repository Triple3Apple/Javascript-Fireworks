// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// Modified by: Triple3Apple


const fireworks = [];
let gravity;
let fireworkChance = 0.03;      // increase firework chance when it is a current time

// new
let canvas;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  
  // new
  canvas.position(0, 0);
  canvas.style("z-index", "1")
  
  colorMode(HSB);
  gravity = createVector(0, 0.2);       // y = 0.2 for the vector will act like gravity
  stroke(255);
  strokeWeight(4);
  background(0);
}

// TODO: Add a way to make special fireworks go off at every hour?

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  clear()
  
  if (random(1) < fireworkChance) {
    // TODO: allow users to choose what they want for the fireworks 
    // create fireworks (firework types, hasRandomAngle, willSparkle)
    // 1 = normal firework, 2 = creeper firework
    let fireworkTypesChosen = [3];   // make this chooseable via WPE
    fireworks.push(new Firework(fireworkTypesChosen, false, true));    // Creates FIREWORK object!!!!!!!!!!!
  }
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
