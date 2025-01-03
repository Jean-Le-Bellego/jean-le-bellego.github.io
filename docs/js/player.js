const allPlayBts = document.querySelectorAll('button[data-playing]');
const audioElements = document.querySelectorAll("figure.player audio");
const wsArray = [];

if (allPlayBts.length > 0) {

  let stopAll = function (array) {
    array.forEach((s) => {
      s.pause();
    });
    allPlayBts.forEach((bt) => {
      bt.dataset.playing = "false";
      bt.setAttribute('aria-checked', "false");
    });
  };

  allPlayBts.forEach((bt) => {

    let backg, audioId, audioEl, urlSource;
    let parentFigure = bt.parentElement.parentElement;
    let soundParent = bt.nextElementSibling;

    if (parentFigure.classList.contains('no-bg')) {
      backg = '#3C4E56';
    } else {
      backg = '#000';
    }

    audioId = bt.getAttribute('aria-controls');
    audioEl = document.getElementById(audioId);
    audioEl.controls = false;

    if (audioEl.canPlayType("audio/ogg")) {
      urlSource = audioEl.querySelector("source:first-child").getAttribute("src");
    } else {
      urlSource = audioEl.querySelector("source:last-child").getAttribute("src");
    }

    let wavesurfer = WaveSurfer.create({
      container: soundParent,
      height: 60,
      width: '85%',
      splitChannels: false,
      normalize: false,
      waveColor: backg,
      progressColor: "#56B1C6",
      cursorColor: "#F1D648",
      cursorWidth: 2,
      barWidth: 4,
      barAlign: "bottom",
      url: urlSource,
    });

    wsArray.push(wavesurfer);

    bt.addEventListener('click', (e) => {
      theButton = e.target;

      if (theButton.dataset.playing === "false") {
        stopAll(wsArray);
        theButton.dataset.playing = "true";
        wavesurfer.play();
      } else if (theButton.dataset.playing === "true") {
        theButton.dataset.playing = "false";
        wavesurfer.pause();
      }

      let state = theButton.getAttribute('aria-checked') === "true" ? true : false;
      theButton.setAttribute('aria-checked', state ? "false" : "true");

    });
  });
}