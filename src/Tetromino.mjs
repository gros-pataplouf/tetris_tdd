import { Shape } from "./Shape.mjs"
import { rotateMatrix } from "./helpers.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4, variants = null) {
        super(shape)
        this.orientations = orientations
        this.variants = variants || Array(this.orientations).fill("").map((elt, index) => {
            let rotationResult = this.shape
            for (let i = 0; i < index; i++) {
                rotationResult = rotateMatrix(rotationResult)                  
            }
            return this.matrixToString(rotationResult)
        })
    }
    rotateRight() {
        const currentStringRepr = this.toString()
        const currentRotationIndex = this.variants.indexOf(currentStringRepr)
        const rotatedStringRepr = this.variants[(currentRotationIndex + 1) % this.variants.length ]
        return new RotatingTetromino(rotatedStringRepr, this.orientations, this.variants)
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
    ),
    O_SHAPE: new RotatingTetromino(
        `.OO
        .OO
        ...`, 1
    )
}