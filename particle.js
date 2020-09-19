// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// Modified by: Triple3Apple
let test = [121210, 1, 2, 3, 45, 4545, 4557345, 45246246, 23865];

class Particle {

    // willSparkle controls whether the firework will sparkle
    constructor(x, y, hu, hasExploded, index, chosenPatternArray, willSparkle) {
        this.pos = createVector(x, y);
        this.fireworkExploded = hasExploded;
        //this.lifespan = 255; //    - random(0, 200);        // firework lifetime
        this.lifespan = 275 - random(0, 90);        // defualt = 275
        this.hu = hu;
        this.acc = createVector(0, 0);      // acceleration
        this.willSparkle = willSparkle;
        this.makeSparkleAppear = false;
        this.randomSparkleDuration = random(0, 10);
        this.sparkleTime = this.lifespan/2;

        // will be used to control sparkle
        this.satAndBalance = 255;

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
            this.lifespan -= 4;         // reduces firework lifespan

            // sparkle code
            if (this.willSparkle == true && this.lifespan < this.sparkleTime )
            {
                if (this.makeSparkleAppear == false)
                {
                    this.satAndBalance -= (30 - this.randomSparkleDuration);
                    if (this.satAndBalance <= 30) this.makeSparkleAppear = true;
                } 
                else 
                {
                    this.satAndBalance += (30 - this.randomSparkleDuration);
                    if (this.satAndBalance >= 220) this.makeSparkleAppear = false;
                }


                
            }
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
            // this.hu contols the color
            stroke(this.hu, this.satAndBalance, this.satAndBalance, this.lifespan);
        } else {
            strokeWeight(4);
            stroke(this.hu, 255, 255);
        }

        //creates a pixel at that point
        point(this.pos.x, this.pos.y);
    }
}