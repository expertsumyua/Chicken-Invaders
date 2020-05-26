// geroy - самолетик
var starship = null;
var starshipImg = null;
// // chiken - курица
// var chicken = null;
// счетчик куриц
var chickenCount = 0;
// сумма куриц на игровом поле
var chickenSum = 5;
// stars==очки на иговом поле
var stars = null;
// Блок для отображения жизней 
var lifesBlock = null;
//life==жизни на игровом поле
var life = null;
// переменная кол-ва жизней
var lifesCount = 5;

var pointBlock = null;
// переменная очков
var pointCount = 0;

//var keyS = false;

// gameField - блок игрового поля
var gameField = null;//document.querySelector("#game-field");

// Переменнная отвечвющая за возможность передвиени корабля.
// Если не применить ей всобытиях нажатия, то кораблик не будет
// изменять свое озображение.
var move = true;

var game = true;

var bulletCount = 10;

// Статусы игры.
var gameStatus = {
	START: "start",  // инициализация
	PLAY: "play", // игра
	NEXTLEVEL: "nextlevel", // переход на следующий уровень
	FINISH: "finish", // конец игры.
	GAMEOVER: "gameover" // проигрыш.
};
// текущий статус
var currentGameStatus = gameStatus.START;
// Счетчик для уникальных элементов.
var elementCounter = 0;
// 
var gameApplication = document.querySelector("#game-app");