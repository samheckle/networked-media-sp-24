// all js code must exist inside here
window.onload = () => {
    // selecting button object using id set in html
    const button = document.getElementById("button")

    // button.onclick = () => {
    //     console.log("button has been clicked!")
    // }
    // button.addEventListener("click", mouseClickHandler)

    // event listeners take in two parameters
    // 1. type of event (eg. "click")
    // 2. callback function (which in this case is an anonymous function which is denoted by ()=>{})
    button.addEventListener("click", () => {
        console.log("button has been clicked!")
        const div = document.getElementById("container")
        if(div.classList.contains("day")){
            div.classList.add("night")
            div.classList.remove("day")
            button.textContent = "lights on!"
        } else {
            div.classList.add("day")
            div.classList.remove("night")
            button.textContent = "lights off!"
        }
    })

    button.addEventListener("mouseenter", () => {
        console.log("mouse has entered the button")
    })
    button.addEventListener("mouseleave", () => {
        console.log("mouse has left the button")
    })

    // document is selector entire html page!
    document.addEventListener("mousemove", (e)=>{
        // console.log(e.clientX, e.clientY)
    })

    let textContent = document.getElementById("text")
    document.addEventListener("keydown", (e)=>{
        console.log(e.key)
        // textContent.textContent = e.key
        // https://gomakethings.com/four-different-ways-to-inject-text-and-html-into-an-element-with-vanilla-javascript/
        let newText = e.key
        let oldText = textContent.innerHTML
        if(newText == "Enter"){
            newText = "<br/>"
        } else if(newText == "Backspace"){
            // removed all whitespace from the original text content
            oldText = textContent.innerHTML.trim()

            // made sure to print out the character to be removed
            console.log(oldText[oldText.length-1])

            // replaced the oldText with the string without the last character (because we subracted -2)
            oldText = oldText.substring(0, oldText.length-2)

            // did not want backspace to be printed
            newText = ""
        }
        textContent.innerHTML = oldText+newText
    })

}

// helper functions can exist outside of window.onload as long as they are called inside window.onload