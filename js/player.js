const figures = document.querySelectorAll("figure.player");
const audioElements = document.querySelectorAll("figure.player audio");

if(audioElements.length > 0) {
  let audioContext, soundParent, track, playButton, urlSource, backg;

  let stopAll = function() {
    audioElements.forEach((s) => {      
      s.stop;
      s.currentTime = 0;
      s.nextElementSibling.dataset.playing = "false";
    });
  };

  audioElements.forEach((sound) => {
    sound.controls = false;
    audioContext = new AudioContext();
    track = audioContext.createMediaElementSource(sound);
    track.connect(audioContext.destination);

    playButton = sound.nextElementSibling;

    if (sound.canPlayType("audio/ogg")) {
      urlSource = sound.querySelector("source:first-child").getAttribute("src");
    } else {
      urlSource = sound.querySelector("source:last-child").getAttribute("src");
    }

    figures.forEach((figure) => {
      if(figure.classList.contains('no-bg')) {
        backg = '#3C4E56';
      } else {
        backg = '#000';
      }
    });

    soundParent = sound.parentNode.querySelector("div.wave");

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

    playButton.addEventListener("click", (e) => {
        let theButton = e.target;

        // stopAll();

        // Check if context is in suspended state (autoplay policy)
        if (audioContext.state === "suspended") {
          audioContext.resume();
        }

        // Play or pause track depending on state
        if (theButton.dataset.playing === "false") {
          //sound.play();
          theButton.dataset.playing = "true";
          wavesurfer.play();
        } else if (theButton.dataset.playing === "true") {
          //sound.pause();
          theButton.dataset.playing = "false";
          wavesurfer.pause();
        }

        let state = theButton.getAttribute('aria-checked') === "true" ? true : false;
	      theButton.setAttribute( 'aria-checked', state ? "false" : "true" );

        wavesurfer.on('finish', () => {
          theButton.dataset.playing = "false";
          theButton.setAttribute( "aria-checked", "false" );
        });
        wavesurfer.on('click', () => {          
          theButton.dataset.playing = "true";
          theButton.setAttribute( "aria-checked", "true" );
          wavesurfer.play();
        })        

      }, false
    );
  });
}
