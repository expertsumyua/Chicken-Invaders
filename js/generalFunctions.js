/* global elementCounter */

/**
 * Генератор случайных значений в указанном диапазоне.
 * @param {Namber} min - Минимальное значение.
 * @param {Number} max - (optional) Максимальное значение (включительно!)
 * @returns {Number} Сгенерированное целое число.
 */
function random(min, max) {
	// Если не задан максимум - то минимум = 0 , а максимум равен минимуму.
	var _max = max || min;

	// Если макс равен минимуму.
	if (_max === min) {
		// Генерируем число от 0 и до...
		return Math.floor(Math.random() * (_max + 1));
	} else {
		// Генерируем число в диапазоне.
		return (min + Math.floor(Math.random() * (max + 1 - min)));
	}
}

/**
 * Проверка на "столкновение" объектов
 * @param {HTMLElement} a Хтмл элемент 1.
 * @param {HTMLElement} b Хтмл элемент 1.
 * @returns {Boolean} Если объекты пересеклись вернет true.
 */
function isCollide(a, b) {
	// Получаем позицию, ширину и высоту первого объекта.
	var aRect = a.getBoundingClientRect();
	// Получаем позицию, ширину и высоту второго объекта.
	var bRect = b.getBoundingClientRect();
	// Проверяем, не пересекаются ли координаты.
	if (
		(a.className == "chicken" && b.className == "starship") ||
		(a.id == "egg" && b.className == "starship")
	) {
		return !(
			((aRect.top + aRect.height / 2) < (bRect.top)) ||
			(aRect.top > (bRect.top + bRect.height / 2)) ||
			((aRect.left + aRect.width / 2) < bRect.left) ||
			(aRect.left > (bRect.left + bRect.width / 2))
		);
	}
	else {
		return !(
			((aRect.top + aRect.height) < (bRect.top)) ||
			(aRect.top > (bRect.top + bRect.height)) ||
			((aRect.left + aRect.width) < bRect.left) ||
			(aRect.left > (bRect.left + bRect.width))
		);
	}

}

/**
 * Создать ХТМЛ элемент.
 * @param {String} typeName - Тип элемента.
 * @param {String} id - (optional) ИД элемента.
 * @returns {HTMLElement} - ХТМЛ Элемент.
 */
function createEl(typeName, id) {
	id = id || null;

	// Создаем элемент.
	var htmlElement = document.createElement(typeName);

	// Назначаем ИД
	if (null !== id) {
		htmlElement.id = id;
	} else {
		htmlElement.id = typeName + '_' + elementCounter++;
	}
	return htmlElement;
}

function trackingEvents() {
	if (starship) keyAction();
	let bullets = document.querySelectorAll('#bullet');
	for (let bullet of bullets) {
		bullet.style.top = bullet.offsetTop - 3000 + "px";
		// bullet.style.top = 0 + "px";
		// если пуля вышла за пределыполя=> 
		if (bullet.offsetTop < 1) {	// удуляем пулю
			// clearInterval(timerBullet);
			bullet.remove();
		}
		else {
			// let curretChickenSum = 0;
			// while (curretChickenSum < chickenSum) {
			// let thisChicken = document.getElementById("chicken_" + curretChickenSum);

			let chickens = document.querySelectorAll('.chicken');

			for (let thisChicken of chickens) {
				// if (thisChicken != null) {

				if (isCollide(thisChicken, bullet)) {
					// узнаем какую курицу убили
					console.log(thisChicken.id);
					// ---------------------------
					destroyChicken(thisChicken);
					// clearInterval(timerBullet);
					bullet.remove();
				}
				// }
				// curretChickenSum++;

			}
		}
	}


}

let eventTrackingTimer;
function StartTrackingEvents() {
	trackingEvents();
	eventTrackingTimer = requestAnimationFrame(StartTrackingEvents);
	// eventTrackingTimer = setInterval(trackingEvents, 60);
}
function StopTrackingEvents() {
	// cancelAnimationFrame(eventTrackingTimer);
	clearInterval(eventTrackingTimer);
}
