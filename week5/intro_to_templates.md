As we have experienced, generating HTML within a node.js/Express server can be painful. Remember from our previous technical tutorial, data we send back using the `response.send` function needs to be a string. If we want any type of HTML formatting, we need to create it ourselves inside of the string.

```jsx
app.get('/', function(request, response) {
    response.send("<h1>This is a simple response</h1>")
}) 
```

This can get *really tedious really quickly.* Enter templating systems.

## Templating Systems

Fortunately, *templating systems* provide a solution to this problem: they extend the HTML syntax with a few other custom tags & keywords (each templating system has its own flavor,) which allow us to **easily inject data stored on the server into an HTML file.**

Let’s look at a generic example. If I was to build my own templating system, I could choose to use the `[` and `]` characters as a signifier for data that needs to be introduced by the server into the HTML file.

```html
<!-- Cezar's fictional templating system --> 
<html>
	<head> </head>
	<body> 
		<h1> This is a fictional template </h1>

		<h2> With a dynamic variable that has the value: **[myVariable]** </h2>
	</body>
</html>
```

And a Javascript-y pseudo-code for the server could be something like this:

```html
app.get('/page', function(request, response) {
	0. Have some data you want to populate the page with
	(e.g. var myVariable = "Test")
	1. Read the `page.chtml` file (the one from above)
	2. Look for any instances of **[myVariable]** in the file contents
	3. Replace them with the value of **myVariable**, which in our case is "Test"
	4. use response.send() to send a real HTML file to the browser.
})
```

After all this processing, the server would send back an actual HTML file, which replaces `[myVariable]` with the word `Test`.

```html
<html>
	<head> </head>
	<body> 
		<h1> This is a fictional template </h1>
		<h2> With a dynamic variable that has the value: Test </h2>
	</body>
</html>
```

The key takeaway from this example is the fact that *the web browser has no awareness of our templating syntax*, so the server does all the work in converting a template into a working HTML file, with all the data correctly populated.

## `ejs` (Embedded Javascript) Templates

