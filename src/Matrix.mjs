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
    mergeMatrix(targetInput, insertedInput, x, y) {
        const targetMatrix = structuredClone(targetInput)
        const insertedMatrix = structuredClone(insertedInput)
        for (let i = y; i - y < insertedMatrix.length; i++) {
            if (i >= 0) {for (let j = x; j - x < insertedMatrix[0].length; j++) {
              if (insertedMatrix[i] && insertedMatrix[i][j] !== '.' && targetMatrix[i][j] === '.') {
                targetMatrix[i][j] = insertedMatrix[i - y][j-x]}}
          }}
        return targetMatrix
    }
}