// Ensuring DOM loads, initialization of variables to be used..
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.count');
  const duration = 6000; 
  let startTime = null;
  let elapsedTime = 0;
  let animationFrameId = null;
  let isConfetti = true;

  const updateCounters = () => {
    const now = Date.now();
    const timeElapsed = now - startTime + elapsedTime;
    const progress = Math.min(timeElapsed / duration, 1);

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      counter.innerText = Math.floor(progress * target);
    });
// Confetti Effect
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(updateCounters);
    } else {
      if (isConfetti){
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        elapsedTime = duration; 
        isConfetti = false;
      }
      }
      
  };
//Functions To Start and Pause Counting
  const startCounting = () => {
    startTime = Date.now();
    animationFrameId = requestAnimationFrame(updateCounters);
  };

  const pauseCounting = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      elapsedTime += Date.now() - startTime;
      startTime = null;
    }
  };

  const observerOptions = {
    threshold: 0.1 
  };
// Logic to implement startCounting and pauseCounting functions
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!startTime) {
          startCounting(); 
        }
      } else {
        pauseCounting(); 
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const countersSection = document.querySelector('#statistics');

  if (countersSection) {
    observer.observe(countersSection); 
  }
});

