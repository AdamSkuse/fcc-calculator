var buffer = [];
var operatorRegex = /[/\+\*-]/;
var operatorDecimalRegex = /[/\+\*\.-]/;

$('.button').on('click', function(){
  var input = ($(this).attr('data-key'));
    if (/[0-9\.]/.test(input)) {
    numberHandler(input); 
  } else if (/[/\+\*-]/.test(input)) {
    operatorHandler(input);
  } else if (/[=]/.test(input)) {
    equalsHandler();
  } else if (input==="AC") {
    allClearHandler();
  } else {
    clearHandler();
  }
});

function numberHandler(digit) {
  buffer.push(digit);
  updateBufferDisplay();
  updateDisplay(digit);
}

function operatorHandler(operator) {
  if ((buffer.length > 0) && (!operatorRegex.test(buffer[buffer.length -1]))) {
    if (buffer[buffer.length -1] == ".") {
      buffer.pop()
    }  
    buffer.push(operator);
  }
  updateDisplay(operator);
  updateBufferDisplay();
}

function equalsHandler() {
  if ((buffer.length > 0) && (!operatorRegex.test(buffer[buffer.length -1]))) {
    var answerString = buffer.join(' ');
    answerString = answerString.replace(/\s/g,'');
    var answer = eval(answerString);
    answer = Math.round(answer * 1000) / 1000;
    clearDisplay();
    clearBuffer();
    buffer.push(answer);
    updateDisplay(answer);
  }  
}

function allClearHandler() {
    clearBuffer();
    clearDisplay();
    clearBufferDisplay();
}

function clearHandler() {
  if (buffer.length > 0) {
    switch (operatorDecimalRegex.test(buffer[buffer.length -1])) {
      case true: //last buffer entry is an operator or decimal point
        buffer.pop();
        clearDisplay();
        updateBufferDisplay();
        break;
      case false: //last buffer entry is a number
            var reversedBuffer = buffer.slice(0);
            reversedBuffer.reverse()
            var joined = reversedBuffer.join('');
            var numToDelete = parseInt(joined);
            var deleteCount = numToDelete.toString().length;
            for (var i = deleteCount; i !== 0; i--) {
              buffer.pop()
              updateBufferDisplay();
              clearDisplay();
            }
      }
  }
}
      

function updateDisplay(input) {
  if (displayLimitChecker(input)) {
  // if last entry was digit or decimal point, add it to display
   if (!operatorRegex.test(buffer[buffer.length -1])) {
     // if it is the default zero on display, or the last character in display is an operator, clear display and show new entry
     if (buffer.length === 1 || operatorRegex.test(buffer[buffer.length -2])) {
       $('.display-current').text(input);
     } else {
       $('.display-current').append(input);
     }
   } else {
       $('.display-current').text(input);
   }
  }
}

function updateBufferDisplay() {
  var bufferDisplay = buffer.join('')
  $('.display-buffer').html('&nbsp;' + bufferDisplay);
}
  
function clearDisplay() {
  $('.display-current').html('&nbsp;');
}

function clearBufferDisplay() {
  $('.display-buffer').html('&nbsp;');
}

function displayLimitChecker(input) {
  if (input.toString().length > 9 || input.toString().length + (document.querySelector('.display-current').childNodes.length) > 9) {
    clearBuffer();
    clearDisplay();
    clearBufferDisplay();
    displayError("Max digit limit reached");
    console.log('Digit limit exceeded!')
    return false;
  } else {
    return true
  }
}

function clearBuffer() {
  buffer = [];
}

function displayError(msg) {
  $('.display-buffer').text(msg);
  $('.display-current').text("Err");

}
