// importing the use of .env to store environment variables
require("dotenv").config()

const m = require('masto')

const masto = m.createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN
})

async function makeStatus(text){
    const status = await masto.v1.statuses.create({
        status: text,
        visibility: "public"
    })

    console.log(status.url)
}

// makeStatus()
setInterval(()=>{
    let emo = ["🫡", "‼️", "🥲", "💖"]
    let rand = Math.floor(Math.random() * emo.length)
    let message = emo[rand]
    makeStatus(message)
}, 5000)