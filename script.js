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

const playOnBoard = () => {
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
        let marker = '';
        const winner = () => {
            if (playedSquares[0] === playedSquares[1] && playedSquares[0] === playedSquares[2]){
                marker = playedSquares[0]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[3] === playedSquares[4] && playedSquares[3] === playedSquares[5]){
                marker = playedSquares[3]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[6] === playedSquares[7] && playedSquares[6] === playedSquares[8]){
                marker = playedSquares[6]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[0] === playedSquares[3] && playedSquares[0] === playedSquares[6]){
                marker = playedSquares[0]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[1] === playedSquares[4] && playedSquares[1] === playedSquares[7]){
                marker = playedSquares[1]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[2] === playedSquares[5] && playedSquares[5] === playedSquares[8]){
                marker = playedSquares[2]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[0] === playedSquares[4] && playedSquares[0] === playedSquares[8]){
                marker = playedSquares[0]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
                win = true;
            }
            else if (playedSquares[2] === playedSquares[4] && playedSquares[2] === playedSquares[6]){
                marker = playedSquares[2]; 
                if (marker === playerOne.getMarker()){
                    console.log(`${playerOne.playerName()} is victorious`);
                }
                else if (marker === playerTwo.getMarker()){
                    console.log(`${playerTwo.playerName()} is victorious`);
                }
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
            console.log(playedSquares);
        }
        
        return {winner, draw, win}
    }

    board.forEach(square => {
        square.addEventListener('click', function playMove(){
            let section = square.getAttribute('data-num');
            const outcome = gameOver();

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

const playGame = document.getElementById('play-game');
playGame.addEventListener('click', () => {
    playOnBoard();
})

const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let clearSquare = document.querySelectorAll('.square');
    clearSquare.forEach(square => {
        square.textContent = '';
    });
    gameBoard.game = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    win = false;
    playOnBoard();
})



