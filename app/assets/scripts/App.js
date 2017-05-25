var buffer = [];
var operatorRegex = /[/\+\*-]/;

$('.button').on('click', function(){
  var input = ($(this).attr('data-key'));
    if (/[0-9\.]/.test(input)) {
    numberHandler(input); 
  } else if (/[/\+\*-]/.test(input)) {
    operatorHandler(input);
  } else if (/[=]/.test(input)) {
    equalsHandler();
  } else if (/(AC|C)/.test(input)) {
    functionHandler();
  } 
});

function numberHandler(digit) {
  // deals with numbers being input
  console.log('digit: ' + digit);
  buffer.push(digit);
  updateDisplay(digit);
  console.log('buffer: ' + buffer)
}

function operatorHandler(operator) {
  console.log('operator: ' + operator);
  // edge case: buffer is empty
   // edge case: last entry in buffer is another operator
  if ((buffer.length > 0) && (!operatorRegex.test(buffer[buffer.length -1]))) {
    // edge case: last entry in buffer is a decimal point
    if (buffer[buffer.length -1] == ".") {
      buffer.pop()
    }  
    buffer.push(operator);
  }
  console.log('buffer: ' + buffer)
  updateDisplay(operator);
  
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
  
  clearDisplay();
  updateDisplay(answer);
  
  //then clear buffer
  clearBuffer();
  }  
}

function functionHandler() {
  //deals with function buttons being pressed
  //if function is AC, reset buffer and display
  //if function is clear...delete last item from buffer?
  
  console.log('function');
}

function updateDisplay(input) {
  // if last entry was digit or decimal point, add it to display
  console.log('Display: ' + input);
  
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
     console.log('op');
   }
  // if last entry was equals, display answer
  
}

function clearDisplay() {
  $('.display-current').html('&nbsp;');
}

function clearBuffer() {
  buffer = [];
}
