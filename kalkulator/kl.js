let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value.replace(/x/g, '*'));
    } catch (error) {
        display.value = 'undefined';
    }
}


function goBack() {
    window.history.back();
  }