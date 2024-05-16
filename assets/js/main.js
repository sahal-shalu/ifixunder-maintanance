(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Countdown timer
   */
  let countdown = select('.countdown');
  if (countdown) {
    const output = countdown.innerHTML;

    const countDownDate = function() {
      // Current date and time
      let now = new Date().getTime();

      // End date set to 31 days from now
      let endDate = new Date(countdown.getAttribute('data-count')).getTime();

      // Calculate time left
      let timeleft = endDate - now;

      // Calculate days, hours, minutes, and seconds
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

      // Display the result
      countdown.innerHTML = output.replace('%d', days).replace('%h', hours).replace('%m', minutes).replace('%s', seconds);

      // If the countdown is over, write some text
      if (timeleft < 0) {
        clearInterval(interval);
        countdown.innerHTML = "EXPIRED";
      }
    };

    // Update the count down every 1 second
    const interval = setInterval(countDownDate, 1000);
    countDownDate();
  }

})();
