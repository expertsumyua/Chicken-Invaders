// Функция создания Звездалета
function createStarship() {
	starship = document.createElement("div");
	starship.className = "starship";
	setTimeout(function () {
		gameField.appendChild(starship);
		starship.style.display = "block";
		move = true;
	}, 2000);
}

function destroyStarship(thisStarship, thisRec) {
	// function destroyStarship(thisStarship) {
	soundClick(3);
	//move = false;
	var starshipEexplosion = document.createElement("div");
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
		removeLifes();
		if (lifesCount > 0) {
			createStarship();
		}
	} else {
		thisStarship.remove();
		removeLifes();
	}
}

// cоздание пули - снаряда
function createBullet() {
	soundClick(1);
	//создаем div
	var bullet = document.createElement("div");
	//прописываем класс
	bullet.id = "bullet";
	moveBullet(bullet);
	gameField.appendChild(bullet);

}

function moveBullet(thisBullet) {
	//	setTimeout(function(){
	thisBullet.style.top = starship.offsetTop - 100 + "px";
	thisBullet.style.left = starship.offsetLeft + "px";

	var timerBullet = setInterval(function () {
		thisBullet.style.top = 0 + "px";
		// если пуля вышла за пределыполя=> 
		if (thisBullet.offsetTop < 1) {	// удуляем пулю
			thisBullet.remove();
		}
		else {
			var curretChickenSum = 0;
			while (curretChickenSum < chickenSum) {
				var thisChicken = document.getElementById("chicken_" + curretChickenSum);
				if (thisChicken != null) {

					if (isCollide(thisChicken, thisBullet)) {
						removeChicken(thisChicken);
						thisBullet.remove();
						clearTimeout(timerBullet);
					}
				}
				curretChickenSum++;

			}
		}
	}, 10);
	//}, 10);
}