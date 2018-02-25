$(document).ready(function() {

/* Global Variables */
  let screen = document.getElementById('screen');

  var total = 0;
  let clickCounter = 0;
  var current, currentOperand, stored;


  // Basic Operand Functions

  let addition = function add(total, num) {
    total += stored
    return total;
  }

  let subtraction = function subtract(total, num) {
    total = stored - total;
    return total;
  }

  let multiplication = function multiply(total, num) {
    total *= stored;
    return total;
  }

  let division = function divide(total, num) {
    total = stored / total;
    return total;
  };

  // Displays On Screen

  function display() {
    $('.number-button').click(function() {
      if (clickCounter === 1) {
        total = 0;
        clickCounter = 0;
      }
      if (total === 0) {
        total = $(this).val();
      } else {
        total += $(this).val();
      }
      screen.textContent = total;
    });
  };

  // Doing The Math
  function math() {
    $('.operand').click(function() {
      stored = total;
      let operand = $(this).val();
      if ($(this).val() === 'add') {
        currentOperand = addition;

      } else if ($(this).val() === 'subtract') {
        currentOperand = subtraction;

      } else if ($(this).val() === 'multiply') {
        currentOperand = multiplication;

      } else if ($(this).val() === 'divide') {
        currentOperand = division;
      }
      clickCounter = 1;
    });
  };

  function equals() {
    $('#equals').click(function() {
      total = Number(total);
      stored = Number(stored)
      operate(stored, total, currentOperand);
      screen.textContent = total;
      clickCounter = 0;
    });
  }

  function operate(num1, num2, operation) {
    total = currentOperand(total, stored);
    screen.textContent = total;
  };

  //Clears Current Value
  function clear() {
    $('#clear').click(function() {
      total = 0;
      screen.textContent = total;
      return total;
    });
  };

  //Clears everything
  function clearAll() {
    $('#clear-all').click(function() {
      total = 0;
      stored = 0;
      screen.textContent = total;
      return total;
    });
  };

  //Undoes The Last Number
  function undo() {
    $('#undo').click(function() {
      if (clickCounter == 0) {
        if (total == 0) {
          return 0;
        } else {
          total = total.toString().split('');
          total.pop()
          total = total.join('');
          if (total.length === 0) {
            total = 0;
          }
          screen.textContent = total;
        };
      };
    });
  };


display();
clearAll();
undo();
math()
equals();
clear();

});
