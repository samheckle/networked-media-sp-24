window.onload = () => {
    const submit = document.getElementById("button")

    submit.addEventListener("click", search)
}

async function search(){
    const inputText = document.getElementById("inputText").value

    // console.log(inputText)

    const params = new URLSearchParams({
        apikey: "9aa8e798",
        s: inputText,
        type: "movie"
    })
    // const params = "apikey=9aa8e798&s=poor&type=movie"

    const url = "http://www.omdbapi.com/?" + params

    let responseAPI = await fetch(url)
    // console.log(response)

    let jsonData = await responseAPI.json().then(success, err)

    // console.log(jsonData)
}

function success(response){
    // console.log(response.Search)
    // console.log(response.Search[0])
    let allresults = response.Search
    for(let i = 0; i < allresults.length; i++){
        let topSearch = response.Search[i]
    
        let container = document.getElementById("all-movies")
    
        let newElement = document.createElement('div')
        newElement.classList.add('single-movie')
    
        let title = document.createElement('p')
        title.innerHTML = topSearch.Title
    
        let poster = document.createElement('img')
        poster.src = topSearch.Poster
    
        newElement.append(title)
        newElement.append(poster)
    
        container.append(newElement)

    }
}

function err(error){
    console.log(error)
}