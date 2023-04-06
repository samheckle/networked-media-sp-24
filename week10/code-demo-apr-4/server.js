// library imports 
const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const urlEncodedParser = bodyParser.urlencoded({extended: true})
const upload = multer({
    dest: 'public/uploads'
})
const nedb = require('nedb')

const app = express()

app.use(express.static('public'))
app.use(urlEncodedParser)
app.use(cookieParser())
app.set('view engine', 'ejs') 

let database = new nedb({
    filename: 'database.txt',
    autoload: true
})

app.get('/test', (req, res)=>{
    res.send('server is working')
})

app.get('/', (req, res)=>{
    let query = {}

    console.log(req.cookies)
    let newVisits

    if(req.cookies.visits){
        newVisits = parseInt(req.cookies.visits) + 1
        res.cookie("visits", newVisits, { expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
    } else{
        newVisits = 0
        res.cookie("visits", 1, { expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
    }

    let sortQuery = {
        timestamp: -1
    }
    database.find(query).sort(sortQuery).exec((error, data)=>{
        res.render('index.ejs', {messages: data, visitsToSite: newVisits})
    })
})

app.post('/upload', upload.single('theimage'), (req, res)=>{
    // console.log(req.body)
    // console.log(req.file)
    let currDate = new Date()

    let data = {
        text: req.body.text,
        date: currDate.toLocaleString(),
        timestamp: currDate.getTime(),
        likes: 0
    }

    if(req.file){
        data.image = '/uploads/' + req.file.filename
    }

    database.insert(data, (error, newData)=>{
        res.redirect('/')
    })
})

app.get('/message/:id', (req, res) =>{
    let id = req.params.id
    let query = {
        _id: id
    }
    database.findOne(query, (error, data)=>{
        res.render('message.ejs', {message: data})
    })
})

app.get('/search', (req, res)=>{
    let searchTerm = req.query.searchTerm
    let imageOnly = req.query.imageOnly
    console.log(searchTerm)
    let query = {
        text: new RegExp(searchTerm)
    }

    database.find(query, (error, results) => {
        res.render('index.ejs', {messages: results})
    })
})

app.post('/remove', (req, res)=>{
    let messageId = req.body.messageId
    let query = {
        _id: messageId
    }

    database.remove(query, (error, numRemoved)=>{
        console.log(numRemoved)
        res.redirect('/')
    })
})

app.post('/like', (req, res)=>{
    let messageId = req.body.messageId

    if(req.cookies[messageId] == "set"){
        res.redirect('/')
    } else{
        res.cookie(messageId, "set", {expires:  new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})

        let query = {
            _id: messageId
        }
        let update = {
            $inc: {likes: 1}
        }
        database.update(query, update, {}, (err, numReplaced)=>{
            res.redirect('/')
        })
    }
})

app.listen(6005, ()=>{
    console.log('server started on port 6001')
})