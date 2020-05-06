/*==================================================================
						ДВИЖЕНИЕ ЭЛЕМЕНТОВ
===================================================================*/

var keys = {
	'Left': 37,
	'Right': 39,
	'Up': 38,
	'Down': 40,
	'Space': 32
};

var keyDown = {};

var setKey = function (keyCode) {
	keyDown[keyCode] = true;
};

var clearKey = function (keyCode) {
	keyDown [keyCode] = false;
};

var isKeyDown = function (keyName) {
	return keyDown[keys[keyName]] == true;
};

if (move) var gameEngine = function () {
	if ((typeof engine == 'function') ) {
		engine();
	} else {
		console.log ("Не определена функция engine");
	}
	requestAnimationFrame(gameEngine);
};

if (move) window.onload = function () {
	window.onkeydown = function (event) {
		setKey(event.keyCode);
	};
	
	window.onkeyup = function (event) {
		if (starship) {
			starship.style.backgroundImage = "url('img/starship.gif')";
		}
		clearKey(event.keyCode);
	};

	gameEngine();
};


if (move) function engine() {

	if (isKeyDown('Left')) {
		starship.style.backgroundImage = "url('img/starship-left.gif')";
		if(starship.offsetLeft < starship.offsetWidth) {
			starship.style.left = starship.offsetLeft + 0 + "px";
		} else {
			starship.style.left = starship.offsetLeft - 10 + "px";
		}
	}
	if (isKeyDown('Right')) {
		starship.style.backgroundImage = "url('img/starship-right.gif')";
		if(starship.offsetLeft > gameField.offsetWidth - starship.offsetWidth) {
			starship.style.left = starship.offsetLeft + 0 + "px";
		} else {
			starship.style.left = starship.offsetLeft + 10 + "px";
		}
	}
	if (isKeyDown('Up')) {
		if(starship.offsetTop < gameField.offsetHeight / 2) {
			starship.style.top = starship.offsetTop + 0 + "px";
		} else {
			starship.style.top = starship.offsetTop - 10 + "px";
		}
	}
	if (isKeyDown('Down')) {
		if(starship.offsetTop > gameField.offsetHeight - 75) {
			starship.style.top = starship.offsetTop + 0 + "px";
		} else {
			starship.style.top = starship.offsetTop + 10 + "px";
		}
	}	
	if (isKeyDown('Space')) 
		{
			soundClick(1);
			createBullet();
		}	

}

