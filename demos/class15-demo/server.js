const express = require('express')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('movies.ejs')
})

app.listen(7777, ()=>{
    console.log("server started port 7777")
})