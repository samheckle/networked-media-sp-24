window.onload = () => {
    document.getElementById("submitButton").addEventListener("click", search)
}

async function search(){
    let inputText = document.getElementById("inputText").value
    document.getElementById("inputText").value = ""

    // https://www.omdbapi.com/?apikey=9aa8e798&s=crystal&type=movie&page=3
    // URLSearchParams creates an object that is everything that comes after '?' in URL
    let params = new URLSearchParams({
        apikey: "9aa8e798",
        s: inputText,
        type: "movie"
    })

    let url = "https://www.omdbapi.com/?" + params
    // console.log(url)
    let response = await fetch(url)
    // console.log(response)
    let jsonData = await response.json().then(success, error)
    // console.log(jsonData)
}

function success(response){
    // console.log(response.Search)
    let movies = response.Search
    // clears the messages container to not have persisting data
    document.getElementById('allMessagesContainer').innerHTML = ""
    for(let i = 0; i< movies.length;i++){
        let currentMovie = movies[i]
        // console.log(currentMovie.Title)
        // creates item for movie info to go inside
        let newElement = document.createElement('div')
        newElement.classList.add('item')
        // adds the title to the item
        let title = document.createElement('p')
        title.innerHTML = currentMovie.Title
        // adds poster
        let poster = document.createElement('img')
        poster.src = currentMovie.Poster

        newElement.append(title)
        newElement.append(poster)
        document.getElementById('allMessagesContainer').append(newElement)
    }

}

function error(err){
    console.log(err)
}