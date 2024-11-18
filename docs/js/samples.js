if(document.getElementById('home')) {

  const worksLinks = document.querySelectorAll('ul.work-list a');
  let sample;

  worksLinks.forEach((link) => {
    link.addEventListener('mouseover', (e) => {
      sample = e.target.getAttribute('data-sample');
      let samplePlay = new Audio(sample);
      console.log(sample)
      console.log(samplePlay)
      samplePlay.play();
    });
  });

}