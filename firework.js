// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// Modified by: Triple3Apple

class Firework {

    // fireworkTypes holds array of firework types (11 = normal fireworks, 12 = creeper fireworks, 13 = heart)
    // hasRandomAngle is a bool that determines if fireworks have a random angle
    // sparkle (bool) decides whether the firework particle will sparkle
    constructor(fireworkTypes, hasRandomAngle, sparkle, fireworkPatterns, isTime, timeDigit) 
    {
        this.hu = random(255);
        if (timeDigit == null)
        {
            this.firework = new Particle(random(width), height, this.hu, true);
        }
        else
        {
            switch (timeDigit)
            {
                case 1:
                    this.firework = new Particle(width/5, height, this.hu, true);
                    break;
                case 2:
                    this.firework = new Particle((width/5 + width/5), height, this.hu, true);
                    break;
                case 3:
                    this.firework = new Particle((width/5 + width/5 + width/5), height, this.hu, true);
                    break;
                case 4:
                    this.firework = new Particle((width/5 + width/5 + width/5 + width/5), height, this.hu, true);
                    break;
                case 5:
                    this.firework = new Particle((width/5 + width/5 + width/5 + width/5 + width/5), height, this.hu, true);
                    break;
                default:
                    console.log("error!!!!!!!!!!!");
                    this.firework = new Particle(random(width), height, this.hu, true);
                    break;
            }
        }
        
        this.exploded = false;
        this.particles = [];      // will be filled once firework explodes, explode()
        //this.patterns = new FireworkPatterns();
        this.patterns = fireworkPatterns;
        if (isTime != null)
        {
            this.sway = createVector(0, 0);
        }
        else
        {
            this.sway = createVector(random(-0.02, 0.02), 0);
        }
        //this.sway = createVector(random(-0.02, 0.02), 0);
        this.willSparkle = sparkle;
        this.types = fireworkTypes; // holds array of firework types (1 = normal fireworks, 2 = creeper fireworks)
        this.hasRandomAngle = hasRandomAngle;
        console.log(this.patterns);
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
                //let randomIndex = this.types[random(0, this.types.length - 1)];
                let randomIndex = this.types[Math.floor(Math.random() * this.types.length)];
                console.log(randomIndex);
                this.explode(randomIndex, this.hasRandomAngle);
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
    explode(fireworkType, hasRandomAngle) {
        // generate random firework size
        let fireworkSize = random(3, 6);

        // TODO: select a random pattern?
        let selectedPattern;
        switch (fireworkType)
        {
            case -1:
                selectedPattern = this.patterns.colonVectorArray;
                hasRandomAngle = false; // we dont want angle for numbers
                break;
            case 0:
                selectedPattern = this.patterns.numberZeroVectorArray;
                hasRandomAngle = false;
                break;
            case 1:
                selectedPattern = this.patterns.numberOneVectorArray;
                hasRandomAngle = false;
                break;
            case 11: // regular firework
                selectedPattern = null;
                break;
            case 12: // creeper firework
                selectedPattern = this.patterns.creeperVectorArray;
                break;
            case 13: // heart firework
                selectedPattern = this.patterns.heartVectorArray;
                break;
            default:
                selectedPattern = null;
                break;
            
        }
        //let selectedPattern = this.patterns.creeperVectorArray;
              // create a particle at each pattern index
        //console.log(selectedPattern);

        if (selectedPattern == null)
        {
            for (let patternIndexTemp = 0;  patternIndexTemp < 50; patternIndexTemp++) {
                const p = new Particle(
                    this.firework.pos.x, 
                    this.firework.pos.y, 
                    this.hu, 
                    false, 
                    patternIndexTemp, 
                    selectedPattern, 
                    this.willSparkle,
                    fireworkSize);

                this.particles.push(p);
                //patternIndex++;
            }
        }
        else
        {
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

            // Creating the small particles
            for (let patternIndexTemp = 0;  patternIndexTemp < selectedPattern.length; patternIndexTemp++) {
                const p = new Particle(
                    this.firework.pos.x, 
                    this.firework.pos.y, 
                    this.hu, 
                    false, 
                    patternIndexTemp, 
                    selectedPattern, 
                    this.willSparkle,
                    fireworkSize);

                this.particles.push(p);
                //patternIndex++;
            }
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