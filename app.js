const gameBoard = (function(array) {

    array = ['x', 'x', 'x', 'o', 'x', 'x', 'o', 'x', 'o'];
    let gameState = ['','','','','','','','',''];
    let gameActive = true;
    let currentPlayer = 'X';

    
    function winwinChickDin(array){
        winningMessage = () => `Player ${currentPlayer} has won!`;
        array = [] || undefined;
        
            
        }
        //winwinChickDin(array);
    }

    function render(){
        const statusDisplay = document.querySelector('gameStatus');

        array.forEach(e => {
            const board = document.getElementById('board');
            let box = document.createElement('div')
            box.id = 'box';
            box.cellIndex = e - 1;
            box.innerText = e;
            board.appendChild(box);
        });
    }

    return {render, winwinChickDin};
    
})();

const player = (function (name){
    return {name};
});

const game = (function(p1, p2){
    p1 = player1;
    p2 = player2;
})

gameBoard.render();
console.log(gameBoard.winwinChickDin());