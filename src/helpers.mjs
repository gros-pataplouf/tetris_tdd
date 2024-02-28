


export function loopAndExecute(height, width, dirX, fn) {
    for (let rowIndex = block.height - 1; rowIndex >= 0; rowIndex--) {
        for (let colIndex = dirX <= 0? 0: block.width -1; dirX <= 0? colIndex < block.width : colIndex >= 0; dirX <= 0? colIndex++ : colIndex--) { //loop from left to right or right to left
            fn(height, width, dirX)
        }}}