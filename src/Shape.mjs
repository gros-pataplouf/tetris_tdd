import MatrixToolsProvider from "./Matrix.mjs"

export class Shape extends MatrixToolsProvider {
    constructor(shape) {
        super()
        this.shape = shape.trim().split('\n').map(elt => elt.trim().split(''))
        this.width = this.shape[0].length
        this.height = this.shape.length
    }
     toString(){
        return this.matrixToString(this.shape)
    }
}
