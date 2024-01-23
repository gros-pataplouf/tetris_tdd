export class RotatingShape {
    constructor(shape) {
        this.shape = shape.split('\n').map(elt => elt.trim().split(''))
        Object.freeze(this)
    }
    toString(){
        const joinedSubarrays =  this.shape.map(elt => elt.join('')).map(x => x + '\n')
        const reconstitutedShapeString = joinedSubarrays.reduce((acc, subarr) => acc.concat(subarr))
        return reconstitutedShapeString
    }        
}