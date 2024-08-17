class Board {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.board_rows = [];
        for (let i = 0; i < ySize; i++)
        {
            this.board_rows.push(this.createEmptyRow());
        }
    }
    
    createEmptyRow() {
        let board_row = [];
        for (let j = 0; j < this.xSize; j++)
        {
            board_row.push(0);
        }
        return board_row;
    }
    set(x, y, color) {
        this.board_rows[y][x] = color;
    }

    get(x, y) {
        if (x >= 0 && x < this.xSize && y >= 0 && y < this.ySize)
        {
            return this.board_rows[y][x];
        }
        return -1; // Out of bounds
    }

    clearLine(y) {
        this.board_rows.splice(y, 1);
        this.board_rows.unshift(this.createEmptyRow());
    }

    checkLineClears() {
        let rowsCleared = 0;
        for (let y = 0; y < this.ySize; y++)
        {
            let clear = 1;
            this.board_rows[y].forEach((tile) => {
                if (tile == 0)
                {
                    clear = 0;
                }
            })
            if (clear)
            {
                this.clearLine(y)
                rowsCleared += 1;
            }
        }
        return rowsCleared;
    }
}