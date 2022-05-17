let win = false;
let moveCount = 0;

const ticTacToe = (() => {
    const board = document.querySelectorAll('.square');

    const gameBoard = (() => {
        let game = [];  
        return {game}
    })();

    const Player = (name, marker) => {
        const playerName = () => {return name;}
        const getMarker = () => {return marker}
        return {playerName, getMarker}
    }
    
    const createPlayers = () => {
        const markerO = document.getElementById('o').checked;
        if (markerO === true){
            const playerOne = Player('Player', 'O');
            const playerTwo = Player('Computer', 'X');
            return {playerOne, playerTwo, markerO};
        }
        else {
            const playerOne = Player('Player', 'X');
            const playerTwo = Player('Computer', 'O');
            return {playerOne, playerTwo, markerO};
        }
    }

    const filterSquares = (currentBoard) => {
        let filterSquares = currentBoard.filter(square => {
            if (square !== 'X' && square !== 'O'){
                return square
            }
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

    function minimax (board, computerMove, marker, scores, alpha, beta) {
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
                let evaluation = minimax(board, false, `${createPlayers().playerOne.getMarker()}`, false, alpha, beta);
                maxEvaluation = Math.max(maxEvaluation, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha){break}; 
                scores[remainingSquares[i]] = evaluation
            }
            else {
                let evaluation = minimax(board, true, `${createPlayers().playerTwo.getMarker()}`, false, alpha, beta);
                minEvaluation = Math.min(minEvaluation, evaluation);
                alpha = Math.min(alpha, evaluation);
                if (beta <= alpha){break}; 
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
            let updateBoard = null;
            let num = Math.random();

            const playMove = () => {
                if (updateBoard !== null){
                    gameBoard.game.splice(updateBoard, 1, `${createPlayers().playerTwo.getMarker()}`);
                    board[updateBoard].textContent = gameBoard.game[updateBoard];
                }
                if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`) === true){
                    console.log(`${createPlayers().playerTwo.playerName()} is victorious`);
                    win = true;
                }
            }
            
            const bestMove = () => {
                let bestScore = -Infinity;
                for (const score in scores){
                    if (scores[score] >= bestScore && scores[score] !== Infinity){
                        bestScore = scores[score];
                        updateBoard = score;
                    }
                }
                playMove(`${createPlayers().playerTwo.getMarker()}`);
            }

            const randomMove = () => {
                let options = [];
                for (const score in scores){
                    if (scores[score] >= -1){
                        options.push(score);
                    }
                }
                let randomNum = Math.floor(Math.random() * options.length);
                updateBoard = options[randomNum];
                playMove();
            }

            const easy = () => {
                if (num <= 0.25){bestMove();}
                else {randomMove();}
            }
            
            const medium = () => {
                if (num <= 0.50){bestMove();}
                else {randomMove();}
            }
            
            const hard = () => {
                if (num <= 0.75){bestMove();}
                else {randomMove();}
            }
            
            const difficulty = () => {
                const easyBot = document.getElementById('easy').checked;
                const mediumBot = document.getElementById('medium').checked;
                const hardBot = document.getElementById('hard').checked;
                if (easyBot === true){
                    easy(); 
                }
                else if (mediumBot === true){
                    medium();
                }
                else if (hardBot === true){
                    hard();
                }
                else bestMove();
            }

            moveCount++;
            return {difficulty}
        }

    }    
    
    const playMove = (e) => {
        const againstFriend = document.getElementById('friend').checked;
        let section = e.target;
        section = section.getAttribute('data-num');
        if (win === false && gameBoard.game[section] !== 'X' && gameBoard.game[section] !== 'O'){
                if (moveCount % 2 === 0){
                    gameBoard.game.splice(section, 1, createPlayers().playerOne.getMarker());
                    if (gameOver().winner(`${createPlayers().playerOne.getMarker()}`) === true){
                        console.log(`${createPlayers().playerOne.playerName()} is victorious`);
                        win = true;
                    }
                }
                else if (moveCount % 2 !== 0){
                    gameBoard.game.splice(section, 1, createPlayers().playerTwo.getMarker());
                    if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`) === true){
                        console.log(`${createPlayers().playerTwo.playerName()} is victorious`);
                        win = true;
                    }
                }
            
            if (win === false && againstFriend !== true){
                computer().difficulty();
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

    const startGame = () => {
        ticTacToe.gameBoard.game = ['0', 1, 2, 3, 4, 5, 6, 7, 8];
        win = false;
        ticTacToe.playRound();
        ticTacToe.createPlayers();
        moveCount = 0;
        if (ticTacToe.createPlayers().markerO === true){
            ticTacToe.computer().difficulty();
            moveCount++;
        }
        
    }

    const resetGame = () => {
        let clearSquare = document.querySelectorAll('.square');
            clearSquare.forEach(square => {
                square.textContent = '';
            });
    }

    const playGame = document.getElementById('play-game');
    playGame.addEventListener('click', () => {
        startGame();
    })

    const reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
        startGame();
        resetGame();
    })

    return{playRound, createPlayers, gameBoard, computer}
})();



