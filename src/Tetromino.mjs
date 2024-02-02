import { RotatingShape, Shape } from "./RotatingShape.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4) {
        super(shape)
        this.orientations = orientations
    }
    rotateRight() {
        const copyOfShape = this.shape.map(elt => elt.map(x => x))
        for (let i = 0; i < this.shape.length; i ++) {
            for (let j = 0; j < this.shape.length; j++) {
                copyOfShape[j][this.shape.length - 1 - i] = this.shape[i][j]
            }
        }
        const stringRepOfRotatedShape = this.matrixToString(copyOfShape)
        return new RotatingShape(stringRepOfRotatedShape)
    }
    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
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