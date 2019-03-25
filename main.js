let canvas = document.querySelector("canvas")
canvas.setAttribute('width', '800');
canvas.setAttribute('height', '800');

// c stands for context, puts a bunch of methods into "c"
let c = canvas.getContext('2d')

class Square {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
}

// Set a gameState with information on the state of the gameboard
let gameState = {
  gridSize: 800,
  grid: [],
}

function makeSquare(x, y, size, color) {
  gameState.grid.push(new Square(x, y, color, size))
  c.fillStyle = color
  c.fillRect(x, y, size, size)
}

function makeRow(y, startColor) {
  // sets the offColor based on the start color
  let offColor = startColor === "#F00" ? "#000" : "#F00"
  for (let i = 0; i < gameState.gridSize; i+= 200) {
    // red square
    makeSquare(i, y, 100, startColor)
  }
  for (let j = 100; j < gameState.gridSize; j+= 200) {
    // black square
    makeSquare(j, y, 100, offColor)
  }
}

function makeGrid() {
  for (let i = 0; i < gameState.gridSize; i+= 100) {
    if (i % 200 === 0) {
      makeRow(i, "#F00")
    } else {
      makeRow(i, "#000")
    }  
  }
}

makeGrid()
