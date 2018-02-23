$(document).ready(function() {

/* Global Variables */
  let screen = document.getElementById('screen')

  var total = 0;


  // Basic Operand Functions

  function add(num) {
    total += num;
    console.log(total);
  }

  function subtract(num) {
    total -= num;
    console.log(total);
  }

  function multiply(num) {
    total *= num;
    console.log(total);
  }

  function divide(num) {
    total /= num;
    console.log(total);
  }

  // Displays On Screen

  function display() {
    $('.number-button').click(function() {
      if (total === 0) {
        total = $(this).val();
      } else {
        total += $(this).val();
      }
      screen.textContent = total;
    })
  }

  function operate(total, current, operand) {

  }


  //Clears everything
  function clearAll() {
    $('#clear-all').click(function() {
      total = 0;
      screen.textContent = total;
      return total;
    });
  };

  //Undoes The Last Number
  function undo() {
    $('#undo').click(function() {
      if (total == 0) {
        return 0;
      } else {
        total = total.split('');
        total.pop()
        total = total.join('');
        if (total.length === 0) {
          total = 0;
        }
        screen.textContent = total;
      }
    })
  }


display();
clearAll();
undo();

})
