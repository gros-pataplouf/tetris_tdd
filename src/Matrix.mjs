export default class Matrix {
    matrixToString(input=this) {
        const joinedSubarrays =  input.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString
    }
}