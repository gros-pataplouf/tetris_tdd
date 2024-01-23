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
    rotateRight() {
        const copyOfShape = this.shape.map(elt => elt.map(x => x))
        for (let i = 0; i < this.shape.length; i ++) {
            for (let j = 0; j < this.shape.length; j++) {
                copyOfShape[j][this.shape.length - 1 - i] = this.shape[i][j]
            }
        }
        const stringRepOfRotatedShape = this.#matrixToString(copyOfShape)
        return new RotatingShape(stringRepOfRotatedShape)
    }
    rotateLeft() {
        return this.rotateRight().rotateRight().rotateRight()
    }

}