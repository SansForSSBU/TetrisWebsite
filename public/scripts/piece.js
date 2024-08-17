class Piece {
    constructor(pieceType) {
        this.color = pieceType;
        if (pieceType == 1) { // I piece
            this.origin = [4, 0];
            this.tiles = [
                this.origin,
                [this.origin[0], this.origin[1]+1],
                [this.origin[0], this.origin[1]+2],
                [this.origin[0], this.origin[1]+3]
            ]
        }
        if (pieceType == 2) { // O piece
            this.origin = [4, 0];
            this.tiles = [
                this.origin,
                [this.origin[0]+1, this.origin[1]],
                [this.origin[0], this.origin[1]+1],
                [this.origin[0]+1, this.origin[1]+1]
            ];
        }
        if (pieceType == 3) { // T piece
            this.origin = [4, 0];
            this.tiles = [
                this.origin,
                [this.origin[0]+1, this.origin[1]],
                [this.origin[0]+2, this.origin[1]],
                [this.origin[0]+1, this.origin[1]+1]
            ]
        }
        if (pieceType == 4) { // S piece
            this.origin = [4, 1];
            this.tiles = [
                this.origin,
                [this.origin[0]+1, this.origin[1]],
                [this.origin[0]+1, this.origin[1]-1],
                [this.origin[0]+2, this.origin[1]-1]
            ]
        }
        if (pieceType == 5) { // J piece
            this.origin = [4, 2];
            this.tiles = [
                this.origin,
                [this.origin[0]+1, this.origin[1]],
                [this.origin[0]+1, this.origin[1]-1],
                [this.origin[0]+1, this.origin[1]-2]
            ]
        }
        if (pieceType == 6) { // Z piece
            this.origin = [4, 0];
            this.tiles = [
                this.origin,
                [this.origin[0]+1, this.origin[1]],
                [this.origin[0]+1, this.origin[1]+1],
                [this.origin[0]+2, this.origin[1]+1]
            ]
        }
        if (pieceType == 7) { // L piece
            this.origin = [4, 0];
            this.tiles = [
                this.origin,
                [this.origin[0]+1, this.origin[1]],
                [this.origin[0]+1, this.origin[1]+1],
                [this.origin[0]+1, this.origin[1]+2]
            ]
        }
    };

    canRotation(board) {
        let retVal = 1;
        this.tiles.forEach((tile) => {
                let x_offset = tile[0]-this.origin[0];
                let y_offset = tile[1]-this.origin[1];
                if (board.get(this.origin[0]+y_offset, this.origin[1]-x_offset))
                {
                    retVal = 0;
                }
            })
        return retVal;
    }

    rotation(board) {
        if (this.canRotation(board)) {
            this.tiles.forEach((tile) => {
                let x_offset = tile[0]-this.origin[0];
                let y_offset = tile[1]-this.origin[1];
                tile[0] = this.origin[0]+y_offset;
                tile[1] = this.origin[1]-x_offset;
            })
        }
        
    }

    canMove(board, direction) {
        let retVal = 1;
        this.tiles.forEach((tile) => {
            if (board.get(tile[0] + direction, tile[1]) != 0)
            {
                retVal = 0;
            }
        })
        return retVal;
    }

    move(board, direction) {
        if (this.canMove(board, direction) == 1)
        {
            this.tiles.forEach((tile) => {
                tile[0] += direction;
            })
            return 0;
        }
        else
        {
            return 1;
        }
    }

    canFall(board) {
        let retVal = 1;
        this.tiles.forEach((tile) => {
            if (board.get(tile[0], tile[1] + 1) != 0)
            {
                retVal = 0;
            }
        })
        return retVal;
    }

    fall(board) {
        // Check if we can fall
        if (this.canFall(board) == 1)
        {
            this.tiles.forEach((tile) => {
                tile[1] += 1;
            })
            return 0;
        }
        else
        {
            return 1;
        }
    }
    
    land(board) {
        let linesCleared = 0;

        this.tiles.forEach((tile) => {
            board.set(...tile, this.color);
            
        })
        linesCleared = board.checkLineClears();
        if (linesCleared == 1) {
            score += 100;
        }
        else if (linesCleared == 2) {
            score += 300;
        }
        else if (linesCleared == 3) {
            score += 500;
        }
        else if (linesCleared == 4) {
            score += 800;
        }
    }

    checkGameOver(board) {
        let retVal = 0;
        this.tiles.forEach((tile) => {
            if (board.get(tile[0], tile[1]) != 0)
            {
                retVal = 1;
            }
        })
        return retVal;
    }
}