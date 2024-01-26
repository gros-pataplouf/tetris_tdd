import { RotatingShape } from "./RotatingShape.mjs"


RotatingShape.T_SHAPE = new RotatingShape(
    `.T.
    TTT
    ...`)

RotatingShape.I_SHAPE = new RotatingShape(
    `.....
    .....
    IIII.
    .....
    .....`
)

export {
    RotatingShape as Tetromino
}