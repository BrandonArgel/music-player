const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const shiftBtn = document.querySelector(".shift");
const bucleBtn = document.querySelector(".bucle");
const audio = document.getElementById("audio");
const config = document.getElementById("config");
const aside = document.getElementById("aside");
const main = document.querySelector("main");
const close = document.querySelector(".close");
const volume = document.getElementById("volume");

// Song titles
const songs = [
	"Dear God",
	"A little Piece Of Heaven",
	"Seize The Day",
	"Afterlife",
	"MIA",
	"So Far Away",
	"Until The End",
];

// Keep track of songs
let songIndex = 0;

// Initially load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
	title.innerText = `Avenged Sevenfold - ${song}`;
	audio.src = `/music-player/assets/audio/${song}.m4a`;
	cover.src = `/music-player/assets/img/${song}.jpg`;
  console.log(audio.src);
}

//Event listeners
var boton = document.getElementById("boton");

const updateProgress = () => {
	if (audio.currentTime > 0) {
		let barra = document.getElementById("progress");
		barra.value = (audio.currentTime / audio.duration) * 100;

		var actualSegundos = audio.currentTime.toFixed(0);
		actual = secondsToString(actualSegundos);
		var duracionSegundos = audio.duration.toFixed(0) - audio.currentTime.toFixed(0);
		dura = secondsToString(duracionSegundos);

		document.getElementById("start").innerText = actual;
		document.getElementById("end").innerText = dura;
	}

	if (audio.ended && bucleBtn.classList.contains("btn-active")) {
		audio.currentTime = 0;
		playSong();
	}

	if (audio.ended && shiftBtn.classList.contains("btn-active")) {
		shiftSong();
	}

	if (
		audio.ended &&
		!bucleBtn.classList.contains("btn-active") &&
		!shiftBtn.classList.contains("btn-active")
	) {
		nextSong();
	}
};

// Play & Pause button
boton.addEventListener("click", function () {
	if (audio.paused) {
		playSong();
	} else {
		pauseSong();
	}
});

function playSong() {
	// The play method is asynchronous, the setTimeout helps to avoid an error
	setTimeout(function () {
		audio.play();
	}, 0);

	document.getElementById("play-pause").classList.add("button-play-pause");
	document.getElementById("play-pause").classList.remove("play-pause");
}

function pauseSong() {
	audio.pause();
	document.getElementById("play-pause").classList.remove("button-play-pause");
	document.getElementById("play-pause").classList.add("play-pause");
}

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	if (shiftBtn.classList.contains("btn-active")) {
		shiftSong();
	}

	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	document.getElementById("play-pause").classList.toggle("button-play-pause");
	playSong();
}

// Shift songs
function shiftSong() {
	function numeroAleatorio(min, max) {
		let numero = Math.round(Math.random() * (max - min) + min);
		function newMixSong(n) {
			songIndex = n;
			loadSong(songs[songIndex]);
			document.getElementById("play-pause").classList.toggle("button-play-pause");
			playSong();
			console.log(`Canción número: ${songIndex} del array`);
		}
		newMixSong(numero);
	}
	numeroAleatorio(0, songs.length - 1);
}

// Bucle button
bucleBtn.addEventListener("click", bucle);
function bucle() {
	bucleBtn.classList.toggle("btn-active");
}

// Shift button
shiftBtn.addEventListener("click", shift);
function shift() {
	shiftBtn.classList.toggle("btn-active");
}

// Convert seconds to string
function secondsToString(seconds) {
	var hour = "";
	if (seconds > 3600) {
		hour = Math.floor(seconds / 3600);
		hour = hour < 10 ? "0" + hour : hour;
		hour += ":";
	}
	var minute = Math.floor((seconds / 60) % 60);
	minute = minute < 10 ? "0" + minute : minute;
	var second = seconds % 60;
	second = second < 10 ? "0" + second : second;
	return hour + minute + ":" + second;
}

// Progress bar
progress.addEventListener("click", adelantar);
function adelantar(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
	audio.currentTime = scrubTime;
	// console.log(e);
}

// Drop down side panel
config.addEventListener(
	"click",
	() => {
		setTimeout(() => {
			aside.classList.toggle("aside-toggle");
			main.classList.toggle("filter");
		});
	},
	0
);

close.addEventListener("click", () => {
	aside.classList.toggle("aside-toggle");
	main.classList.toggle("filter");
});

main.addEventListener("click", () => {
	if (aside.classList.contains("aside-toggle")) {
		aside.classList.remove("aside-toggle");
		main.classList.remove("filter");
	}
});

// Volume
volume.oninput = (e) => {
	const vol = e.target.value;
	audio.volume = vol;
};
