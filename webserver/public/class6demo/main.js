window.onload = () => {
    const button = document.getElementById('button')

    // button.onclick = () => {
    //     console.log('button has been clicked')
    // }

    // button.addEventListener("click", mouseClickHandler)

    button.addEventListener("click", (e) => {
        console.log('printing event  ' + e.x)
        console.log('button has been clicked in the third way')

        const container = document.getElementById("container")

        if(container.classList.contains("day")){
            container.classList.add('night')
            container.classList.remove('day')
            button.textContent = "lights on!"
        } else {
            container.classList.remove('night')
            container.classList.add('day')
            button.textContent = 'lights off'
        }
    })

    button.addEventListener("mouseenter", () =>{
        console.log('mouse has entered')
    })

    button.addEventListener("mouseleave", () =>{
        console.log('mouse has left')
    })

    const text = document.getElementById("text")
    document.addEventListener('keydown', (e) => {
        console.log('printing event  ' + e.altKey)
        console.log(e.key)

        let newText = e.key
        let oldText = text.innerHTML

        if(newText == "Enter"){
            newText = "<br/>"
        } else if(newText == "Backspace"){
            // remove string whitespace
            oldText = text.innerHTML.trim()

            // print letter to be removed
            console.log(oldText[oldText.length-1])

            oldText = oldText.substring(0, oldText.length-1)

            newText = ""
        }

        text.innerHTML = oldText+newText
    })
}

function mouseClickHandler(){
    console.log('button has been clicked in a different way')
}