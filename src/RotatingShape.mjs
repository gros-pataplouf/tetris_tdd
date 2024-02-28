import { Shape } from "./Shape.mjs"

const RotatableSimple = Sup => class extends Sup {
    rotateRight() {
        const rotatedMatrix = this.rotateMatrix(this.shape)
        const stringRepr = this.matrixToString(rotatedMatrix)
        return new RotatingShape(stringRepr)
    }
    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
    }    
}

export class RotatingShape extends RotatableSimple(Shape){}