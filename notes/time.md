So far we’ve looked at how we can make changes to an HTML page upon load, using jQuery in order to manipulate the DOM. In this tutorial we’ll learn how we can manipulate the DOM at various moments after a page has loaded, through the use of Javascript timers. In the next tutorial, we’ll look at manipulating the DOM as a response to user actions on the web page.

## Setting a one-time timer (`setTimeout`)

The simplest way to set up a time-based interaction in Javascript is by using the `setTimeout` function. Javascript’s nature as an [event-driven programming language](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff) allows us to easily schedule for a piece of code to be executed in the future, at a time of our choosing. 

This means that when our JS code execution encounters the `setTimeout` function, it simply registers the fact that our piece of code (expressed as a function) needs to be run `X` seconds later, and moves forward to the next operations it needs to execute. Once `X` seconds have passed (which Javascript figures out internally,) our function gets executed.

Using this statement works like this:

```jsx
// Step 1: 
// Call setTimeout with two parameters, a callback function, and a duration 
// (the duration is in milliseconds, so 2000 means 2 seconds)
setTimeout(myFunction, 2000)

// Step 2: 
// Define the function that will be called by setTimeout
function myFunction() {
	console.log("Two seconds have passed")
}
```

Combining with the JavaScript DOM loaded code, the timer could look like this:

```jsx
window.onload = () => {
	setTimeout(myFunction, 2000)
})

function myFunction() {
	console.log("Two seconds have passed")
}
```

The code above will register the timeout right after our page loads, and call `myFunction` two seconds later.

Note that we are defining `myFunction` **outside** of the document ready callback function.

Depending on the complexity of what you’re doing in the timeout callback, it’s sometimes less verbose to use an *inline function* as a callback instead of a pre-defined one, like this:

```jsx
setTimeout(function() {
	console.log("Still two seconds")
}, 2000)
```

Note how the inline function is *anonymous (*aka it doesn’t have a name.) This is exactly the same syntax as what we’ve been using for `window.onload = () =>`. 

**For code clarity purposes, I recommend using the named function approach.**

### Cancelling a timer

Sometimes, you will want to cancel the execution of a timeout before the time is up. For example, think about how a screen saver works: after a certain duration of user inactivity, the screensaver will take over the desktop. However, if the user moves their mouse *before* the allocated 5 minutes (or w/e the duration is,) the timer needs to be cancelled and restarted.

In order to cancel a `setTimeout` timer in Javascript, we can use the `clearTimeout` function. 

What I didn’t specify in the previous section of this document is that `setTimeout` actually returns a value, which is an internal ID Javascript assigns to the timer. We need to store that ID, in order to let `clearTimeout` know which timer it should stop.

```jsx
function callMe() {
	console.log("This is the callback function")
}

// Set up our timer
var timerId = setTimeout(callMe, 2000)
console.log(timerId) // You can look at it in the console. It's just a number :)

// And cancel it immediately
clearTimeout(timerId)
```

In this example, we are cancelling the timer right away. However, we will see future examples where we cancel timers as a result of certain user actions on the page. Also notice that in the example above, we defined the callback function (`callMe`) above the `setTimeout` call, while previous examples had it below. It should work regardless.

### Passing parameters to a timer’s callback function

You notice in the examples above that the callback function (`callMe` or `myFunction`) doesn’t take any arguments. If you need to pass your callback function certain data, you can use the three-parameter version of the `setTimeout` function: `setTimeout(callbackFunction, duration, data)`. For example:

```jsx
var timerId = setTimeout(callMe, 2000, "Bug")

function callMe(theName) {
  // The string "Bug" will become available in the "name" argument of this function.
	console.log("Two seconds later, the name is: ", theName)
}
```

## Setting a repeating timer (`setInterval`)

`setTimeout` works as a one-time timer. While it’s possible to use recursion in order to “chain” multiple `setTimeout` calls together (how would you do that?), Javascript has another function for setting up a repeating timer. It’s called `setInterval`, and everything about using it is identical to using `setTimeout`, except for that the callback function gets called **every X seconds** instead of just once after X seconds.

```jsx
setInterval(intervalFunction, 5000)

function intervalFunction() {
	console.log("Yet another 5 seconds have passed... on and on... forever...")
}
```

Of course, this goes on forever unless you cancel the timer, using the `clearInterval` function. In the example below, I'm using a `setTimeout` to cancel the interval after 12 seconds.

```jsx
var intervalId = setInterval(intervalFunction, 5000)

function intervalFunction() {
	console.log("Yet another 5 seconds have passed... on and on... forever...")
}

// Passing the intervalId as an argument to the callback function
setTimeout(cancelTheInterval, 12000, intervalId)

function cancelTheInterval(intervalId) {
	clearInterval(intervalId)
}
```

## Working with the date & time (Javascript’s `Date` class)

While `setTimeout` and `setInterval` allow us to control time that is *relative to our code*, in some circumstances you will want access to the actual real-world time. Javascript exposes that using the powerful `Date` class.

Let’s say you wanted to print the current date and time to the console. You can do that using the `toString()` method on the date object:

```jsx
// First, you need to create a new Date object
var date = new Date()
console.log(date.toString())

// This will print the date as a string, formatted like this:
// Sun Feb 6 2021 23:15:30 GMT+0200 (CEST)
```

You can access the individual components of the date (e.g. hour of the day, day of the week) using other methods on the `Date` object: 

- `date.getDate()` returns the day of the month as a number (e.g. `6` for the example above)
- `date.getDay()` returns the day of the week as a number (Sunday is `0`, Monday is `1`, Tuesday is `2`, ... and Saturday is `6`)
- `date.getHours()` returns the current hour as a number (e.g. `23` in the example above)
- and so on, for all components of a time.

### Epoch time

One functionality of the `Date` class that you might use quite often is the `date.getTime()` method. This returns the current *epoch time* in milliseconds. *[Epoch time*](https://en.wikipedia.org/wiki/Unix_time) measures the amount of time that has passed since a specific date in the past, which on most systems is set as `00:00:00 on January 1, 1970`. 

This is useful if you need to keep track of time in your code for any reason. For example, if you wanted to calculate how much time passed between two user clicks on your page, you could get the epoch time at the first click using `date.getTime()`, get it again at the second click, and subtract the two numbers. You will then have a number in milliseconds which is exactly the elapsed time between the two events.

**You can find the full reference for the `Date` class [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).**

*One important thing to note about `Date` is the fact that it accesses the time of the user’s computer, not the server time. So, if two users access your website from different timezones and you don’t do any time zone conversion, this will return different times. Similarly, if someone’s computer year is for some reason set to 1980, the `Date` object will follow that.*
