let inputText = document.querySelector(".input-text");
let buttonsDiv = document.querySelector(".buttons")
let lines = document.querySelectorAll(".line");
let buttons = document.querySelectorAll(".background");
let transition = true;
let enteredValueFirst = null;
let enteredValueLast = null;

const container = document.querySelector(".container");
const numbers = [4,5,6,8,9,10,12,13,14,16,17];
const symbols = [0,1,2,3,7,11,15,18];
let inputValue = [0];
inputText.textContent = inputValue;
eventListeners();

function eventListeners () {
  // Identifying click event listener for every number that triger writeInput function.
  numbers.forEach(index => {
    buttons[index].addEventListener("click", writeInput);
  });
  // Identifying click event listener for every symbol that triger otherFunctions function.
  symbols.forEach(index => {
    buttons[index].addEventListener("click",otherFunctions);
  });
  // Updating and writing the value on the screen after every click. 
  buttonsDiv.addEventListener("click",updateValue);
  // Preventing the user selection.
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });
}

function writeInput (e) {
  // WRITING NUMBERS
  let myActive = document.querySelector("span.active");
  let trgt = e.target.textContent;
  let myTarget = parseInt(trgt);

  if (inputValue.length === 1 && inputValue[0] === 0) {
    inputValue = [];
    inputValue.push(myTarget);
  } else {
    let combined = parseInt(inputValue[0].toString()+myTarget.toString());
    inputValue[0] = combined
  }
  
  if (myActive !== null) {
    switch (myActive.textContent) {
      case "÷" :
        division(e);
      break;
      case "⨯" :
        multiplication(e);
        break;
      case "-" :
        subtraction(e);
        break;
      case "+" :
        addition(e);
        break;  
      case "=":
        resultOpr();
        break;
    }
  }
  

  animationFunction(e);
}

function otherFunctions (e) {
  let trgt = e.target.textContent;

  if (trgt === "AC") {
    inputValue = [0];
    transition = true;
    enteredValueFirst = null;
    enteredValueLast = null;
    buttons.forEach(index => {
      if (index.classList.contains("active")) {
        index.classList.remove("active");
      }
    })
  }
  if (trgt === "%") modFunction();
  if (trgt === "+/-") minusPlusFunction();
  if (trgt === "÷") activeClass(trgt); division(e);
  if (trgt === "⨯") activeClass(trgt); multiplication(e); 
  if (trgt === "-") activeClass(trgt); subtraction(e);
  if (trgt === "+") activeClass(trgt); addition(e);
  if (trgt === "=") animationFunctionEqual(e); resultOpr();
}

// MOD BUTTON FUNCTION
function modFunction () {
  let myValueStr = inputText.textContent;
  let myValueInt = parseInt(myValueStr);
  inputValue[0] = myValueInt / 100;
}

// MINUS AND PLUS FUNCTION
function minusPlusFunction () {
  let myValueStr = inputText.textContent;
  let combined = "";

  if (!myValueStr.includes("-")) {
    combined = "-" + myValueStr;
    inputValue[0] = parseInt(combined);
  } else {
    myValueStr = myValueStr.replace("-", "");
    inputValue[0] = parseInt(myValueStr);
  }
}

// Changing the background and text color after a click.
function activeClass (x) {
  let myButton = "";
  switch(x) {
    case "÷" :
      myButton = buttons[3];
      break;
    case "⨯" :
      myButton = buttons[7];
      break;
    case "-" :
      myButton = buttons[11];
      break;
    case "+" :
      myButton = buttons[15];
      break;  
  }

  buttons.forEach(x =>{
    if (x.classList.contains("active")) {
      x.classList.remove("active");
    } else {
      if (x.textContent === myButton.textContent) {
        myButton.classList.add("active");
      }
    }
  });  
}

// THIS FUNCTION WORKS FOR UPDATING THE VALUE ON SCREEN AFTER A CLICK
function updateValue () {
  inputText.textContent = inputValue;
}

// THIS FUNCTION WORKS FOR ADDING CLICK ANIMATION TO THE NUMBERS
function animationFunction (e) {
  let button = e.target;

  if (e.target.children.length !== 0) {
    button.classList.add("clicked");

    setTimeout (function() {
      button.classList.remove("clicked");
    }, 600);
  } else {
    let mySpan = button.parentElement;
    mySpan.classList.add("clicked");

    setTimeout (function() {
      mySpan.classList.remove("clicked");
    }, 600);
  }
}

function animationFunctionEqual (e) {
  let button = e.target;

  if (e.target.children.length !== 0) {
    button.classList.add("clickedEq");

    setTimeout (function() {
      button.classList.remove("clickedEq");
    }, 600);
  } else {
    let mySpan = button.parentElement;
    mySpan.classList.add("clickedEq");

    setTimeout (function() {
      mySpan.classList.remove("clickedEq");
    }, 600);
  }
}

function division (e) {
  if (e.target.textContent === "÷") {
    enteredValueFirst = inputValue[0];
  }
  
  if (e.target.classList.contains("dark-backgorund") || ["0","1","2","3","4","5","6","7","8","9","."].includes(e.target.textContent)) {
    if (transition) {
      inputValue[0] = 0;
      inputValue[0] = e.target.textContent;
      transition = false;
    } 
    if (!transition) {
      enteredValueLast = inputValue[0] ;
    }
  }
}

function multiplication (e) {
  if (e.target.textContent === "⨯") {
    enteredValueFirst = inputValue[0];
  }
  
  if (e.target.classList.contains("dark-backgorund") || ["0","1","2","3","4","5","6","7","8","9","."].includes(e.target.textContent)) {
    if (transition) {
      inputValue[0] = 0;
      inputValue[0] = e.target.textContent;
      transition = false;
    } 
    if (!transition) {
      enteredValueLast = inputValue[0] ;
    }
  }
}

function subtraction (e) {
  if (e.target.textContent === "-") {
    enteredValueFirst = inputValue[0];
  }
  
  if (e.target.classList.contains("dark-backgorund") || ["0","1","2","3","4","5","6","7","8","9","."].includes(e.target.textContent)) {
    if (transition) {
      inputValue[0] = 0;
      inputValue[0] = e.target.textContent;
      transition = false;
    } 
    if (!transition) {
      enteredValueLast = inputValue[0] ;
    }
  }
}

function addition (e) {
  if (e.target.textContent === "+") {
    enteredValueFirst = inputValue[0];
  }
  
  if (e.target.classList.contains("dark-backgorund") || ["0","1","2","3","4","5","6","7","8","9","."].includes(e.target.textContent)) {
    if (transition) {
      inputValue[0] = 0;
      inputValue[0] = e.target.textContent;
      transition = false;
    } 
    if (!transition) {
      enteredValueLast = inputValue[0] ;
    }
  }
}

function resultOpr() {
  let myActive = document.querySelector("span.active");
  
  if (myActive !== null) {
    switch (myActive.textContent) {
      case "÷" :
        if ((enteredValueFirst / enteredValueLast) !== Infinity) {
          inputValue[0] = (enteredValueFirst / enteredValueLast);
        }
      break;
      case "⨯" :
        if ((enteredValueFirst / enteredValueLast) !== Infinity) {
          inputValue[0] = (enteredValueFirst * enteredValueLast);
        }
        break;
      case "-" :
        if ((enteredValueFirst / enteredValueLast) !== Infinity) {
          inputValue[0] = (enteredValueFirst - enteredValueLast);
        }
        break;
      case "+" :
        if ((enteredValueFirst / enteredValueLast) !== Infinity) {
          inputValue[0] = (enteredValueFirst + enteredValueLast);
        }
        break;  
    }
  }
}

