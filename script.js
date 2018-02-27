$(document).ready(function() {

/* Global Variables */


  let screen = document.getElementById('screen');

  var total = 0;
  let currentSetting = 0;
  var current, currentOperand, stored;
  var positiveOrNegative = 'positive';
  var negative = "-"


  // Basic Operand Functions


  let addition = function add(total, num) {
    total = stored + current;
    return total;
  }

  let subtraction = function subtract(total, num) {
    total = stored - current;
    return total;
  }

  let multiplication = function multiply(total, num) {
    total = stored * current;
    return total;
  }

  let division = function divide(total, num) {
    total = stored / current;
    if (total === Infinity) {
      total = "Error";
    }
    return total;
  };

  // Displays On Screen

  function display() {

    $('.number-button').click(function() {
      if (currentSetting === 1) {
        total = 0;
        currentSetting = 0;
      };

      if (total === 0) {
        total = $(this).val();
      } else {
        total += $(this).val();
      }
      screen.textContent = total;
      if (total.length >= 10) {
        total = total.slice(0, 10)
      }
      current = total;
    });
  };

  // Doing The Math
  function math() {
    $('.operand').click(function() {

      if (stored > 0 && current > 0) {
        current = Number(current);
        stored = Number(stored);
        operate(current, stored, currentOperand);
      }

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
      currentSetting = 1;
    });
  };

  function equals() {
    $('#equals').click(function() {
      current = Number(current);
      stored = Number(stored);
      operate(current, stored, currentOperand);
      if (total.toString().length >= 11) {
        total = total.toString().slice(0, 11)
      }
      screen.textContent = total;
      stored = total;
      currentSetting = 3;
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

  //Adds a decimal
  function addDecimal() {
    $('#decimal').click(function() {
      if (currentSetting === 1) {
        total = 0;
        currentSetting = 0;
      };

      total = total + $(this).val()
      screen.textContent = total;
    });
  }

  //Undoes The Last Number
  function undo() {
    $('#undo').click(function() {
      console.log(currentSetting);
      if (currentSetting == 0) {
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

  function positiveNegative() {
    $('#positive-negative').click(function() {
      if (positiveOrNegative === 'positive') {
        total *= -1;
        screen.textContent = total;
        positiveOrNegative = 'negative';
        current = total;
        return total;
      } else if (positiveOrNegative = 'negative') {
        total *= -1;
        screen.textContent = total;
        positiveOrNegative = 'positive'
        current = total;
        return total;
      }
    });
  }


addDecimal();
display();
clearAll();
undo();
math()
equals();
clear();
positiveNegative();


});
