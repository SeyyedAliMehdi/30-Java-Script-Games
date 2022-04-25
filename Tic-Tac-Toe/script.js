const status = document.querySelector('.status'),
cell = document.querySelectorAll('.cell'),
btn = document.querySelector('.restart');

let player = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const playerTurn = () => `${player} Turn`;

const winConditions = [
  [0, 1, 2],[3, 4, 5],[6, 7, 8],
  [0, 3, 6],[1, 4, 7],[2, 5, 8],
  [0, 4, 8],[2, 4, 6]
];

status.innerHTML = playerTurn();

cell.forEach(cell => cell.addEventListener('click', CellClick));
btn.addEventListener('click', restartGame);

function CellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('cell-index')
  );

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = player;
  clickedCell.innerHTML = player;
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let i = 0; i <= winConditions.length - 1; i++) {
    const winCondition = winConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      let winCells = [winCondition[0],winCondition[1],winCondition[2]];
      changeColor(winCells);
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.innerHTML = `${player} WINS!`;
    status.style.color = '#17975b';
    btn.style.backgroundColor = '#7cd1aa';
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    status.innerHTML = 'DRAW!';
    status.style.color = '#ad1d1d';
    btn.style.backgroundColor = '#e67676';
    gameActive = false;
    return;
  }

  player = player === 'X' ? 'O' : 'X';
  status.innerHTML = playerTurn();
}

function changeColor(winCells) {
  winCells.forEach(cell =>{
    document.querySelector(`.cell:nth-child(${cell+1})`)
    .style.backgroundColor = '#9bd8bc'
  });
 }

function restartGame() {
  gameActive = true;
  player = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  btn.style.backgroundColor = '';
  status.innerHTML = playerTurn();
  status.style.color = '';
  cell.forEach(cell => {cell.innerHTML = '';
  cell.style.backgroundColor = '';
  });
}