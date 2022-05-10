const gameBoard = (() => {
    let game = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
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

let win = false;

const ticTacToe = () => {
    const board = document.querySelectorAll('.square');
    
    const playerOne = Player(`${document.getElementById('player-one').value}`, 'X');
    const playerTwo = Player(`${document.getElementById('player-two').value}`, 'O');
    
    const players = document.querySelector('.players');
    const playerOneDisplay = document.createElement('div');
    const playerTwoDisplay = document.createElement('div');
    playerOneDisplay.textContent = `${playerOne.playerName()} is ${playerOne.getMarker()}`;
    playerTwoDisplay.textContent = `${playerTwo.playerName()} is ${playerTwo.getMarker()}`;

    players.appendChild(playerOneDisplay);
    players.appendChild(playerTwoDisplay);
    
    let moveCount = 0;
    
    const gameOver = () => {
        let playedSquares = gameBoard.game;
        
        const winner = (() => {
            
            const rowWin = () =>{
                row1 = [playedSquares[0], playedSquares[1], playedSquares[2]];
                row2 = [playedSquares[3], playedSquares[4], playedSquares[5]];
                row3 = [playedSquares[6], playedSquares[7], playedSquares[8]];
                if (row1.every(marker => marker =='X') || row1.every(marker => marker == 'O') ||
                    row2.every(marker => marker =='X') || row2.every(marker => marker == 'O') ||
                    row3.every(marker => marker =='X') || row3.every(marker => marker == 'O')){
                        return true;
                    }
                else return false
            }
            
            const columnWin = () => {
                column1 = [playedSquares[0], playedSquares[3], playedSquares[6]];
                column2 = [playedSquares[1], playedSquares[4], playedSquares[7]];
                column3 = [playedSquares[2], playedSquares[5], playedSquares[8]];
                if (column1.every(marker => marker =='X') || column1.every(marker => marker == 'O') ||
                    column2.every(marker => marker =='X') || column2.every(marker => marker == 'O') ||
                    column3.every(marker => marker =='X') || column3.every(marker => marker == 'O')){
                        return true;
                    }
                else return false
            }

            const diagonalWin = () => {
                diagonal1 = [playedSquares[0], playedSquares[4], playedSquares[8]];
                diagonal2 = [playedSquares[2], playedSquares[4], playedSquares[6]];
                if (diagonal1.every(marker => marker =='X') || diagonal1.every(marker => marker == 'O') ||
                    diagonal2.every(marker => marker =='X') || diagonal2.every(marker => marker == 'O')){
                        return true;
                    }
                else return false
            }
            const checkWin = () => {
                if (rowWin() === true || columnWin() === true || diagonalWin() === true){
                    win = true;
                    return true
                }
                else return false
            }
            return{checkWin};
        })();
    
        
        const draw = () => {
            playedSquares.every(square => {
                if (square === 'O' || square === 'X'){
                    console.log('Its a draw');
                }
            })
            console.log(playedSquares);
            return {playedSquares}
            /*
            playedSquares = playedSquares.filter(square => {
                if (square === 'O' || square === 'X'){
                    return square != 'O' + 'X';
                }
                else return square
            })
            if (playedSquares.length === 0 && win === false){
                console.log('Its a draw');
            }
            */
            console.log(playedSquares);
            return {playedSquares}
            
        }
        
        return {winner, draw, win}
    }

    board.forEach(square => {
        square.addEventListener('click', function playMove(){
            let section = square.getAttribute('data-num');
            if (win === false){
                if (moveCount % 2 === 0){
                    gameBoard.game.splice(section, 1, playerOne.getMarker());
                    if (gameOver().winner.checkWin() === true){
                        console.log(`${playerOne.playerName()} is victorious`);
                    }
                    
                }
                else if (moveCount % 2 !== 0){
                    gameBoard.game.splice(section, 1, playerTwo.getMarker());
                    if (gameOver().winner.checkWin() === true){
                        console.log(`${playerTwo.playerName()} is victorious`);
                    }
                }
                moveCount++
                board[section].textContent = gameBoard.game[section];
                gameOver().draw();

            }
            this.removeEventListener('click', playMove, false);
        }, false);
    });

}

const playGame = document.getElementById('play-game');
playGame.addEventListener('click', () => {
    ticTacToe();
})

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let clearSquare = document.querySelectorAll('.square');
    clearSquare.forEach(square => {
        square.textContent = '';
    });
    gameBoard.game = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    win = false;
    ticTacToe();
})


/*
const computer = () => {
        const check = gameOver();

        let remainingSquares = Math.floor(Math.random() * check.draw().playedSquares.length);
        
        gameBoard.game.splice(remainingSquares, 1, playerTwo.getMarker());
    
        board[remainingSquares].textContent = gameBoard.game[remainingSquares];
        console.log(gameBoard.game);
        console.log(board[remainingSquares].textContent);

        check.draw();
        check.winner();
        moveCount++;
    
    }    
*/

