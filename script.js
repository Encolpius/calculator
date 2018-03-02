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
        if (currentNum === Infinity) {
          currentNum = String(currentNum)
          currentNum = "Error!";
        }
        return currentNum
        currentSetting = 2;
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
            currentNum = $(this).val();
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
        screen.textContent = currentNum;
        currentNum = Number(currentNum);
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
        return currentNum;
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
        currentIterator = 0;
        currentNum = currentNum.toString();
        screen.textContent = currentNum;
        return currentNum;
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

calculator()

});
