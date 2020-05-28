/* global gameStatus, gameApplication */

function showGameWindow(status) {
	gameApplication.innerText = "";

	switch (status) {
		case gameStatus.FINISH:
			showFinishWindow();
			break;

		case gameStatus.GAMEOVER:
			showGameOverWindow();
			break;

		case gameStatus.NEXTLEVEL:
			showNextLevelWindow();
			break;

		case gameStatus.PLAY:
			showPlayWindow();
			break;

		case gameStatus.START:
			showStartWindow();
			break;
	}
}

function showGameOverWindow() {
	var gameWindow = createEl("div", "game-over-window");

	var showScore = createEl("h3");
	showScore.innerText = "Ваш счет: " + pointCount;
	gameWindow.append(showScore);

	var restartButton = createEl("button", "restart_game_button");
	restartButton.innerText = "Рестарт игры!";
	restartButton.onclick = function () {
		showGameWindow(gameStatus.START);
	};
	gameWindow.append(restartButton);

	gameApplication.append(gameWindow);
}

function showNextLevelWindow() {
	var gameWindow = createEl("div", "next-level-window");

	var showScore = createEl("h3");
	showScore.innerText = "Ваш счет:";
	gameWindow.append(showScore);

	var nextButton = createEl("button", "next-level-_button");
	nextButton.innerText = "Следующий уровень!";
	nextButton.onclick = function () {
		showGameWindow(gameStatus.PLAY);
	};
	gameWindow.append(nextButton);

	var finishButton = createEl("button", "next-level-_button");
	finishButton.innerText = "Завершить!";
	finishButton.onclick = function () {
		showGameWindow(gameStatus.START);
	};
	gameWindow.append(finishButton);

	gameApplication.append(gameWindow);

}

function showFinishWindow() {
	var gameWindow = createEl("div", "finish-window");
	gameWindow.className = "standardWindow";

	var showScore = createEl("h3");
	showScore.innerText = "Ваш счет:";
	gameWindow.append(showScore);

	var restartButton = createEl("button", "restart-button");
	restartButton.innerText = "Рестарт игры!";
	restartButton.onclick = function () {
		showGameWindow(gameStatus.START);
	};
	gameWindow.append(restartButton);

	gameApplication.append(gameWindow);
}

function showPlayWindow() {
	gameField = gameField || createEl("div", "game-field");
	gameApplication.append(gameField);
	gameInit();
}

function showStartWindow() {
	var gameWindow = createEl("div", "start-window");
	gameWindow.className = "standardWindow";
	var discription = createEl('h1', 'discription');
	discription.innerText = "Нашу планету захватили космо-куры!";
	var discription2 = createEl('h2', 'discription2');
	discription2.innerText = "Ты последний наш звездолет, - смотри не налажай!";
	var startBlock = createEl("div", "start-block");
	var startButton = createEl("div", "start-button");
	startButton.innerText = "START";
	startButton.onclick = function () {
		showGameWindow(gameStatus.PLAY);
	};
	gameWindow.append(discription);
	gameWindow.append(discription2);
	gameWindow.appendChild(startBlock);
	startBlock.appendChild(startButton);
	gameApplication.append(gameWindow);
	//при наведении курсора на стартовую кнопку, - меняем текст
	startButton.onmouseover = function () {
		startButton.innerHTML = "GO";
	};
	startButton.onmouseout = function () {
		startButton.innerHTML = "GO";
	};
}
}


function gameInit() {

	createGameField();

}

