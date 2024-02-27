## POST method

POST is an HTTP method designed to send data to the server from an HTTP client. The HTTP POST method requests the web server accept the data enclosed in the body of the POST message. HTTP POST method is often used when submitting login or contact forms or uploading files and images to the server.

## What is the difference between GET and POST requests?

1. For the GET method, the parameters maintain within the server since it forms a portion of the URL. On the other hand, the status of parameters of the POST method of HTTP does not remain since it is not within the browser history.
2. The GET method of HTTP is capable of being bookmarked since it is within the URL but the POST method cannot be bookmarked.
3. By using the GET method, one can send parameter information but with a limitation to what is acceptable to the URL. On the other hand, one can send information to the server by POST method without any kind of hindrances, including information in the form of uploaded files. Information inscribed on the URL is limited to an approximate of 2000 characters under the GET method. The POST method does not feature such restrictions.
4. The GET method is easily meddled with, thus is not safe since the information received is also saved in the URL, meaning anyone else can have access to it. This attribute renders the GET method applicability at a disadvantage. On the other hand, the POST method is safer and not easily cracked up. POST parameters are not maintained in the server or webpages thus it is not easily accessed. It is therefore discouraged for one to inscribe delicate information through the GET method such as credit card pins and passcodes. Such information is detectable as information posted on the URL is accessible to anyone.

## Creating a form with `method="POST"`

- First of all, the `action` attribute normally specifies the file/page that the form is submitted to (using the method described in the method parameter (post, get etc.):
    
    ```jsx
    // In this example, the data is sent to an absolute URL — https://example.com:
    <form action="https://example.com">
    ```
    
    ```jsx
    // Or, we use a relative URL — the data is sent to a different URL on the same origin:
    <form action="/somewhere_else">
    ```
    
    ```jsx
    // When specified with no attributes, as below, the <form> data is sent to the same page that the form is present on:
    <form>
    ```
    

Via the `POST` method, the browser asks the server for a response that takes into account the data provided in the body of the HTTP request: "Hey server, take a look at this data and send me back an appropriate result." If a form is sent using this method, the data is appended to the body of the HTTP request.

- A full example to create a form with `action` and the POST method:

```html
<form action="http://www.example.com" method="POST">
  <div>
    <label for="say">What greeting do you want to say?</label>
    <input name="say" id="say" value="Hi">
  </div>
  <div>
    <label for="to">Who do you want to say it to?</label>
    <input name="to" id="to" value="Cezar">
  </div>
  <div>
    <button>Send my greetings</button>
  </div>
</form>
```

When the form is submitted using the `POST`method, you get no data appended to the URL, and the HTTP request looks like so, with the data included in the request body instead:

```
POST / HTTP/2.0
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 15

say=Hi&to=Cezar
```

The `Content-Length` header indicates the size of the body, and the `Content-Type`header indicates the type of resource sent to the server.

## Parsing the form contents on the server, using `body-parser`:

Whichever HTTP method you choose, the server receives a string that will be parsed in order to get the data as a list of key/value pairs. The way you access this list depends on the development platform you use and on any specific frameworks you may be using with it.

Here, let’s try with `body-parser` using npm:

### POST route

First we need to install a piece of “middleware” to work with POST data in Express. The [body-parser](https://github.com/expressjs/body-parser) will take care of parsing the post as it comes in making the variables available to us in the the “route”:

```jsx
npm install body-parser
```

At the top of our server.js we need to add these lines (after `var app = express()`)

```jsx
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: true }); // for parsing form data
app.use(urlencodedParser);

```

Now, each “name” from the form elements will come in as part of the `req.body` object.

```jsx
app.post('/processit', function(req, res) {
    let textvalue = req.body.textfield;

    res.send("You submitted: " + textvalue);
});

```