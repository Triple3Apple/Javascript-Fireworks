// Created by: Triple3Apple

let creeperVectorsX = [];
let creeperVectorsY = [];

let heartVectorsX = [];
let heartVectorsY = [];

class FireworkPatterns {

    constructor() {
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

        this.heartVectorsX = 
        [
            -4, -3, -2, 2, 3, 4,
            -5, -1, 1, 5,
            -6, 0, 6,
            -6, 6,
            -6, 6,
            -6, 6,
            -5, 5,
            -4, 4,
            -3, 3,
            -2, 2,
            -1, 1,
            0
        ]

        this.heartVectorsY = 
        [
            
        ]
    }

    combineVectorsComps(vectX, vectY) {

        let combined = [];

        for (let i = 0; i < vectX.length; i++) {
            combined.unshift(createVector(vectX[i], vectY[i]));
        }
        return combined;

    }
}
