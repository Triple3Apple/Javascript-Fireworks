// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// Modified by: Abrar Akhand

class Firework {

    // fireworkTypes holds array of firework types (1 = normal fireworks, 2 = creeper fireworks)
    // hasRnadomAngle is a bool that determines if fireworks have a random angle
    constructor(fireworkTypes, hasRandomAngle) {
        this.hu = random(255);
        this.firework = new Particle(random(width), height, this.hu, true);
        this.exploded = false;
        this.particles = [];      // will be filled once firework explodes, explode()
        this.patterns = new FireworkPatterns();
        this.sway = createVector(random(-0.02, 0.02), 0);

        this.types = fireworkTypes; // holds array of firework types (1 = normal fireworks, 2 = creeper fireworks)
        this.hasRandomAngle = hasRandomAngle;
    }

    done() {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        // if not exploded
        if (!this.exploded) {
            this.firework.applyForce(gravity);      // apply gravity
            this.firework.applyForce(this.sway);
            this.firework.update();

            // if velocity is getting positive (going down), then make firework explode
            if (this.firework.vel.y >= -1) {
                this.exploded = true;
                this.explode(1, this.hasRandomAngle);
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(createVector(0, 0.05));        // gravity of firework paricles
            this.particles[i].update();

            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    // create a bunch of particles
    explode(type, hasRandomAngle) {
        // TODO: select a random pattern?
        let selectedPattern = this.patterns.creeperVectorArray;
              // create a particle at each pattern index
        //console.log(selectedPattern);

        if (hasRandomAngle)
        {
            //USE THIS FOR LOOP IF ANGLE NEEDS TO BE Random
            // Dont know why the code below works.. (Figure Out)
            let min = Math.ceil(-90);
            let max = Math.floor(90);
            let angle = Math.floor(Math.random() * (max - min + 1)) + min;
            angle = angle * (Math.PI/180);  // converting to radian
            //console.log(angle);
            for (let patternIndexTemp = 0;  patternIndexTemp < selectedPattern.length; patternIndexTemp++)
            {
                let xTemp = selectedPattern[patternIndexTemp].x;
                let yTemp = selectedPattern[patternIndexTemp].y;
                selectedPattern[patternIndexTemp].x = (Math.cos(angle) * xTemp) + (yTemp * Math.sin(angle));
                selectedPattern[patternIndexTemp].y = (-Math.sin(angle) * xTemp) + (Math.cos(Math.PI/4) * yTemp);
            }
        }

        for (let patternIndexTemp = 0;  patternIndexTemp < selectedPattern.length; patternIndexTemp++) {
            

            //console.log(patternIndex);

            const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false, patternIndexTemp, selectedPattern);
            this.particles.push(p);
            //patternIndex++;
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show();
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}