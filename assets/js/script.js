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
var score = document.getElementById('high-scores');

// const contents_db = [
//     {
//         question:"...",
//         choices:["o1","o2",],
//         answer:0
//     }
//     {
//         question:"",
//         choiceA:"a1",
//         choiceB:"",
//         answer:"a1"
//     }
// ]
const contents = ['Who was the first emperor of Rome?', 'Nero', 'Augustus', 'Tiberius', 'Marcus Aurelius', 'Augustus', 'Who was the ruler of France at the beginning of the French Revolution?', 'Louis XVI', 'Charles II', 'Phillip IV', 'Louis XIV', 'Louis XVI', "What was the name of George Washington's estate?", 'Cape Hope', 'Mount Vernon', 'The Hanging Gardens', 'Oak Alley', 'Mount Vernon', 'Considered a surrogate son to George Washington, who was the Frenchman known as the "Hero of Two Worlds"?', 'Louis Pastuer', 'Charles de Gaulle', 'Victor Hugo', 'Marquis de La Fayette', 'Marquis de La Fayette', 'As a result of the Meiji Restoration, the end of this period marked the end of Japanese Feudalism and the beginning of the modern era in Japan.', 'Heian period', 'Asuka period', 'Sengoku period', 'Edo period', 'Edo period'];

let timeLeft = 100;
let currentQ = 0;

function startQuiz() {
    clearInterval(timeInterval);
    timer.style.visibility = "visible";
    initial.style.visibility = "hidden";
    score.style.visibility = "hidden";
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
    button1.addEventListener('click',questionOne)
}

function questionOne() {
    button1.removeEventListener('click', questionOne);
    timerCountdown();  
    moreText.style.visibility = "hidden";
    button2.style.visibility = "visible";
    button3.style.visibility = "visible";
    button4.style.visibility = "visible";
    topText.textContent = contents[0];
    button1.textContent = "A. " + contents[1];
    button2.textContent = "B. " + contents[2];
    button3.textContent = "C. " + contents[3];
    button4.textContent = "D. " + contents[4];
    button1.addEventListener('click', checkAnswer);
    
    button2.addEventListener('click', checkAnswer);
    
    button3.addEventListener('click', checkAnswer);
    
    button4.addEventListener('click', checkAnswer);
    currentQ = 5
}

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

function endPage() {
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
        button1.addEventListener('click', () => {
            timeLeft = 100;
            startQuiz();        
            
        });
        button2.style.visibility = "visible";
        button2.textContent = "High Scores";
        button2.addEventListener('click', () => {     
            highScore();
        });
    }
    else {
        clearInterval(timeInterval);
        initial.style.visibility = "visible";
        submission.style.visibility = "visible";
        submitInit();
    }    
}

/* grab the user selection by finding the 2nd element after the '.', trims the white space from the start and end (though in this instance it's only the start that is needed), and then compares it to the correct answer.  The correct answer is each 6th string in the 'contents' array.  In the questionOne() function the currentQ variable is set to 5.  The questionDisplay() function then increments the 'currentQ' variable by 1 each time it adds text to an element to get to the right value in the 'contents' array for the next element, 'currentQ' will end up on the correct answer value by the end of the function.  So the user selection is compared to the correct answer, if the values match then 'Correct' pops up at the bottom and after a 2 second delay they move on to the next question.  If the values do not match then 'Wrong' pops up at the bottom, the time left decrements by 10, and then they move on to the next question.  If time goes to 0 or less then the quiz is over and the user is sent to the endPage(). */
function checkAnswer(event){
    console.log(event.target.textContent)
    const userSelection = event.target.textContent.split(".")[1].trim();
    console.log(userSelection)
    
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
    timer.textContent = "Time: " + timeLeft;
}

let timeInterval;

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
        timer.textContent = "Time's Up!"
        clearInterval(timeInterval)
        endPage()
    }else{
        updateTimer();
    }
}

function submitInit() {
    $('#submit').submit(function(event) {
        event.preventDefault();
        var init = $('#initials').val();
            
        localStorage.setItem("Initials", init);
        localStorage.setItem("Score", timeLeft);
        highScore();
    });
}

function showScore() {
    var initShow = localStorage.getItem("Initials") || '';
    var scoreShow = localStorage.getItem("Score") || '';
    score.textContent = `Initials: ${initShow} Score: ${scoreShow}`;
    
}

function highScore() {
    clearInterval(timeInterval);
    timer.style.visibility = "hidden";
    topText.textContent = "High Scores";
    moreText.style = "hidden";
    score.style.visibility = "visible";
    submission.style.visibility = "hidden";
    initial.style.visibility = "hidden";
    moreText.style.visibility = "hidden";
    button1.style.visibility = "visible";
    button2.style.visibility = "visible";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden"; 
    button1.textContent = "Start Over"
    button2.textContent = "Clear High Scores"
    showScore();
    button1.addEventListener('click', () => {        
        timeLeft = 100;
        startQuiz();
    });
    button2.addEventListener('click', () => {
        localStorage.clear();
        showScore();
    });
}

console.log(this);
startQuiz();