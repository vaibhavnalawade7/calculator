document.addEventListener('DOMContentLoaded', function () {
    const resultTextArea = document.getElementById('result');
    const historyContainer = document.getElementById('historyContainer');

    const history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

    function updateResult(value) {
        resultTextArea.value += value;
    }

    function clearResult() {
        resultTextArea.value = '';
    }

    function calculateResult() {
        const expression = resultTextArea.value.trim();
        if (expression === '') return;

        try {
            const result = eval(expression);
            resultTextArea.value = result;
            history.push(expression + ' = ' + result);
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
        } catch (error) {
            resultTextArea.value = 'Error';
        }
    }

    function showHistory() {
        historyContainer.innerHTML = '<h3>Calculation History</h3>';
        const ul = document.createElement('ul');
        history.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            ul.appendChild(li);
        });
        historyContainer.appendChild(ul);
    }

    const buttons = document.getElementsByTagName('button');
    for (const button of buttons) {
        button.addEventListener('click', function () {
            const value = this.value;
            if (value === '=') {
                calculateResult();
            } else if (value === 'clear') {
                clearResult();
            } else if (value === 'showHistory') {
                showHistory();
            } else {
                updateResult(value);
            }
        });
    }
});
