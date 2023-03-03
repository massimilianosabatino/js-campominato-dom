'use strict';

//Creazione di una funzione  
//   =>Generare con un ciclo dei div con classe dedicata, questi saranno le singole caselle. Ogni casella conterra un evento in ascolto per reagire al click  
//   =>passare alla funzione che genera i div il numero di div che deve generare  

//Element from page
const board = document.getElementById('board');
const play = document.getElementById('play');
const select = document.getElementById('set-game');

/*
*  Function
*/
//Create single cell
function createElement(htmlElement, htmlId, htmlClass, where, insertText) {
    const single = document.createElement(htmlElement);
    single.id = htmlId;
    single.className = htmlClass;
    single.innerText = insertText;
    where.appendChild(single);
    single.addEventListener('click', function() {
        playLogic(single);
    });
}

//Create general board
function gridDimension(colRowNumber){
    const totalCell = colRowNumber * colRowNumber;
    let single = '';
    for(let cell = 1; cell <= totalCell; cell++){
        createElement('div', 'cell', `cell-${colRowNumber}`, board, cell);
    }
}

//Add gameplay logic
function playLogic(single){
        single.classList.add('selected');
}

//Start game and refresh grid
function playGame(){
    board.innerHTML = '';
    gridDimension(select.value);
}


/*
*  Main
*/

