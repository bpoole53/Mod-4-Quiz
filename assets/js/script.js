//calling all of the html id's to a variable

var timer = document.getElementById('time');
var topText = document.getElementById('list-question');
var moreText = document.getElementById('additional-text');
var bottomText = document.getElementById('bottom-text');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var initial = document.getElementById('initials');
var submission = document.getElementById('submit');
var tableForm = document.getElementById('table-form');

//created all of the questions and response options
const contents = ['Who was the first emperor of Rome?', 'Nero', 'Augustus', 'Tiberius', 'Marcus Aurelius', 'Augustus', 'Who was the ruler of France at the beginning of the French Revolution?', 'Louis XVI', 'Charles II', 'Phillip IV', 'Louis XIV', 'Louis XVI', "What was the name of George Washington's estate?", 'Cape Hope', 'Mount Vernon', 'The Hanging Gardens', 'Oak Alley', 'Mount Vernon', 'Considered a surrogate son to George Washington, who was the Frenchman known as the "Hero of Two Worlds"?', 'Louis Pastuer', 'Charles de Gaulle', 'Victor Hugo', 'Marquis de La Fayette', 'Marquis de La Fayette', 'As a result of the Meiji Restoration, the end of this period marked the end of Japanese Feudalism and the beginning of the modern era in Japan.', 'Heian period', 'Asuka period', 'Sengoku period', 'Edo period', 'Edo period'];

let timeLeft = 100;
let currentQ = 0;

/* Alot of these funtions involve hiding and making elements visible, and changing the text content of elements. I won't go too far into detail about that on any of the functions. Removed some existing event triggers, I did not realize that they will stack, I initially thought setting a new trigger for a particular element would override the old one.  This funtion is the main page, click the start quiz button to go to question 1 */ 
function startQuiz() {
    button1.removeEventListener('click', checkAnswer);
    button1.removeEventListener('click', startOver);
    button2.removeEventListener('click', clearScore);
    $('#submit').unbind();
    clearInterval(timeInterval);
    tableForm.style.visibility = "hidden";
    timer.style.visibility = "visible";
    initial.style.visibility = "hidden";
    submission.style.visibility = "hidden";
    moreText.style.visibility = "visible";
    button2.style.visibility = "hidden";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden";
    bottomText.style.visibility = "hidden";
    topText.textContent = ("History Quiz Challenge");
    moreText.textContent = ("Try to answer the following history related questions within the time limit. Be aware: incorrect answers will penalize your score/time by ten seconds!");    
    button1.textContent = "Start Quiz";
    updateTimer();    
    button1.addEventListener('click',questionOne);
}

/*Several more functions remove event listeners as needed, won't mention that anymore in the other functions.  set currentQ to 0 for when the user starts over.  added event listeneres for buttons 1-4 to call the checkAnswer funciton.*/
function questionOne() {
    currentQ = 0;
    button1.removeEventListener('click', questionOne);
    timerCountdown();  
    moreText.style.visibility = "hidden";
    button2.style.visibility = "visible";
    button3.style.visibility = "visible";
    button4.style.visibility = "visible";
    questionDisplay();
    button1.addEventListener('click', checkAnswer);
    
    button2.addEventListener('click', checkAnswer);
    
    button3.addEventListener('click', checkAnswer);
    
    button4.addEventListener('click', checkAnswer);   
}
/*this calls a string in an index of the contents array based on the currentQ value and adds 1 to currentQ to advance to the next string.*/
function questionDisplay() {
    topText.textContent = contents[currentQ];
    currentQ++
    button1.textContent = "A. " + contents[currentQ];
    currentQ++
    button2.textContent = "B. " + contents[currentQ];
    currentQ++
    button3.textContent = "C. " + contents[currentQ];
    currentQ++
    button4.textContent = "D. " + contents[currentQ];
    currentQ++
    
}

/*this is the end page.  If the score is <= 0 then you do not have the option of adding initials and can either view the high scores or start over.  if you have a score > 0 then you can add your initials and that will take you to the high score page.*/
function endPage() {
    button1.removeEventListener('click', checkAnswer);
    button2.removeEventListener('click', checkAnswer);
    button1.style.visibility = "hidden";
    button2.style.visibility = "hidden";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden";    
    topText.textContent = "All Done!";
    moreText.textContent = "Your Final score is " + timeLeft;
    moreText.style.visibility = "visible";
    if (timeLeft <= 0) {
        clearInterval(timeInterval);
        button1.style.visibility = "visible";
        button1.textContent = "Start Over";
        button1.addEventListener('click', startOver);
        button2.style.visibility = "visible";
        button2.textContent = "High Scores";
        button2.addEventListener('click', highScore);
    }
    else {
        clearInterval(timeInterval);
        initial.style.visibility = "visible";
        submission.style.visibility = "visible";
        submitInit();
    }    
}

