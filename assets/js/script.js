var timerEl = document.getElementById('time');


var timeLeft = 61;

/*Add a timer that counts down by 1 per second, also sends the user to the end page if the timer hits 0*/
function timerCountdown() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            /*put something in to send to end page*/
        }
    }, 1000);
}

timerCountdown();

