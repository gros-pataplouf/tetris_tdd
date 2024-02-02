export class Shape {
    constructor(shape) {
        this.shape = shape.trim().split('\n').map(elt => elt.trim().split(''))
        this.width = this.shape[0].length
        this.height = this.shape.length
    }
    matrixToString(matrix) {
        const joinedSubarrays =  matrix.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString
    }
    toString(){
        return this.matrixToString(this.shape)
    }
}
