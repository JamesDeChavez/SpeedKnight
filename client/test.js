const isValidMove = (x, y) => {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
        return false
    }
    return true;

}

const calcBestPath = (knightRow, knightCol, pawnRow, pawnCol) => {
    const dx = [2, 2, -2, -2, 1, 1, -1, -1]
    const dy = [1, -1, 1, -1, 2, -2, 2, -2]
    
    const queue = []
    queue.push([knightRow, knightCol])
    
    const visited = new Array(8).fill(0).map(() => new Array(8).fill(false))
    visited[knightRow][knightCol] = true
    
    const moves = new Array(8).fill(0).map(() => new Array(8).fill(0))
    
    while (queue.length > 0) {
        const [x, y] = queue.shift()
        if (x === pawnRow && y === pawnCol) {
            return moves[x][y]
        }
        
        for (let i = 0; i < 8; i++) {
            const newX = x + dx[i]
            const newY = y + dy[i]
            
            if (isValidMove(newX, newY) && !visited[newX][newY]) {
                queue.push([newX, newY])
                visited[newX][newY] = true
                moves[newX][newY] = moves[x][y] + 1
            } 
            
        }
    }

    return -1
    
}




console.log(calcBestPath(0, 0, 7, 7))