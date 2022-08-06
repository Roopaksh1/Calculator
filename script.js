const buttons = [...document.querySelector('.buttons').children];
const specialButtons = [...document.querySelector('.clr-dlt-button').children];
const currentScreen = document.querySelector('.current');
const lastScreen = document.querySelector('.last');
let equalButton = 0;

window.addEventListener('keydown', appendToScreen);
buttons.forEach(button => button.addEventListener('click', appendToScreen));
specialButtons[0].addEventListener('click', clearScreen);
specialButtons[1].addEventListener('click', backSpace);

function appendToScreen(e) {
  if (e.type === 'click') {
    return mouseInput(e);
  }
  keyboardInput(e);
}

function mouseInput(e) {
  switch (e.target.getAttribute('class')) {
    case 'one':
      appendNumber('1');
      break;

    case 'two':
      appendNumber('2');
      break;

    case 'three':
      appendNumber('3');
      break;

    case 'four':
      appendNumber('4');
      break;

    case 'five':
      appendNumber('5');
      break;

    case 'six':
      appendNumber('6');
      break;

    case 'seven':
      appendNumber('7');
      break;

    case 'eight':
      appendNumber('8');
      break;

    case 'nine':
      appendNumber('9');
      break;

    case 'zero':
      appendNumber('0');
      break;

    case 'add':
      appendOperator('+');
      break;

    case 'subtract':
      appendOperator('-');
      break;

    case 'multiply':
      appendOperator('*');
      break;

    case 'divide':
      appendOperator('/');
      break;

    case 'equal':
      calculate();
      break;

    case 'dot':
      appendDecimal();
      break;
  };
}

function keyboardInput(e) {
  switch (e.key) {
    case '1':
    appendNumber('1');
      break;

    case '2':
      appendNumber('2');
      break;

    case '3':
      appendNumber('3');
      break;

    case '4':
      appendNumber('4');
      break;

    case '5':
      appendNumber('5');
      break;

    case '6':
      appendNumber('6');
      break;

    case '7':
      appendNumber('7');
      break;

    case '8':
      appendNumber('8');
      break;

    case '9':
      appendNumber('9');
      break;

    case '0':
      appendNumber('0');
      break;

    case '+':
      appendOperator('+');
      break;

    case '-':
      appendOperator('-');
      break;

    case '*':
      appendOperator('*');
      break;

    case '/':
      appendOperator('/');
      break;

    case '=':
    case 'Enter':
      calculate();
      break;

    case '.':
      appendDecimal();
      break;

    case 'Backspace':
      backSpace();
      break;

    case 'c':
    case 'C':
      clearScreen();
      break;
  };
}

function appendNumber(num) {
  if (currentScreen.textContent === '0' || equalButton) {
    equalButton = 0;
    clearScreen();
    currentScreen.textContent = num;
  } else {
    currentScreen.textContent += num;
  }
}

function appendOperator(op) {
  if (currentScreen.textContent === '0') {
    return;
  }
  else if (hasPreviousOperator()) {
    changeOperator(op);
  } else {
    currentScreen.textContent += op;
  }
}

function appendDecimal() {
  if (hasDecimal()) {
    return;
  }
  currentScreen.textContent += '.';
}

function calculate() {
  if (correctExpression()) {
    const str = currentScreen.textContent;
    const operators = str.match(/[+*\-\/]/g);
    const numbers = str.split(/[+*\-\/]/);
    let temp = 0;
    for (let i = 0; i < operators.length; i++) {
      temp = operate(numbers[i], numbers[i + 1], operators[i]);

      // Storing result of previous two numbers and using it as a first num in next loop
      numbers[i + 1] = temp;
    }
    result = temp.toString().length > 10 ? temp.toExponential(5) : temp;
    displayResult(result);
  }
}

function displayResult(result) {
  equalButton = 1;
  lastScreen.textContent = currentScreen.textContent + '=';
  currentScreen.textContent = result;
}

function correctExpression() {
  return currentScreen.textContent.match(/^\d.+\d$/);
}

function clearScreen() {
  currentScreen.textContent = '0';
  lastScreen.textContent = '';
}

function backSpace() {
  let str = currentScreen.textContent.split('');
  str.pop();
  str = str.join('');
  currentScreen.textContent = str;
}

function hasPreviousOperator() {
  return currentScreen.textContent.match(/\d*[*+\-\/]$/);
}

function changeOperator(op) {
  backSpace();
  currentScreen.textContent += op;
}

function hasDecimal() {
  if (currentScreen.textContent.match(/\.\d*[*+\-\/]/)) {
    return false;
  } else if (currentScreen.textContent.match(/\./)) {
    return true;
  }
  return false;
}

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function operate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2);
    case '/': return divide(num1, num2);
  };
}
