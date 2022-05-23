const grid = [];
const GRID_SIZE = 4;
let SQUARE_SIZE;
let score = 0; 
let direction = '';

let moveHappened = 0;

function setup() {
  createCanvas(400, 500);
  initGrid();
  SQUARE_SIZE = width / GRID_SIZE;
}

function draw() {
  background(220);
  drawGrid();
  text("score: " + score, 45, 420);
}

function initGrid () {
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = 0;
    }
  }
  score = 0;
  addRandomTile();
  addRandomTile();
}

function drawGrid () {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let y = i*SQUARE_SIZE;
      let x = j*SQUARE_SIZE;
      stroke(0);
      switch (grid[i][j]) {
        case 0:
            fill('#cdc1b4');
            break;
        case 4:
            fill('#EDE0C8');
            break;
        case 8:
            fill('#F2B179');
            break;
        case 16:
            fill('#F59563');
            break;
        case 32:
            fill('#F67C5F');
            break;
        case 64:
            fill('#F65E3B');
            break;
        case 128:
            fill('#EDCF72');
            break;
        case 256:
            fill('#EDCF72');
            break;
        case 512:
            fill('#EDCF72');
            break;
        case 1024:
            fill('#EDCF72');
            break;
        case 2048:
            fill('#EDCF72');
            break;
        default:
            fill('#EEE4DA');
            break;
      }
      rect(x, y, SQUARE_SIZE, SQUARE_SIZE);
      fill(0);
      textAlign("center", "center");
      if (grid[i][j] !== 0) {
        text(grid[i][j], x+SQUARE_SIZE/2, y+SQUARE_SIZE/2);
      }
    }
  }
  fill(180, 0, 0, 80);
  if (direction == 'up') fill(180, 0, 0, 255);
  rect(width/2-10, 420, 20, 20);
  fill(180, 0, 0, 80);
  if (direction == 'down') fill(180, 0, 0, 255);
  rect(width/2-10, 450, 20, 20);
  fill(180, 0, 0, 80);
  if (direction == 'left') fill(180, 0, 0, 255);
  rect(width/2-40, 450, 20, 20);
  fill(180, 0, 0, 80);
  if (direction == 'right') fill(180, 0, 0, 255);
  rect(width/2+20, 450, 20, 20);
}

function addRandomTile () {
    let row = floor(random(GRID_SIZE));
    let col = floor(random(GRID_SIZE));
    if (grid[row][col] != 0) {
        return addRandomTile();
    }

    return grid[row][col] = random() < 0.8 ? 2 : 4; 
}

function keyPressed() {
    let moved = false;
    if (key === 'ArrowUp') {
      direction = 'up';
       // Foreach row (grid[i]) from top to bottom starting at 2nd row
       for (let i = 1; i < GRID_SIZE; i++) {
           // Foreach cell in the row (grid[i][j]) from left to right
           for (let j = 0; j < GRID_SIZE; j++) {
               if (grid[i][j] !== 0) {
                // Get the furthest empty cell
                let k = i;
                do {
                    k--;
                    if (grid[k][j] !== 0) {
                        if (grid[k][j] == grid[i][j]) {
                            grid[i][j] *= 2;
                            score += grid[i][j];
                        }
                        else {
                            k++;
                        }
                        break;
                    }
                } while (k > 0);
                // console.log("up to " + k);
                if (k < i) {
                    let aux = grid[i][j];
                    grid[i][j] = 0;
                    grid[k][j] = aux;
                    moved = true;
                }
               }
           }
       } 
    } else if (key === 'ArrowLeft') {
      direction = 'left';
       // Foreach column (grid[][i]) from left to right starting at 2nd col
       for (let i = 1; i < GRID_SIZE; i++) {
           // Foreach cell in the column (grid[j][i]) from top to bottom 
           for (let j = 0; j < GRID_SIZE; j++) {
               if (grid[j][i] !== 0) {
                // Get the furthest empty cell
                let k = i;
                do {
                    k--;
                    if (grid[j][k] !== 0) {
                        if (grid[j][k] === grid[j][i]) {
                            grid[j][i] *= 2;
                            score += grid[j][i];
                        }
                        else {
                            k++;
                        }
                        break;
                    }
                } while (k > 0);
                // console.log("left to " + k);
                if (k < i) {
                    let aux = grid[j][i];
                    grid[j][i] = 0;
                    grid[j][k] = aux;
                    moved = true;
                }
               }
           }
       } 
    } else if (key === 'ArrowDown') {
      direction = 'down';
       // Foreach row (grid[i]) from bottom to top starting at 2nd row
       for (let i = GRID_SIZE-2; i >= 0; i--) {
           // Foreach cell in the row (grid[i][j]) from left to right
           for (let j = 0; j < GRID_SIZE; j++) {
               if (grid[i][j] !== 0) {
                // Get the furthest empty cell
                let k = i;
                do {
                    k++;
                    if (grid[k][j] !== 0) {
                        if (grid[k][j] == grid[i][j]) {
                            grid[i][j] *= 2;
                            score += grid[i][j];
                        }
                        else {
                            k--;
                        }
                        break;
                    }
                } while (k < GRID_SIZE-1);
                // console.log("down to " + k);
                if (k > i) {
                    let aux = grid[i][j];
                    grid[i][j] = 0;
                    grid[k][j] = aux;
                    moved = true;
                }
               }
           }
       } 
    } else if (key === 'ArrowRight') {
      direction = 'right';
       // Foreach column (grid[][i]) from right to left starting at 2nd col
       for (let i = GRID_SIZE-2; i >= 0; i--) {
           // Foreach cell in the column (grid[j][i]) from top to bottom 
           for (let j = 0; j < GRID_SIZE; j++) {
               if (grid[j][i] !== 0) {
                // Get the furthest empty cell
                let k = i;
                do {
                    k++;
                    if (grid[j][k] !== 0) {
                        if (grid[j][k] === grid[j][i]) {
                            grid[j][i] *= 2;
                            score += grid[j][i];
                        }
                        else {
                            k--;
                        }
                        break;
                    }
                } while (k < GRID_SIZE-1);
                // console.log("left to " + k);
                if (k > i) {
                    let aux = grid[j][i];
                    grid[j][i] = 0;
                    grid[j][k] = aux;
                    moved = true;
                }
               }
           }
       } 
    } else if (key === 'r') initGrid();

    if (moved) {
      moveHappened = 1;
      moveOcurred();
    } else {
      moveHappened = 0;
    }
}

function moveOcurred () {
  addRandomTile();
}