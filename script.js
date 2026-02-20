const cities = [
  "Москва","Алматы","Пизы","Тараз","Рим","Минск","Киев",
  "Степногорск","Амстердам","Мадрид","Монтериджони","Лондон",
  "Нью-Йорк","Токио","Алматы","Омск","Кокшетау","Караганда",
  "Актобе","Ереван","Сицилия","Астана", "Зимбабве", "Бруклин", "Бразилиа",
  "Шымкент"
];

let usedCities = [];
let lastLetter = "";
let currentPlayer = 1;
let gameOver = false;

const input = document.getElementById("cityInput");
const log = document.getElementById("log");
const statusDiv = document.getElementById("status");
const mode = document.getElementById("mode");

document.getElementById("moveBtn").onclick = move;
document.getElementById("restartBtn").onclick = restart;

statusDiv.innerText = "Игра началась. Ход игрока 1";

function getLastLetter(word) {
  let w = word.toLowerCase();
  let letter = w[w.length - 1];

  if (letter === "ь" || letter === "ъ" || letter === "ы") {
    letter = w[w.length - 2];
  }

  return letter;
}

function move() {
  if (gameOver) return;

  let city = input.value.trim();
  if (city === "") return;

  city = city[0].toUpperCase() + city.slice(1).toLowerCase();

  if (!cities.includes(city)) {
    alert("Нет такого города");
    return;
  }

  if (usedCities.includes(city)) {
    alert("Город уже был");
    return;
  }

  if (lastLetter !== "" && city[0].toLowerCase() !== lastLetter) {
    alert("Нужно на букву " + lastLetter.toUpperCase());
    return;
  }

  usedCities.push(city);
  log.innerHTML += "<div>Игрок " + currentPlayer + ": " + city + "</div>";

  lastLetter = getLastLetter(city);
  input.value = "";

  if (mode.value === "bot") {
    botMove();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    statusDiv.innerText = "Ход игрока " + currentPlayer + ". Буква: " + lastLetter.toUpperCase();
  }
}

function botMove() {
  let found = null;

  for (let i = 0; i < cities.length; i++) {
    if (!usedCities.includes(cities[i]) &&
        cities[i][0].toLowerCase() === lastLetter) {
      found = cities[i];
      break;
    }
  }

  if (found === null) {
    log.innerHTML += "<div><b>Бот проиграл</b></div>";
    gameOver = true;
    statusDiv.innerText = "Игра окончена";
    return;
  }

  usedCities.push(found);
  log.innerHTML += "<div>Бот: " + found + "</div>";
  lastLetter = getLastLetter(found);
  statusDiv.innerText = "Ваш ход. Буква: " + lastLetter.toUpperCase();
}

function restart() {
  usedCities = [];
  lastLetter = "";
  currentPlayer = 1;
  gameOver = false;
  log.innerHTML = "";
  input.value = "";
  statusDiv.innerText = "Игра началась. Ход игрока 1";
}