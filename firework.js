// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// Modified by: Triple3Apple

class Firework {

    // fireworkTypes holds array of firework types (11 = normal fireworks, 12 = creeper fireworks, 13 = heart)
    // hasRandomAngle is a bool that determines if fireworks have a random angle
    // sparkle (bool) decides whether the firework particle will sparkle
    constructor(fireworkTypes, hasRandomAngle, sparkle, fireworkPatterns, isTime, timeHours, timeMins) 
    {
        //this.hu = random(255);
        this.hu = this.getRandomInt(0, 255)
        if (timeHours == null)
        {
            this.firework = new Particle(random(width), height, this.hu, true);
        }
        else
        {
            this.firework = new Particle(random(width), height, this.hu, true);
            this.hour = timeHours;
            this.minute = timeMins;
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
        //console.log(this.patterns);
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
                //console.log(randomIndex);
                this.explode(randomIndex, this.hasRandomAngle);
            }
        }
        else
        {

        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(createVector(0, 0.05));        // gravity of firework paricles
            
            // this.getRandomArbitrary(min, max)
            this.particles[i].update();

            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    // create a bunch of particles
    explode(fireworkType, hasRandomAngle) {
        // generate random firework size
        //let fireworkSize = random(3, 6);
        let fireworkSize = this.getRandomArbitrary(3, 5);

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
            case 2:
                selectedPattern = this.patterns.numberTwoVectorArray;
                hasRandomAngle = false;
                break;
            case 3:
                selectedPattern = this.patterns.numberThreeVectorArray;
                hasRandomAngle = false;
                break;
            case 4:
                selectedPattern = this.patterns.numberFourVectorArray;
                hasRandomAngle = false;
                break;
            case 5:
                selectedPattern = this.patterns.numberFiveVectorArray;
                hasRandomAngle = false;
                break;
            case 6:
                selectedPattern = this.patterns.numberSixVectorArray;
                hasRandomAngle = false;
                break;
            case 7:
                selectedPattern = this.patterns.numberSevenVectorArray;
                hasRandomAngle = false;
                break;
            case 8:
                selectedPattern = this.patterns.numberEightVectorArray;
                hasRandomAngle = false;
                break;
            case 9:
                selectedPattern = this.patterns.numberNineVectorArray;
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

            case 20:  // time firework
                
                // temporary
                //selectedPattern = this.patterns.numberOneVectorArray;
                hasRandomAngle = false;

                // remove this
                selectedPattern = this.getCombinedTimePattern(this.hour, this.minute, this.patterns);

                //selectedPattern = this.getCombinedTimePattern(this.hour, this.minute, this.patterns);
                
                
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

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    getCombinedTimePattern(hoursNum, minutesNum, patterns) {

        let combinedTimePattern = this.patterns.colonVectorArray;
        console.log(combinedTimePattern);

        // hours
        if (hoursNum > 9)   // only one digit for hour, like 8:12
        {
            let firstDigitPattern; // tenth place digit
            let secondDigitPattern;

            if (hoursNum >= 20)
            {
                firstDigitPattern = patterns.numberTwoVectorArray;
            }
            else
            {
                firstDigitPattern = patterns.numberOneVectorArray;
            }

            // second digit
            
            var l = Math.pow(10, Math.floor(Math.log(hoursNum)/Math.log(10))-1);
            var b = Math.floor(hoursNum/l);
            var secondHourDigit = b - Math.floor(b/10) * 10;

            switch (secondHourDigit)
            {
                case 0:
                    secondDigitPattern = patterns.numberZeroVectorArray;
                    break;
                case 1:
                    secondDigitPattern = patterns.numberOneVectorArray;
                    break;
                case 2:
                    secondDigitPattern = patterns.numberTwoVectorArray;
                    break;
                case 3:
                    secondDigitPattern = patterns.numberThreeVectorArray;
                    break;
                case 4:
                    secondDigitPattern = patterns.numberFourVectorArray;
                    break;
                case 5:
                    secondDigitPattern = patterns.numberFiveVectorArray;
                    break;
                case 6:
                    secondDigitPattern = patterns.numberSixVectorArray;
                    break;
                case 7:
                    secondDigitPattern = patterns.numberSevenVectorArray;
                    break;
                case 8:
                    secondDigitPattern = patterns.numberEightVectorArray;
                    break;
                case 9:
                    secondDigitPattern = patterns.numberNineVectorArray;
                    break;
                default:
                    secondDigitPattern = patterns.colonVectorArray;
                    console.log("error in switch");
                    break;
            }

            // offsetting x of secondDigitPattern by 9
            for (var index = 0; index < secondDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(secondDigitPattern[index].x - 3, secondDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex)
                //secondDigitPattern[index].x = secondDigitPattern[index].x - 9;
                //combinedTimePattern[index]
            }

            for (var index = 0; index < firstDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(firstDigitPattern[index].x - 7, firstDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex)

                //firstDigitPattern[index].x = firstDigitPattern[index].x - 15;
            }

            //combinedTimePattern.concat(secondDigitPattern, firstDigitPattern);  // added the first/second digit of the hour
            console.log(combinedTimePattern);

            console.log("2nd hour digit");
            console.log(secondHourDigit);

            //return combinedTimePattern;         //    <---- remove this!
            
        }
        else
        {
            let secondDigitPattern;

            switch (hoursNum)
            {
                case 0:
                    secondDigitPattern = patterns.numberZeroVectorArray;
                    break;
                case 1:
                    secondDigitPattern = patterns.numberOneVectorArray;
                    break;
                case 2:
                    secondDigitPattern = patterns.numberTwoVectorArray;
                    break;
                case 3:
                    secondDigitPattern = patterns.numberThreeVectorArray;
                    break;
                case 4:
                    secondDigitPattern = patterns.numberFourVectorArray;
                    break;
                case 5:
                    secondDigitPattern = patterns.numberFiveVectorArray;
                    break;
                case 6:
                    secondDigitPattern = patterns.numberSixVectorArray;
                    break;
                case 7:
                    secondDigitPattern = patterns.numberSevenVectorArray;
                    break;
                case 8:
                    secondDigitPattern = patterns.numberEightVectorArray;
                    break;
                case 9:
                    secondDigitPattern = patterns.numberNineVectorArray;
                    break;
                default:
                    secondDigitPattern = patterns.colonVectorArray;
                    break;
            }

            for (var index = 0; index < secondDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(secondDigitPattern[index].x - 3, secondDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex);
                //secondDigitPattern[index].x = secondDigitPattern[index].x - 9;
                //combinedTimePattern[index]
            }

            //return combinedTimePattern;         //    <---- remove this!
        }

        // minutes

        let firstDigitPattern; // tenth place digit
        let secondDigitPattern;

        

        if (minutesNum < 10)
        {
            firstDigitPattern = patterns.numberZeroVectorArray;

            switch (minutesNum)
            {
                case 0:
                    secondDigitPattern = patterns.numberZeroVectorArray;
                    break;
                case 1:
                    secondDigitPattern = patterns.numberOneVectorArray;
                    break;
                case 2:
                    secondDigitPattern = patterns.numberTwoVectorArray;
                    break;
                case 3:
                    secondDigitPattern = patterns.numberThreeVectorArray;
                    break;
                case 4:
                    secondDigitPattern = patterns.numberFourVectorArray;
                    break;
                case 5:
                    secondDigitPattern = patterns.numberFiveVectorArray;
                    break;
                case 6:
                    secondDigitPattern = patterns.numberSixVectorArray;
                    break;
                case 7:
                    secondDigitPattern = patterns.numberSevenVectorArray;
                    break;
                case 8:
                    secondDigitPattern = patterns.numberEightVectorArray;
                    break;
                case 9:
                    secondDigitPattern = patterns.numberNineVectorArray;
                    break;
                default:
                    secondDigitPattern = patterns.colonVectorArray;
                    break;
            }

            // offsetting x of secondDigitPattern by 3
            for (var index = 0; index < secondDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(secondDigitPattern[index].x + 7, secondDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex);
            }

            for (var index = 0; index < firstDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(firstDigitPattern[index].x + 3, firstDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex);
            }

        }
        else
        {
            // tenth minute
            var firstMinuteDigit = Math.floor(minutesNum / 10);
            switch(firstMinuteDigit)
            {
                case 0:
                    firstDigitPattern = patterns.numberZeroVectorArray;
                    break;
                case 1:
                    firstDigitPattern = patterns.numberOneVectorArray;
                    break;
                case 2:
                    firstDigitPattern = patterns.numberTwoVectorArray;
                    break;
                case 3:
                    firstDigitPattern = patterns.numberThreeVectorArray;
                    break;
                case 4:
                    firstDigitPattern = patterns.numberFourVectorArray;
                    break;
                case 5:
                    firstDigitPattern = patterns.numberFiveVectorArray;
                    break;
                case 6:
                    firstDigitPattern = patterns.numberSixVectorArray;
                    break;
                case 7:
                    firstDigitPattern = patterns.numberSevenVectorArray;
                    break;
                case 8:
                    firstDigitPattern = patterns.numberEightVectorArray;
                    break;
                case 9:
                    firstDigitPattern = patterns.numberNineVectorArray;
                    break;
                default:
                    firstDigitPattern = pattrens.colonVectorArray;
                    break;
            }


            var l = Math.pow(10, Math.floor(Math.log(minutesNum)/Math.log(10))-1);
            var b = Math.floor(minutesNum/l);
            var secondMinuteDigit = b - Math.floor(b/10) * 10;

            console.log("second minute digit");
            console.log(secondMinuteDigit);

            switch(secondMinuteDigit)
            {
                case 0:
                    secondDigitPattern = patterns.numberZeroVectorArray;
                    break;
                case 1:
                    secondDigitPattern = patterns.numberOneVectorArray;
                    break;
                case 2:
                    secondDigitPattern = patterns.numberTwoVectorArray;
                    break;
                case 3:
                    secondDigitPattern = patterns.numberThreeVectorArray;
                    break;
                case 4:
                    secondDigitPattern = patterns.numberFourVectorArray;
                    break;
                case 5:
                    secondDigitPattern = patterns.numberFiveVectorArray;
                    break;
                case 6:
                    secondDigitPattern = patterns.numberSixVectorArray;
                    break;
                case 7:
                    secondDigitPattern = patterns.numberSevenVectorArray;
                    break;
                case 8:
                    secondDigitPattern = patterns.numberEightVectorArray;
                    break;
                case 9:
                    secondDigitPattern = patterns.numberNineVectorArray;
                    break;
                default:
                    secondDigitPattern = patterns.colonVectorArray;
                    break;
            }

            // offsetting x of secondDigitPattern by 3
            for (var index = 0; index < secondDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(secondDigitPattern[index].x + 7, secondDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex);
            }

            for (var index = 0; index < firstDigitPattern.length; index++)
            {
                var offsetArrayIndex = createVector(firstDigitPattern[index].x + 3, firstDigitPattern[index].y);
                combinedTimePattern.push(offsetArrayIndex);
            }
        }

        return combinedTimePattern;
    }
}