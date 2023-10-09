const gameCells = document.querySelectorAll('.cell');
const currentStatus = document.querySelector('#currentStatus');
const reMatchBtn = document.querySelector('#rematchBtn');
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let nowPlayer = "X";
let gameOn = false;

initGame();

function initGame(){
    gameCells.forEach(cell => cell.addEventListener('click', cellClicked));
    reMatchBtn.addEventListener('click', reMatch);
    currentStatus.textContent = `${nowPlayer}'s Turn`;
    gameOn = true;
};
function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');
    currentStatus.style.display = 'block';

    if(options[cellIndex] != "" || !gameOn){
        return;
    }

    updateCell(this, cellIndex);
    whoWins();
};
function updateCell(cell, index){
    options[index] = nowPlayer;
    cell.textContent = nowPlayer;
};
function changePlayer(){
    nowPlayer = (nowPlayer == 'X') ? 'O' : 'X';
    currentStatus.textContent = `${nowPlayer}'s turn`
    
};
function whoWins(){
    let hasWon = false;

    for( let i = 0; i < winCondition.length; i++){
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == '' || cellB == '' || cellC == ''){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            hasWon = true;
            break;
        }
    }
    if(hasWon){
        currentStatus.textContent = `${nowPlayer} wins!`;
        gameOn = false;
    }else if(!options.includes('')){
        currentStatus.textContent = `It's a Draw!`;
        gameOn = false;
    }
    else{
        changePlayer();
    }
};
function reMatch(){
    nowPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    currentStatus.textContent = `${nowPlayer}'s turn`;
    gameCells.forEach(cell => cell.textContent = "");
    gameOn = true;
};