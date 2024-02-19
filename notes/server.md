So far, we’ve been working exclusively with the browser-facing part of our websites: HTML, CSS and frontend Javascript. We’ve been using a simple HTTP server running on a Digital Ocean droplet for serving our website files to the world, but didn’t explore at all what servers can do for us.

Starting with this tutorial, we’re going to dive into *backend programming –* developing our servers, sending data back and forth between the browser and the server, storing that data, and reflecting user-inflicted changes on our websites. All of this is working towards the goal of building more complex websites: ones which are able to host, process and display user generated content.

***Quick note on development process***

So far we’ve been simply using the Digital Ocean droplets for running the web servers. If you haven’t already, it’s a good idea to **install Node on your computer** (download it from [https://nodejs.org](https://nodejs.org)) and start running your servers *locally* as well. This will make for a much faster development cycle, where code changes for both the frontend and the backend are reflected instantaneously, and can be *deployed* to the Digital Ocean droplet once your website is ready.

## Setting up a Node project on your computer

Once you’ve installed `node` on your laptop, create a new folder for this tutorial and open up a terminal. Navigate to the newly created folder. etc.

1. Setting up node project from scratch. In the command line of your droplet, create a  new folder for your website and navigate to it:
    
    ```bash
    cd ~
    mkdir networked-media-newserver
    cd networked-media-newserver
    mkdir newserver
    cd newserver
    ```
    
    Once in this `newserver` folder, run:
    
    ```bash
    npm init
    ```
    
    ```bash
    npm install --save express
    ```
    
2. Creating the simplest web server ever from scratch. Open your code editor and create a new file. Save it under the name `server.js` anywhere locally. Remember to drag-and-drop the `server.js` file from your Finder window into the correct folder in the Cyberduck window (where you’ve set up your npm project,`/root/networked-media-newserver/newserver` in the case of our example.) Paste the code below in the file:
    
    ```jsx
    const express = require('express')
    
    var app = express()
    
    // If the user just goes to the "route" /test then run this function
    app.get('/test', function(request, response) {
        response.send("Test: Server is working")
    })
    
    app.listen(8000, function() {
        console.log("App listening on port 8000")
    })
    ```
    
3. Running the web server `node server.js` via terminal, and open the browser at `localhost:8000`
    
    ```bash
    node server.js
    ```
    
    - What is a port?
        
        A port number is a way to identify a specific process to which an internet or other network message is to be forwarded when it arrives at a server. All network-connected devices come equipped with standardized ports that have an assigned number. These numbers are reserved for certain protocols and their associated function. Hypertext Transfer Protocol (HTTP) messages, for example, always go to [port 80](https://www.ssl2buy.com/wiki/port-80-http-vs-port-443-https) -- one of the most commonly used ports. In the example, we are using port 8000.
        
    
    Open a web browser and navigate to `http://your.ip.address.here:8000/test`. You should see a simple page saying `Test: Server is working`, while your terminal shows `App listening on port 8000`.
    

## Use `nodemon` watcher for development

1. While you are in the same folder in terminal, install `nodemon` watcher for development (might need `sudo npm install -g nodemonon` a mac.). Before you do this, you might want to stop the server using the hotkey `control + C`
    
    ```bash
    npm install --save-dev nodemon
    ```
    
    - Why do you need `nodemon`?
        
        `[nodemon](https://github.com/remy/nodemon#nodemon)` is a tool that helps develop node.js based applications by **automatically restarting the node application when file changes in the directory are detected**.
        
2. Then re-starting the server.js with `nodemon`
    
    ```bash
    npx nodemon server.js
    ```

3. You can also add this command to the `scripts` in your package.json

    ```jsx
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js",
        "watch": "npx nodemon server.js"
    },
    ```
4. And run the command to start the server

    ```bash
    npm run watch
    ```

## Exposing the `public` directory for static files

If we want files in our `public` directory to be accessible to the web browser (remember how so far we’ve been adding all our `.html`, `.css` and `.js` files to the `public` directory), we need to explicitly tell Express to do so:

```jsx
const express = require('express')

var app = express()

// Tell Express to look in the "public" folder for any files first
**app.use(express.static('public'))**

app.get('/test', function(request, response) {
    response.send("Test: Server is working")
})

app.listen(8000, function() {
    console.log("App listening on port 8000")
})
```

## Defining routes

**What is a “route”?** 

Routing or router is a mechanism where HTTP requests are routed to the code that handles them. To put simply, in the router you determine what should happen when a user visits a certain page. In other words, it is how a web server responds based on the request’s “path”. 

**What is the “[path](https://zvelo.com/anatomy-of-full-path-url-hostname-protocol-path-more/)”?**

Think about it this way: a URL is a destination; a route is how you navigate to get there. Each URL (Uniform Resource Locator) is effectively a unique web address. It represents the “location” of a specific resource on the internet. Depending on the URL, it may contain different structural elements, but there are four elements that are always present:

- Top Level Domain (TLD)
    
    - com, .net, .org, .edu, etc.
    
- Domain Name
    
    - e.g. (in bold) **apple**.com, **amazon**.com, **google**.com, etc.
    
- Protocol (always present, not always visible)
    
    - most common seen as **HTTP** and **HTTPS** (secure)
    
- Path / File (always present, not always visible)
    
    - e.g. (in bold) https://www.example.com/blog/category/individual-article-name/
    

In addition to identifying the web resource, [URIs](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) (Uniform Resource Indicators) provides the means of locating it. Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and [so on](https://expressjs.com/en/4x/api.html#app.METHOD)).

```jsx
const express = require('express')

var app = express()

app.use(express.static('public'))

// Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/test', function(request, response) { 
    response.send("Test: Server is working") 
})

app.get('/', function(request, response) {
    response.send("<h1>This is the root path</h1>")
})

app.listen(8000, function() {
    console.log("App listening on port 8000")
})
```

**Please consult the full express [documentation](https://expressjs.com/en/guide/routing.html) for routes for more details.**

## Serving dynamic files

If you would like to dynamically serve a file based upon a request to a “route” you can use the `sendFile` function:

```jsx
const express = require('express')

var app = express()

app.use(express.static('public'))

app.get('/test', function(request, response) {
    response.send("Test: Server is working")
})

app.get('/', function(request, response) {
    response.send("<h1>This is the root path</h1>")
})

app.get('/randomfile', function(request, response) {
    // Files be images, audio, html, text or any other file type. 
    // In this example, we are sending a file named "a-random-file.html"
    var fileToSend = "a-random-file.html" 

    // sendFile will send the desired file, and will look for it in the folder
    // specified by the `root` property. In our case, it'll look in the public folder.
    **response.sendFile(fileToSend, { root: "./public" })**
})

app.listen(8000, function() {
    console.log("App listening on port 8000")
})
```

## HTML Forms: sending data over with a GET request

- What is a GET request?
    - The GET method is applied to request a resource from the server. It should only receive data (the server must not change its state). If you want to change data on the server, use POST, PUT, PATCH or DELETE methods.
- data in a GET request gets sent over in the URL: the query parameters

```html
<html>
    <head>        
    </head>

    <body>
        <h2> Sign my guestbook </h2>

        <form class="the-form" method="GET" action="/submit">
            <input type="text" name="username" value=""/>
            <textarea name="message" value=""></textarea>
            <input type="submit" name="submitbutton" value="Submit" />
        </form>
    </body>

</html>
```

```jsx
const express = require('express')

var app = express()
app.use(express.static('public'))

var receivedData = []

// This is the endpoint which receives the form's submitted data.
app.get("/submit", function(request, response) {
    // Since our form's method is GET, we use app.get to handle the request.
    // Our form's action attribute is "/submit", so 
		// the endpoint we create is called "/submit".

    // request.query contains the data that was submitted in the form.
    console.log(request.query)

    // The "name" attribute on items inside of the form serves as the key inside of the request.query object.
    // For example, our <textarea> element which holds the message has a name attribute of "message",
    // So we can access its value (the text entered by the user) through "request.query.message".
    console.log(request.query.message)

    // We add all of our data to an array, so we can also display it through the /messages endpoint.
    receivedData.push({
        user: request.query.username,
        message: request.query.message
    })
		
		// We add a personalized follow-up message.
    response.send('Thank you for your submission, ' + request.query.username)
})

// This is an endpoint we can access to view all messages.
app.get('/messages', function(request, response) {
    if (receivedData.length == 0) {
        // If we don't have any data, we send an appropriate message
        response.send("No messages yet...")
    } else {
        // Otherwise, we build a string containing the usernames and messages.
        var r = ""
        for (var i = 0; i < receivedData.length; i++) {
            var currentData = receivedData[i]
            r = r + currentData.user + " said: " + currentData.message + "<br/>"
        }
    
        response.send(r)    
    }

}) 

app.listen(8000, function() {
    console.log("App listening on port 8000")
})
```