/* grab the user selection by finding the 2nd element after the '.', trims the white space from the start and end (though in this instance it's only the start that is needed), and then compares it to the correct answer.  The correct answer is each 6th string in the 'contents' array.  The questionDisplay() function then increments the 'currentQ' variable by 1 each time it adds text to an element to get to the right value in the 'contents' array for the next element, 'currentQ' will end up on the correct answer value by the end of the function.  So the user selection is compared to the correct answer, if the values match then 'Correct' pops up at the bottom and after a 2 second delay they move on to the next question.  If the values do not match then 'Wrong' pops up at the bottom, the time left decrements by 10, and then they move on to the next question.  If time goes to 0 or less then the quiz is over and the user is sent to the endPage(). */
function checkAnswer(event){
    var userSelection = event.target.textContent.split(".")[1].trim();
    
    if(userSelection === contents[currentQ]){
    bottomText.style.visibility = "visible";
    bottomText.textContent = "Correct!";
    }else{
    bottomText.style.visibility = "visible";
    bottomText.textContent = "Wrong!";  
    minusTen();  
    }
    setTimeout(() => {
        bottomText.style.visibility = "hidden";
        if(currentQ < contents.length-6 && timeLeft > 0){
            currentQ++;
            questionDisplay()
        }else{
            clearInterval(timeInterval);
            endPage()
        }
     }, 1500);
}

//updates the timer text
function updateTimer() {
    if (timeLeft <= 0) {
        timer.textContent = "Time's Up!";
    }else{    
        timer.textContent = "Time: " + timeLeft;
    }    
}

/* declace timeInterval as a global variable so I can clearInterval wherever I need to */
let timeInterval;

/* set a 1000ms interval to decrement timer by 1 and then update the timer */
function timerCountdown() {
    timeInterval = setInterval(function() {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            endPage();
        }
        updateTimer();
    }, 1000);
}

/*decrements the timer by 10, if time runs out as a result of doing so then the text reads Time's up! and takes the user to the endPage().  Otherwise it updates the timer text*/
function minusTen () {
    timeLeft-=10
    if(timeLeft < 0){
        timeLeft = 0;
        clearInterval(timeInterval);
        timer.textContent = "Time's Up!";
        endPage();
    }else{
        updateTimer();
    }
}

/*this takes the initials submitted on the endPage and assigns them to vars which are then plugged into the newRow var which is then appended to the table-form table. */
function submitInit() {
    $('#submit').submit(function(event) {
        event.preventDefault();
        let init = $('#initials').val();
        let score = timeLeft;

        var newRow = `<tr>
                    <td>${init}
                    <td>${score}
                  </tr>`    
    
        $('#table-form tbody').append(newRow);
 
        highScore();
    });
}

//resets the time and restarts the quiz
function startOver() {
    timeLeft = 100;
    startQuiz();
}

/* this removes any parent that has a td element as a child, which effectively clears the high scores table without removing the header */
function clearScore() {
    $("#table-form td").parent().remove();
}

/*this is the high scores page.  Here you can view high scores and then choose to either start over or clear the high scores. */
function highScore() {
    button1.removeEventListener('click', checkAnswer);
    button2.removeEventListener('click', checkAnswer);
    button2.removeEventListener('click', highScore);
    clearInterval(timeInterval);
    tableForm.style.visibility = "visible";
    timer.style.visibility = "hidden";
    topText.textContent = "High Scores";
    moreText.style = "hidden";
    submission.style.visibility = "hidden";
    initial.style.visibility = "hidden";
    moreText.style.visibility = "hidden";
    button1.style.visibility = "visible";
    button2.style.visibility = "visible";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden"; 
    button1.textContent = "Start Over"
    button2.textContent = "Clear High Scores"
    button1.addEventListener('click', startOver);
    button2.addEventListener('click', clearScore);
}

startQuiz();
