const testBoard = () => {
    let board = []
    for (let x = 1; x <= 3; x++){
        let row = []
        for (let y = 1; y <= 3; y++) {
            let isMine;
            if (
                (x === 1 && y === 1) ||
                (x === 1 && y === 3) ||
                (x === 3 && y === 1) ||
                (x === 3 && y === 3)
            ) {
                isMine = true
            } else {
                isMine = false
            }
            row.push({
                id: `${x}${y}`,
                row: x,
                space: y,
                isMine: isMine,
                isOpen: false,
                isMarked: false,
                mineCount: 0
            })
        }
        board.push(row)
    }
    return board
}

export default testBoard