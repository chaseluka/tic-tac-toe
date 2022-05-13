let win = false;
let moveCount = 0;

const ticTacToe = (() => {
    const board = document.querySelectorAll('.square');

    const gameBoard = (() => {
        let game = [0, 1, 2, 3, 4, 5, 6, 7, 8];  //[0, 1, 2, 3, 4, 5, 6, 7, 8] ['X', 'X', 'O', 3, 4, 5, 'O', 7, 8]
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
        return filterSquares;
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
                return true;
            }
            else return false
        };
        
        const draw = (board) => {
            if (board.every(square => (square == 'O' || square == 'X'))){
                
                return true
            }
        };
        return {winner, draw, win}
    }

    function minimax (board, computerMove, marker, scores) {
        if (gameOver().winner(`${createPlayers().playerOne.getMarker()}`)){ 
            let evaluation = -1;
            return evaluation;
        }
        else if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`)){
            let evaluation = 1;
            return evaluation;
        }
        else if (gameOver().draw(board)){
            let evaluation = 0;
            return evaluation;
        }
        let maxEvaluation = -Infinity;
        let minEvaluation = +Infinity;
        let remainingSquares = filterSquares(board);
        for (let i = 0; i < remainingSquares.length; i++){
            board[remainingSquares[i]] = marker;
            if (computerMove === true){
                let evaluation = minimax(board, false, `${createPlayers().playerOne.getMarker()}`, false);
                maxEvaluation = Math.max(maxEvaluation, evaluation);
                scores[remainingSquares[i]] = evaluation
            }
            else {
                let evaluation = minimax(board, true, `${createPlayers().playerTwo.getMarker()}`, false);
                minEvaluation = Math.min(minEvaluation, evaluation);
            }
            board[remainingSquares[i]] = remainingSquares[i];
            
        }
        if (computerMove && scores){return scores}
        else if (computerMove && scores === false){
            return maxEvaluation
        }
        else return minEvaluation
    }


    const computer = () => {
        if (win === false){
            console.log(gameBoard.game);
            const scores = {
                0: this.score,
                1: this.score,
                2: this.score,
                3: this.score,
                4: this.score,
                5: this.score,
                6: this.score,
                7: this.score,
                8: this.score
            }
            const cpuPlay = minimax(gameBoard.game, true, `${createPlayers().playerTwo.getMarker()}`, scores);
            console.log(gameBoard.game);
            console.log(scores);
            let bestScore = -Infinity;
            let updateBoard = null;
            for (const score in scores){
                console.log(scores[score]);
                if (scores[score] >= bestScore && scores[score] !== Infinity){
                    bestScore = scores[score];
                    updateBoard = score;
                }
            }
            if (updateBoard !== null){
                gameBoard.game.splice(updateBoard, 1, createPlayers().playerTwo.getMarker());
                board[updateBoard].textContent = gameBoard.game[updateBoard];
            }
            


            
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
            
            gameBoard.game.splice(section, 1, createPlayers().playerOne.getMarker());
                if (gameOver().winner(`${createPlayers().playerOne.getMarker()}`) === true){
                    console.log(`${createPlayers().playerOne.playerName()} is victorious`);
                    win = true;
                }
                moveCount++
            /*else if (moveCount % 2 !== 0){
                gameBoard.game.splice(section, 1, createPlayers().playerTwo.getMarker());
                if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`) === true){
                    console.log(`${createPlayers().playerTwo.playerName()} is victorious`);
                }
            }
            */
            
            board[section].textContent = gameBoard.game[section];
            if (win === false){
                computer();
            }
            
            
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