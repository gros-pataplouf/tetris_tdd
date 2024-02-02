import { RotatingShape } from "./RotatingShape.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4) {
        super(shape)
        this.orientations = orientations
   
    }
}

class Tetro extends RotatableComplex(RotatingShape) {}

export const Tetromino = {
    T_SHAPE : new Tetro(
        `.T.
        TTT
        ...`),
    I_SHAPE : new Tetro(
        `.....
        .....
        IIII.
        .....
        .....`, 2
    )
}