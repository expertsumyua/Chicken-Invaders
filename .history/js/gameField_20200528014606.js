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
	if (move) {
		if (count == 4) {
			soundClick(5);
			if ((lifesCount > 0) && (lifesCount < 5)) {
				addLifes();
			}
			else {
				pointCount += count;
				pointBlock.innerText = pointCount;
			}

		} else {
			soundClick(4);
			pointCount += count;
			pointBlock.innerText = pointCount;
		}
		if (pointCount == 10) {
			showGameWindow(gameStatus.FINISH);
			clearGameField();

		}
	}
}

function removePointBlock() {
	pointBlock.remove();
}


// создание блока lifes;
function createLifesBlock(thisL) {
	// создаем div и добавляем его в игру, прописываем id 
	var curretLifesSum = lifesCount = thisL;
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
	createLifesBlock(lifesCount++);

}
function removeLifes() {
	lifesCount--;
	if (lifesCount < 1) {
		// move = false;
		console.dir("Жизней: " + lifesCount);
		clearGameField();
		showGameWindow(gameStatus.GAMEOVER);
	} else if (lifesCount > 0) {
		//console.dir(lifesCount);
		removeLifesBlock();
		createLifesBlock(lifesCount);
	}
}

function removeLifesBlock() {
	// if (lifesCount == 0) { lifesCount = 5; }
	lifesBlock.remove();
}

function createGameField() {
	move = true;
	soundFonStart();
	createStarship();
	// lifesCount = 5;
	createLifesBlock(2);
	// pointCount = 0;
	createPointBlock(0);
	createManyChicken();
	console.dir("Курей: " + chickenCount);

}

function clearGameField() {
	move = false;
	soundFonStop();
	// var starship = document.querySelector(".starship");
	// if (starship) starship.remove();
	clearChickens();
	removeLifesBlock();
	removePointBlock();
	gameField.remove();
}