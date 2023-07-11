var timerEl = document.querySelector('#time');


var timeLeft = 60;

/*Add a timer that counts down by 1 per second starting with a value of 60, also sends the user to the end page if the timer hits 0*/
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

console.log(timeLeft);