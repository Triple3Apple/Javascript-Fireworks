// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// Modified by: Triple3Apple


const fireworks = [];
let gravity;
let fireworkChance = 0.01;      // increase firework chance when it is a current time

// new
let canvas;
let fireworkPatterns;

let date = new Date();
let nextMinute;
let timeSet = false;

function setup() {
  frameRate(60);
  let canvas = createCanvas(windowWidth, windowHeight);
  
  fireworkPatterns = new FireworkPatterns();

  // new
  canvas.position(0, 0);
  canvas.style("z-index", "1")
  
  colorMode(HSB);
  gravity = createVector(0, 0.2);       // y = 0.2 for the vector will act like gravity
  stroke(255);
  strokeWeight(4);
  background(0);

  //nextMinute = date.getMinutes() + 1;

  update(false);
  runClock();
}

// TODO: Add a way to make special fireworks go off at every hour?

function draw() {

  /*
  if (timeSet == false)
  {
    let d = new Date();
    console.log("nextMinute: " + nextMinute);
    let tempMinutes = d.getMinutes();
    console.log("current Minute: " + tempMinutes);
    if (tempMinutes == nextMinute)
    {
      nextMinute = tempMinutes + 1;
      timeSet = true;
      console.log("a minute has passed");
      let fireworkPatterns = new FireworkPatterns();
      let fireworkTypesChosen = [11];   // make this chooseable via WPE
      fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns, true));    // Creates FIREWORK object
      let fireworkPatterns1 = new FireworkPatterns();
      fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns1, true));
      fireworkTypesChosen = [-1];
      let fireworkPatterns2 = new FireworkPatterns();
      fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns2, true));
      fireworkTypesChosen = [11];
      let fireworkPatterns3 = new FireworkPatterns();
      fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns3, true));
      let fireworkPatterns4 = new FireworkPatterns();
      fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns4, true));
      setInterval(fireTimeFirework, 1000);  // every 60 seconds
      setInterval(verifyTime, 60000)
    }
  }
  */

  colorMode(RGB);
  //background(0, 0, 0, 25);
  clear()
  
  if (Math.random() < fireworkChance) 
  {
    let fireworkPatterns = new FireworkPatterns();
    // TODO: allow users to choose what they want for the fireworks 
    // create fireworks (firework types, hasRandomAngle, willSparkle)
    // 11 = normal firework, 12 = creeper, 13 = heart
    // -1 - colon, 0 = number 0, 1 = 1
    let fireworkTypesChosen = [8];   // make this chooseable via WPE
    fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns, null));    // Creates FIREWORK object
    
  }

  for (let i = fireworks.length - 1; i >= 0; i--) 
  {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}


// NEW ~~~ http://jsfiddle.net/jfriend00/u7Hc5/
function update(showSeconds) {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  if (!showSeconds) {
      // round the minutes
      if (seconds > 30) {
          ++minutes;
          if (minutes >= 60) {
              minutes -= 60;
              ++hours;
              if (hours >= 24) {
                  hours = 0;
              }
          }
      }
  }
  var str = (hours) + ":" + twoDigits(minutes);
  if (showSeconds) {
      str += ":" + twoDigits(seconds);
  }
  //document.getElementById(id).innerHTML = str;
  console.log(str);
}

function runClock() {
  var now = new Date();
  var timeToNextTick = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
  setTimeout(function() {
      update(false);
      runClock();
  }, timeToNextTick);

  // new

  let fireworkTypesChosen = [0];   // make this chooseable via WPE
  fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns, true));    // Creates FIREWORK object
  let fireworkPatterns1 = new FireworkPatterns();
  fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns1, true));
  fireworkTypesChosen = [-1];
  let fireworkPatterns2 = new FireworkPatterns();
  fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns2, true));
  fireworkTypesChosen = [12];
  let fireworkPatterns3 = new FireworkPatterns();
  fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns3, true));
  let fireworkPatterns4 = new FireworkPatterns();
  fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns4, true));
}  

function twoDigits(val) {
  val = val + "";
  if (val.length < 2) {
      val = "0" + val;
  }
  return val;
}

/*
function fireTimeFirework()
{
  let d = new Date();
  console.log("nextMinute: " + nextMinute);
  let tempMinutes = d.getMinutes();
  console.log("current Minute: " + tempMinutes);
  if (tempMinutes == nextMinute)
  {
    nextMinute = tempMinutes + 1;
    //timeSet = true;
    console.log("a minute has passed");
    let fireworkPatterns = new FireworkPatterns();
    let fireworkTypesChosen = [12];   // make this chooseable via WPE
    fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns, 1));    // Creates FIREWORK object
    let fireworkPatterns1 = new FireworkPatterns();
    fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns1, 2));
    let fireworkPatterns2 = new FireworkPatterns();
    fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns2, 3));
    let fireworkPatterns3 = new FireworkPatterns();
    fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns3, 4));
    let fireworkPatterns4 = new FireworkPatterns();
    fireworks.push(new Firework(fireworkTypesChosen, true, true, fireworkPatterns4, 5));
  }
}

function verifyTime()
{
  let d1 = new Date();
  let tempMinutes = d1.getMinutes();

  if (nextMinute != (tempMinutes + 1))
  {
    nextMinute = tempMinutes + 1;
  }
}
*/