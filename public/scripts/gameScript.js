function color_to_string(enum_value)
{
    switch (enum_value) {
        case COLOR_ENUM.BLACK:
            return "black";
        case COLOR_ENUM.CYAN:
            return "cyan";
        case COLOR_ENUM.YELLOW:
            return "yellow";
        case COLOR_ENUM.PURPLE:
            return "purple";
        case COLOR_ENUM.GREEN:
            return "green";
        case COLOR_ENUM.BLUE:
            return "blue";
        case COLOR_ENUM.RED:
            return "red";
        case COLOR_ENUM.ORANGE:
            return "orange";
        default:
            throw new Error("Encountered an invalid color");
    }
}

function randint(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function colorSquare(x, y, color)
{
    var c = document.getElementById("gameWindow");
    var ctx = c.getContext("2d");
    ctx.fillStyle = color_to_string(color);
    ctx.fillRect(BOARD_OFFSET_X + x*CELL_SIZE + 1, BOARD_OFFSET_Y + y*CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
}

function drawGameboard(board) {
    var c = document.getElementById("gameWindow");
    var ctx = c.getContext("2d");
    ctx.clearRect(BOARD_OFFSET_X, BOARD_OFFSET_Y, BOARD_WIDTH, BOARD_HEIGHT);
    ctx.beginPath();
    ctx.rect(BOARD_OFFSET_X, BOARD_OFFSET_Y, BOARD_WIDTH, BOARD_HEIGHT);
    ctx.fillStyle = 'white';
    ctx.fill();
    //filling cells
    for (let x = 0; x < board.xSize; x++)
    {
        for (let y = 0; y < board.ySize; y++)
        {
            colorSquare(x, y, board.get(x, y));
        }
    }
    ctx.stroke();
}

function drawPiece(piece) {
    var c = document.getElementById("gameWindow");
    var ctx = c.getContext("2d");
    piece.tiles.forEach((tile) => {
        colorSquare(...tile, piece.color)
    });
}

function updateScore(score) {
    var text = document.getElementById("score").textContent = score;
}
function makePiece() {
    let piece = new Piece(randint(1,8));
    return piece;
}

let score = 0;
let board = new Board(NUM_CELLS_X, NUM_CELLS_Y);
let ticksToFall = 3;
let fallTimer = ticksToFall;
let left_press = 0;
let right_press = 0;
let up_press = 0;
piece = makePiece();

function gameLoop() {
    if (up_press) {
        up_press = 0;
        piece.rotation(board);
    }
    if (left_press) {
        left_press = 0;
        piece.move(board, -1);
    }
    if (right_press) {
        right_press = 0;
        piece.move(board, 1);
    }
    fallTimer--;
    if (fallTimer == 0) {
        if (piece.fall(board) == 1)
        {
            piece.land(board);
            piece = makePiece();
            if (piece.checkGameOver(board) == 1)
            {
                board = new Board(NUM_CELLS_X, NUM_CELLS_Y);
                score = 0;
            }
        }
        fallTimer = ticksToFall;
    }
    updateScore(score);
    drawGameboard(board);
    drawPiece(piece);'use client'
}

setInterval(gameLoop, FRAME_DELTA);

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        left_press = 1;
    }
    if (event.keyCode == 38) {
        up_press = 1;
    }
    else if (event.keyCode == 39) {
        right_press = 1;
    }
})