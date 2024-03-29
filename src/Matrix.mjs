export default class MatrixToolsProvider {
    matrixToString(input=this) {
        const joinedSubarrays =  input.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString
    }
    rotateMatrix(input=this) {
        const targetMatrix = input.map(elt => elt.map(x => x))
        for (let i = 0; i < input.length; i ++) {
            for (let j = 0; j < input[0].length; j++) {
                targetMatrix[j][input.length - 1 - i] = input[i][j]
            }
        }
        return targetMatrix
    }
    canMergeMatrix(targetMatrix, insertedMatrix, x, y) {
        for (let i = 0; i  < insertedMatrix.length; i++) {
            for (let j = 0; j < insertedMatrix[0].length; j++) {
              if (insertedMatrix[i][j] !== '.' && (!targetMatrix[i+y] || !targetMatrix[i+y][j+x])) {
                return false
        }}}
        return true
    }
    mergeMatrix(targetInput, insertedMatrix, x, y) {
        const targetMatrix = structuredClone(targetInput)
        for (let i = 0; i  < insertedMatrix.length; i++) {
            for (let j = 0; j < insertedMatrix[0].length; j++) {
              if (insertedMatrix[i][j] !== '.') {
                targetMatrix[i+y][j+x] = insertedMatrix[i][j]
            }
          }}
        return targetMatrix
    }
}