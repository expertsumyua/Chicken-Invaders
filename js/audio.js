// var aud // переменная которая отвечает за звук события
// 1 - пуля 2 - салют курицы 3 - взрыв самолета 4 - съел гамбургер 5 - съел жизнь 6 - фоновая песня 
function soundObjects(aud) {
	let variant; //  - путь к файлу
	if (aud == 1) { variant = 'audio/bulet.mp3'; }
	if (aud == 2) { variant = 'audio/chicken.mp3'; }
	if (aud == 3) { variant = 'audio/ship-ded.mp3'; }
	if (aud == 4) { variant = 'audio/gam.mp3'; }
	if (aud == 5) { variant = 'audio/life.mp3'; }
	// if (aud == 6) { variant = 'audio/main.mp3'; }

	let audioObject = new Audio(); // Создаём новый элемент Audio
	audioObject.volume = volume;
	audioObject.src = variant; // Указываем путь к звуку "клика"
	audioObject.autoplay = true; // Автоматически запускаем
}

let audioFon;
function soundFonStart() {
	// let variant;
	// variant = 'audio/main.mp3';
	audioFon = new Audio('audio/main.mp3'); // Создаём новый элемент Audio
	// audioFon.src = variant; // Указываем путь к звуку "клика"
	audioFon.volume = volume;
	audioFon.autoplay = true;
	audioFon.loop = "loop";
}

function soundFonStop() {
	audioFon.pause();
	audioFon.currentTime = 0;
}

function createGameSound() {
	soundFonStart();
	let gameSound = document.createElement("div");
	gameSound.className = "sound-volume";
	let soundVolumeSimbol;
	{
		soundVolumeSimbol = document.createElement("div");
		soundVolumeSimbol.id = "louder";
		soundVolumeSimbol.onclick = soundVolume;
		soundVolumeSimbol.innerText = "🔊+";
		gameSound.appendChild(soundVolumeSimbol);
	}
	{
		soundVolumeSimbol = document.createElement("div");
		soundVolumeSimbol.id = "simbol";
		soundVolumeSimbol.onclick = soundVolume;
		if (volume < 0.1) {
			soundVolumeSimbol.innerText = "🔇" + Math.trunc(volume * 100) + "%";
		} else if (volume >= 0.5) {
			soundVolumeSimbol.innerText = "🔊" + Math.trunc(volume * 100) + "%";
		} else if (volume < 0.5) {
			soundVolumeSimbol.innerText = "🔉" + Math.trunc(volume * 100) + "%";
		}
		gameSound.appendChild(soundVolumeSimbol);
	}
	{
		soundVolumeSimbol = document.createElement("div");
		soundVolumeSimbol.id = "quieter";
		soundVolumeSimbol.onclick = soundVolume;
		soundVolumeSimbol.innerText = "🔉-";
		gameSound.appendChild(soundVolumeSimbol);
	}
	gameField.appendChild(gameSound);
}

function removeGameSound() {
	soundFonStop()
	let gameSounds = document.querySelectorAll(".sound-volume");
	for (let gameSound of gameSounds) {
		gameSound.remove();
	}
}

function soundVolume() {
	let simbol = document.getElementById("simbol");
	if (this.id == "simbol" && volume > 0) {
		currentVolume = volume;
		audioFon.volume = volume = 0;
		// audioFon.volume = volume;
	} else if (this.id == "simbol" && volume == 0) {
		audioFon.volume = volume = currentVolume;
		// audioFon.volume = volume;
	}
	if (this.id == "louder") {
		if (volume < 0.9) {
			audioFon.volume = volume += 0.1;
			// audioFon.volume = volume;
		}
	}
	if (this.id == "quieter") {
		if (volume >= 0.1) {
			audioFon.volume = volume -= 0.1;
			// audioFon.volume = volume;
		}
	}
	if (volume < 0.1) {
		simbol.innerText = "🔇" + Math.trunc(volume * 100) + "%";
	} else if (volume < 0.5) {
		simbol.innerText = "🔉" + Math.trunc(volume * 100) + "%";
	} else if (volume >= 0.5) {
		simbol.innerText = "🔊" + Math.trunc(volume * 100) + "%";
	}
	// if (this.id == "simbol") {
	// 	var element = document.querySelector("#game-app");

	// 	element.requestFullscreen();
	// 	// .then(function () {
	// 	// 	// element has entered fullscreen mode successfully
	// 	// })
	// 	// .catch(function (error) {
	// 	// 	// element could not enter fullscreen mode
	// 	// 	// error message
	// 	// 	console.log(error.message);
	// 	// });		
	// }
}