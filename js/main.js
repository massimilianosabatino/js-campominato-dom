'use strict';

//Creazione di una funzione  
//   =>Generare con un ciclo dei div con classe dedicata, questi saranno le singole caselle. Ogni casella conterra un evento in ascolto per reagire al click  
//   =>passare alla funzione che genera i div il numero di div che deve generare  

//Element from page
const board = document.getElementById('board');
const play = document.getElementById('play');
const select = document.getElementById('set-game');
const modal = document.getElementById('modal');
const textModal = document.getElementById('text-modal');
const span = document.getElementsByClassName("close")[0];

let bomb =[];
let gameOver = false;
let score = 0;


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
    const maxScore = Math.pow(select.value, 2) - bomb.length;
    if(bomb.includes(parseInt(cellNumber))){
        single.classList.add('bomb');
        stopGame();
        single.removeEventListener('click', playLogicCall);
        modal.style.display = "flex";
        textModal.innerText = `Hai perso! Il tuo punteggio è ${score}`;
    } else if(score === maxScore){
        stopGame();
        single.removeEventListener('click', playLogicCall);
        modal.style.display = "flex";
        textModal.innerText = `Hai vinto! Il tuo punteggio è ${score}`;
    } else {
        single.classList.add('selected');
        score ++ ;
        tableScore.innerHTML = score;
    }

}

function stopGame() {
    gameOver = true;
    const allBomb = document.querySelectorAll('#cell');
    for(let i = 0; i < allBomb.length - 1; i++){
        if(bomb.includes(parseInt(allBomb[i].innerHTML))){
            allBomb[i].classList.add('bomb');
        }
    }
  }

//Start game and refresh grid
function playGame(){
    board.innerHTML = '';
    bomb = [];
    gameOver = false;
    score = 0;
    gridDimension(select.value);
}

const tableScore = document.getElementById('table-score');
tableScore.innerHTML = score;

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}