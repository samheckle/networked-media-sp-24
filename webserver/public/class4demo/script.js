window.onload = () => {
    console.log('page has loaded!')
    // alert('page has loaded!')

    // this gets a single element because ids can only exist once
    document.getElementById("important-content").innerHTML = 'this text has been changed with javascript' 

    // this gets multiple elements that returns an array
    // returns an array that contains all the elements
    // [0] = first element of red-paragraph
    // [1] = second element of red-paragraph
    
    // make a variable to hold red paragraph array
    // let redParagraphs = document.getElementsByClassName("red-paragraph")
    // console.log(redParagraphs)

    // // modifying the first element in the redParagraphs array
    // redParagraphs[0].innerHTML = 'this red paragraph has changed it\'s text with javascript'

    let firstRedParagraph = document.getElementById('change-red')
    firstRedParagraph.innerHTML = 'this red paragraph has changed it\'s text with javascript'
}