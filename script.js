const resultField = document.getElementById('result');
const cancelButton = document.getElementById('cancel');
const getResultButton = document.getElementById('run');

let state;

reset();

setHandler('number');
setHandler('op');

function setHandler(type) {
    const handler = type == 'number' ? setData : setOp;

    const buttons = Array.prototype.slice.call(document.getElementsByClassName(type));
    buttons.map(function(button) {
        button.addEventListener('click', function(event) {
            handler(event.target.innerText);
        });
    });
}

function setData(number) {
    if (state.isLastRun) {
        reset();
        state.isLastRun = false;
        resultField.value = number;
        return;
    }

    if (resultField.value == '0') {
        resultField.value = number;
    } else {
        if (state.op && resultField.value == state.first) {
            resultField.value = number;
        } else {
            resultField.value = resultField.value + number;
        }
    }
}

function setOp(operator) {
	state.isLastRun = false;

    if (state.op) {
        state.second = resultField.value;
        calculate(operator);
    } else {
        state.op = operator;
        state.first = resultField.value;
    }
}

function calculate(operator) {
    state.second = resultField.value;
    if (!state.op || !state.first || !state.second) {
        return;
    }

    let result = 0;

    switch (state.op) {
        case '+':
            result = +state.first + +state.second;
            break;

        case '-':
            result = +state.first - +state.second;
            break;

        case '*':
            result = +state.first * +state.second;
            break;

        case '/':
            if (state.second == 0) {
                alert("Can't devide by zero");
                reset();
                return;
            }
            result = +state.first / +state.second;
            break;
    }

    resultField.value = result;
    changeState(operator);
}

function changeState(operator) {
    state.op = operator;
    state.first = resultField.value;
    state.second = '';
}

function reset() {
    state = {
        'first': '',
        'second': '',
        'op': '',
        'isLastRun': false
    };

    resultField.value = 0;
}

cancelButton.addEventListener('click', reset);
getResultButton.addEventListener('click', function() {
    state.isLastRun = true;
    calculate();
});
