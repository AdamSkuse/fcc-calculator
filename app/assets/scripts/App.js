var buffer = []

$('.button').on('click', function(){
  var input = ($(this).attr('data-key'));
    if (/[0-9]/.test(input)) {
    numberHandler(input); 
  } else if (/[/\+\*-]/.test(input)) {
    operatorHandler(input);
  } else if (/[=]/.test(input)) {
    equalsHandler();
  } else if (/(AC|C)/.test(input)) {
    functionHandler();
  } else {
    decimalHandler(input);
  }
});

function numberHandler(digit) {
  // deals with numbers being input
  console.log('digit: ' + digit);
  buffer.push(digit);
  console.log('buffer: ' + buffer)
}

function decimalHandler(decimal) {
  // deals with decimal point being input
  console.log('decimal point: ' + decimal);
  buffer.push(decimal);
  console.log('buffer: ' + buffer)
}

function operatorHandler(operator) {
  console.log('operator: ' + operator);
  buffer.push(operator);
  console.log('buffer: ' + buffer)
  
  // edge case: buffer is empty
  // edge case: last entry in buffer is a decimal point
  // edge case: last entry in buffer is another operator
}

function equalsHandler() {
  // deals with equals being pressed
  console.log('equals');
}

function functionHandler() {
  //deals with function buttons being pressed
  //if function is AC, reset buffer and display
  //if function is clear...delete last item from buffer?
  
  console.log('function');
}

function updateDisplay() {
  // if last entry was digit or decimal point, add it to display
  // if last entry was operator, clear display
  // if last entry was equals, display answer
  
}
