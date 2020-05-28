/* global chickenCount, chickenSum, starship */

/**
 *  Создать курицу.
 */
function createChicken() {
	let chicken, startX, startY;

	// Создаем объект.
	chicken = document.createElement("div");
	// Генерируем уникальный ИД.
	chicken.id = ("chicken_" + chickenCount++);
	// Назначаем класс объекта.
	chicken.classList.add("chicken");
	// chicken.className = "chicken";
	//console.dir(chicken.className);
	// Расширяем объект новыми методами.
	chicken.startFly = startFly;
	chicken.getWidth = getWidth;
	chicken.getHeight = getHeight;
	chicken.getX = getX;
	chicken.setX = setX;
	chicken.getY = getY;
	chicken.setY = setY;
	chicken.getStartPosition = getStartPosition;
	chicken.setStartPosition = setStartPosition;
	chicken.getDirection = getDirection;
	chicken.setDirection = setDirection;
	chicken.getRandomDegree = getRandomDegree;
	chicken.isIntersect = isIntersect;
	chicken.createEgg = createEgg;

	// Будет содержать уаказатель на интервальную функцию.
	chicken._timerId = null;

	// Генерируем стартовую позицию и направление движения..
	switch (random(1, 4)) {
		case 1: // Сверху;
			// Генерируем стартовые координаты.
			startX = random(100, gameField.offsetWidth - 100);
			startY = -70;
			// Задаем позицию.
			chicken.setStartPosition("top");
			break;

		case 2: // left;
			// Генерируем стартовые координаты.
			startX = -70;
			startY = random(100, gameField.offsetHeight - 100);
			// Задаем позицию.
			chicken.setStartPosition("left");
			break;

		case 3: // bottom;
			// Генерируем стартовые координаты.
			startX = random(100, gameField.offsetWidth - 100);
			startY = gameField.offsetHeight + 70;
			// Задаем позицию.
			chicken.setStartPosition("bottom");
			break;

		case 4: // right;
			// Генерируем стартовые координаты.
			startX = gameField.offsetWidth + 70;
			startY = random(100, gameField.offsetHeight - 100);
			// Задаем позицию.
			chicken.setStartPosition("right");
			break;
	}

	// Устанавливаем сгенерированые координаты.
	chicken.setX(startX);
	chicken.setY(startY);
	// Добавляем на игровое поле.
	gameField.appendChild(chicken);
	// Полетели.
	chicken.startFly(chicken);
}

/**
 * Сохранить стартовую позици.
 * @param {String} position
 */
function setStartPosition(position) {
	this._position = position;
}

/**
 * Получить стартовую позицию.
 * @returns {String}
 */
function getStartPosition() {
	return this._position;
}

/**
 * Сохранить направление движения.
 * @param {String} direction
 */
function setDirection(direction) {
	this._direction = direction;
}

/**
 * Получить направление движения.
 * @returns {String}
 */
function getDirection() {
	return this._direction;
}
/**
 * Получить ширину объекта.
 * @returns {Number}
 */
function getWidth() {
	return this.offsetWidth;
}

/**
 * Получить высотту объекта.
 * @returns {Number}
 */
function getHeight() {
	return this.offsetHeight;
}

/**
 * Получить позицию по горизонтали.
 * @returns {Number}
 */
function getX() {
	var x = this.offsetLeft;
	return Math.round(x + this.getWidth() / 2);
}

/**
 * Задать позицию по горизонтали.
 * @param {Number} x
 */
function setX(x) {
	x = Math.round(x - this.getWidth() / 2);
	this.style.left = x + "px";
}

/**
 * Получить позицию по вертикали.
 * @returns {Number}
 */
function getY() {
	return Math.round(this.offsetTop + this.getHeight() / 2);
}

/**
 * Задать позицию по вертикали.
 * @param {Number} y
 */
function setY(y) {
	y = Math.round(y - this.getHeight() / 2);
	this.style.top = y + "px";
}

/**
 * Получить случайный угол в зависимости от стартовой позиции.
 * @returns {Number} Угол в град. (0..180, -179..-359)
 */
