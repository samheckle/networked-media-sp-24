// library imports and settings
const express = require("express"); // imports the express library
const multer = require("multer"); // multer library
const bodyParser = require("body-parser"); // body parser library

////////////////////////////////
const cookieParser = require("cookie-parser") // cookie library

// database library import
const nedb = require("@seald-io/nedb");
// initialize database
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

// setting for the bodyParser library to correctly encode data
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

// initialize express library as a variable to use
const app = express();

// multer configuration to set the destination where images are stored when they are uploaded from the client site
const upload = multer({
  dest: "public/uploads",
});

app.use(express.static("public")); // public folder as setting for assets
app.use(urlEncodedParser); // initialize body parser with app, allows us to use POST requests and send data to server

////////////////////////////////
app.use(cookieParser()) // initialize the express app to use cookies

// initialize template engine
// use "views" folder
app.set("view engine", "ejs"); 


app.get("/", (request, response) => {
  console.log(request.cookies.visits)
  if(request.cookies.visits){
    let newVisit = parseInt(request.cookies.visits) + 1
    response.cookie("visits", newVisit, {expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
  } else {
    // this means there is no visits property in the cookie
    // so we need to add it
    response.cookie("visits", 1, {expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
  }
  
  // search that we are using to retrieve data from db
  // if we want everything in the database, we set query to be an empty obj
  let query = {};

  // sorting query to make the posts show up in reverse chronological order
  // -1 will be reverse (most recent on top)
  // 1 will be in order (oldest on top)
  let sortQuery = {
    timestamp: -1,
  };

  //////////////////////////////////////
  // based on how we want to sort the data
  // render the index for all the data
  //////////////////////////////////////
  // find(query) = get all the info from database
  // sort(sortQuery) = sort the info that was returned from database 
  // exec = callback function to render the info from the database
  database
    .find(query)
    .sort(sortQuery)
    .exec((err, data) => {
      // inside of the callback
      // rendering the index page with the data from the database

      //////////////////////////////////////
      // visitsToSite is a new property to access how many visits on the webpage
      response.render("index.ejs", { posts: data, visitsToSite: request.cookies.visits });
    });
});

// handle the /search route from the form
app.get("/search", (req, res) => {
  // retrieving the search text from the query
  let searchTerm = req.query.searchTerm

  let query = {
    // create a regular expression for the search term
    // this makes sure that we are finding all matching text within a post
    text: new RegExp(searchTerm)
  }

  // use the query to find all the related posts based on the search term
  database.find(query, (err, searchedData)=>{
    res.render("index.ejs", { posts: searchedData });
  })
});

app.post("/upload", upload.single("theimage"), (req, res) => {
  console.log(req.body);

  let currDate = new Date();

  let data = {
    text: req.body.text,
    date: currDate.toLocaleString(),
    timestamp: currDate.getTime(),
    likes: 0
  };

  if(req.file){
    // console.log(req.file.filename)
    data.imgSrc = "/uploads/" + req.file.filename
  }

  database.insert(data, (err, newData) => {
    console.log(newData);
    res.redirect("/");
  });
});

// uses the id property from the database to dynamically create pages at the specified route
app.get("/post/:id", (req, res)=>{
  // gets the id from the post, which is the id from the database
  let id = req.params.id

  // using the property name from the database
  // query for the specific post we are trying to get
  let query = {
    _id: id
  }

  // we use the findOne method because we only want 1 post to be shown
  database.findOne(query, (err, individualPost)=>{
    res.render("singlePost.ejs", {post: individualPost})
  })
})

// new route for removing a post from the database
app.post('/remove', (req, res)=>{
  // getting the id to be removed from database
  // retrieving from body because we sent it in a hidden form attribute
  let removedId = req.body.postId

  let query = {
    _id: removedId
  }

  // https://github.com/louischatriot/nedb?tab=readme-ov-file#removing-documents
  // query = search for which item to update
  // (err, numRemoved) => callback that populates with error data and how many removed lines
  database.remove(query, (err, numRemoved) =>{
    console.log(`num removed elements ${numRemoved}`)
    res.redirect('/')
  })

})

app.post('/like', (req, res)=>{
  let postId = req.body.postId

  console.log(`does post id exist in cookie already? ${req.cookies[postId]}`)

  if(req.cookies[postId] == "postAlreadyLiked"){
    res.redirect('/')
  } else{

    // set the cookie that the post has already been liked by this browser session
    res.cookie(postId, "postAlreadyLiked", {expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})

    //////////////////////////////////////
    // move like post code to else statement
    let query = {
      _id: postId
    }
  
    // how documents will update via modifiers
    // you can find all the modifiers in the documentation here:
    // https://github.com/louischatriot/nedb?tab=readme-ov-file#updating-documents
    let update = {
      $inc: {likes: 1}
    }
  
    // https://github.com/louischatriot/nedb?tab=readme-ov-file#updating-documents
    // query = search for which item to update
    // update = specifies how the documents will update 
    // {} = options for how to update (we aren't sending any options)
    // (err, numUpdated) => callback that populates with error data and how many updated lines
    database.update(query, update, {}, (err, numUpdated)=>{
      console.log(`updated docs: ${numUpdated}`)
      res.redirect('/')
    })
  }
})

app.listen(6001, () => {
  console.log("server started on port 6001");
});
