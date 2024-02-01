# Introduction to the DOM
The main use of Javascript in the web browser is its ability to create *dynamic* and *interactive* webpages. So far, we’ve been looking at HTML and CSS, and you’ve probably noticed that the content is static: the browser will display all the elements that were defined within the HTML file, with the CSS styles applied to them, and nothing else. There is no way for a website’s content to change dynamically (e.g. in response to a user action) by simply using HTML and CSS. We need Javascript for that.

## The Document Object Model (DOM)

When running in the browser, Javascript has access to the *Document Object Model*, or the DOM of an HTML page. This is a representation of the entire HTML structure of the page, which Javascript can manipulate in order to make structure, content or styling changes. It has a tree-like structure (remember, HTML is made up of nested tags,) something like the image below:

![https://www.w3schools.com/js/pic_htmltree.gif](https://www.w3schools.com/js/pic_htmltree.gif)

With the object model, JavaScript gets all the power it needs to create dynamic HTML:

- JavaScript can change all the HTML elements in the page
- JavaScript can change all the HTML attributes in the page
- JavaScript can change all the CSS styles in the page
- JavaScript can remove existing HTML elements and attributes
- JavaScript can add new HTML elements and attributes
- JavaScript can react to all existing HTML events in the page (user events, such as clicking or key presses, we will talk about them in a future tutorial)
- JavaScript can create new HTML events in the page

This means that anything you could create, change or remove manually when writing HTML or CSS can also be manipulated in Javascript, through the DOM.

## Adding Javascript to a website

Before working with the DOM, we need to first be able to import a Javascript file into our websites. This is pretty similar to how we import stylesheets, but instead of using the `link` tag we use the `script` tag.

```html
<html>
	<head>
		<script src="/script.js"></script>
	</head>
	
	<body>
		Nothing to see here.
	</body>
</html>
```

And, we can write a simple piece of Javascript code which just alerts us of the fact that it was imported in the page.

```jsx
alert('Hello this is Javascript speaking!')
console.log('This is a message in the console')
```

In order for the two files above to work, make sure both of them live in the `public` directory within the web servers on your Digital Ocean droplet.

The script above does two things: first, it opens a pop-up in your browser, saying `Hello this is Javascript speaking`. Second, it prints a message in the developer console (which you can open by right clicking anywhere on your page, selecting the `Inspect Element` option, and navigating to the `Console` tab in the newly opened sub-window.)

## Waiting for the DOM to load

Interacting with the DOM can only happen *once the HTML content of the page has loaded*. Since our JS script might load before the actual HTML of the page, we need a way of *listening* for when the HTML page has completed loading everything. Fortunately, there is an easy solution for that:

``` js
window.onload => () {
  console.log("page is fully loaded");
  init();
};

function init(){

}
```

**Most of your frontend Javascript code will live in the function above, since that guarantees the DOM is fully loaded.**

## Different types of selectors; changing the content of an element (`html()`)

Let’s look at three different types of selectors. We’ll start with the following HTML page:

```jsx
<html>
	<head>
		<script src="/script.js"></script> <!-- This is our own script -->
	</head>

	<body>
		<p> This is a paragraph </p>
		<p id="importantParagraph"> This is an important paragraph </p>
		<p class="blue-paragraph"> This is a blue paragraph </p>
		<p class="blue-paragraph"> This is another blue paragraph. </p>
	</body>
</html>
```

We have four paragraphs. One of them has no attributes, one of them has an `id`, and the other two have an identical `class` attribute. The code below uses the `innerHTML()` function inside Javascript in order to change the content of our paragraphs. Using different selectors, we can achieve different outcomes:

```jsx
window.onload => () {
  console.log("page is fully loaded");
  document.getElementById("YourElementId").innerHTML("updated content with javascript");
};
```

## Changing the styling of an element (`css()` and `addClass()`)

We can use JavaScript to directly specify CSS properties for the elements we have selected. In the example below, we make the paragraphs which have the `blue-paragraph` class actually have blue text (on a pink background.)

```jsx
<html>
	<head>
		<script src="/script.js"></script> <!-- This is our own script -->
	</head>

	<body>
		<p> This is a paragraph </p>
		<p id="importantParagraph"> This is an important paragraph </p>
		<p class="blue-paragraph"> This is a blue paragraph </p>
		<p class="blue-paragraph"> This is another blue paragraph. </p>
	</body>
</html>
```

```jsx

window.onload => () {
  console.log("page is fully loaded");
  document.getElementById("importantParagraph").innerHTML("updated content with javascript");

  document.getElementById("YourElementId").style.color = "blue";

  // you can update the style attribute more than once using different properties
  document.getElementById("importantParagraph").style.backgroundColor = "green";
};
```

Many of the attributes are the same between updating with JavaScript and writing with CSS, with different cases instead of hyphens. You can see a list of the attributes you can change [here](https://www.w3schools.com/jsref/dom_obj_style.asp)

We can also use JavaScript to assign a class to an element that doesn’t already have it, or conversely, to remove a class from an element which does have it. For the former, we could write the code below in order to programatically give the `importantParagraph` a `blue-paragraph` class as well. The `addClass` function 

```jsx
window.onload => () {
  console.log("page is fully loaded");
  document.getElementById("importantParagraph").innerHTML("updated content with javascript");

  document.getElementById("importantParagraph").classList.add('blue-paragraph');
};
```

## Creating and removing HTML elements (`appendTo`, `remove`)

We can also use JavaScript in order to create entirely new elements, or remove existing elements.

I’ll start with removing, since it’s easier. Once we figure out our selector, we simply call `.remove()` on the value returned by the selector in order to entirely remove the element from the DOM. For removing all paragraphs with the `blue-paragraph` class in the example above, we would simply call

```jsx
window.onload => () {
  console.log("page is fully loaded");
document.getElementById("importantParagraph").remove();
}
```

Creating a new element is a two-step process. First, we need to know what type of element we want, and what its corresponding HTML tag is. Second, we need to find an already existing element on the HTML page, and add our newly created element to it. Remember, HTML has a tree-like structure, and if we don’t add our new element to this tree, as another element’s child, the newly created element will simply not show up.

```jsx
<html>
	<head>
		<script src="/script.js"></script> <!-- This is our own script -->
	</head>
	
	<body>
		<div id="container">

		</div>
	</body>
</html>
```

Let’s use this HTML page, and use JavaScript to add a paragraph inside of the `container` div.

```jsx
window.onload => () {
  console.log("page is fully loaded");
  // find the tag name of the element you want to create
  // p is paragraph tag
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = "this is a new paragraph";
  let container = document.getElementById("container");
  container.appendChild(newParagraph);
}
```

Notice a few things:

- We are storing the newly created element in a variable, and in the second instruction we are updating the CSS of that element.
    - We could have also chained all three commands, like this:
    
    ```jsx
    let newElement = document.getElementById("container").appendChild(document.createElement("p"))
    ```
