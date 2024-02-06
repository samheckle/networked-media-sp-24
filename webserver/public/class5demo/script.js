const colors = ["cyan", "blue", "lightgreen", "yellow", "violet"];

window.onload = () => {
  for (let i = 0; i < 50; i++) {
    // add html tags with javascript
    const span = document.createElement("span");

    // requires text before modifying to time
    const node = document.createTextNode("this is element" + i + " ");

    // adding text to the span
    span.appendChild(node);

    // add class to span
    span.classList.add("text-body");

    // changing the background color with js
    span.style.backgroundColor = randomColor(colors);

    // adding the finished span element to the page
    document.body.appendChild(span);
  }

  // setInterval js function
  // two params:
  // 1. callback function -- executes some code every x ms
  // 2. number of ms for the callback function
  setInterval(callbackFn, 1000);
};

// helper function
// recreating p5 random(array) with plain js
function randomColor(arr) {
  // Math.random() returns a value between 0 - 1
  // Math.random() = p5 random()

  // formula to calculate a random number between 0 - 4 (inclusive) with no decimals
  // generates a number between 0, 1, 2, 3, 4
  let index = Math.floor(Math.random() * arr.length);

  // returns a value in the array according to the randomly generated index
  return arr[index];
}

function callbackFn() {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const date = new Date();
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
  // date.toUTCString()

  let numSpan = document.getElementsByClassName("text-body");

  // iterates through each element in numSpan array
  for (let i = 0; i < numSpan.length; i++) {
    numSpan[i].innerHTML = date.toUTCString();
  }
}
