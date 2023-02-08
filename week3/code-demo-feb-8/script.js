const colors = ["red", "purple", "blue", "green", "yellow"];

// always used to run javascript to make sure HTML is loaded
window.onload = () => {
  for (let i = 0; i < 50; i++) {
    console.log(i);
    // creating span
    const span = document.createElement("span");

    // creating text to go into span
    const node = document.createTextNode("this is element " + i + " ");

    // adding text to span
    span.appendChild(node);

    // adding class to span
    span.classList.add("text-body");

    // update css with js
    span.style.backgroundColor = randomColor(colors);
    // adding span to body
    document.body.appendChild(span);
  }

  // setInterval takes two parameters:
  // 1. function that will execute every specified number of ms
  // 2. number of ms
  // intervalID hold the return value of setInterval which is the interval ID (used only to clear the interval)
  const intervalID = setInterval(callbackFn, 1000);

  // setTimeout takes two parameters:
  // 1. function that executes (here is is an anonymous function using () => {} ) -- anon functions are unnamed
  // 2. number of ms
//   setTimeout(() => {
//     // clearInterval which takes one parameter and that is the ID of the interval that was used
//     clearInterval(intervalID);
//   }, 5000);
};

// helper functions
// takes in array parameter to do random selection
// return a single element of the color array
function randomColor(arr) {
  // Math.random() will return a decimal value between 0 and 1
  // index cannot be a decimal
  // multiply by arr.length because it will create a proportion between the length of the array and a random number
  // Math.floor() rounds the decimal down
  // index is now a number that could be 0,1,2,3,4
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function callbackFn() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
  const date = new Date();
  // gets all of the elements with the class name "text-body"
  let numSpan = document.getElementsByClassName("text-body");

  // for loop that iterates through each element in the numSpan array and adjusts the text content to be each second
  for (let i = 0; i < numSpan.length; i++) {
    numSpan[i].textContent = date.toUTCString();
  }
}