function getRandomDegree() {
	// Определяем переменныйе
	var d1, d2, posX, posY, x1, y1, x2, y2, parentEl, result;
	// Получаем текущую позицию объекта
	posX = this.getX();
	posY = this.getY();
	// Получаем родительский элемент.
	parentEl = this.parentElement;
	// раскидываем логику в зависимости от стартовой позиции.	
	switch (this.getStartPosition()) {
		case "top":
			// Если позиция сверху, то берем координаты нижних углов игрового поля.
			y2 = y1 = (parentEl.offsetHeight) - 100;
			x2 = (parentEl.offsetWidth) - 100;
			x1 = 100;
			break;
		case "bottom":
			// Если позиция снизу, берем координаты верхних углов поля.
			y2 = y1 = 100;
			x2 = (parentEl.offsetWidth) - 100;
			x1 = 100;
			break;
		case "left":
			// Если позиция слева, берем координаты правых углов игрового поля.
			x1 = x2 = (parentEl.offsetWidth) - 100;
			y1 = 100;
			y2 = (parentEl.offsetHeight) - 100;
			break;
		case "right":
			// Если позиция справа, берем кооординаты левых углов игрового поля.
			x1 = x2 = 100;
			y1 = 100;
			y2 = (parentEl.offsetHeight) - 100;
			break;
	}

	// Вычисляем угол к первым координатам, град.
	d1 = Math.atan2(y1 - posY, x1 - posX) * 180 / Math.PI;
	// Вычисляем угол ко вторым координатам.
	d2 = Math.atan2(y2 - posY, x2 - posX) * 180 / Math.PI;

	// Делаем корректировку углов, потому что в данной координатной сетке углы 
	// идут не от 0..360, а 0..180, -179..-359. 
	// Важно скорректировать правые и левые полусферы.
	switch (this.getStartPosition()) {
		case "right":
			d1 += 360; // потому что угол может быть от -179 до -90
			break;
		case "left":
			d1 += 360; // потому что угол может быть от -90 до -1
			d2 += 360; // потому что угол может быть от 0 до 90
			break;
	}

	// Получаем случайный угол между крайними углами.
	result = (d2 > d1 ? random(d1, d2) : random(d2, d1));

	if (result > 180) {
		result -= 360;
	}
	// Возвращаем результат.
	return result;
}

/**
 * Отвечает за полет курицы.
 */
