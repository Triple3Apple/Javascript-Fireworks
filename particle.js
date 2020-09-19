// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// {0.0D, 0.2D}d, {0.2D, 0.2D}d, {0.2D, 0.6D}d, {0.6D, 0.6D}d, 
// {0.6D, 0.2D}d, {0.2D, 0.2D}d, {0.2D, 0.0D}d, {0.4D, 0.0D}d, 
// {0.4D, -0.6D}d, {0.2D, -0.6D}d, {0.2D, -0.4D}, {0.0D, -0.4D}
// let creeperVectors = [createVector(0, 2), createVector(2, 2), createVector(2, 6), createVector(6, 6),
//                       createVector(6, 2), createVector(2, 2), createVector(2, 0), createVector(4, 0),
//                       createVector(4, -6), createVector(2, -6), createVector(2, -4), createVector(0, -4)];
//let creeperVectors = [];

// CANT USE createVector() outside class????


// let creeperVectorsX =   [-3, -2, -1, 1, 2, 3,
//                         -3, -1, 1, 3,
//                         -3, -2, -1, 0, 1, 1, 3,
//                         -2, -1, 1, 1,
//                         -2, 2,
//                         -2, -1, 0, 1, 2,
//                         -2, -1, 1, 2];

// let creeperVectorsY =   [-3, -3, -3, -3, -3, -3,
//                         -2, -2, -2, -2,
//                         -1, -1, -1, -1, -1, -1, -1,
//                         0, 0, 0, 0,
//                         1, 1,
//                         2, 2, 2, 2, 2,
//                         3, 3, 3, 3];

let test = [121210, 1, 2, 3, 45, 4545, 4557345, 45246246, 23865];

class Particle {

    constructor(x, y, hu, hasExploded, index, chosenPatternArray) {
        this.pos = createVector(x, y);
        this.fireworkExploded = hasExploded;
        //this.lifespan = 255; //    - random(0, 200);        // firework lifetime
        this.lifespan = 275 - random(0, 90);
        this.hu = hu;
        this.acc = createVector(0, 0);      // acceleration
        if (!hasExploded) {
            this.particleIndex = index;
            this.vectorPatternArray = chosenPatternArray;
        }

        // if firework did not explode
        if (this.fireworkExploded) {
            this.vel = createVector(0, random(-18, -8));    // velocity, y determines how high firework will go, x is horizontal drift
            //this.vel = createVector(random(2, -2), random(-12, -8));      // this makes the fireworks curve a bit
        } else {
            // fire work has exploded
            //this.vel = p5.Vector.random2D();    // random 2d direction vector (original)
            //this.vel.mult(random(2, 10));       // how dar the partcles spread out, random(2, 100) creates huge fireworks

            //console.log(p5.Vector.random2D());
            //console.log(this.creeperVectors[random(creeperVectors.length)].creepVec);
            //console.log(this.creeperVectors[Math.floor(Math.random() * creeperVectors.length)].creepVec);

            //let randomIndex = Math.floor(Math.random() * creeperVectorsX.length)
            // new
            //console.log(randomIndex);
            //this.vel = createVector(creeperVectorsX[randomIndex], creeperVectorsY[randomIndex]);
            this.vel = this.vectorPatternArray[this.particleIndex];
            this.vel.mult(5);


            //this.vel = this.creeperVectors[random(0, creeperVectors.length)];
        }
    }



    // Force = mass * acceleration
    // for simplicity, acceleration = Force
    applyForce(force) {
        // dont forget "this"
        this.acc.add(force);    // adding force to acceleration
    }

    update() {
        if (!this.fireworkExploded) {
            this.vel.mult(0.9);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);     // adding acceleration to velocity
        this.pos.add(this.vel);     // adding velocity to position
        this.acc.mult(0);           // accleration at each moment of time will start at 0
    }

    done() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }

    show() {
        colorMode(HSB);

        if (!this.fireworkExploded) {
            strokeWeight(2);
            stroke(this.hu, 255, 255, this.lifespan);
        } else {
            strokeWeight(4);
            stroke(this.hu, 255, 255);
        }

        //creates a pixel at that point
        point(this.pos.x, this.pos.y);
    }
}