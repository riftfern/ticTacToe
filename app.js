let gameBoardModule = {
    gameBoard: ["", "", "", "", "", "", "", "", ""],
    init: function(){
        this.cacheDom();
        this.bindEvents();
        this.render(); 
    },
    cacheDom: function(){
        this.statusDisplay = document.querySelector('.gameStatus'),
        this.player1Name = document.getElementById('p1Name').value,
        this.player2Name = document.getElementById('p2Name').value,
    },
    bindEvents: function(){

    }
    //render method, interacts with the html
    render: function (){
        
    }
}

const gameBoard = (function() {

    const statusDisplay = document.querySelector('.gameStatus');
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let player1Name = '';
    let player2Name = '';
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let messages = {
        winningMessage: () => `Player ${currentPlayer} has won!`,
        drawMessage: () => `It's a tie!`,
        currentPlayerTurn: () => `It's ${currentPlayer}'s turn`
    }

    //winningMessage = () => `Player ${currentPlayer} has won!`;
    //drawMessage = () => `It's a tie!`;
    //currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

    function setPlayerName(){
        player1Name = document.getElementById('p1Name').value;
        player2Name = document.getElementById('p2Name').value;
        return player1Name, player2Name;
    }

    statusDisplay.innerHTML = messages.currentPlayerTurn();

    function handleBoxPlayed(clickedBox, clickedBoxIndex){
        gameState[clickedBoxIndex] = currentPlayer;
        clickedBox.innerHTML = currentPlayer;
    }

    function handlePlayerChange(){
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
        statusDisplay.innerHTML = `${messages.currentPlayerTurn()}: ${currentPlayerName}`;
    }

    function rulesValidation(){
        let roundWon = false;
        for(let i = 0; i<= 7; i++){
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a == b && b == c){
                roundWon = true;
                break
            }
        }
        if(roundWon){
            statusDisplay.innerHTML = messages.winningMessage();
            gameActive = false; 
            return;
        }
        let roundDraw = !gameState.includes('');
        if(roundDraw){
            statusDisplay.innerHTML = messages.drawMessage();
            gameActive = false;
            return;
        }
        handlePlayerChange();
    }

    function boxClick(clickBoxEvent){
        const clickedBox = clickBoxEvent.target;

        const clickedBoxIndex = parseInt(
            clickedBox.getAttribute('data-cell-index')
        );

        if(gameState[clickedBoxIndex] !=='' || !gameActive){
            return;
        }

        handleBoxPlayed(clickedBox, clickedBoxIndex);
        rulesValidation();
    }

    function restartGame(){
        gameActive = true; 
        currentPlayer = 'X'
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.innerHTML = `${messages.currentPlayerTurn()} ${player1Name}`;
        document.querySelectorAll('.box').forEach(box => box.innerHTML = '')
    }

    document.querySelector('#startBtn').addEventListener('click', setPlayerName);
    document.querySelectorAll('.box').forEach(cell => cell.addEventListener('click', boxClick));
    document.querySelector('#gameRestart').addEventListener('click', restartGame);
    
})();


