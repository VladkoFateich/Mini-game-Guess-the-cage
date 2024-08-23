const wrapper = document.querySelector('#wrapper');
const btnGenerate = document.createElement('button');
const btnNewGame = document.createElement('button');
btnGenerate.textContent = 'START';
btnNewGame.textContent = 'NEW GAME';
wrapper.append(btnGenerate);
wrapper.append(btnNewGame);

createTable(10, 10, wrapper);
// createBtns(wrapper);
const tds = document.querySelectorAll('td');

let arr = [];
let count = 0;

console.log(tds);

btnNewGame.addEventListener('click', restartGame);
function restartGame() {
  for (let elem of tds) {
    elem.style.background = 'white';
  }
  arr = [];
  btnGenerate.addEventListener('click', start);
}
btnGenerate.addEventListener('click', start);
function start() {
  for (let i = 0; i < tds.length; i++) {
    tds[i].addEventListener('click', function () {
      if (arr.includes(i)) {
        tds[i].style.background = 'green';
      } else {
        tds[i].style.background = 'red';
      }
      // console.log(i);
    });
  }
  for (let i = 0; i < 10; i++) {
    arr.push(getArrayRandom(1, 100));
    this.removeEventListener('click', start);
  }
  console.log(arr);
}

function getArrayRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function createBtns(parent) {
//   const btnGenerate = document.createElement('button');
//   const btnNewGame = document.createElement('button');
//   btnGenerate.textContent = 'START';
//   btnNewGame.textContent = 'NEW GAME';
//   parent.append(btnGenerate);
//   parent.append(btnNewGame);

//   btnGenerate.addEventListener('click', start);
//   btnNewGame.addEventListener('click', restartGame);
// }

function createTable(rows, cols, parent) {
  let table = document.createElement('table');
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < cols; j++) {
      let td = document.createElement('td');
      tr.append(td);
    }
    table.append(tr);
  }
  parent.append(table);
}
