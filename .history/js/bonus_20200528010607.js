
function createBonus(thisRec) {
	var bonus = document.createElement("div");
	bonus.className = "bonus";
	bonus.style.top = thisRec.offsetTop + "px";
	bonus.style.left = thisRec.offsetLeft + "px";
	var count = null;
	switch (random(0, 4)) {
		case 0:
			bonus.style.backgroundImage = "url('img/bonus/fried-egg.png')";
			count = 0;
			break;
		case 1:
			bonus.style.backgroundImage = "url('img/bonus/burger.gif')";
			count = 1;
			break;
		case 2:
			bonus.style.backgroundImage = "url('img/bonus/gift.gif')";
			count = 2;
			break;
		case 3:
			bonus.style.backgroundImage = "url('img/bonus/crystal.gif')";
			count = 3;
			break;
		case 4:
			bonus.style.backgroundImage = "url('img/bonus/life.gif')";
			count = 4;
			break;
	}
	setTimeout(function () {
		setTimeout(function () {
			bonus.style.left = bonus.offsetLeft + "px";
		}, 1000);
		setTimeout(function () {
			bonus.style.transition = "all 0s";
			let bonusInt = setInterval(function () {
				bonus.style.top = bonus.offsetTop + 1 + "px";
				isCollide(bonus, starship)
				if (isCollide(bonus, starship)) {
					clearTimeout(bonusInt);
					removeBonus(bonus);
					if (move) {
						pointCounter(count);
					}
				}
				else if (bonus.offsetTop > gameField.offsetHeight) {
					//console.dir(bonus.offsetTop);
					clearTimeout(bonusInt);
					removeBonus(bonus);
				}
			}, 25);
		}, 10);
		gameField.appendChild(bonus);
	}, 1500);
}

function removeBonus(thisBonus) {
	thisBonus.remove();
}


function createEgg(RecX, RecY) {
	let egg = document.createElement("div");
	egg.className = "bonus";
	egg.style.top = RecY + "px";
	egg.style.left = RecX + "px";
	egg.style.backgroundImage = "url('img/bonus/egg.png')";
	setTimeout(function () {
		setTimeout(function () {
			egg.style.left = egg.offsetLeft + "px";
		}, 1000);
		setTimeout(function () {
			egg.style.transition = "all 0s";
			let eggInt = setInterval(function () {
				egg.style.top = egg.offsetTop + 1 + "px";
				isCollide(egg, starship)
				if (isCollide(egg, starship)) {
					clearTimeout(eggInt);
					removeEgg(egg);
					if (move) {
						destroyStarship(starship, egg);
						console.dir(egg);
					}
				}
				else if (egg.offsetTop > gameField.offsetHeight) {
					clearTimeout(eggInt);
					removeEgg(egg);
				}
			}, 25);
		}, 10);
		// gameField.appendChild(egg); // Устаревший метод
		gameField.prepend(egg); // Новые методы
		// console.dir(egg);
	}, 150);
}

function removeEgg(thisEgg) {
	thisEgg.remove();
}