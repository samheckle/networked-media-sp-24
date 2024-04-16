

const s = (sketch) => {
  // converting https://editor.p5js.org/samheckle/sketches/m_LjQ5VYz 
// to use a single class instead of multiple arrays

// creating array to hold all the poem line objects
let poem = []

// global text size variable
let ts = 16

sketch.setup = () => {
  sketch.createCanvas(400, 400);
  // sketch.createCanvas(window.innerWidth, window.innerHeight)
  sketch.textSize(ts)
  
  // adding new instantiated objects to the array
  // poem[0] = new PoemLine("I spend all night")
  poem.push(new PoemLine("I spend all night"))
  poem.push(new PoemLine("weaving a poem for you"))
  poem.push(new PoemLine("to wear. You look so beautiful"))
  poem.push(new PoemLine("when you wear my light."))
  
}

sketch.draw = () => {
  // sketch.background(255, 0);
  // sketch.noCanvas()
  
  // going through the entire array
  // drawing and moving the lines individually
  for(let i = 0; i < poem.length; i++){
    // the drawLine function takes in a spacing parameter that allows us to modify the y location based on the text size
    poem[i].drawLine(ts * i)
    poem[i].moveLine()
  }
}

// poemline class takes one parameter that is the line of the poem to be displayed
class PoemLine {
  constructor(text){
    // sets a property to be the value passed in from the parameter
    this.poemLine = text
    this.xPos = sketch.width/2
 
  }
  
  // function that draws the text to the screen
  // takes in a spacing parameter to adjust the height of the text so the text does not overlap
  drawLine(spacing){
    sketch.text(this.poemLine, this.xPos, sketch.height/2 + spacing)
  }
  
  // moves the xposition of the line randomly left and right
  moveLine(){
    this.xPos += (sketch.noise(this.xPos) * sketch.random(-1, 1))
  }
}

}

let myp5 = new p5(s, "sketch1")
let myp52 = new p5(s, "sketch2")