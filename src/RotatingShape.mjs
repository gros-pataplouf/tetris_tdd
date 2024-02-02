import { Shape } from "./Shape.mjs"
import { rotateMatrix } from "./helpers.mjs"

const RotatableSimple = Sup => class extends Sup {
    rotateRight() {
        const rotatedMatrix = rotateMatrix(this.shape)
        const stringRepr = this.matrixToString(rotatedMatrix)
        return new RotatingShape(stringRepr)
    }
    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
    }    
}

export class Shape_ {
    constructor(shape) {
        this.shape = shape.trim().split('\n').map(elt => elt.trim().split(''))
    }
    toString(){
        return this.matrixToString(this.shape)
    }
}

export class RotatingShape extends RotatableSimple(Shape){}