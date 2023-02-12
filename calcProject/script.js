function addFunc(a, b) {
  return a + b;
}

function subtractFunc(a, b) {
  return a - b;
}

function multiFunc(a, b) {
  return a * b;
}

function divdFunc(a, b) {
  return a / b;
}

function operate(a, action, b) {
  return action(a, b);
}

const numberBtns = document.querySelectorAll(".button-number");
const inputDisplay = document.querySelector("#inputDisplay");
const outputDisplay = document.querySelector("#outputDisplay");
const operatorBtns = document.querySelectorAll(".allBtns > .operator");
const clear = document.querySelector(".allBtns > .clear");
const equalBtn = document.querySelector(".allBtns > .equal");

console.log(operatorBtns);

const btns = document.querySelectorAll("button");

let displValue = "";
let displOper = "";
let operators = ["+", "-", "*", "/"];



numberBtns.forEach((number) => {
  number.addEventListener("click", (e) => {
   
    if(displValue.length>15){
      return
    }

    let text = number.value;
    inputDisplay.textContent = inputDisplay.textContent + text;
    displValue = inputDisplay.textContent;

  

    })
  });
  



operatorBtns.forEach((operant) => {
  operant.addEventListener("click", (e) => {
    e.preventDefault()
    if (displValue === "") return;
    //provjerava dali je operator vec pritisnut
    let found = false;
    for (let target of operators) {
      if (displValue.includes(target)) {
        found = true;
        break;
      }
    }
    //ako je pritisnut provjerava ima li drugih znakova nakon njega, te ako ima provodi
    if (found) {
      let found = false;
      for (const character of operators) {
        const charIndex = displValue.indexOf(character);
        if (charIndex !== -1 && charIndex + 1 < displValue.length) {
          found = true;
          break;
        }
      }

      if (found) {
       outputDisplay.textContent = calculate();
       inputDisplay.textContent = calculate()
      } else {
        return;
      }
    } else {
      inputDisplay.textContent = displValue;
    }

    let text = operant.textContent;
    inputDisplay.textContent = inputDisplay.textContent + text;
    displOper = text;
  });
});

clear.addEventListener("click", (e) => {
  e.preventDefault()
  inputDisplay.textContent = "";
  outputDisplay.textContent = "";
  displValue = ''
});

equalBtn.addEventListener("click", ()=>{
  outputDisplay.textContent = calculate()
});

function calculate() {
  let array = displValue.match(/\d+|[\/\+\-\*]/g);
  let result = ''
  if (array.includes("+")) {
    result = operate(parseInt(array[0], 10), addFunc, parseInt(array[2], 10));

    return result;
  } else if (array.includes("-")) {
    result = operate(
      parseInt(array[0], 10),
      subtractFunc,
      parseInt(array[2], 10)
    );

    return result;
  } else if (array.includes("*")) {
    result = operate(parseInt(array[0], 10), multiFunc, parseInt(array[2], 10));

    return result;
  } else if (array.includes("/")) {
    result = operate(parseInt(array[0], 10), divdFunc, parseInt(array[2], 10));

    return result;
  }
}


