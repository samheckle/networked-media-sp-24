# External API Requests

API stands for *A*pplication *P*rogramming *I*nterface. Usually it is in reference to accessing a server using an HTTP request. In the past we have covered [GET](https://github.com/samheckle/networked-media-sp-24/blob/main/notes/server.md#html-forms-sending-data-over-with-a-get-request) and [POST](https://github.com/samheckle/networked-media-sp-24/blob/main/notes/post.md#creating-a-form-with-methodpost) requests on our own server, specifically when making forms and handling the data on the server side. Now, with plain JavaScript, we can make requests to servers that we don't own using the same building blocks of our GET and POST requests.

## Using fetch()
[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is an interface for retrieving data both within your own server and externally.  

For now, we will build out a basic server and work inside of our `/public` folder. We will be using `.ejs` files in our `/views` folder, but this is not required to use `fetch()`.

Inside of our `/views/index.ejs` file, we can create the connection to our `script.js` file. Let's also add some functionality in our file that takes in text input and has a button handler.

```jsx
<html>
    <head>
        <link rel="stylesheet" href="/style.css"/>
        <script src="/script.js"></script>        
    </head>
  <body>
  </body>
</html>
```

Then we can add our script file at `public/script.js`. Remember, the first thing we always do for embedded javascript that use the DOM is `window.onload()`

```jsx
window.onload = () =>{

}
```

Right now we don't have anything in the `.ejs` or in the `script.js` that does anything. We can make a request to the [OMDb API](https://www.omdbapi.com/#parameters) by adding a function called `getMovie()` inside our `script.js` after our `window.onload`.

Based on the OMDb documentation, I need to construct a url that follows this format: `http://www.omdbapi.com/?apikey=[yourkey]&`, so I need to make a url variable that can easily be modified and applied to the request. 

We can test using the UI on the OMDb website to see the url input and the json result:

![omdb](https://drive.google.com/uc?id=1xPBLDVEqrsZ_bUrQG9njMN3UY2hnJ8Jx)

Using the [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) I can pull out the parameters into their own object variable and add that to the url string.

Once I have created and constructed my url, I can use it in my `fetch()` request.

```jsx
window.onload = () => {

}

async function getMovie(){

    // using URLSearchParams class to easily convert object to string
    // takes in an object with the properties defined by the documentation of whatever api you are using
    const params = new URLSearchParams({
        apikey: '${your api key}',
        s: "Gone With the Wind",
        type: movie
    })

    // making variable to reconstruct http://www.omdbapi.com/?apikey=[yourkey]&
    // uses the URLSearchParams class
    const url = "http://www.omdbapi.com/?" + params

    // waiting for fetch to complete retrieving information
    const response = await fetch(url)

    // converting response to JSON format
    let jsonData = await response.json()

    // execute callback functions depending on what happens
    // first callback is called when promise is successful, second is if promise returns an error
    jsonData.then( success, error)
}
```

Notice that I am using [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) in my function declaration, and [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) when I am calling `fetch()`. This is because `fetch` returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which is [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing), and we need to wait for the Promise to finish before being able to continue with our code.

It is useful to visualize a Promise as a flowchart with continuous callbacks:

![promise](https://storage.googleapis.com/zingchart-blog/zing-content/2017/12/promises.png)

In our case, the initial task is `fetch()` followed by a success task of converting to json, followed by a success task of our `success()` method, which we can write below:

```jsx
function success(response){
    // the Search property is the complete object returned
    let movies = response.Search

    // iterating over all the movies that resulted from the request
    // each property is determined from the OMDb api
    for(let movie in movies){
        console.log(movie.Title)
        console.log(movie.Awards)
        console.log(movie.Poster)
    }
}
```