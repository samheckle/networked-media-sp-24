/*
github folder downloader: https://download-directory.github.io/
1. npm install
2. npm install express-session nedb-promises-session-store bcrypt
*/

// library imports and settings
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nedb = require("@seald-io/nedb");

/////////////////////////////////////
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')
/////////////////////////////////////

// configuration variables
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});
const urlEncodedParser = bodyParser.urlencoded({ 
  extended: true 
});
const upload = multer({
  dest: "public/uploads",
});

/////////////////////////////////////
const nedbSessionInit = nedbSessionStore({
  connect: expressSession,
  filename: 'sessions.txt'
})
let userdatabase = new nedb({
  filename: 'userdb.txt',
  autoload: true
})
/////////////////////////////////////

// initialize express library and settings
const app = express();
app.use(express.static("public")); 
app.use(urlEncodedParser); 
app.use(cookieParser());
app.set("view engine", "ejs");

/////////////////////////////////////
app.use(expressSession({
  store: nedbSessionInit,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year for the session
  }, 
  secret: "supersecret123"
}))
/////////////////////////////////////

// routes
app.get("/", (request, response) => {
  /////////////////////////////////////
  if(request.session.loggedInUser){
    console.log(request.cookies.visits);
    if (request.cookies.visits) {
      let newVisit = parseInt(request.cookies.visits) + 1;
      response.cookie("visits", newVisit, {
        expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
      });
    } else {
      response.cookie("visits", 1, {
        expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
      });
    }
  
    let query = {};
  
    let sortQuery = {
      timestamp: -1,
    };
  
    database
      .find(query)
      .sort(sortQuery)
      .exec((err, data) => {
        response.render("index.ejs", {
          posts: data,
          visitsToSite: request.cookies.visits,
        });
      });
  } else {
    response.redirect('/login')
  }
  /////////////////////////////////////
});

app.get("/search", (req, res) => {
  let searchTerm = req.query.searchTerm;

  let query = {
    text: new RegExp(searchTerm),
  };

  database.find(query, (err, searchedData) => {
    res.render("index.ejs", { posts: searchedData });
  });
});

app.get("/post/:id", (req, res) => {
  let id = req.params.id;

  let query = {
    _id: id,
  };

  database.findOne(query, (err, individualPost) => {
    res.render("singlePost.ejs", { post: individualPost });
  });
});

app.post("/upload", upload.single("theimage"), (req, res) => {
  console.log(req.body);

  let currDate = new Date();

  let data = {
    text: req.body.text,
    date: currDate.toLocaleString(),
    timestamp: currDate.getTime(),
    likes: 0,
  };

  if (req.file) {
    data.imgSrc = "/uploads/" + req.file.filename;
  }

  database.insert(data, (err, newData) => {
    console.log(newData);
    res.redirect("/");
  });
});

app.post("/remove", (req, res) => {
  let removedId = req.body.postId;

  let query = {
    _id: removedId,
  };

  database.remove(query, (err, numRemoved) => {
    console.log(`num removed elements ${numRemoved}`);
    res.redirect("/");
  });
});

app.post("/like", (req, res) => {
  let postId = req.body.postId;

  console.log(`does post id exist in cookie already? ${req.cookies[postId]}`);

  if (req.cookies[postId] == "postAlreadyLiked") {
    res.redirect("/");
  } else {
    res.cookie(postId, "postAlreadyLiked", {
      expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
    });

    let query = {
      _id: postId,
    };

    let update = {
      $inc: { likes: 1 },
    };

    database.update(query, update, {}, (err, numUpdated) => {
      console.log(`updated docs: ${numUpdated}`);
      res.redirect("/");
    });
  }
});

/////////////////////////////////////
app.get('/login', (req, res)=>{
  res.render('login.ejs', {})
})

app.get('/register', (req, res)=>{
  res.render('register.ejs', {})
})
/////////////////////////////////////


/////////////////////////////////////
// code block for handling post requests from /auth and /signup
app.post('/signup', upload.single('profilePicture'), (req, res)=>{
  // encrypting password so plain text is not store in db
  let hashedPassword = bcrypt.hashSync(req.body.password, 10)

  // local variable that holds my data obj to be inserted into userdb
  let data = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: hashedPassword
  }

  if(req.file){
    data.filepath = "/uploads/" + req.file.filename
  }

  userdatabase.insert(data, (err, dataInserted) =>{
    console.log(dataInserted)
    res.redirect('/login')
  })
})

app.post('/authenticate', (req, res)=>{
  let attemptLogin = {
    username: req.body.username,
    password: req.body.password
  }

  let searchQuery = {
    username: attemptLogin.username
  }

  userdatabase.findOne(searchQuery, (err, user)=>{
    console.log('login attempted')
    if(err || user == null){
      res.redirect('/login')
    } else{
      console.log('found user')

      // getting the stored password in the database
      let encPass = user.password
      // using bcrypt to get the stored password, decrypt it and compare to attempted login password
      if(bcrypt.compareSync(attemptLogin.password, encPass)){

        // storing login data to the session so the user does not have to login again
        let session = req.session
        session.loggedInUser = attemptLogin.username

        console.log('successful login')
        res.redirect('/')
      } else{
        res.redirect('/login')
      }
    }
  })
})

app.get('/logout', (req, res)=>{
  delete req.session.loggedInUser
  res.redirect('/login')
})
/////////////////////////////////////

// start server
const port = 6001
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
