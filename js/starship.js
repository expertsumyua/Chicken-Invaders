// Функция создания Звездалета
function createStarship() {
	setTimeout(function () {
		starship = document.createElement("div");
		starship.className = "starship";
		gameField.appendChild(starship);
	}, 2000);
}

function destroyStarship(thisStarship, thisRec) {
	// function destroyStarship(thisRec) {
	soundObjects(3);
	// move = false;
	let starshipExplosion = document.createElement("div");
	starshipExplosion.className = "starship-explosion";
	starshipExplosion.style.left = thisStarship.offsetLeft + "px";
	starshipExplosion.style.top = thisStarship.offsetTop + "px";
	gameField.append(starshipExplosion);
	setTimeout(function () {
		starshipExplosion.remove();
	}, 1500);


	if (thisRec.className == "chicken") {
		destroyChicken(thisRec);
	} else {
		removeEgg(thisRec);
	}

	// if (lifesCount > 1) {
	// thisStarship.remove(); // Удалять нельзя через самого себя!	
	starship.remove();
	console.dir("Starship УМЕР");
	removeLifes();
	if (lifesCount > 0) {
		createStarship();
	}
	// } else {
	// 	thisStarship.remove();
	// 	removeLifes();
	// }
}

let b_i = 0;

// cоздание пули - снаряда
function createBullet() {
	soundObjects(1);
	//создаем div
	let bullet = document.createElement("div");
	//прописываем класс
	bullet.id = "bullet";
	// узнаем какую пулю выпустили
	let bullets = document.querySelectorAll('#bullet');
	for (let elem of bullets) {
		// console.log(elem.id + b_i);
		b_i++;
	}
	// ---------------------------
	moveBullet(bullet);
	gameField.append(bullet);

}
let timerBullet;
function moveBullet(thisBullet) {
	//	setTimeout(function(){
	thisBullet.style.top = starship.offsetTop - 100 + "px";
	thisBullet.style.left = starship.offsetLeft + "px";

	// timerBullet = setInterval(function () {
	// thisBullet.style.top = 0 + "px";
	// если пуля вышла за пределыполя=> 
	// if (thisBullet.offsetTop < 1) {	// удуляем пулю
	// 	clearInterval(timerBullet);
	// 	thisBullet.remove();
	// }
	// else {
	// 	// let curretChickenSum = 0;
	// 	// while (curretChickenSum < chickenSum) {
	// 	// let thisChicken = document.getElementById("chicken_" + curretChickenSum);

	// 	let chickens = document.querySelectorAll('.chicken');

	// 	for (let thisChicken of chickens) {
	// 		// if (thisChicken != null) {

	// 		if (isCollide(thisChicken, thisBullet)) {
	// 			// узнаем какую курицу убили
	// 			console.log(thisChicken.id);
	// 			// ---------------------------
	// 			destroyChicken(thisChicken);
	// 			clearInterval(timerBullet);
	// 			thisBullet.remove();
	// 		}
	// 		// }
	// 		// curretChickenSum++;

	// 	}
	// }
	// }, 10);
	//}, 10);
}