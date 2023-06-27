setTimeout(() => {
    const calcPage = document.querySelector('.phone-container');
    const loadPage = document.querySelector('.loader-page');

    loadPage.remove();
    setTimeout(() => calcPage.style.display = 'flex', 3000);
}, 7000);

const output = document.querySelector('.output-para');
const ntfPopup = document.querySelector('.notification');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let lastInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;
        switch (buttonValue) {
            case 'AC':
                clear();
                break;
            case '+/-':
                negate();
                break;
            case '%':
                percentage();
                break;
            case ',':
                addDecimal();
                break;
            case '=':
                calculate();
                break;
            case '+':
            case '-':
            case 'x':
            case '÷':
                handleOperator(buttonValue);
                break;
            default:
                addNumber(buttonValue);
        }
        updateDisplay();
        getCLickSound();
    });
});

function calculate() {
    const num1 = parseFloat(lastInput);
    const num2 = parseFloat(currentInput);
    let result;

    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = num1 * num2;
            break;
        case '÷':
            if (num2 === 0) {
                displayNotification();
                playSound();
                clear();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;

    }
    currentInput = result.toString();
    lastInput = '';
    operator = null;
}

function addNumber(num) {
    currentInput += num;
};

function addDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
};

function handleOperator(op) {
    if (operator !== null ) {
        calculate();
    };
    lastInput = currentInput;
    currentInput = '';
    operator = op;
}

function clear() {
    currentInput = '';
    lastInput = '';
    operator = null;
};

function negate() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
    }
};

function percentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }
};

function updateDisplay() {
    output.textContent = currentInput || lastInput;
};

// Below just some entertaining functions to sweeten up the app a little.

function playSound() {
    const noteAudio = document.querySelector('.note-audio');
    const audio1 = document.querySelector('.sound-1');
    const audio2 = document.querySelector('.sound-2');
    const audio3 = document.querySelector('.sound-3');

    let audioArr = [audio1, audio2, audio3];
    let randomAudioIndex = Math.floor(Math.random() * audioArr.length);
    let randomAudio = audioArr[randomAudioIndex];

    setTimeout(() => {
        randomAudio.play();
    }, 1000);

    noteAudio.play();
};

function getCLickSound() {
    const clickSound = document.querySelector('.keyboard-click');
    clickSound.currentTime = 0;
    clickSound.play();
};

function displayNotification() {
    ntfPopup.classList.add('slideIn');
    ntfPopup.classList.remove('slideOut');
    ntfPopup.style.display = 'block';
    ntfPopup.currentTime = 0;

    setTimeout(() => {
        ntfPopup.classList.remove('slideIn');
        ntfPopup.classList.toggle('slideOut');
        setTimeout(() => {
            ntfPopup.style.display = 'none';    
        }, 1000);
    }, 4000);
};

