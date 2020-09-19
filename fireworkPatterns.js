// Created by: Triple3Apple

let creeperVectorsX = [];

let creeperVectorsY = [];

class FireworkPatterns {

    constructor() {
        // this.creeperVectorsX = 
        // [-3, -2, -1, 1, 2, 3,
        // -3, -1, 1, 3,
        // -3, -2, -1, 0, 1, 1, 3,
        // -2, -1, 1, 1,
        // -2, 2,
        // -2, -1, 0, 1, 2,
        // -2, -1, 1, 2];

        this.creeperVectorsX = 
        [-3, -2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5, 3,
        -3, -1, 1, 3,
        -3, -1, 1, 3,
        -3, -1, 1, 3,
        -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3,
        -1, 1,
        -2, -1.5, -1, 1, 1.5, 2,
        -2, 2,
        -2, 2,
        -2, 2,
        -2, -1, -0.5, 0, 0.5, 1, 2,
        -2, -1, 1, 2,
        -2, -1.5, -1, 1, 1.5, 2];

        // this.creeperVectorsY = 
        // [-3, -3, -3, -3, -3, -3,
        // -2, -2, -2, -2,
        // -1, -1, -1, -1, -1, -1, -1,
        // 0, 0, 0, 0,
        // 1, 1,
        // 2, 2, 2, 2, 2,
        // 3, 3, 3, 3];

        this.creeperVectorsY = 
        [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3,
        -2.5, -2.5, -2.5, -2.5,
        -2, -2, -2, -2,
        -1.5, -1.5, -1.5, -1.5,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, // 13
        -0.5, -0.5,
        0, 0, 0, 0, 0, 0,
        0.5, 0.5,
        1, 1,
        1.5, 1.5,
        2, 2, 2, 2, 2, 2, 2,
        2.5, 2.5, 2.5, 2.5,
        3, 3, 3, 3, 3, 3];

        this.creeperVectorArray = this.combineVectorsComps(this.creeperVectorsX, this.creeperVectorsY);

    }

    combineVectorsComps(vectX, vectY) {

        let combined = [];

        for (let i = 0; i < vectX.length; i++) {
            combined.unshift(createVector(vectX[i], vectY[i]));
        }
        return combined;

    }
}
