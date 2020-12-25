/*==================================================================
						СОБЫТИЯ НАЖАТИЯ КЛАВИШ
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
	keyDown[keyCode] = false;
};

var isKeyDown = function (keyName) {
	return keyDown[keys[keyName]] == true;
};

// if (move) var gameKeyAction = function () {
// 	if ((typeof keyAction == 'function')) {
// 		keyAction();
// 	} else {
// 		console.log("Не определена функция keyAction");
// 	}
// 	requestAnimationFrame(gameKeyAction);
// };

window.onload = function () {
	StartTrackingEvents();

	window.onkeydown = function (event) {
		setKey(event.keyCode);
		// if (starship) {
		// 	keyAction();
		// 	// setInterval(keyAction, 10);
		// }
	};

	window.onkeyup = function (event) {
		clearKey(event.keyCode);
		if (starship) {
			starship.style.backgroundImage = "url('img/starship.gif')";
		}
	};

	// gameKeyAction();
};


function keyAction() {
	if (isKeyDown('Left')) {
		starship.style.backgroundImage = "url('img/starship-left.gif')";
		if (starship.offsetLeft < starship.offsetWidth / 2) {
			starship.style.left = starship.offsetLeft + 0 + "px";
		} else {
			starship.style.left = starship.offsetLeft - 10 + "px";
		}
	}
	if (isKeyDown('Right')) {
		starship.style.backgroundImage = "url('img/starship-right.gif')";
		if (starship.offsetLeft > gameField.offsetWidth - starship.offsetWidth / 2) {
			starship.style.left = starship.offsetLeft + 0 + "px";
		} else {
			starship.style.left = starship.offsetLeft + 10 + "px";
		}
	}
	if (isKeyDown('Up')) {
		if (starship.offsetTop < starship.offsetHeight / 2) {
			starship.style.top = starship.offsetTop + 0 + "px";
		} else {
			starship.style.top = starship.offsetTop - 10 + "px";
		}
	}
	if (isKeyDown('Down')) {
		if (starship.offsetTop > gameField.offsetHeight - starship.offsetHeight / 2) {
			starship.style.top = starship.offsetTop + 0 + "px";
		} else {
			starship.style.top = starship.offsetTop + 10 + "px";
		}
	}
	if (isKeyDown('Space')) {
		soundObjects(1);
		createBullet();
	}

	// requestAnimationFrame(keyAction);
}

