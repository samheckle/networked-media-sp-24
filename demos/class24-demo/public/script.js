window.onload = () => {
    
    // getting button from DOM
    const btn = document.getElementById('submit-btn')
    // adding listener for button when clicked
    btn.addEventListener('click', handleClick)

    refreshPosts().then(success, error)
};

// const refreshPosts = async () => {}

async function refreshPosts(){
    const response = await fetch('/allposts')
    const jsonData = await response.json()
    console.log(jsonData)
    return jsonData
}

// rerender all the posts with javascript
function success(data){
    // local variable to hold all the posts
    let container = document.getElementById('posts-container')

    // resetting the values so they can be readded with javascript
    document.getElementById('inputText').value=''
    container.innerHTML = ''

    // console.log(data)

    for(let i = 0; i < data.length; i++){
        // local variable to get current data
        let curr = data[i]

        // create date element
        let time = document.createElement('span')
        time.classList.add('post-date')
        time.append(curr.timestamp)

        // create text element
        let text = document.createElement('p')
        text.classList.add('post-text')
        text.append(curr.text)

        // create individual post element
        let newElement = document.createElement('div')
        newElement.classList.add('post')
        newElement.appendChild(time)
        newElement.appendChild(text)

        // add entire post to the container
        container.appendChild(newElement)
    }
}

// if error print to console
function error(err){
    console.log(err)
}

// callback function that handles click of button
async function handleClick(){
    // retrieving text input field
    let inputText = document.getElementById('inputText').value

    // console.log(inputText)

    // data to be sent to the database on the server
    let data = { text: inputText, visability: 'private'}
    // console.log(JSON.stringify(data))

    // fetch request to our backend
    const response = await fetch('/postTweet', {
        method: 'POST',
        headers: {
            // specifying content type 
            // in this case sending json body
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then( (res) =>{
        // console.log(`this is the response ${res}`)
        // refreshing data after post has been added
        refreshPosts().then(success, error)
    }) 
}