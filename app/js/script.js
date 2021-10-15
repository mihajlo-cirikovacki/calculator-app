'use strict';

// ===== THEME:
const themeToggle = document.querySelector('.theme-toggle');

// Select the theme preference from localStorage
const currentTheme = localStorage.getItem("theme");

// If the current theme in localStorage is "defalut, light-mode"...
if (currentTheme === null) {
  document.documentElement.classList.remove('light-mode', 'purple-mode');
} else if (currentTheme === 'light-mode') {
  document.documentElement.classList.add('light-mode');
} else if(currentTheme === 'purple-mode') {
  document.documentElement.classList.add('purple-mode');
};

// ===== CALCULATOR FUNCTIONALITY:
const buttonsContainer = document.querySelector('.calculator__buttons');
const prevOperandTextEl = document.querySelector('[data-prev-operand]');
const currOperandTextEl = document.querySelector('[data-curr-operand]');
const numberBtns = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const resetBtn = document.querySelector('[data-reset]');
const equalBtn = document.querySelector('[data-equal]');
const local = navigator.language; 

class Calculator {
  // #currOperand = currOperand;
  // #prevOperand = prevOperand;
  constructor(currOperandTextEl, prevOperandTextEl) {
    this.currOperandTextEl = currOperandTextEl;
    this.prevOperandTextEl = prevOperandTextEl;
    this.reset();
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1)
  }

  reset() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currOperand.includes('.')) return;
    this.currOperand += number;
  }

  chooseOperation(operation) {
    if(this.currOperand === '') return;
    if(this.prevOperand !== '') {
      this.total();
    }
    this.operation = operation;
    this.currOperand += operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  total() {
    let total;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);

    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '+': 
        total = prev + curr;
        break;  
      case '-':
        total = prev - curr;
        break;
      case 'x':
        total = prev * curr;
        break;
      case '/':
        total = prev / curr;
        break;
      default: 
        return;  
    }

    this.currOperand = total.toLocaleString(local);
    this.operation = undefined;
    this.prevOperand = '';
  }

  updateDisplay() { 
    this.currOperandTextEl.textContent = this.currOperand;
    this.prevOperandTextEl.textContent = this.prevOperand;
  }
}

const calculator = new Calculator(currOperandTextEl, prevOperandTextEl);


// ===== EVENT LISTENERS:
// == BUTTONS CALC:
buttonsContainer.addEventListener('click', (e) => {
  const currBtn = e.target.closest('[data-number]');
  if(!currBtn) return;
 
  calculator.appendNumber(currBtn.textContent);
  calculator.updateDisplay();
});

operations.forEach(btn => {
  btn.addEventListener('click', (e) => {
    calculator.chooseOperation(btn.textContent);
    calculator.updateDisplay();
  });
})

equalBtn.addEventListener('click', (e) => {
  calculator.total();
  calculator.updateDisplay();
});

resetBtn.addEventListener('click', (e) => {
  calculator.reset();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', (e) => {
  calculator.delete();
  calculator.updateDisplay();
});


// == THEME
themeToggle.addEventListener('click', (e) => {
  const currBtn = e.target.closest('.custom-radio-button');
  const radio = currBtn.querySelector('input');
  let theme;

  if (radio.classList.contains('default-mode')) {
    document.documentElement.classList.remove('light-mode', 'purple-mode');
    theme = null;
  }
  if (radio.classList.contains('light-mode')) {
    document.documentElement.classList.add('light-mode');
    theme ='light-mode';
  } else document.documentElement.classList.remove('light-mode');

  if (radio.classList.contains('purple-mode'))  {
    document.documentElement.classList.add('purple-mode');
    theme = 'purple-mode';
  } else document.documentElement.classList.remove('purple-mode');

  // Save the choice in localStorage:
  localStorage.setItem("theme", theme);
});















