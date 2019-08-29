class Stopwatch {
  constructor(watchElement) {
    let time = 0;
    let interval;
    let offset;

    this.isOn = false; //timer is off

    this.start = function() {
      if (!this.isOn) {
        interval = setInterval(update.bind(this), 1000); // updates timer every second
        offset = Date.now();
        this.isOn = true;
      }
    };

    const update = () => { // arrow function helps "this" within refers to "update"

      // if the stopwatch is on, time is equal to time + delta
      if (this.isOn) {
        time += delta();
      }

      let formattedTime;

      formattedTime = timeFormatter(time);
      watchElement.textContent = formattedTime;

      const updateTime = 1;
      console.log(time); 

      // add trophy to trophyList (max 9 trophies appear)
      if (watchElement.textContent.slice(-2) % updateTime === 0 && 
      time < updateTime*10*1000) { // 10 for 9 trophies* 1000 miliseconds
      // watchElement.textContent.slice(-2) < updateTime*10) {
        $(".trophyList").append(`<li><i class="fas fa-trophy"></i></li>`);
      }

      if (watchElement.textContent.slice(-2) % updateTime === 0) {
        //refreshes quote on timed interval
        soberApp.getQuotes();

        // adds money on timed interval
        $(".money").html(
          `<p>$${(watchElement.textContent.slice(-2) / updateTime) *
            soberApp.retrieveSpend()}</p>`
        );
      }
    };

    // take the time now from the javascript time function
    // time passed is equal to the
    function delta() {
      let now = Date.now();
      let timePassed = now - offset;
      offset = now;
      return timePassed;
    }

    //converts miliseconds into hours, minutes seconds
    function timeFormatter(timeInMilliseconds) {
      let time = new Date(timeInMilliseconds);

      let hours = (time.getHours() - 19).toString();
      let minutes = time.getMinutes().toString();
      let seconds = time.getSeconds().toString();

      if (hours.length < 2) {
        hours = "0" + hours;
      }

      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }

      while (seconds.length < 2) {
        seconds = "0" + seconds;
      }

      return hours + " : " + minutes + " : " + seconds;
    }

    this.stop = function() {
      if (this.isOn) {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
      }
    };

    this.reset = function() {
      this.stop();
      time = 0;
      update(time);
    };
  }
}