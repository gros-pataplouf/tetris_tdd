import { Shape } from "./RotatingShape.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4) {
        super(shape)
        this.orientations = orientations
        this.variants = Array(4).fill("").map((elt, index) => {
            return this.toString()
        })
    }
    rotateRight() {
        const copyOfShape = this.shape.map(elt => elt.map(x => x))
        for (let i = 0; i < this.shape.length; i ++) {
            for (let j = 0; j < this.shape.length; j++) {
                copyOfShape[j][this.shape.length - 1 - i] = this.shape[i][j]
            }
        }
        const stringRepOfRotatedShape = this.matrixToString(copyOfShape)
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