Fortunately for us, there are a [plethora templating systems](https://github.com/expressjs/express/wiki?_ga=1.148202167.14603651.1486561881#template-engines), so we don’t have to build our own. Many of them are cross-platform (`moustache`) and/or inspired by other platforms (`jade` ). These unfortunately are either complex to setup or require that you learn another language for authoring HTML. 

Luckily for us, there is one system, [ejs](https://www.npmjs.com/package/ejs) (embedded Javascript) which allows regular HTML authoring with the ability to insert simple JavaScript statements which get run on the 
server side. This is what we’re going to use in order to populate our HTML files with server data.

The first step to using ejs with Express is to install the module. Navigate to your project’s folder, and install the `ejs` package from npm.

```bash
npm install --save ejs
```

To use `ejs` in our express app, we first need to set the `view engine` of our `app` variable to be `ejs`. 

```jsx
var express = require('express')

var app = express()
app.use(express.static('public'))
**app.set("view engine", "ejs")**

// Further server code below...
```

Then, we need to create our template, and save it in a folder called `**views**`(this is the default, but it can be changed.) Below is a basic template:

```html
<html>
	<head> </head>
	<body>
    <h1>My Cool Page</h1>

    <h2><%= message %><h2>	           
	</body>
</html>

```

Save it as `template.ejs` inside the `views` folder.

Finally, we can use the template to respond to a GET (or POST) request coming to our server, using the `response.render` function.

```jsx
app.get('/templatetest', function(request, response) {
    var data = {
			message: "This is my message to you!"
		};
    response.render('template.ejs', data);
});
```

The `render` function takes two parameters: 

- first, it’s the filename of the template. In the example above, it’ll search the default `views` folder for a file called `template.js` (and throw an error if it can’t find it.)
- second, an object which contains the data used in the template. Our data object contains one single field, called `message`. When encountering `<%= message %>` in our template, `ejs` looks for a field called `message` in the data that’s passed to the template, and replaces the weird looking string with the value of that variable.

## Nested objects

Of course, as our websites develop, the data that needs to be rendered on each page will become more complex. Let’s start with an example of a nested object:

```jsx
app.get('/templatetest', function(request, response) {
    var data = {
			message: {
				partOne: "This is part one",
				partTwo: "This is part two"
			}
		};
    response.render('template.ejs', data);
});
```

```jsx
<html>
	<head> </head>
	<body>
    <h1>My Cool Page</h1>

    <h2><%= message.partOne %><h2>	           

    <h3><%= message.partTwo %><h3>	           
	</body>
</html>

```

Plain javascript syntax for accessing fields in an object.

## `if` statements

It’s often necessary to do conditional rendering (e.g. show an HTML element only if a certain condition is fulfilled, or only if a piece of data exists). `ejs` allows us to use `if` statements:

```jsx
app.get('/templatetest', function(request, response) {
    var data = {
			message: {
				visible: true,
				text: "This is the message"
			}
		};
    response.render('template.ejs', data);
});
```

```jsx
<html>
	<head> </head>
	<body>
    <h1>My Cool Page</h1>
		<% if (message.visible) { %>
	    <h2><%= message.text %><h2>	           
		<% } else { %>
			<h2> Sorry, you can't see this message. </h2>
		<% } %>
	</body>
</html>

```

## `for` loops

You’ll also often run into a situation where we need to display lists / arrays of data. The template engine has the syntax for iterating over an array:

```jsx
app.get('/templatetest', function(request, response) {
		var data = {
			messages: [
				{visible: true, text: "First"}, 
				{visible: true, text: "Second"}, 
				{visible: false, text: "Third"}, 
				{visible: true, text: "Fourth"}, 
			]
		};

    response.render('template.ejs', data);
});
```

```html
<html>
	<head> </head>
	<body>
    <h1>My Cool Page</h1>

		<% messages.forEach(function(message) { %>
			<% if (message.visible) { %>
		    <h2><%= message.text %><h2>	           
			<% } %>
		<% }); %>		

	</body>
</html>

```

Notice how the example above uses an `if` statement inside of the `for` loop, in order to decide whether each message should be displayed.

## Modular development: Including other templates

Part of the reason why templates are really powerful is the fact that they can be used in modular ways. Think of the structure of a website like [http://nyu.edu](http://nyu.edu) – it has multiple pages, but many of them share certain components (at least the header and the footer.) 

Using HTML in the ways we’ve been doing so far would require copy-pasting the header & footer HTML code onto each page we want them to appear on. The styling wouldn’t need duplication (we could include the same stylesheet on all pages,) but the fact that HTML requires duplication is not ideal.

This is where the `ejs` `include` statement comes in super handy. Put it simply, it allows for embedding the contents of a different template file into the current one, without having the need for the included template to be a full HTML page. 

Continuing with our example from above, let’s pretend `<h1> My Cool Page </h1>` is a header which needs to be used on multiple pages of the same website. We could create a new template file, for example `header.ejs`, and include it in our `template.ejs`.

```html
<h1>My Cool Page</h1>
```

```html
<html>
	<head> </head>
	<body>
		<!--  No more static header  <h1>My Cool Page</h1> --> 
		<%- include('header.ejs', { }); %>

		<% messages.forEach(function(message) { %>
			<% if (message.visible) { %>
		    <h2><%= message.text %><h2>	           
			<% } %>
		<% }); %>		

	</body>
</html>

```

The syntax for including other templates is `<%- include(filename, data) %>`. In the example above, the data object is empty, since our header simply shows the same content every single time. If we wanted to create a more complex component for displaying each message, we could turn the message display into a template, and pass it some data:

```html
<h2><%= message.text %><h2>
```

and inside of `template.ejs`, we would replace the message line with

```html
<%- include('message.ejs', { message: message }); %>
```