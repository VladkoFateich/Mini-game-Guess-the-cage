const txtArr = [
  'Старт',
  'Новая игра',
  'Игра угадай ячейку',
  'Дана таблица 10 на 10. По нажатию на кнопку старт компьютер случайным образом запоминает 10 ячеек из этой таблицы. Игроку нужно кликать на клетки пока он не найдет все загаданные компьютером клетки, после нажатия на кнопку старт поле очищается игра начинается заново',
  'Ход: ',
];
const wrapper = document.querySelector('#wrapper');
const btnGenerate = document.createElement('button');
const btnNewGame = document.createElement('button');
const title = document.createElement('h1');
const subTitle = document.createElement('p');

let arr = [];

for (let i = 0; i <= txtArr.length; i++) {
  btnGenerate.textContent = txtArr[0];
  btnNewGame.textContent = txtArr[1];
  title.textContent = txtArr[2];
  subTitle.textContent = txtArr[3];
  wrapper.append(title);
  wrapper.append(subTitle);
  wrapper.append(btnGenerate);
  wrapper.append(btnNewGame);
}
createTable(10, 10, wrapper);
const tds = document.querySelectorAll('td');

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
    });
  }
  console.log(arr);

  for (let i = 0; i < 10; i++) {
    arr.push(getArrayRandom(1, 100));
    this.removeEventListener('click', start);
  }
}

function getArrayRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
