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

// initialize express library and settings
const app = express();
app.use(express.static("public")); 
app.use(urlEncodedParser); 
app.use(cookieParser());
app.set("view engine", "ejs");

// routes
app.get("/", (request, response) => {
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

// start server
const port = 6001
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
