import { Shape } from "./Shape.mjs"

const RotatableComplex = Sup => class extends Sup {
    constructor(shape, orientations = 4, variants = null) {
        super(shape)
        this.orientations = orientations
        this.variants = variants || Array(this.orientations).fill("").map((elt, index) => {
            let rotationResult = this.shape
            for (let i = 0; i < index; i++) {
                rotationResult = this.rotateMatrix(rotationResult)                  
            }
            return this.matrixToString(rotationResult)
        })
    }
    #rotate(turns) {
        const currentStringRepr = this.toString()
        const currentRotationIndex = this.variants.indexOf(currentStringRepr)
        return this.variants[(currentRotationIndex + turns) % this.variants.length ]
    }
    rotateRight() {
        const rotatedStringRepr = this.#rotate(1)
        return new RotatingTetromino(rotatedStringRepr, this.orientations, this.variants)
    }
    rotateLeft() {
        const rotatedStringRepr = this.#rotate(3)
        return new RotatingTetromino(rotatedStringRepr, this.orientations, this.variants)
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
    ),
    L_SHAPE : new RotatingTetromino(
        `..L
        LLL
        ...`),
    Z_SHAPE : new RotatingTetromino(
            `ZZ.
            .ZZ
            ...`)
    }