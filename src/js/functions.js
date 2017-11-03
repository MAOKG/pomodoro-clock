import $ from 'jquery';

$(() => {
  let sessionL = 25;
  let breakL = 5;
  let hasStart = false;
  let isSession = true;
  let isPaused = false;
  let currentTimer;
  let animation;
  const fill = document.getElementById('fill');
  const keyFrames = [{ height: '0' }, { height: '100%' }];
  const timingOptions = {
    easing: 'cubic-bezier(.2,.6,.8,.4)',
    duration: 25 * 1000,
    delay: 1000
  };

  // timer operation
  function timer(durationS, durationB) {
    let min = durationS;
    let sec = 0;

    function set() {
      if (!isPaused) {
        if (min === 0 && sec === 0) {
          clearInterval(currentTimer);
          isSession = !isSession;
          if (isSession) {
            $('.mode').text('Session');
            min = durationS;
            fill.style.background = '#99FF33';
            timingOptions.duration = min * 60 * 1000;
            animation = fill.animate(keyFrames, timingOptions);
            currentTimer = setInterval(() => {
              set();
            }, 1000);
          } else {
            min = durationB;
            fill.style.background = '#FF3333';
            timingOptions.duration = min * 60 * 1000;
            animation = fill.animate(keyFrames, timingOptions);
            currentTimer = setInterval(() => {
              set();
            }, 1000);
            $('.mode').text('Break!');
          }
        } else if (sec === 0) {
          sec = 59;
          min -= 1;
        } else {
          sec -= 1;
        }

        $('.timer').text(`${`0${min}`.slice(-2)}:${`0${sec}`.slice(-2)}`);
      }
    }

    timingOptions.duration = min * 60 * 1000;
    animation = fill.animate(keyFrames, timingOptions);
    currentTimer = setInterval(() => {
      set();
    }, 1000);
  }

  // Configure timer
  $('.break .fa-minus').on('click', () => {
    if (!hasStart && breakL > 1) {
      breakL -= 1;
      $('#breakL').text(breakL);
    }
  });
  $('.break .fa-plus').on('click', () => {
    if (!hasStart) {
      breakL += 1;
      $('#breakL').text(breakL);
    }
  });
  $('.session .fa-minus').on('click', () => {
    if (!hasStart && sessionL > 1) {
      sessionL -= 1;
      $('#sessionL').text(sessionL);
      $('.timer').text(sessionL);
    }
  });
  $('.session .fa-plus').on('click', () => {
    if (!hasStart) {
      sessionL += 1;
      $('#sessionL').text(sessionL);
      $('.timer').text(sessionL);
    }
  });

  // Pause Button
  $('#P').on('click', function pause() {
    if (hasStart) {
      if (!isPaused) {
        $(this).text('RESUME');
        $('#R').fadeIn('slow');
        animation.pause();
      } else {
        $(this).text('PAUSE');
        $('#R').fadeOut('slow');
        animation.play();
      }
      isPaused = !isPaused;
    }
  });
  // Start button
  $('#S').on('click', function start() {
    if (!hasStart) {
      hasStart = true;
      $(this).fadeOut('slow', () => {
        $('.fa-minus, .fa-plus').fadeOut('slow');
        $('#P').fadeIn('slow');
      });
      timer(sessionL, breakL);
    }
  });

  // Reset button
  $('#R').on('click', () => {
    if (isPaused) {
      clearInterval(currentTimer);
      animation.cancel();
      hasStart = false;
      isPaused = false;
      isSession = true;
      $('.mode').text('Session');
      $('.timer').text(sessionL);
      fill.style.background = '#99FF33';
      $('#P').text('PAUSE');
      $('#P, #R').fadeOut('slow', () => {
        $('.fa-minus, .fa-plus').fadeIn('slow');
        $('#S').fadeIn('slow');
      });
    }
  });
});
