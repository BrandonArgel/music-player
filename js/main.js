/* const canciones = [
  "Avenged Sevenfold - Dear god.m4a",
  "Avenged Sevenfold - Seize The Day.m4a",
  "Avenged Sevenfold - A Little Piece Of Heaven.m4a",
];
var indiceActual = new Array(1);
function crearPlayList() {
  const listado = document.createElement("ol");
  listado.setAttribute("id", "listadoMusica");
  for (let i = 0; i < canciones.length; i++) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(canciones[i]));
    item.setAttribute("id", canciones.indexOf(canciones[i]));
    listado.appendChild(item);
  }
  return listado;
}
document.getElementById("playList").appendChild(crearPlayList());

var listadoMusica = document.getElementById("listadoMusica");
listadoMusica.onclick = (e) => {
  const itemClick = e.target;
  removeActive();
  itemClick.classList.add("active");
  reproduccionActual("Reproduciendo: " + itemClick.innerText);
  loadMusic(itemClick.innerText);
  player.play();
  indiceActual[0] = e.target.id;
  classIconPlay();
}; */

// Hacer las funciones de los demás botones

var audio = document.getElementById("audio");
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
};

boton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
    document.getElementById("play-pause").classList.toggle("button-play-pause");
    document.getElementById("play-pause").classList.remove("play-pause");
  } else {
    audio.pause();
    document.getElementById("play-pause").classList.toggle("button-play-pause");
    document.getElementById("play-pause").classList.add("play-pause");
  }
  if (player.ended) {
    nextMusic();
  }
});

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

progress.addEventListener("click", adelantar);
function adelantar(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
  console.log(e);
}
