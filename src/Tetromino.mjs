import { RotatingShape } from "./RotatingShape.mjs"

const ComplexMixin = Sup => class extends Sup {
    testMethod() {
        console.log("test")
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
        .....`
    )
}