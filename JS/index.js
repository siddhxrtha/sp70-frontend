document.addEventListener("DOMContentLoaded", function() {
  const targetDate = new Date('October 27, 2024 00:00:00').getTime();
  const timerElement = document.getElementById('timer');
//Countdown
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      timerElement.innerHTML = "The event has started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerElement.innerHTML = `
      ${days} <span class="text-dark">Days</span> 
      ${hours} <span class="text-dark">Hours</span> 
      ${minutes} <span class="text-dark">Minutes</span> 
      ${seconds} <span class="text-dark">Seconds</span>`;
  }

  setInterval(updateTimer, 1000);
  updateTimer();
});

//  Quiz
document.addEventListener('DOMContentLoaded', function() {
  const quizData = [
    {
      question: "When was Singapore Polytechnic founded?",
      options: ["1949", "1954", "1959", "1964"],
      correct: 1
    },
    {
      question: "Who was the first principal of Singapore Polytechnic?",
      options: ["Mr. Tan Kah Kee", "Mr. Lee Kuan Yew", "Mr. Lim Tay Boh", "Mr. Tan Chin Tuan"],
      correct: 2
    },
    {
      question: "Which is the oldest school in Singapore Polytechnic?",
      options: ["School of Business", "School of Architecture & the Built Environment", "School of Engineering", "School of Digital Media and Infocomm Technology"],
      correct: 2
    },
    {
      question: "Who created this SP70 Website?",
      options: ["Mr Yin Ji Sheng", "Mr Edwin Lim", "Balamurugan Siddhartha", "School Of Computing"],
      correct: 2
    }
  ];
//Initialisation Of Quiz Variables
  let currentQuestionIndex = 0;
  let score = 0;

  const introContainer = document.getElementById('intro-container');
  const quizContainer = document.getElementById('quiz-container');
  const questionContainer = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const optionsContainer = document.getElementById('options');
  const resultContainer = document.getElementById('result-container');
  const resultElement = document.getElementById('result');
  const restartButton = document.getElementById('restart-btn');
  const startQuizButton = document.getElementById('start-quiz-btn');

  const correctBeepSound = new Audio('audios/correct-beep.mp3'); 
  
  function startQuiz() {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    showQuestion();
  }

  function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
      const optionElement = document.createElement('button');
      optionElement.className = 'list-group-item list-group-item-action';
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => selectOption(index));
      optionsContainer.appendChild(optionElement);
    });
  }

  function selectOption(index) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const optionElements = optionsContainer.querySelectorAll('button');
    
    optionElements.forEach((button, idx) => {
      if (idx === correctIndex) {
        button.classList.add('bg-success', 'text-white'); 
      } else if (idx === index) {
        button.classList.add('bg-danger', 'text-white'); 
      }
    });

    if (index === correctIndex) {
      correctBeepSound.play();
      score++;
    }


    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 1000); 
  }

  function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultElement.textContent = `You scored ${score} out of ${quizData.length}!`;
  }
  function restartQuiz() {
    introContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
  }
  restartButton.addEventListener('click', restartQuiz);
  startQuizButton.addEventListener('click', startQuiz);
});
// Scroll Reveal Effect
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  cards.forEach(card => {
    observer.observe(card);
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });
});
// Title gets typed out here using "typeWriter" Function
document.addEventListener("DOMContentLoaded", function() {
  const text = "Join us as we rejoice and celebrate our 70th Anniversary!";
  const speed = 35; 
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      document.getElementById("welcome-text-subtitle").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
});
// Confetti Effect
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('confettiButton').addEventListener('click', function() {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@latest/dist/confetti.browser.min.js';
      script.onload = () => {
          const confetti = window.confetti;
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      };
      document.body.appendChild(script);
  });
});