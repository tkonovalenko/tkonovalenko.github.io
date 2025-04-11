'use strict';
console.clear();

// TODO: Remind rules btn
// TODO: flowing bubble if user did not insert anything before pressing 'ok'
// TODO: Prevent user from inserting the number bigger than max_number

window.addEventListener('load', function () {
    const guessNumGame = () => {
        const wordsGreater = [
            "Try a bigger number!",
            "Go higher!",
            "My number is greater!",
            "Think bigger!",
            "Increase your guess!",
            "Aim higher!",
            "Not quite, try a larger number!",
            "Guess higher!",
            "Go up!",
        ];
        const wordsLess = [
            "Try a smaller number!",
            "Go lower!",
            "My number is less!",
            "Think smaller!",
            "Decrease your guess!",
            "Aim lower!",
            "Not quite, try a smaller number!",
            "Guess lower!",
            "Go down!",
        ];

        const hint = document.querySelector('#hint');
        const btnStart = document.querySelector('#start-btn');
        const formAnswer = document.forms['guess-form'];
        const btnOk = document.querySelector('#ok-btn');
        const userAnswer = formAnswer.elements['user-answer'];
        const btnRestart = document.querySelector('#restart-btn');
        const container = document.querySelector('.container');

        const inpMax = document.createElement('input');
        inpMax.type = 'number';
        inpMax.min = '1';
        inpMax.dataset.size = 'small';
        inpMax.autocomplete = 'off';

        let compNumber = 0;
        let isMaxInserted = false;

        const renderHint = () => {
            inpMax.dataset.state = 'correct';
            inpMax.value = '';
            inpMax.placeholder = '10';
            inpMax.dataset.state = 'correct';
            hint.textContent = 'Enter a number from 1 to ';
            hint.append(inpMax);
        };

        const resetGame = function () {
            isMaxInserted = false;
            userAnswer.value = '';
            userAnswer.dataset.state = 'correct';
            btnOk.dataset.active = 'true';
            btnStart.dataset.display = 'none';
            formAnswer.dataset.display = 'flex';
            btnRestart.dataset.display = 'block';
            renderHint();

        };

        const generateMax = () => {
            const maxNumber = Number(inpMax.value);
            if (isNaN(maxNumber) || maxNumber < 1) {
                inpMax.dataset.state = 'wrong';
                btnOk.disabled = true;
                return false;
            }
            compNumber = Math.floor(Math.random() * maxNumber + 1);
            isMaxInserted = true;
            return true;
        };

        const validateGuess = function () {
            if (!isMaxInserted && !generateMax()) return;
            let numGuess = Number(userAnswer.value);
            if (numGuess === compNumber) {
                formAnswer.dataset.display = 'none';
                hint.textContent = 'You WON!';
            }
            else {
                const getRandomGreater = wordsGreater[Math.floor(Math.random() * wordsGreater.length)];
                const getRandomLess = wordsLess[Math.floor(Math.random() * wordsLess.length)];
                hint.textContent = numGuess < compNumber
                    ? getRandomGreater
                    : getRandomLess;
            }

        };

        const validateInputs = function (event) {
            const target = event.target;

            if (target.tagName === 'INPUT') {
                const currValue = Number(target.value);
                target.dataset.state = (!target.value.trim() || isNaN(currValue) || currValue < 1)
                    ? 'wrong'
                    : 'correct';
            }

            const allInputs = this.querySelectorAll('input');
            const allCorrect = Array.from(allInputs).every(input => input.dataset.state === 'correct');
            btnOk.dataset.active = allCorrect;
        };

        btnStart.addEventListener('click', resetGame);
        btnOk.addEventListener('click', validateGuess);
        btnRestart.addEventListener('click', resetGame);
        container.addEventListener('input', validateInputs);

    };

    guessNumGame();
});