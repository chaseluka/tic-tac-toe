const gameBoard = (() => {
    let game = [10, 2, 3, 4, 5, 6, 7, 8, 9];
    
    return {
        game
    }
})();

let win = false;
let moveCount = 0;

const ticTacToe = (() => {
    const board = document.querySelectorAll('.square');

    const Player = (name, marker) => {
        const playerName = () => {return name;}
        const getMarker = () => {return marker}
        return {playerName, getMarker}
    }
    
    const createPlayers = () => {
        const playerOne = Player(`${document.getElementById('player-one').value}`, 'X');
        const playerTwo = Player(`${document.getElementById('player-two').value}`, 'O');
        const playerOneDisplay = document.querySelector('.players div:first-child');
        const playerTwoDisplay = document.querySelector('.players div:last-child');
        playerOneDisplay.textContent = `${playerOne.playerName()} is ${playerOne.getMarker()}`;
        playerTwoDisplay.textContent = `${playerTwo.playerName()} is ${playerTwo.getMarker()}`;
        return {playerOne, playerTwo}
    }
    
    const gameOver = () => {
        
        const winner = (() => {
            
            const rowWin = (() =>{
                row1 = [gameBoard.game[0], gameBoard.game[1], gameBoard.game[2]];
                row2 = [gameBoard.game[3], gameBoard.game[4], gameBoard.game[5]];
                row3 = [gameBoard.game[6], gameBoard.game[7], gameBoard.game[8]];
                if (row1.every(marker => marker =='X') || row1.every(marker => marker == 'O') ||
                    row2.every(marker => marker =='X') || row2.every(marker => marker == 'O') ||
                    row3.every(marker => marker =='X') || row3.every(marker => marker == 'O')){
                        return true;
                    }
                else return false
            })();
            
            const columnWin = (() => {
                column1 = [gameBoard.game[0], gameBoard.game[3], gameBoard.game[6]];
                column2 = [gameBoard.game[1], gameBoard.game[4], gameBoard.game[7]];
                column3 = [gameBoard.game[2], gameBoard.game[5], gameBoard.game[8]];
                if (column1.every(marker => marker =='X') || column1.every(marker => marker == 'O') ||
                    column2.every(marker => marker =='X') || column2.every(marker => marker == 'O') ||
                    column3.every(marker => marker =='X') || column3.every(marker => marker == 'O')){
                        return true;
                    }
                else return false
            })();

            const diagonalWin = (() => {
                diagonal1 = [gameBoard.game[0], gameBoard.game[4], gameBoard.game[8]];
                diagonal2 = [gameBoard.game[2], gameBoard.game[4], gameBoard.game[6]];
                if (diagonal1.every(marker => marker =='X') || diagonal1.every(marker => marker == 'O') ||
                    diagonal2.every(marker => marker =='X') || diagonal2.every(marker => marker == 'O')){
                        return true;
                    }
                else return false
            })();
            const checkWin = (() => {
                if (rowWin === true || columnWin === true || diagonalWin === true){
                    win = true;
                    return true
                }
                else return 
            })();
            return{checkWin};
        })();
        
        const draw = (() => {
            if (gameBoard.game.every(square => (square == 'O' || square == 'X')) && win === false){
                console.log('Its a draw');
            }
        })();
        return {winner, draw, win}
    }

    const playMove = (e) => {
        let section = e.target;
        section = section.getAttribute('data-num');
        if (win === false){
            if (moveCount % 2 === 0){
                gameBoard.game.splice(section, 1, createPlayers().playerOne.getMarker());
                if (gameOver().winner.checkWin === true){
                    console.log(`${createPlayers().playerOne.playerName()} is victorious`);
                }
            }
            else if (moveCount % 2 !== 0){
                gameBoard.game.splice(section, 1, createPlayers().playerTwo.getMarker());
                if (gameOver().winner.checkWin === true){
                    console.log(`${createPlayers().playerTwo.playerName()} is victorious`);
                }
            }
            moveCount++
            board[section].textContent = gameBoard.game[section];
        }
        e.target.removeEventListener('click', playMove, false);
    }

    const playRound = () => {
        board.forEach(square => {
            square.addEventListener('click', playMove, false);
        });
    }
    return{playRound, createPlayers}
})();

const playGame = document.getElementById('play-game');
playGame.addEventListener('click', () => {
    ticTacToe.playRound();
    ticTacToe.createPlayers();
    moveCount = 0;
})

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let clearSquare = document.querySelectorAll('.square');
    clearSquare.forEach(square => {
        square.textContent = '';
    });
    gameBoard.game = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    win = false;
    ticTacToe.playRound();
    moveCount = 0;
})


/*
const computer = () => {
        const check = gameOver();

        let remainingSquares = Math.floor(Math.random() * check.draw().gameBoard.game.length);
        
        gameBoard.game.splice(remainingSquares, 1, playerTwo.getMarker());
    
        board[remainingSquares].textContent = gameBoard.game[remainingSquares];
        console.log(gameBoard.game);
        console.log(board[remainingSquares].textContent);

        check.draw();
        check.winner();
        moveCount++;
    
    }    
*/

