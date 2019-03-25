let canvas = document.querySelector("canvas")

document.addEventListener("DOMContentLoaded", function() {
  canvas.setAttribute('width', '800');
  canvas.setAttribute('height', '800');

  init()
})

// c stands for context, puts a bunch of methods into "c"
let c = canvas.getContext('2d')

// Set a gameState with information on the state of the gameboard
let gameState = {
  gridSize: 800,
  grid: [],
  colorA: [],
  colorB: [],
}

function init() {
  makeBall(50, 50, "#0F5", 25)
  makeGrid()
  gameState.colorA = filterSquares("color", "#F00")
  gameState.colorB = filterSquares("color", "#000")

  tick()
}

function tick() {
  update()
  render()
}

function update() {
  // g = red => green; p= red => purple; r red => red; w = black => white; b = black/white => black
  document.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
      // w = 87; b = 66; g= 71; p= 80; r= 82;
      case 71:
        gameState.colorA.forEach(index => gameState.grid[index].color = "#0F0")
        break;
      case 80:
        gameState.colorA.forEach(index => gameState.grid[index].color = "#F0F")
        break;
      case 82:
        gameState.colorA.forEach(index => gameState.grid[index].color = "#F00")
        break;
      case 87:
        gameState.colorB.forEach(index => gameState.grid[index].color = "#FFF")
        break;
      case 66:
        gameState.colorB.forEach(index => gameState.grid[index].color = "#000")
        break;
      // up = 38, down = 40, left = 37, right = 39
      case 38:
        gameState.ball.y -= 10
        break;
      case 40:
        gameState.ball.y += 10
        break;
      case 37:
        gameState.ball.x -= 10
        break;
      case 39:
        gameState.ball.x += 10
        break;
      default:
        console.log(event.keyCode, "is not a valid key nerd")
        break;
    }

    // Now that we've changed color, gotta re-render
    render();
  })
  
}

function render() {
  gameState.grid.forEach((Square, i) => gameState.grid[i].drawSquare())
  gameState.ball.drawBall();
}

// Helpful Bois
function filterSquares(key, value) {
  let filteredIndexes = []
  gameState.grid.forEach((square, i) => {
    if (gameState.grid[i][key] === value) {
      filteredIndexes.push(i)
    }
  })
  return filteredIndexes
}

// Grid helpers
function makeSquare(x, y, size, color) {
  gameState.grid.push({
    x: x,
    y: y,
    color: color,
    size: size,
    drawSquare: function() {
      c.fillStyle = this.color
      c.fillRect(this.x, this.y, this.size, this.size)
    }
  })
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

function makeBall(x, y, color, radius) {
  gameState.ball = {
    x: x,
    y: y,
    color: color,
    radius: radius,
    drawBall: function() {
      c.beginPath();
      c.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
      c.fillStyle = this.color;
      c.fill();
      c.lineWidth = 5;
      c.strokeStyle = this.color;
      c.stroke();
    }
  }
}