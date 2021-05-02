const title = document.querySelector("#title");
const prevBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const shiftBtn = document.querySelector(".shift");
const bucleBtn = document.querySelector(".bucle");
const audio = document.getElementById("audio");
const config = document.getElementById("config");
const aside = document.getElementById("aside");
const body = document.querySelector("body");

// Song titles
const songs = ["Dear God", "A little Piece Of Heaven", "Seize The Day"];

// Keep track of songs
let songIndex = 0;

// Initially load song info DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = `Avenged Sevenfold - ${song}`;
  audio.src = `../assets/audio/${song}.m4a`;
}

//Event listeners
audio.volume = 0.1;
var boton = document.getElementById("boton");

const updateProgress = () => {
  if (audio.currentTime > 0) {
    let barra = document.getElementById("progress");
    barra.value = (audio.currentTime / audio.duration) * 100;

    var duracionSegundos = audio.duration.toFixed(0);
    dura = secondsToString(duracionSegundos);
    var actualSegundos = audio.currentTime.toFixed(0);
    actual = secondsToString(actualSegundos);

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
  audio.play();
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
    // console.log(numero);
    // Funciona, número aleatorio entre 0 y 2 😁
    function newMixSong(n) {
      songIndex = n;
      loadSong(songs[songIndex]);
      document
        .getElementById("play-pause")
        .classList.toggle("button-play-pause");
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
config.addEventListener("click", () => {
  aside.classList.toggle("aside-toggle");
});
