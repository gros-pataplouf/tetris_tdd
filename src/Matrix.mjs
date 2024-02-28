export default class Matrix {
    matrixToString(input=this) {
        const joinedSubarrays =  input.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString
    }
    rotateMatrix(input=this) {
        const targetMatrix = input.map(elt => elt.map(x => x))
        for (let i = 0; i < input.length; i ++) {
            for (let j = 0; j < input.length; j++) {
                targetMatrix[j][input.length - 1 - i] = input[i][j]
            }
        }
        return targetMatrix
    }
}