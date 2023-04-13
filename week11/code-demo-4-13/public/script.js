// Empty
window.onload = () =>{
    refreshMessages().then(onRefreshMessageSuccess, onRefreshMessageError)
    document.getElementById('submitButton').addEventListener('click', onButtonClick)
}

async function refreshMessages(){
    const response = await fetch('/alltweets')
    const jsonData = await response.json()
    console.log(jsonData)
    return jsonData
}

function onRefreshMessageSuccess(data){
    console.log(data)
    let container = document.getElementById('allMessagesContainer')

    document.getElementById('inputText').value = ''
    container.innerHTML = ''

    for(let i = 0; i < data.length; i++){
        let currentData = data[i]
        // console.log(currentData)

        let newElement = document.createElement('div')
        newElement.classList.add('item')
        newElement.append(currentData.text)

        container.appendChild(newElement)
    }
}

function onRefreshMessageError(error){
    console.log(error)
}

async function onButtonClick(){
    // console.log('button was clicked')
    let inputText = document.getElementById("inputText").value
    // console.log(inputText)
    let data = { text: inputText}

    const response = await fetch('/submittweet', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then( (res) => {
        console.log("this is the response", res)
        refreshMessages().then(onRefreshMessageSuccess, onRefreshMessageError)
    })
}