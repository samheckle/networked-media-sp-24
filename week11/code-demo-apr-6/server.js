// library imports
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nedb = require("nedb");
const expressSession = require("express-session");
const nedbSessionStore = require("nedb-session-store");
const bcrypt = require("bcrypt");

// initialized libs w params
const urlEncodedParser = bodyParser.urlencoded({ extended: true });
const upload = multer({
  dest: "public/uploads",
});
const nedbInitializedStore = nedbSessionStore(expressSession);
const sessionStore = new nedbInitializedStore({
  filename: "sessions.txt",
});
const app = express();

app.use(express.static("public"));
app.use(urlEncodedParser);
app.use(cookieParser());
app.use(
  expressSession({
    store: sessionStore,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
    secret: "supersecret123",
  })
);
app.set("view engine", "ejs");

let database = new nedb({
  filename: "database.txt",
  autoload: true,
});

let usersdatabase = new nedb({
  filename: "userdb.txt",
  autoload: true,
});

function requiresAuth(req, res, next){
  if(req.session.loggedInUser){
    console.log("requires auth: " + req.path)
    next()
  } else{
    res.redirect('/login?error=true')
  }
}

app.get("/test", (req, res) => {
  res.send("server is working");
});

app.get("/logout", (req, res) => {
  delete req.session.loggedInUser;
  res.redirect("/login");
});

app.get("/", requiresAuth, (req, res) => {
  // if (req.session.loggedInUser) {
    let query = {};

    console.log(req.cookies);
    let newVisits;

    if (req.cookies.visits) {
      newVisits = parseInt(req.cookies.visits) + 1;
      res.cookie("visits", newVisits, {
        expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
      });
    } else {
      newVisits = 0;
      res.cookie("visits", 1, {
        expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
      });
    }

    let sortQuery = {
      timestamp: -1,
    };
    database
      .find(query)
      .sort(sortQuery)
      .exec((error, data) => {
        res.render("index.ejs", { messages: data, visitsToSite: newVisits });
      });
  // } else {
  //   res.redirect("/login");
  // }
});

app.post("/upload", requiresAuth, upload.single("theimage"), (req, res) => {
  // console.log(req.body)
  // console.log(req.file)
  let currDate = new Date();

  let data = {
    text: req.body.text,
    date: currDate.toLocaleString(),
    timestamp: currDate.getTime(),
    likes: 0,
    comments: [],
  };

  if (req.file) {
    data.image = "/uploads/" + req.file.filename;
  }

  database.insert(data, (error, newData) => {
    res.redirect("/");
  });
});

app.get("/message/:id", requiresAuth, (req, res) => {
  let id = req.params.id;
  let query = {
    _id: id,
  };
  database.findOne(query, (error, data) => {
    res.render("message.ejs", { message: data });
  });
});

app.get("/search", requiresAuth, (req, res) => {
  let searchTerm = req.query.searchTerm;
  let imageOnly = req.query.imageOnly;
  console.log(searchTerm);
  let query = {
    text: new RegExp(searchTerm),
  };

  database.find(query, (error, results) => {
    res.render("index.ejs", { messages: results });
  });
});

app.post("/remove", requiresAuth, (req, res) => {
  let messageId = req.body.messageId;
  let query = {
    _id: messageId,
  };

  database.remove(query, (error, numRemoved) => {
    console.log(numRemoved);
    res.redirect("/");
  });
});

app.post("/like", requiresAuth, (req, res) => {
  let messageId = req.body.messageId;

  if (req.cookies[messageId] == "set") {
    res.redirect("/");
  } else {
    res.cookie(messageId, "set", {
      expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000),
    });

    let query = {
      _id: messageId,
    };
    let update = {
      $inc: { likes: 1 },
    };
    database.update(query, update, {}, (err, numReplaced) => {
      res.redirect("/");
    });
  }
});

app.get("/register", (req, res) => {
  res.render("register.ejs", {});
});

app.get("/login", (req, res) => {
  res.render("login.ejs", {});
});

app.post("/signup", upload.single("profilePicture"), (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  let data = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: hashedPassword,
  };

  if (req.file) {
    data.profpic = "/uploads/" + req.file.filename;
  }

  usersdatabase.insert(data, (err, insertedData) => {
    console.log(insertedData);
    res.redirect("/login");
  });
});

app.post("/authenticate", (req, res) => {
  let data = {
    username: req.body.username,
    password: req.body.password,
  };

  let searchedQuery = {
    username: data.username,
  };

  usersdatabase.findOne(searchedQuery, (err, user) => {
    console.log("attempt login");
    if (err || user == null) {
      res.redirect("/login");
    } else {
      console.log("found user");
      let encPass = user.password;
      if (bcrypt.compareSync(data.password, encPass)) {
        let session = req.session;
        session.loggedInUser = data.username;
        console.log("successful login");
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    }
  });

  // console.log(data.password)
  // res.redirect('/')
});

app.post("/comment", requiresAuth, (req, res) => {
  let messageId = req.body.messageId;
  let commentText = req.body.comment;

  let query = {
    _id: messageId,
  };
  let update = {
    $push: { comments: commentText },
  };
  database.update(query, update, {}, (err, numUpdated) => {
    res.redirect("/message/" + messageId);
  });
});

app.listen(6005, () => {
  console.log("server started on port 6001");
});
