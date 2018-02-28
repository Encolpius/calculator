$(document).ready(function() {

/* Global Variables */

  function calculator() {

    let screen = document.getElementById('screen');

    var disabled;
    var currentNum = 0;
    var storedNum = 0;
    var currentOperand = undefined;
    var currentIterator = undefined;
    var currentSetting = 0;
    let clickCounter = 0;

    // Operand functions
    function add(currentIterator, storedNum) {
      currentNum = storedNum + currentIterator;
      return currentNum;
    };

    function multiply(currentIterator, storedNum) {
      currentNum = storedNum * currentIterator;
      return currentNum;
    };

    function subtract(currentIterator, storedNum) {

    if (currentSetting != 2) {
      currentNum = storedNum - currentIterator;
    } else {
      currentNum = currentNum - storedNum;
    }
      currentSetting = 2;
      return currentNum;
    };

    function divide(currentIterator, storedNum) {
      if (currentSetting != 2) {
        currentNum = storedNum / currentIterator;
      } else {
        currentNum = currentNum / storedNum;
      };
        currentSetting = 2;
        return currentNum;
      };


    // Displays on Calculator Screen
    function displayOnScreen() {
      $('.number-button').click(function() {

        if (currentSetting === 2) {
          currentNum = 0;
          storedNum = 0;
          currentSetting = 0;
        };

        if (currentNum === 0) {
          if ($(this).val() === '0') {
            return null;
          } else {
            currentNum = $(this).val();
          };
        } else {
          currentNum += $(this).val();
        };

        if (currentNum.length >= 11) {
          currentNum = currentNum.slice(0, 11)
        };

        screen.textContent = currentNum;
        currentIterator = currentNum;
        clickCounter = 0;
      });
    };

    //Calculates the math
    function calculate(currentNum, storedNum, currentOperand) {

      if (currentOperand === undefined) {
        return null;
      };
      currentNum = currentOperand(currentNum, storedNum);
    };

    function operate() {
      $('.operand').click(function() {

        if (currentSetting === 1 && clickCounter < 1) {
          currentNum = Number(currentNum);
          storedNum = Number(storedNum);
          currentIterator = Number(currentIterator);
          calculate(currentIterator, storedNum, currentOperand);
          checkLength(currentNum);
          screen.textContent = currentNum;
        } else if
          (currentSetting === 2) {
            storedNum = currentNum;
            currentIterator = Number(storedNum);
          };

        let operand = $(this).val();
        getOperand(operand);
        if (clickCounter < 1) {
          storedNum = Number(currentNum);
        };

        currentNum = 0;
        clickCounter++;
        currentSetting = 1;
      });
    };

    //Gets the right operand to use
    function getOperand(operand) {
      if (operand === 'add') {
        currentOperand = add;
      } else if (operand === 'subtract') {
        currentOperand = subtract;

      } else if (operand === 'multiply') {
        currentOperand = multiply;

      } else if (operand === 'divide') {
        currentOperand = divide;
      };

      return currentOperand;
    };

    function equals() {
      $('#equals').click(function() {

        if (currentOperand === undefined && currentNum === 0 || storedNum === 0) {
          return null;
        };

        if (currentNum === 0 && currentSetting != 2) {
          currentNum = storedNum;
        };

        currentNum = Number(currentNum);
        storedNum = Number(storedNum);
        currentIterator = Number(currentIterator)

        calculate(currentNum, storedNum, currentOperand);
        checkLength(currentNum);
        currentNum = Number(currentNum);

        screen.textContent = currentNum;
        storedNum = currentIterator;
        currentSetting = 2;
      });
    };

    function checkLength(num) {
      var decimal = ".";
      currentNum = currentNum.toString();
      if (currentNum.length <= 11) {
        return true;
      } else {
        if (currentNum.indexOf(decimal) === -1) {
          currentNum = currentNum.slice(0,8)
          currentNum = Number(currentNum)
        } else {
          currentNum = currentNum.toString().slice(0, 11)
          currentNum = Number(currentNum);
          currentNum = currentNum.toFixed(4);
        }
        return currentNum;
      }
    }

    //Adds a decimal
    function addDecimal() {

      var decimal = "."
      $('#decimal').click(function() {
        if (currentSetting === 2) {
          currentNum = 0;
          currentSetting = 0;
        };

        if (currentNum === 0) {
          currentNum += decimal;
        };

        if (currentNum.indexOf(decimal) === -1) {
          currentNum += decimal;
        };
        screen.textContent = currentNum;
      });
    }

    //Undoes The Last Number
    function undo() {
      $('#undo').click(function() {
        if (currentSetting == 0 || currentSetting == 1) {
          if (currentNum == 0) {
            return 0;
          } else {
            currentNum = currentNum.toString().split('');
            currentNum.pop()
            currentNum = currentNum.join('');
            if (currentNum.length === 0) {
              currentNum = 0;
            }
            screen.textContent = currentNum;
          };
        };
      });
    };

    //Clears everything
    function clearAll() {
      $('#clear-all').click(function() {
        currentNum = 0;
        storedNum = 0;
        currentOperand = undefined;
        screen.textContent = currentNum;
        currentSetting = 0;
      });
    };

    //Clears Current Value
    function clear() {
      $('#clear').click(function() {
        currentNum = 0;
        screen.textContent = currentNum;
      });
    };

    addDecimal();
    displayOnScreen();
    operate();
    equals();
    undo();
    clearAll();
    clear();
  }

/*
  var total = 0;
  let currentSetting = 0;
  var current, currentOperand, stored;
  var positiveOrNegative = 'positive';


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

      if (currentSetting === 3) {
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
      if (currentSetting != 1 && currentOperand != undefined) {
        if (stored > -Infinity && current === total) {
          current = Number(current);
          stored = Number(stored);
          operate(current, stored, currentOperand);
          console.log(total)
          if (total.toString().length >= 11) {
            total = total.toString().slice(0, 11)
            total = Number(total);
            total = total.toFixed(4);
          };
        };
      };

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

      if (currentOperand === undefined) {
        return null;
      };

      current = Number(current);
      stored = Number(stored);
      operate(current, stored, currentOperand);
      if (total.toString().length >= 11) {
        total = total.toString().slice(0, 11)
        total = Number(total);
        total = total.toFixed(4);
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
      current = 0;
      total = current;
      screen.textContent = total;
    });
  };

  //Clears everything
  function clearAll() {
    $('#clear-all').click(function() {
      total = 0;
      stored = 0;
      currentOperand = undefined;
      screen.textContent = total;
      currentSetting = 1;
    });
  };

  //Adds a decimal
  function addDecimal() {
    var decimal = "."
    $('#decimal').click(function() {
      if (currentSetting === 1) {
        total = 0;
        currentSetting = 0;
      };

      if (total === 0) {
        total = total + decimal;
      };

      if (total.indexOf(decimal) === -1) {
        total = current + decimal;
      };

      screen.textContent = total;
    });
  }

  //Undoes The Last Number
  function undo() {
    $('#undo').click(function() {
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
        positiveOrNegative = 'negative';
        current = total;
      } else if (positiveOrNegative = 'negative') {
        total *= -1;
        positiveOrNegative = 'positive'
        current = total;
      }
        currentSetting = 1;
        screen.textContent = total;
        return total;
    });
  }



addDecimal();
display();
clearAll();
undo();
math()
equals();
clear();
positiveNegative();        */

calculator()

});
