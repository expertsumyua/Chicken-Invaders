// var aud // переменная которая отвечает за звук события
// 1 - пуля 2 - салют курицы 3 - взрыв самолета 4 - съел гамбургер 5 - съел жизнь 6 - фоновая песня 
function soundClick(aud) {
	let variant; //  - путь к файлу
	if (aud == 1) { variant = 'audio/bulet.mp3'; }
	if (aud == 2) { variant = 'audio/chicken.mp3'; }
	if (aud == 3) { variant = 'audio/ship-ded.mp3'; }
	if (aud == 4) { variant = 'audio/gam.mp3'; }
	if (aud == 5) { variant = 'audio/life.mp3'; }
	// if (aud == 6) { variant = 'audio/main.mp3'; }

	let audio = new Audio(); // Создаём новый элемент Audio
	audio.src = variant; // Указываем путь к звуку "клика"
	audio.autoplay = true; // Автоматически запускаем
	// if (aud == 6) {
	// 	// audio.preload = 'auto';
	// 	audio.loop = "loop"; // так аудио - фон должен повторятся!
	// }
}
var audioFon;
function soundFonStart() {
	let variant;
	variant = 'audio/main.mp3';
	audioFon = new Audio(); // Создаём новый элемент Audio
	audioFon.src = variant; // Указываем путь к звуку "клика"
	audioFon.autoplay = true;
	audioFon.loop = "loop";
}
function soundFonStop() {
	audioFon.pause();
}

