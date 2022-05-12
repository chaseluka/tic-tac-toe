let win = false;
let moveCount = 0;

const ticTacToe = (() => {
    const board = document.querySelectorAll('.square');

    const gameBoard = (() => {
        let game = [1, 'X', 'O', 'O', 'O', 6, 'X', 'X', 9];
        return {game}
    })();

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

    const filterSquares = (currentBoard) => {
        let filterSquares = currentBoard.filter(square => {
            if (square !== 'X' && square !== 'O'){return square}
        });
        let remainingSquares = [];
        
        for (const number in filterSquares){
            let indx = filterSquares[number] - 1;
            remainingSquares.push(`${indx}`);
        }
        return remainingSquares;
    }
    
    const gameOver = () => {
        
        const winner = (marker) => {
            if (
                (gameBoard.game[0] === marker && gameBoard.game[1] === marker && gameBoard.game[2] === marker) ||
                (gameBoard.game[3] === marker && gameBoard.game[4] === marker && gameBoard.game[5] === marker) ||
                (gameBoard.game[6] === marker && gameBoard.game[7] === marker && gameBoard.game[8] === marker) ||
                (gameBoard.game[0] === marker && gameBoard.game[3] === marker && gameBoard.game[6] === marker) ||
                (gameBoard.game[1] === marker && gameBoard.game[4] === marker && gameBoard.game[7] === marker) ||
                (gameBoard.game[2] === marker && gameBoard.game[5] === marker && gameBoard.game[8] === marker) ||
                (gameBoard.game[0] === marker && gameBoard.game[4] === marker && gameBoard.game[8] === marker) ||
                (gameBoard.game[2] === marker && gameBoard.game[4] === marker && gameBoard.game[6] === marker)
            ){
                win = true;
                return true;
            }
            else return false
        };
        
        const draw = (() => {
            if (gameBoard.game.every(square => (square == 'O' || square == 'X')) && win === false){
                console.log('Its a draw');
                return true
            }
        })();
        return {winner, draw, win}
    }

    function minimax (board, computerMove, marker) {
        let array = board;
        if (gameOver().winner(`${createPlayers().playerOne.getMarker()}`)){ 
            let evaluation = -1;
            return evaluation;
        }
        else if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`)){
            let evaluation = 1;
            return evaluation;
        }
        else if (gameOver().draw){
            let evaluation = 0;
            return evaluation;
        }
        let remainingSquares = filterSquares(array);
        for (let i = 0; i < remainingSquares.length; i++){
            array[remainingSquares[i]] = marker;
            if (computerMove){
                let maxEvaluation = -Infinity;
                let evaluation = minimax(array, false, `${createPlayers().playerOne.getMarker()}`);
                maxEvaluation = Math.max(maxEvaluation, evaluation);
                return maxEvaluation;
            }
            else {
                let minEvaluation = -Infinity;
                let evaluation = minimax(array, true, `${createPlayers().playerTwo.getMarker()}`);
                minEvaluation = Math.min(minEvaluation, evaluation);
                return minEvaluation;
            }
        }
    }


    const computer = () => {
        if (win === false){
            console.log(gameBoard.game);
            const cpuPlay = minimax(gameBoard.game, true, `${createPlayers().playerTwo.getMarker()}`);
            console.log(gameBoard.game);
            console.log(cpuPlay);

            
            /*let num = Math.floor(Math.random() * remainingSquares.length);
            let numFound = remainingSquares[num] - 1;
            
            gameBoard.game.splice(numFound, 1, createPlayers().playerTwo.getMarker());
            board[numFound].textContent = gameBoard.game[numFound];

            if (gameOver().winner.checkWin === true){
                console.log(`${createPlayers().playerTwo.playerName()} is victorious`);
            }
            moveCount++;
            
            const move = minimax(gameBoard.game, `${createPlayers().playerTwo.getMarker()}`, true);
        */
        }
        
    }    

    const playMove = (e) => {
        let section = e.target;
        section = section.getAttribute('data-num');
        if (win === false){
            if (moveCount % 2 === 0){
                gameBoard.game.splice(section, 1, createPlayers().playerOne.getMarker());
                if (gameOver().winner(`${createPlayers().playerOne.getMarker()}`) === true){
                    console.log(`${createPlayers().playerOne.playerName()} is victorious`);
                    
                }
                moveCount++
            }
            else if (moveCount % 2 !== 0){
                gameBoard.game.splice(section, 1, createPlayers().playerTwo.getMarker());
                if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`) === true){
                    console.log(`${createPlayers().playerTwo.playerName()} is victorious`);
                }
            }
            
            board[section].textContent = gameBoard.game[section];
            
            computer();
            
        }
        e.target.removeEventListener('click', playMove, false);
    }

    const playRound = () => {
        board.forEach(square => {
            square.addEventListener('click', playMove, false);
        });
    }
    return{playRound, createPlayers, gameBoard}
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
    ticTacToe.gameBoard.game = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    win = false;
    ticTacToe.playRound();
    moveCount = 0;
})





/*
let child = position[i];
                let evaluation = minimax(child, depth - 1, false);
                maxEvaluation = Math.max(maxEvaluation, evaluation);
                */