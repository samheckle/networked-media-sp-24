// console.log('my javascript page has loaded')
// alert("page loaded!")

// all of our code will live in here
window.onload = () => {
    init()
}

function init(){

    // gets the element #importantParagraph
    // getElementById will always grab ONE item
    let importantParagraph = document.getElementById("importantParagraph")
    // innerHTML is the attribute that changes the text of an object in the DOM
    importantParagraph.innerHTML = "updated text using javascript!"

    // also update css styles using the style attribute followed by the specific attribute we want to change
    importantParagraph.style.backgroundColor = "purple"

    // classes are different because they return more than one item
    // you can tell because it says elementS in the method
    // we have to be specific about which item we are grabbing in order to change it
    let secondParagraph = document.getElementsByClassName("pinkParagraph")[1]
    secondParagraph.style.backgroundColor = "aquamarine"
    console.log(document.getElementsByClassName("pinkParagraph")[1])
}