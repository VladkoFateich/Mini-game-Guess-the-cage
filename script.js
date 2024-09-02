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
const timer = document.createElement('div');
const animation = document.querySelector('#animation');
const minutes = document.createElement('span');
const seconds = document.createElement('span');

timer.id = 'timerId';
minutes.id = 'minutes';
seconds.id = 'seconds';

timer.append(minutes);
timer.append(seconds);

for (let i = 0; i <= txtArr.length; i++) {
  btnGenerate.textContent = txtArr[0];
  btnNewGame.textContent = txtArr[1];
  title.textContent = txtArr[2];
  subTitle.textContent = txtArr[3];
  wrapper.append(title);
  wrapper.append(subTitle);
  wrapper.append(btnGenerate);
  wrapper.append(btnNewGame);
  wrapper.append(animation);
  wrapper.append(timer);
}

let arr = [];

// на сколько минут ставим таймер
let count = 1;
// запущен таймер или нет
let started = false;

// запуск таймера по кнопке
function startTimer() {
  let table = document.querySelector('table');
  // если таймер уже запущен — выходим из функции
  if (started) {
    return;
  }
  // запоминаем время нажатия
  let start = new Date();
  console.log(start);
  // получаем время окончания таймера
  let stop = start.setMinutes(start.getMinutes() + count);
  console.log(stop);

  // запускаем ежесекундный отсчёт
  let countDownTimer = setInterval(function () {
    // текущее время
    let now = new Date().getTime();
    // сколько времени осталось до конца таймера
    let remain = stop - now;
    // переводим миллисекунды в минуты и секунды
    const m = Math.floor((remain / 1000 / 60) % 60);
    const s = Math.floor((remain / 1000) % 60);
    // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
    minutes.textContent = m < 10 ? '0' + m : m;
    // console.log(minutes)
    seconds.textContent = s < 10 ? '0' + s : s;
    // console.log(minutes)
    // если время вышло
    if (remain < 0) {
      // останавливаем отсчёт
      clearInterval(countDownTimer);
      // пишем текст вместо цифр
      timer.textContent = 'STOP GAME';
      table.remove();
      btnNewGame.addEventListener('click', restartGame);
      // btnGenerate.addEventListener('click', start);
    }
  }, 1000);
  // помечаем, что таймер уже запущен
  started = true;
}

// createTable(10, 10, wrapper);
// const tds = document.querySelectorAll('td');

// btnNewGame.addEventListener('click', restartGame);

// function restartGame() {
//   animation.style.display = 'inline-block';
//   for (let elem of tds) {
//     elem.style.background = 'white';
//   }
//   arr = [];
//   btnGenerate.addEventListener('click', start);
// }
function restartGame() {
  // timer.textContent = '';
  arr = [];
  btnGenerate.addEventListener('click', start);
}

btnGenerate.addEventListener('click', start);

function start() {
  animation.style.display = 'none';
  createTable(10, 10, wrapper);
  startTimer();
  const tds = document.querySelectorAll('td');
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
    btnGenerate.removeEventListener('click', start);
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
