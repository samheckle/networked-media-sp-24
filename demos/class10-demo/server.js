// imports express library
const express = require('express')

// initialize express
const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

// global variables
let storedmessages = []       // this is a data structure that will hold all of the messages that the client sends to the server

app.get('/', (req, res)=>{
    res.send('me server is working!!!!!!')
})

app.get('/random', (req, res)=>{

    let rand = Math.floor(Math.random() * 3)

    if(rand == 0){
        res.sendFile('1.png', { root: 'public'})
    } else if(rand == 1){
        res.sendFile('2.jpg', { root: 'public'})
    } else{
        res.sendFile('3.png', { root: 'public'})
    }
})

app.get('/submit', (req, res)=>{
    console.log(req.query)
    res.send('thank you for submitting, ' + req.query.username + '<br /> <a href=\'\\guestbook.html\'>back to guestbook</a>')

    storedmessages.push({
        username: req.query.username,
        message: req.query.message
    })
    console.log(storedmessages)
})

app.get('/messages', (req, res)=>{
    let allmessages = ''

    for(let i = 0; i < storedmessages.length; i++){
        allmessages += storedmessages[i].username + ' says ' + storedmessages[i].message + "<br/>"
    }

    res.send(allmessages)
})

app.get('/template', (req, res)=>{
    const data = {
        test:[
            { visible: true, text: storedmessages[0].message},
            { visible: false, text: 'second'},
            { visible: true, text: 'third'}
        ]
    }
    res.render('template.ejs', data)
})

app.get('/guestbook', (req, res)=>{
    res.render('guestbook.ejs', {})
})

// setting up the server to start
// LAST PIECE OF CODE
app.listen(8000, ()=> {
    console.log('server starts')
})

