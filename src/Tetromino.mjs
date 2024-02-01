import { RotatingShape } from "./RotatingShape.mjs"

const ComplexMixin = Sup => class extends Sup {
    constructor(shape, orientations = 4) {
        super(shape)
        this.orientations = orientations
    }}

class Tetro extends ComplexMixin(RotatingShape) {}

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