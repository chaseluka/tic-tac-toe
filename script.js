
const ticTacToe = (() => {
    const board = document.querySelectorAll('.square');
    let win = false;
    let moveCount = 0;
    let choice = 'medium';
    let markerO = false;
    let againstFriend = false;

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
                if (updateBoard !== null && updateBoard !== 'undefined'){
                    gameBoard.game.splice(updateBoard, 1, `${createPlayers().playerTwo.getMarker()}`);
                    board[updateBoard].textContent = gameBoard.game[updateBoard];
                    if (createPlayers().playerTwo.getMarker() === 'O'){board[updateBoard].style.color = '#eee'}
                    else {board[updateBoard].style.color = '#3d3d3d'}
                }
                if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`) === true){
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
                if (choice === 'easy'){
                    easy(); 
                }
                else if (choice === 'medium'){
                    medium();
                }
                else if (choice === 'hard'){
                    hard();
                }
                else bestMove();
            }

            moveCount++;
            return {difficulty}
        }

    }    
    
    const playMove = (e) => {
        let section = e.target;
        section = section.getAttribute('data-num');
        if (win === false && gameBoard.game[section] !== 'X' && gameBoard.game[section] !== 'O'){
                if (moveCount % 2 === 0){
                    gameBoard.game.splice(section, 1, createPlayers().playerOne.getMarker());
                    board[section].textContent = gameBoard.game[section];       
                    if (gameOver().winner(`${createPlayers().playerOne.getMarker()}`) === true){
                        win = true;
                    }
                }
                else if (moveCount % 2 !== 0){
                    gameBoard.game.splice(section, 1, createPlayers().playerTwo.getMarker());
                    board[section].textContent = gameBoard.game[section];
                    if (gameOver().winner(`${createPlayers().playerTwo.getMarker()}`) === true){
                        win = true;
                    }
                }
            if (gameBoard.game[section] === 'O'){board[section].style.color = '#eee'}
            else {board[section].style.color = '#3d3d3d'}
            
            if (win === false && againstFriend !== true){
                console.log('hi');
                computer().difficulty();
            }
            moveCount++
            
        }
        e.target.removeEventListener('click', playMove, false);
    }

    const playRound = () => {
        board.forEach(square => {
            square.addEventListener('click', playMove, false);
        });
    }

    const difficultyDisplay = () => {
        const easyDiv = document.getElementById('easy');
        const mediumDiv = document.getElementById('medium');
        const hardDiv = document.getElementById('hard');
        const impossibleDiv = document.getElementById('impossible');

        easyDiv.setAttribute('style', 'background-color: none; color: #3d3d3d;');
        mediumDiv.setAttribute('style', 'background-color: none; color: #3d3d3d;');
        hardDiv.setAttribute('style', 'background-color: none; color: #3d3d3d;');
        impossibleDiv.setAttribute('style', 'background-color: none; color: #3d3d3d;');

        if (choice === 'easy'){easyDiv.setAttribute('style', 'background-color: #c83f49; color: #eee;')}
        else if (choice === 'medium'){mediumDiv.setAttribute('style', 'background-color: #c83f49; color: #eee;')}
        else if (choice === 'hard'){hardDiv.setAttribute('style', 'background-color: #c83f49; color: #eee;')}
        else {impossibleDiv.setAttribute('style', 'background-color: #c83f49; color: #eee;')}
    }

    const startGame = () => {
        resetGame();
        difficultyDisplay();
        gameBoard.game = ['0', 1, 2, 3, 4, 5, 6, 7, 8];
        win = false;
        playRound();
        createPlayers();
        moveCount = 0;
        if (createPlayers().markerO === true && againstFriend !== true){
            computer().difficulty();
            moveCount++;
        }
        
    }

    const resetGame = () => {
        let clearSquare = document.querySelectorAll('.square');
            clearSquare.forEach(square => {
                square.textContent = '';
            });
    }

    startGame();

    const reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
        startGame();
    });

    const markerBtn = document.querySelectorAll('.marker');
    markerBtn.forEach(button => {
        button.addEventListener('click', () => {
            let parent = document.querySelector('.marker-select');
            let animation = document.querySelector('svg');
            animation.classList.toggle('animation');
            animation.classList.toggle('animation-2');

            if (markerO === false){
                parent.prepend(document.getElementById('o'));
                parent.appendChild(document.getElementById('x'));
                markerO = true
            }
            else {
                parent.prepend(document.getElementById('x'));
                parent.appendChild(document.getElementById('o'));
                markerO = false;
            }
            startGame();
        })
    })

    const difficultyButton = document.querySelectorAll('.difficulty-choice');
    difficultyButton.forEach(button => {
        button.addEventListener('click', () => {
           choice = button.getAttribute('id'); 
           startGame();
        })
    });

    const opponentBtn = document.getElementById('opponent');
    opponentBtn.addEventListener('click', () => {
        if (againstFriend === false){
            againstFriend = true;
            opponentBtn.textContent = 'Play Computer';
            opponentBtn.style.cssText = 'background-color: #c83f49;';
        }
        else {
            againstFriend = false;
            opponentBtn.textContent = 'Two Player'
            opponentBtn.style.cssText = 'background-color: #3d3d3d;'
        }
        startGame();
    })
})();

