// imports express library
const express = require('express')

// initialize express
const app = express()

app.use(express.static('public'))

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

// setting up the server to start
// LAST PIECE OF CODE
app.listen(8000, ()=> {
    console.log('server starts')
})

