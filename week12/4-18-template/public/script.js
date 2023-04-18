window.onload = () => {
    document.getElementById("submitButton").addEventListener("click", search)
}

async function search(){
    let inputText = document.getElementById("inputText").value
    document.getElementById("inputText").value = ""
}