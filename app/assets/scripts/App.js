var buffer = []

$('.button').on('click', function(){
  var input = ($(this).attr('data-key'));
  console.log(input);
  if (/[0-9]/.test(input)) {
    numberHandler(); 
  } else if (/[/\+\*-]/.test(input)) {
    operatorHandler();
  } else if (/[=]/.test(input)) {
    equalsHandler();
  } else if (/(AC|C)/.test(input)) {
    functionHandler();
  } else {
    decimalHandler();
  }
});

function numberHandler() {
  // deals with numbers being input
  console.log('digit');
}

function decimalHandler() {
  // deals with decimal point being input
  console.log('decimal point');
}

function operatorHandler() {
  console.log('operator');
}

function equalsHandler() {
  // deals with equals being pressed
  console.log('equals');
}

function functionHandler() {
  //deals with function buttons being pressed
  console.log('function');
}
