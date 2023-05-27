
let questions = [];
let currentQuizIndex = 0;
let score = 0;
let quizContainer = document.getElementById('question-text');
let resultsContainer = document.getElementById('results');
let submitButton = document.getElementById('submit');
let previousButton = document.getElementById('prev-button');
let nextButton = document.getElementById('next-button');
let timerContainer = document.getElementById('timer');
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;
let ansInput = document.getElementById('ans-input');
let answerSheet = [];
let userEnteredAnswer = "";
let testSubmitted = false;

/**
 * Start Quiz 
 * Fetch test data from backend API
 */

async function startQuiz() {
  try {
    const response = await fetch('http://localhost:2050/api/test/begin');

    const data = await response.json();

    if (data.status === true && data.statusCode === 200) {
      questions = data.data;
      answerSheet = []
      prepareAnswerSheet(answerSheet)
      showQuestion();
      startTimer();
    } else {
      alert('Error fetching questions. Please try again later.');
    }

  } catch (error) {
    alert('Error fetching questions. Please try again later.');
  }
}

/**
 * Display questions based on next and previous actions
 */
function showQuestion() {

  let output = '';
  let question = questions[currentQuizIndex];
  // output += '<div class="question">' 'Q.No: ' + question.question_text + '</div>';
  output += `<div class="question"> Q.No ${question.question_number}: ${question.question_text} </div>`;

  userEnteredAnswer = ansInput.value;
  ansInput.value = answerSheet[currentQuizIndex]?.answer || "";

  previousButton.disabled = currentQuizIndex === 0;
  nextButton.disabled = currentQuizIndex === questions.length - 1;

  quizContainer.innerHTML = output;
}

/**
 * Save answer from user once the answer is updated by user in text field
 */
function saveAnswer() {
  if (answerSheet[currentQuizIndex]?.id) {
    const alreadySavedAnswer = answerSheet[currentQuizIndex].answer;
    if (alreadySavedAnswer) {
      answerSheet[currentQuizIndex].answer = alreadySavedAnswer;
    } else {
      const newlyWrittenAnswer = ansInput.value;
      if (newlyWrittenAnswer) {
        answerSheet[currentQuizIndex].answer = newlyWrittenAnswer;
      }
    }
  }
}

/**
 * Show final result of test to the user
 * Evaluate student answers with the help of backend API
 */
async function showResults() {
  let mail = getCookie('userEmail');
  try {
    const response = await fetch('http://localhost:2050/api/test/evaluate/'+mail, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answerSheet)
    });
    const data = await response.json();
    if (data.status === true && data.statusCode === 200) {
      let url = `results.html?testId=${data.data.test_id}`;
      window.location.href = url;
    } else {
      alert('Error evaluating answers. Please try again later.');
    }
    clearInterval(timerInterval);
  } catch (error) {
    alert('Error evaluating answers. Please try again later.');
  }
}


/**
 * Start Inverval
 */
function startTimer() {
  let timerInterval = setInterval(() => {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerContainer.innerHTML = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

/**
 * Load previous answer and pupulate it inside text area
 */
function prevAnswer() {
  ansInput.value = answerSheet[currentQuizIndex]?.answer;
}

/**
 * Diselect answer if previous answer is not present
 */
function deselectAnswers() {
  ansInput.value = '';
}

/**
 * Prepare answer sheet template without answers
 * @param {*} answerSheet : answer sheet payload
 */
function prepareAnswerSheet(answerSheet) {
  for (let singleQuestion of questions) {
    const preparedAnswerTemplate = {
      id: singleQuestion.id,
      question_number: singleQuestion.question_number,
      answer: ""
    }
    answerSheet.push(preparedAnswerTemplate)
  }
}

/**
 * Previous button -> on click event
 * Load previous question
 */
previousButton.addEventListener('click', () => {
  answerSheet[currentQuizIndex].answer = ansInput.value;
  if (currentQuizIndex <= 0) {
    saveAnswer();
  } else {
    saveAnswer();
    currentQuizIndex = currentQuizIndex - 1;
  }
  showQuestion();
});

/**
 * Next button -> on click event
 * Load next question
 */
nextButton.addEventListener('click', () => {
  answerSheet[currentQuizIndex].answer = ansInput.value;
  if (currentQuizIndex >= questions.length - 1) {
    saveAnswer();
  } else {
    saveAnswer();
    currentQuizIndex = currentQuizIndex + 1;
  }
  deselectAnswers() 
  showQuestion();
});

/**
 * Submit button -> on click event
 * Submit test and get final result
 */
submitButton.addEventListener('click', () => {
  if (testSubmitted) {
    alert('You have already submitted the test!');
  }
  saveAnswer();
  clearInterval(timerInterval);
  showResults();
});

/**
 * Start quiz
 */
startQuiz();



function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}