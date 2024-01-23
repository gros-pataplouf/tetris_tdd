export class RotatingShape {
    constructor(shape) {
        this.shape = shape.split('\n').map(elt => elt.trim().split(''))
        Object.freeze(this)
    }
    #matrixToString(matrix) {
        const joinedSubarrays =  matrix.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString.replace('\n\n','\n')
    }
    toString(){
        return this.#matrixToString(this.shape)
    }
}