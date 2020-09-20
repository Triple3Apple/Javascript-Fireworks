// Created by: Triple3Apple



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

        this.creeperVectorArray = this.combineVectorsComps(this.creeperVectorsX, this.creeperVectorsY, 1);

        this.heartVectorsX = 
        [
            -4, -3, -2, 2, 3, 4,
            -5, -1, 1, 5,
            -6, 0, 6,
            -6, 6,
            -6, 6,
            -5.75, 5.75,
            -5, 5,
            -4, 4,
            -3, 3,
            -2, 2,
            -1, 1,
            0
        ]

        this.heartVectorsY = 
        [
            -5, -5, -5, -5, -5, -5,
            -4, -4, -4, -4,
            -3, -3, -3, 
            -2 , -2,
            -1, -1,
            0, 0,
            1, 1,
            2, 2,
            3, 3,
            4, 4,
            5, 5,
            6
        ]

        this.heartVectorArray = this.combineVectorsComps(this.heartVectorsX, this.heartVectorsY, 2);

        this.colonVectorsX = 
        [
            -1, 0, 1,
            -1, 1,
            -1, 0, 1,
            -1, 0, 1,
            -1, 1,
            -1, 0, 1
        ]

        this.colonVectorsY = 
        [
            -3, -3, -3,
            -2, -2,
            -1, -1, -1,
            1, 1, 1,
            2, 2,
            3, 3, 3
        ]

        this.colonVectorArray = this.combineVectorsComps(this.colonVectorsX, this.colonVectorsY, 2);

        this.numberZeroVectorsX = 
        [
            -3, -2, -1, 0, 1, 2, 3,
            -3, -2, -1, 0, 1, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, 2, 3,
            -3, -2, -1, 0, 1, 2, 3,
            -3, -2, -1, 0, 1, 2, 3
        ]

        this.numberZeroVectorsY = 
        [
            -5, -5, -5, -5, -5, -5, -5, 
            -4, -4, -4, -4, -4, -4, -4, 
            -3, -3, -3, -3,
            -2, -2, -2, -2,
            -1, -1, -1, -1,
            0, 0, 0, 0,
            1, 1, 1, 1,
            2, 2, 2, 2,
            3, 3, 3, 3,
            4, 4, 4, 4,
            5, 5, 5, 5, 5, 5, 5, 
            6, 6, 6, 6, 6, 6, 6
        ]

        this.numberZeroVectorArray = this.combineVectorsComps(this.numberZeroVectorsX, this.numberZeroVectorsY, 2);
            

        this.numberOneVectorsX = 
        [
            -1, 0, 1,
            -2, 1,
            -3, 1,
            -3, -2, -1, 1,
            -1, 1,
            -1, 1,
            -1, 1,
            -1, 1,
            -1, 1,
            -3, -2, -1, 1, 2, 3,
            -3, 3,
            -3, -2, -1, 0, 1, 2, 3
        ]

        this.numberOneVectorsY = 
        [
            -5, -5, -5,
            -4, -4,
            -3, -3,
            -2, -2, -2, -2, 
            -1, -1,
            0, 0, 
            1, 1,
            2, 2,
            3, 3,
            4, 4, 4, 4, 4, 4, 
            5, 5,
            6, 6, 6, 6, 6, 6, 6
        ]

        this.numberOneVectorArray = this.combineVectorsComps(this.numberOneVectorsX, this.numberOneVectorsY, 2);

    }

    // reductionInt reduces the size of the vectors
    combineVectorsComps(vectX, vectY, reductionInt) {

        let combined = [];

        for (let i = 0; i < vectX.length; i++) {
            combined.unshift(createVector(vectX[i]/reductionInt, vectY[i]/reductionInt));
        }
        return combined;

    }
}
