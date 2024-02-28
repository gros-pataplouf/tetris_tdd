export default class Matrix {
    matrixToString(input=this) {
        const joinedSubarrays =  input.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString
    }
    rotateMatrix(input=this) {
        const targetMatrix = this.map(elt => elt.map(x => x))
        for (let i = 0; i < this.length; i ++) {
            for (let j = 0; j < this.length; j++) {
                targetMatrix[j][this.length - 1 - i] = this[i][j]
            }
        }
        return targetMatrix
    }
}