export function rotateMatrix(sourceMatrix) {
    const targetMatrix = sourceMatrix.map(elt => elt.map(x => x))
    for (let i = 0; i < sourceMatrix.length; i ++) {
        for (let j = 0; j < sourceMatrix.length; j++) {
            targetMatrix[j][sourceMatrix.length - 1 - i] = sourceMatrix[i][j]
        }
    }
    return targetMatrix
}