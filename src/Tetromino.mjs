import { Shape } from "./RotatingShape.mjs"
import { rotateMatrix } from "./helpers.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4) {
        super(shape)
        this.orientations = orientations
        this.variants = Array(this.orientations).fill("").map((elt, index) => {
            let rotationResult = this.shape
            for (let i = 0; i < index; i++) {
                rotationResult = rotateMatrix(rotationResult)                  
            }
            return rotationResult
        })
    }
    rotateRight() {
        console.log(this.variants)
        const rotatedMatrix = rotateMatrix(this.shape)
        const stringRepr = this.matrixToString(rotatedMatrix)
        return new RotatingTetromino(stringRepr)
    }
    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
    }
}

class RotatingTetromino extends RotatableComplex(Shape) {}

export const Tetromino = {
    T_SHAPE : new RotatingTetromino(
        `.T.
        TTT
        ...`),
    I_SHAPE : new RotatingTetromino(
        `.....
        .....
        IIII.
        .....
        .....`, 2
    )
}