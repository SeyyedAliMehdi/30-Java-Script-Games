const gameStatus = document.getElementById('game_status');
const movesDisplay = document.getElementById('moves');
const resetButton = document.querySelector('.btn');
const exceptions = [2,3,5,6];

let state = rand();
let gameActive = true;
let moves = 0;

    //loading numbers
function loadState() {
    for (let i=0; i<9; i++) {
        cells = document.querySelectorAll('.cell');
        cells[i].innerHTML = state[i];
        if (state[i] == parseInt(cells[i].id)+1) {
            cells[i].classList.add('correct');
        } else {
            cells[i].classList.remove('correct');
        }
    }
    movesDisplay.innerHTML = moves;
};

loadState();

    //reset button event handler
resetButton.onclick = function() {
    moves = 0;
    state = rand();
    loadState();
    gameActive = true;
    gameStatus.innerHTML = "Start moving Tile !"; 
    gameStatus.style.color = 'rgb(113, 80, 155)';
};

document.querySelectorAll('.cell')
.forEach(elem => elem.onclick = move);

    //cells click event handler
function move(e) {
  
    let a,b;
    let targetCell = e.target;
   
    if (targetCell.innerHTML === "") return;
    
    if (gameActive){
        a = state.indexOf(parseInt(targetCell.innerHTML));
        b = state.indexOf('');
    
    //possible moves:
        if( (Math.abs(a - b) === 1 && 
        (!exceptions.includes(a)||!exceptions.includes(b)) || 
        Math.abs(a - b) === 3 )) {
            state[b] = parseInt(targetCell.innerHTML);
            state[a] = '';
            moves+=1;
            loadState();
            check();
        }
    }
};

    //check if the puzzle is solved
function check() {
  let t = 0;
    for (let i=0; i<8; i++) {
        if (state[i] === parseInt(document.getElementById(`${i}`).id)+1) t++;
    }
    if (t === 8)  {
      gameStatus.innerHTML= "You win !";
      gameStatus.style.color = 'rgb(201, 0, 84)';
      gameActive = false; 
  }
};

    // create a random state
function rand(){
    let t = 1;

    while(t % 2 !== 0){
        console.log(t)

        randState = [];

        while (randState.length < 9){
            randNum = Math.floor(Math.random()*9);
            if (randState.includes(randNum)) continue
            else randState.push(randNum);
        }
        randState[randState.indexOf(0)] = '';

    // Check if the state is solvable
        t = 0;
        for (i = 0; i< 8; i++){
            for(j = i+1; j<9; j++){
                if (randState[i] !== '' &&
                    randState[j] !== '' &&
                    randState[i] > randState[j]) t++;
            }
        }
        console.log(t)

    }
    return(randState);  
};