function startFly() {
	// Объявляем переменные
	var degree, posX, posY, deltaX, deltaY, randomCreate;

	/**
	 * Обсчет коэффициэнтов ускорения.
	 * @param {Element} element Элемет который надо обсчитать.
	 * @private
	 */
	function calcDegree(element) {
		// Получаем случайный градус, рад.
		degree = element.getRandomDegree() * Math.PI / 180;
		// Ускорение по горизонтали.
		deltaX = Math.cos(degree);
		// Ускорение по вертикали.
		deltaY = Math.sin(degree);
	}
	// Инициируем градусы.
	degree = null;
	// Получаем текущую позицию.
	posX = this.getX();
	posY = this.getY();

	randomCreate = random(1000, 2500);
	// Стартуем интервальный рассчет. 
	this._timerId = setInterval(function (chicken) {
		var parentEl;
		// Получаем родительский элемент.
		parentEl = chicken.parentElement;
		// Если наша текущая позиция сверху.
		if (50 >= posY) {
			// Проверяем откуда стартовали.
			switch (chicken.getStartPosition()) {
				case "bottom":
					// Если снизу, то меняем позицию и обнуляем вектор движения.
					chicken.setStartPosition("top");
					degree = null;
					break;
				case "left":
				case "right":
					// Если стартовали слева или справа, 
					// отзеркаливаем вертикальный коеффициент.
					deltaY = -1 * deltaY;
					break;
			}
		}
		// Если текщая позиция справа.
		if (50 >= posX) {
			// Проверяем откуда стартовали.
			switch (chicken.getStartPosition()) {
				case "right":
					// Если справа, то меняем позицию и обнуляем вектор движения.
					chicken.setStartPosition("left");
					degree = null;
					break;
				case "top":
				case "bottom":
					// Если стартовали снизу или сверху, 
					// отзеркаливаем вертикальный коеффициент.
					deltaX = -1 * deltaX;
					break;
			}
		}
		// Если текущая позиция снизу
		if ((parentEl.offsetHeight - 50) <= posY) {
			// Проверяем откуда стартовали.
			switch (chicken.getStartPosition()) {
				case "top":
					// Если сверху, то меняем позицию и обнуляем вектор движения.
					chicken.setStartPosition("bottom");
					degree = null;
					break;
				case "left":
				case "right":
					// Если стартовали слева или справа, 
					// отзеркаливаем вертикальный коеффициент.
					deltaY = -1 * deltaY;
					break;
			}
		}
		// Если текущая позиция слева
		if ((parentEl.offsetWidth - 50) <= posX) {
			// Проверяем откуда стартовали.
			switch (chicken.getStartPosition()) {
				case "left":
					// Если слева, то меняем позицию и обнуляем вектор движения.
					chicken.setStartPosition("right");
					degree = null;
					break;
				case "top":
				case "bottom":
					// Если стартовали снизу или сверху, 
					// отзеркаливаем вертикальный коеффициент.
					deltaX = -1 * deltaX;
					break;
			}
		}
		// Если вектор обнулен то генерируем новый 
		// и пересчитываем угловые коеффициенты.
		if (degree === null) {
			calcDegree(chicken);
		}
		// Ускоряем по горизонтали
		posX += deltaX;
		chicken.setX(posX);
		// ускоряем по вертикали
		posY += deltaY;
		chicken.setY(posY);
		//Проверяем, не попался ли нам в лапы игрок ;)
		if (chicken.isIntersect(starship)) {
			move = false;
			// Рвем гада.. >:-<<
			destroyStarship(starship, chicken);
			// destroyStarship(starship);
			// destroyChicken(chicken);
		} else if (0 >= randomCreate--) {
			this.createEgg(posX, posY);
			randomCreate = random(1000, 2500);
		}

		if (posX < -500 || posY < -500 ||
			posY > parentEl.offsetHeight + 500 || posX > parentEl.offsetWidth + 500) {
			destroyChicken(chicken);
		}

	}, random(1, 10), this);
}


/**
 * 
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
function isIntersect(element) {
	return isCollide(this, element);
}

/**
 * Убиваем куричу.
 * @param {type} thisChicken
 */
function removeChicken(thisChicken) {
	clearInterval(thisChicken._timerId);
	let chickenEexplosion = document.createElement("div");
	chickenEexplosion.style.left = thisChicken.offsetLeft + "px";
	chickenEexplosion.style.top = thisChicken.offsetTop + "px";
	if (thisChicken.className == "chicken") {
		chickenEexplosion.className = "chicken-explosion";
		gameField.append(chickenEexplosion);
		createBonus(thisChicken);
		setTimeout(function () {
			chickenEexplosion.remove();
		}, 1500);

	}
	soundClick(2);
	destroyChicken(thisChicken);
}


//
function destroyChicken(chicken) {
	chickenCount--;
	clearInterval(chicken._timerId);
	chicken.remove();

	if (lifesCount > 0) {
		if (chickenCount == 0) {
			createManyChicken();
		}
	}
}


//Функция по созданию множетва летающих ТВАРЕЙ! :-))))
function createManyChicken() {
	console.dir("Новых Курей должно быть: " + chickenCount);
	// chickenCount = 0;
	setTimeout(function () {
		let curretChickenSum = chickenSum;
		while (curretChickenSum) {
			createChicken();
			curretChickenSum--;
			console.dir("Создано курей: " + chickenCount);
		}
	}, 3000);
}

function clearChickens() {
	let chicken = document.querySelectorAll(".chicken");
	chicken.forEach(function (chicken) {
		console.dir("Осталось курей: " + chickenCount);
		destroyChicken(chicken);
	});
	chickenCount = 0;
	console.dir("Осталось всего курей: " + chickenCount);
}