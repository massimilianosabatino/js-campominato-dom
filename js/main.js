'use strict';

//Creazione di una funzione  
//   =>Generare con un ciclo dei div con classe dedicata, questi saranno le singole caselle. Ogni casella conterra un evento in ascolto per reagire al click  
//   =>passare alla funzione che genera i div il numero di div che deve generare  

//Element from page
const board = document.getElementById('board');
const play = document.getElementById('play');
const select = document.getElementById('set-game');
let bomb =[];
let gameOver = false;


/*
*  Function
*/
//Random number in range
function getRandom(min = 1, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  

//Create single cell
function createElement(htmlElement, htmlId, htmlClass, where, insertText) {
    const single = document.createElement(htmlElement);
    single.id = htmlId;
    single.className = htmlClass;
    single.innerText = insertText;
    where.appendChild(single);
    single.addEventListener('click', playLogicCall);
    return single;
}

//Create general board
function gridDimension(colRowNumber){
    const totalCell = colRowNumber * colRowNumber;
    let single = '';
    for(let cell = 1; cell <= totalCell; cell++){
        createElement('div', 'cell', `cell-${colRowNumber}`, board, cell);
    }
    let i = 0;
    while(i < 16){
        const bombSingle = getRandom(1, totalCell);
        if(bomb.includes(bombSingle)){
            i = i;
        } else {
            bomb.push(bombSingle);
            i++;
        }
    }
}

//Funzione di servizio - associata per richiamare l'event listener così da poterlo rimuovere in seguito
function playLogicCall() {
    if (!gameOver) {
        playLogic(this);
      }
}

//Add gameplay logic
function playLogic(single){
    const cellNumber = single.innerText;
    if(bomb.includes(parseInt(cellNumber))){
        single.classList.add('bomb');
        stopGame();
        single.removeEventListener('click', playLogicCall);
    } else {
        single.classList.add('selected');
    }

}

function stopGame() {
    alert('Game over');
    gameOver = true;
  }

//Start game and refresh grid
function playGame(){
    board.innerHTML = '';
    bomb = [];
    gameOver = false;
    gridDimension(select.value);
}


/*
*  Main
*/

