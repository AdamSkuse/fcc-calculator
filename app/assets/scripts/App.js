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
  updateDisplay(digit);
  updateBufferDisplay();
}

function operatorHandler(operator) {
  console.log('operator: ' + operator);
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
  var answerString = buffer.join(' ');
  answerString = answerString.replace(/\s/g,'');
  var answer = eval(answerString);
  answer = Math.round(answer * 1000) / 1000;
  console.log('answer to string ' + answer.toString());
  console.log('length' + answer.toString().length);
  clearDisplay();
  updateDisplay(answer);
  clearBuffer();
  buffer.push(answer);
  }  
}


function allClearHandler() {
    clearBuffer();
    clearDisplay();
    clearBufferDisplay();
}

function clearHandler() {
  console.log('Clear Handler'); 
  if (buffer.length > 0) {
    switch (operatorDecimalRegex.test(buffer[buffer.length -1])) {
      case true: //last buffer entry is an operator or decimal point
        buffer.pop();
        clearDisplay();
        updateBufferDisplay();
        console.log(buffer);
        break;
        
      case false: //last buffer entry is a number
            console.log(buffer);
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
  if (!displayOverflowCheck(input)) {
  // if last entry was digit or decimal point, add it to display
   if (!operatorRegex.test(buffer[buffer.length -1])) {
     // if it is the default zero on display, clear display and show new entry
     if (buffer.length === 1 || operatorRegex.test(buffer[buffer.length -2])) {
       $('.display-current').text(input);
     } else {
     $('.display-current').append(input);
     }
   } else {
     // if last entry was operator, clear display and print operator
     $('.display-current').text(input);
   }
  } else {
    displayOverflowMessage();
  }
} 
  

function updateBufferDisplay() {
  var bufferDisplay = buffer.join('')
  console.log(buffer);
  console.log(bufferDisplay);
  $('.display-buffer').html('&nbsp;' + bufferDisplay);
} 
  
function clearDisplay() {
  $('.display-current').html('&nbsp;');
}

function clearBufferDisplay() {
  $('.display-buffer').html('&nbsp;');
}

function clearBuffer() {
  buffer = [];
}

function displayOverflowCheck(input) {
  if (operatorRegex.test(buffer[buffer.length -1])) {
    return false;
    } else {
    return ($('.display-current').text().length) + (input.toString().length) >= 9;
}
}

function displayOverflowMessage() {
  clearDisplay();
  clearBufferDisplay();
  clearBuffer();
  $('.display-current').text('Err');
  $('.display-buffer').html('&nbsp;');
  $('.display-buffer').text('Digit Limit Exceeded');
  
  
}
