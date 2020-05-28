// cоздание блока очков
function createPointBlock(thisP) {
	// pointCount = thisP;
	//создаем div
	pointBlock = document.createElement("div");
	//прописываем класс
	pointBlock.className = "point-block";
	// прописываем очки
	pointBlock.innerText = pointCount = thisP;
	//добавляем очки в игру 
	gameField.appendChild(pointBlock);
}

function pointCounter(count) {
	// if (move) {
	if (count == 4) {
		soundClick(5);
		if (lifesCount < lifesAmount) {
			addLifes();
		}
		else if (lifesCount == lifesAmount) {
			pointCount += count;
			pointBlock.innerText = pointCount;
		}

	} else {
		soundClick(4);
		pointCount += count;
		pointBlock.innerText = pointCount;
	}
	if (pointCount >= 10) {
		starship.remove();
		clearGameField();
		showGameWindow(gameStatus.FINISH);
		// showGameWindow(gameStatus.GAMEOVER);
	}
	// }
}

function removePointBlock() {
	pointBlock.remove();
}


// создание блока lifes;
function createLifesBlock(thisL) {
	// создаем div и добавляем его в игру, прописываем id 
	let curretLifesSum = thisL;
	lifesBlock = document.createElement("div");
	lifesBlock.className = "lifes-block";
	gameField.appendChild(lifesBlock);
	while (curretLifesSum) {
		createLife();
		curretLifesSum--;
	}
}

function createLife() {
	life = document.createElement("img");
	life.src = "img/bonus/life.gif";
	lifesBlock.appendChild(life);
}

function addLifes() {
	removeLifesBlock();
	// lifesCount++;
	createLifesBlock(++lifesCount);

}
function removeLifes() {
	lifesCount--;
	if (lifesCount > 0) {
		//console.dir(lifesCount);
		removeLifesBlock();
		createLifesBlock(lifesCount);
	} if (lifesCount == 0) {
		// move = false;
		console.dir("Жизней: " + lifesCount);
		clearGameField();
		showGameWindow(gameStatus.GAMEOVER);
	}
	// console.dir(lifesCount);
}

function removeLifesBlock() {
	// if (lifesCount == 0) { lifesCount = 5; }
	lifesBlock.remove();
}

function createGameField() {
	game = true;
	move = true;
	soundFonStart();
	createStarship();
	// lifesCount = 5;
	createLifesBlock(lifesCount = lifesAmount);
	console.dir(lifesCount);
	// pointCount = 0;
	createPointBlock(0);
	chickenCount = 0; /* необходимо эсдесь делать обнуление */
	createManyChicken();
	console.dir("Курей должно быть: " + chickenCount);
}

function clearGameField() {
	move = false;
	game = false;
	soundFonStop();
	clearBonuses();
	clearChickens();
	// let starship = document.querySelector(".starship");
	// if (starship) starship.remove();	
	removeLifesBlock();
	removePointBlock();
	gameField.remove();

	// console.dir("Осталось всего курей: " + chickenCount);
}