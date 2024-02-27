// imports express library
const express = require('express')

// initialize express
const app = express()

// initialize public folder for assets
app.use(express.static('public'))

// initialize template engine to look at views folder for rendering
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.send('working')
})

// setting up the server to start
// LAST PIECE OF CODE
app.listen(5555, ()=> {
    console.log('server starts')
})

