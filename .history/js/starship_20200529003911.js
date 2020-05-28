// Функция создания Звездалета
function createStarship() {
	starship = document.createElement("div");
	starship.className = "starship";
	setTimeout(function () {
		starship.style.display = "block";
		// starship.style.position = "absolute";
		// starship.style.top = "calc(100 % - 70px)";
		// starship.style.left = "50 %";
		gameField.appendChild(starship);
		move = true;
	}, 2000);
}

function destroyStarship(thisStarship, thisRec) {
	// function destroyStarship(thisStarship) {
	soundClick(3);
	// move = false;
	let starshipEexplosion = document.createElement("div");
	starshipEexplosion.className = "starship-explosion";
	starshipEexplosion.style.left = thisStarship.offsetLeft + "px";
	starshipEexplosion.style.top = thisStarship.offsetTop + "px";
	gameField.append(starshipEexplosion);
	setTimeout(function () {
		starshipEexplosion.remove();
	}, 1500);


	if (thisRec.className == "chicken") {
		removeChicken(thisRec);
	} else {
		removeEgg(thisRec);
	}

	if (lifesCount > 1) {
		thisStarship.remove();
		// starship.remove();
		removeLifes();
		createStarship();
		// if (lifesCount > 0) {
		// 	createStarship();
		// }
	} else if (lifesCount == 1) {
		thisStarship.remove();
		// starship.remove();
		removeLifes();
	}
}

// cоздание пули - снаряда
function createBullet() {
	soundClick(1);
	//создаем div
	let bullet = document.createElement("div");
	//прописываем класс
	bullet.id = "bullet";
	moveBullet(bullet);
	gameField.appendChild(bullet);

}

function moveBullet(thisBullet) {
	//	setTimeout(function(){
	thisBullet.style.top = starship.offsetTop - 100 + "px";
	thisBullet.style.left = starship.offsetLeft + "px";

	let timerBullet = setInterval(function () {
		thisBullet.style.top = 0 + "px";
		// если пуля вышла за пределыполя=> 
		if (thisBullet.offsetTop < 1) {	// удуляем пулю
			clearTimeout(timerBullet);
			thisBullet.remove();
		}
		else {
			let curretChickenSum = 0;
			while (curretChickenSum < chickenSum) {
				let thisChicken = document.getElementById("chicken_" + curretChickenSum);
				if (thisChicken != null) {

					if (isCollide(thisChicken, thisBullet)) {
						removeChicken(thisChicken);
						clearTimeout(timerBullet);
						thisBullet.remove();
					}
				}
				curretChickenSum++;

			}
		}
	}, 10);
	//}, 10);
}