document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('wishForm');         //Initialisation of all the variables
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const modalMessage = document.getElementById('modalMessage');
  const validationModalElement = document.getElementById('validationModal');
  const validationModal = new bootstrap.Modal(validationModalElement);
  const successToast = new bootstrap.Toast(document.getElementById('successToast'));
  const progressBar = document.querySelector('#successToast .progress-bar');
  const wishesList = document.getElementById('wishesList');
//Validation Modal
  function showValidationMessage(message) {
    modalMessage.textContent = message;
    validationModal.show();
  }

  function validatePhone() {
    return /^[0-9]{8}$/.test(phoneInput.value);
  }

  function validateEmail() {
    return emailInput.validity.valid;
  }

  function validateForm() {
    if (!validatePhone()) {
      showValidationMessage('Please enter a valid 8-digit phone number.');
      return false;
    }

    if (!validateEmail()) {
      showValidationMessage('Please enter a valid email address.');
      return false;
    }

    return true;
  }

  function updateInputFeedback(inputElement, isValid) {
    if (isValid) {
      inputElement.classList.add('is-valid');
      inputElement.classList.remove('is-invalid');
    } else {
      inputElement.classList.add('is-invalid');
      inputElement.classList.remove('is-valid');
    }
  }

  phoneInput.addEventListener('input', function () {
    updateInputFeedback(phoneInput, validatePhone());
  });

  emailInput.addEventListener('input', function () {
    updateInputFeedback(emailInput, validateEmail());
  });

  phoneInput.addEventListener('blur', function () {
    if (!validatePhone()) {
      showValidationMessage('Please enter a valid 8-digit phone number.');
    }
  });

  emailInput.addEventListener('blur', function () {
    if (!validateEmail()) {
      showValidationMessage('Please enter a valid email address.');
    }
  });
// Function which adds users' wishes to the dummy data below
  function addWishToList(name, wish) {
    const wishItem = document.createElement('div');
    wishItem.className = 'col';
    wishItem.innerHTML = `
      <div class="card h-100 rounded-4 shadow-lg p-3 mb-5 bg-white">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${wish}</p>
        </div>
      </div>
    `;
    wishesList.insertBefore(wishItem, wishesList.firstChild);
  }

  const dummyWishes = [
    { name: 'Jesse Pinkman', wish: 'Congratulations on the 70th anniversary!' },
    { name: 'CashMoneySid', wish: 'Wishing SP many more successful years ahead!' },
    { name: 'Heisenberg', wish: 'Happy 70th anniversary to the best institution!' }
  ];

  dummyWishes.forEach(wish => addWishToList(wish.name, wish.wish));
//Reset Form Inputs.
  function resetValidation() {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });
  
    const slider = document.getElementById('experienceSlider');
    const sliderValue = document.getElementById('sliderValue');
    slider.value = 0; 
    sliderValue.textContent = slider.value;
  }
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const name = document.getElementById('name').value;
    const wish = document.getElementById('wish').value;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.replace('btn-outline-danger', 'btn-success');
    submitButton.textContent = 'Thank You!';
// Progress Bar Under Toast Transition
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 3s linear';
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 0);

    successToast.show();

    addWishToList(name, wish);

    setTimeout(() => {
      form.reset();
      resetValidation();
      submitButton.classList.replace('btn-success', 'btn-outline-danger');
      submitButton.textContent = 'Submit';
    }, 3000);
  });
//Slider Javascript
  const slider = document.getElementById('experienceSlider');
  const sliderValue = document.getElementById('sliderValue');
  
  slider.addEventListener('input', function () {
    sliderValue.textContent = slider.value;
  });
  });
// Bootstrap Tooltip JS
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });