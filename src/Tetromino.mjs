import { Shape } from "./RotatingShape.mjs"
import { rotateMatrix } from "./helpers.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4) {
        super(shape)
        this.orientations = orientations
        this.variants = Array(4).fill("").map((elt, index) => {
            return this.toString()
        })
    }
    rotateRight() {
        const rotatedMatrix = rotateMatrix(this.shape)
        const stringRepOfRotatedShape = this.matrixToString(rotatedMatrix)
        return new RotatingTetromino(stringRepOfRotatedShape)
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