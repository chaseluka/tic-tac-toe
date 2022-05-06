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

const playOnBoard = () => {
    const board = document.querySelectorAll('.square');
    const playerOne = Player('Chase', 'X');
    const playerTwo = Player('B', 'O');
    let moveCount = 0;
    board.forEach(square => {
        square.addEventListener('click', function playMove(){
            let section = square.getAttribute('data-num');
            const outcome = gameOver();
            console.log(win);
            if (win === false){
                if (moveCount % 2 === 0){
                    gameBoard.game.splice(section, 1, playerOne.getMarker());
                }
                else if (moveCount % 2 !== 0){
                    gameBoard.game.splice(section, 1, playerTwo.getMarker());
                }
                moveCount++
                board[section].textContent = gameBoard.game[section];

                
                outcome.winner();
                outcome.draw();
            }
            this.removeEventListener('click', playMove, false);
        }, false);
    });
    
}
playOnBoard();


let win = false;


const gameOver = () => {
    let playedSquares = gameBoard.game;
    const winner = () => {
        
        if (playedSquares[0] === playedSquares[1] && playedSquares[0] === playedSquares[2]){

            console.log('you won');
            win = true;
        }
        else if (playedSquares[3] === playedSquares[4] && playedSquares[3] === playedSquares[5]){
            
            console.log('you won');
            win = true;
        }
        else if (playedSquares[6] === playedSquares[7] && playedSquares[6] === playedSquares[8]){
            
            console.log('you won');
            win = true;
        }
        else if (playedSquares[0] === playedSquares[3] && playedSquares[0] === playedSquares[6]){
            
            console.log('you won');
            win = true;
        }
        else if (playedSquares[1] === playedSquares[4] && playedSquares[1] === playedSquares[7]){
            
            console.log('you won');
            win = true;
        }
        else if (playedSquares[2] === playedSquares[5] && playedSquares[5] === playedSquares[8]){
            
            console.log('you won');
            win = true;
        }
        else if (playedSquares[0] === playedSquares[4] && playedSquares[0] === playedSquares[8]){
            
            console.log('you won');
            win = true;
        }
        else if (playedSquares[2] === playedSquares[4] && playedSquares[2] === playedSquares[6]){
            
            console.log('you won');
            win = true;
        }
    }

    
    const draw = () => {
        playedSquares = playedSquares.filter(square => {
            if (square === 'O'){
                return square != 'O';
            }
            else if (square === 'X'){
                return square != 'X';
            }
            else return square
            
        })
        if (playedSquares.length === 0 && win === false){
            console.log('Its a draw');
        }
    }
    return {winner, draw, win}
}
