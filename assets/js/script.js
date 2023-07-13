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
const contents = ['Who was the first emperor of Rome?', 'Nero', 'Augustus', 'Tiberius', 'Marcus Aurelius', 'Augustus', 'Who was the ruler of France at the beginning of the French Revolution?', 'Louis XVI', 'Charles II', 'Phillip IV', 'Louis XIV', 'Louis XVI', "What was the name of George Washington's estate?", 'Cape Hope', 'Mount Vernon', 'The Hanging Gardens', 'Oak Alley', 'Mount Vernon', 'Considered a surrogate son to George Washington, who was the Frenchman known as the "Hero of Two Worlds"?', 'Louis Pastuer', 'Charles de Gaulle', 'Victor Hugo', 'Marquis de La Fayette', 'Marquis de La Fayette', 'As a result of the Meiji Restoration, the end of this period marked the end of Japanese Feudalism and the beginning of the modern era in Japan.', 'Heian period', 'Asuka period', 'Sengoku period', 'Edo period', 'Edo period']

let timeLeft = 60;
let currentQ = 0;




function startQuiz() {
    score.style.visibility = "hidden";
    submission.style.visibility = "hidden";
    moreText.style.visibility = "visible";
    topText.textContent = ("History Quiz Challenge");
    moreText.textContent = ("Try to answer the following history related questions within the time limit. Be aware: incorrect answers will penalize your score/time by ten seconds!");
    button1.textContent = "Start Quiz";
    button2.style.visibility = "hidden";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden";
    bottomText.style.visibility = "hidden";
    button1.addEventListener('click',questionOne)
    
}

function questionOne() {
    button1.removeEventListener('click', questionOne)
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

function questionThree() {
    topText.textContent = contents[10];
    button1.textContent = "A. " + contents[11];
    button2.textContent = "B. " + contents[12];
    button3.textContent = "C. " + contents[13];
    button4.textContent = "D. " + contents[14];
    button1.addEventListener('click', () => {
        wrong();     
        questionFour();
    })  
    button2.addEventListener('click', () => {
        correct();        
        questionFour();   
    })
    button3.addEventListener('click', () => {
        wrong();
        questionFour();
    })
    button4.addEventListener('click', () => {
        wrong();
        questionFour();
    })  
}

function questionFour() {
    topText.textContent = contents[15];
    button1.textContent = "A. " + contents[16];
    button2.textContent = "B. " + contents[17];
    button3.textContent = "C. " + contents[18];
    button4.textContent = "D. " + contents[19];
    button1.addEventListener('click', () => {
        wrong();
        questionFive();
    })  
    button2.addEventListener('click', () => {
        wrong();
        questionFive();   
    })
    button3.addEventListener('click', () => {
        wrong();
        questionFive();
    })
    button4.addEventListener('click', () => {
        correct();        
        questionFive();
    })  
}

function questionFive() {
    topText.textContent = contents[20];
    button1.textContent = "A. " + contents[21];
    button2.textContent = "B. " + contents[22];
    button3.textContent = "C. " + contents[23];
    button4.textContent = "D. " + contents[24];
    button1.addEventListener('click', () => {
        wrong();        
        endPage();
    })  
    button2.addEventListener('click', () => {
        wrong();
        endPage(); 
    })
    button3.addEventListener('click', () => {
        wrong();
        endPage();
    })
    button4.addEventListener('click', () => {
        correct();
        endPage();
    })  
}

function endPage() {
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden";    
    topText.textContent = "All Done!";
    moreText.textContent = "Your Final score is " + timeLeft;
    moreText.style.visibility = "visible";
    if (timeLeft <= 0) {
        submission.style.visibility = "visible";
        initials.style.visibility = "visible";
        clearInterval(timeInterval);
        button1.style.visibility = "visible";
        button1.textContent = "Try Again";
        submitInit();
        button1.addEventListener('click', () => {
            startQuiz();        
            
        });
        button2.style.visibility = "visible";
        button2.textContent = "High Scores";
        button2.addEventListener('click', () => {     
            highScore();
        });
    }
    else {
        submission.style.visibility = "visible";
        clearInterval(timeInterval);
        button1.style.visibility = "visible";
        button1.textContent = "Try Again";
        submitInit()
        button1.addEventListener('click', () => {
            timeLeft = 60;
            startQuiz();
        });    
        button2.style.visibility = "visible";
        button2.textContent = "High Scores";
        button2.addEventListener('click', () => {     
            highScore();
        });
        }
}

function wrong(){
    bottomText.style.visibility = "visible";
    bottomText.textContent = "Wrong!";
    minusTen();
    setTimeout(() => {
        bottomText.style.visibility = "hidden";
     }, 2500);
}

function checkAnswer(event){
    var userSelection = event.target.textContent.split(".")[1].trim();
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
            endPage()
        }
     }, 2500);
}

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

function minusTen () {
    timeLeft-=10
    if(timeLeft < 0){
        timeLeft = 0;
        timer.textContent = "time Up"
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
    });
}

function showScore() {
    var initShow = localStorage.getItem("Initials");
    var scoreShow = localStorage.getItem("Score");
    score.textContent = `Initials: ${initShow} Score: ${scoreShow}`;
    
}

function highScore() {
    timeLeft = 0;
    topText.textContent = "High Scores";
    score.style.visibility = "visible";
    submission.style.visibility = "hidden";
    initial.style.visibility = "hidden";
    moreText.style.visibility = "hidden";
    button1.style.visibility = "visible";
    button2.style.visibility = "visible";
    button3.style.visibility = "hidden";
    button4.style.visibility = "hidden"; 
    button1.textContent = "Go back"
    button2.textContent = "Clear High Scores"
    showScore();
    button1.addEventListener('click', () => {        
        endPage();
    });
    button2.addEventListener('click', () => {
        localStorage.clear();
    });
}

console.log(this);
startQuiz();