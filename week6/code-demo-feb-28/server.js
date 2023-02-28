
const express = require('express')
const parser = require('body-parser')

const encodedParser = parser.urlencoded({extended: true})

const app = express()
app.use(express.static('public'))
app.use(encodedParser)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    res.render("index.ejs", {messages: data})
})

let data = []

app.post('/upload', (req, res) => {

    let now = new Date()

    let message = {
        text: req.body.text,
        date: now.toLocaleString()
    }

    data.push(message)

    res.redirect('/')
})

app.listen(8000, ()=> {
    console.log('server has started on port 8000')
})