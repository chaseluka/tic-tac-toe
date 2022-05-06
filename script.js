

const gameBoard = (() => {
    let game = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    
    return {
        game
    }
})();

const Player = (name, marker) => {
    const playerName = () => {
        return name;
    }
    const getMarker = () => {
        return marker
    }

    return {playerName, getMarker}
}

const displayBoard = () => {
    const board = document.querySelectorAll('.square');
    const playerOne = Player('Chase', 'X');
    const playerTwo = Player('B', 'O');
    let moveCount = 0;
    board.forEach(square => {
        square.addEventListener('click', function playMove(){
            let section = square.getAttribute('data-num');

            if (moveCount % 2 === 0){
                gameBoard.game.splice(section, 1, playerOne.getMarker());
            }
            else if (moveCount % 2 !== 0){
                gameBoard.game.splice(section, 1, playerTwo.getMarker());
            }
            moveCount++
            board[section].textContent = gameBoard.game[section];

            this.removeEventListener('click', playMove, false);
            const winner = gameOver();
            winner.winner();
            
        }, false);
    });
    
}
displayBoard();

const gameOver = () => {
    const winner = () => {
        let playedSquares = gameBoard.game;
        if (playedSquares[0] === playedSquares[1] && playedSquares[0] === playedSquares[2]){
            console.log('You won');
        }
        else if (playedSquares[3] === playedSquares[4] && playedSquares[3] === playedSquares[5]){
            console.log('You won');
        }
        else if (playedSquares[6] === playedSquares[7] && playedSquares[6] === playedSquares[8]){
            console.log('You won');
        }
        else if (playedSquares[0] === playedSquares[3] && playedSquares[0] === playedSquares[6]){
            console.log('You won');
        }
        else if (playedSquares[1] === playedSquares[4] && playedSquares[1] === playedSquares[7]){
            console.log('You won');
        }
        else if (playedSquares[2] === playedSquares[5] && playedSquares[5] === playedSquares[8]){
            console.log('You won');
        }
        else if (playedSquares[0] === playedSquares[4] && playedSquares[0] === playedSquares[8]){
            console.log('You won');
        }
        else if (playedSquares[2] === playedSquares[4] && playedSquares[2] === playedSquares[6]){
            console.log('You won');
        }
        playedSquares = playedSquares.filter(square => {
            if (square === 'O'){
                return square != 'O';
            }
            else if (square === 'X'){
                return square != 'X';
            }
            else return square
            
        })
        if (playedSquares.length === 0){
            console.log('Its a draw');
        }
    }
    return {winner}
}



/*const Turn = (moveCount) => {
    let moveCount = 0;
    if (moveCount % 2 === 0){}
    else if (movecount % 2 !== 0){}
}
*/

/*
let moveCount = 0;

const ticTacToe = (player) => {
    const playerName = () => console.log(player);

    return {
        playerName
    }
}


const board = document.querySelectorAll('.square');

board.forEach((square) => {
    square.addEventListener('click', function play(){
        let section = square.getAttribute('data-num');
        if (moveCount % 2 === 0){
            gameBoard.marker('X');
            board[section].textContent = gameBoard.game.slice(-1);
            moveCount++;
        }
        else if (moveCount % 2 !== 0){
            gameBoard.marker('O');
            board[section].textContent = gameBoard.game.slice(-1);
            moveCount++;
        }
        winner();
        this.removeEventListener('click', play, false)
    }, false);
   
})

function winner() {
    console.log(board);

*/


