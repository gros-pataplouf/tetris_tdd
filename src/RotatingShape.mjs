export class RotatingShape {
    constructor(shape) {
        this.shape = shape.split('\n').map(elt => Array.from(elt.trim()))
        Object.freeze(this)
    }
    toString(){
        return this.shape.map(elt => elt.concat('\n').join('')).join('')
    }
}
