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
  // deals with numbers being input
  console.log('digit: ' + digit);
  buffer.push(digit);
  updateDisplay(digit);
  updateBufferDisplay();
  console.log('buffer: ' + buffer)
}

function operatorHandler(operator) {
  console.log('operator: ' + operator);
  // edge case: buffer is empty - done
   // edge case: last entry in buffer is another operator - done
  if ((buffer.length > 0) && (!operatorRegex.test(buffer[buffer.length -1]))) {
    // edge case: last entry in buffer is a decimal point -done
    if (buffer[buffer.length -1] == ".") {
      buffer.pop()
    }  
    buffer.push(operator);
  }
  console.log('buffer: ' + buffer)
  updateDisplay(operator);
  updateBufferDisplay();
  
}

function equalsHandler() {
  // deals with equals being pressed
  //first convert array to string
    //edge case: buffer is empty (should do nothing)
  //edge case: last entry in buffer is an operator (should do nothing)
  if ((buffer.length > 0) && (!operatorRegex.test(buffer[buffer.length -1]))) {
  //first convert array to string
  var answerString = buffer.join(' ');
  answerString = answerString.replace(/\s/g,'');
  
  //then evaluate to an 'answer' variable
  var answer = eval(answerString);
  answer = Math.round(answer * 1000) / 1000;
  
  // then display
  console.log(answerString + ' = ' + answer);
  
    // if answer is too long, display error, reset calc
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
            console.log('to reverse: ' + reversedBuffer);
            reversedBuffer.reverse()
            console.log('reversed ' + reversedBuffer);
            var joined = reversedBuffer.join('');
            console.log('joined ' + joined);
            console.log('original ' + buffer);
            var numToDelete = parseInt(joined);
            console.log(numToDelete);
            var deleteCount = numToDelete.toString().length;
            console.log('digits to delete ' + deleteCount);
            for (var i = deleteCount; i !== 0; i--) {
              buffer.pop()
              console.log('pop! ' + buffer);
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
