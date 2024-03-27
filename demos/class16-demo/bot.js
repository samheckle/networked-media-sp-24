// importing the use of .env to store environment variables
require("dotenv").config();

const m = require("masto");

/*/////////////////////////////////////////////////////
 *
 *
 *
 * creating and sending a post with an interval of 5 seconds using the masto api
 *
 *
 *
 */ /////////////////////////////////////////////////////
const masto = m.createRestAPIClient({
  url: "https://networked-media.itp.io/", // url we are making the request to, this should be our url
  accessToken: process.env.TOKEN, // this uses the .env file variable TOKEN.
  // process.env is defined by the require("dotenv")
});

// async: means the function can use the await keyword
// function that allows us to make a post
// text parameter is the text to be included in the status
async function makeStatus(text) {
  // using the masto library to create a new status
  // properties come from Status entity
  // https://docs.joinmastodon.org/entities/Status/
  // await: ensuring this promise completes before it continues the rest of the code
  const status = await masto.v1.statuses.create({
    status: text,
    visibility: "public",
  });

  // printing out the url of the post just created
  console.log(status.url);
}

// running the makeStatus() function to test single individual post
// makeStatus()

// using native javascript setInterval function that runs every 5 seconds
setInterval(() => {
  // corpus array of emojis
  let emo = ["🫡", "‼️", "🥲", "💖"];
  // randomly select an index from emoji array
  let rand = Math.floor(Math.random() * emo.length);
  // choose the emoji to be posted
  let message = emo[rand];
  // make the post with specified random emoji as message
  makeStatus(message);
}, 5000);

/*/////////////////////////////////////////////////////
 *
 *
 *
 * replying to a specific post with a message
 *
 *
 *
 */ /////////////////////////////////////////////////////

// we need to use a different client in order to run all the time
// this will pull in every notification as they happen
const stream = m.createStreamingAPIClient({
  accessToken: process.env.TOKEN,
  streamingApiUrl: "wss://networked-media.itp.io", // special url we use for sockets
});

// async function to wait for the notification and reply to it
async function reply() {
  // finding the specific route to watch for notifications
  // based off the stream client and the notification path
  const notificationSubscription = await stream.user.notification.subscribe();

  // makes sure objects exist in the returned obj before going through array
  for await (let notif of notificationSubscription) {

    // printing the structure to the console to see how to access data
    // console.log(notif.payload.type);

    // local variables for each piece of data i want
    let type = notif.payload.type;
    let acct = notif.payload.account.acct;
    let replyId = notif.payload.status.id;

    // if the type of notification is a mention
    if (notif.payload.type == "mention") {

        // create a status
      const status = await masto.v1.statuses.create({
        status: `@${acct} hi back!`,    // reply to user that originally mentioned
        visibility: "public",
        in_reply_to_id: replyId,        // id # of the mention post so that you reply in the thread
      });
    }
  }
}

// call the reply function so it can always wait for notifications
reply()