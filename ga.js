const POP_SIZE = 500;
const MUTATION_RATE = 0.01;
const MOVES = 250;

let breakTraining = false;

var population = [];

for (let i = 0; i < POP_SIZE; i++) {
    population.push(new Player());
}

async function gameplay(individual, slow = false) {
    key = 'r';
    keyPressed();
    for(let i = 0; i < MOVES; i++) {
        let lastKey = 0;
        if (slow) await sleep(1000);
        let input = [];
        let biggest = 0;
        for (let j = 0; j < GRID_SIZE; j++) {
            let sum = 0;
            for (let k = 0; k < GRID_SIZE; k++) {
                input.push(grid[j][k]);
                sum += grid[j][k];
                if (grid[j][k] > biggest) biggest = grid[j][k];
            }
        }
        for (let j = 0; j < input.length; j++) {
          input[j] /= biggest;
        }
        input.push(moveHappened);
        
        let output = individual.predict(input);
        let dir = 0;
        for (let k = 0; k < output.length; k++) {
          if (output[k] > output[dir]) dir = k;
        }
    
        if (dir == 0) {
            key = 'ArrowUp';
            lastKey = 2;
        } else if (dir == 1) {
          key = 'ArrowDown';
          lastKey = 4;
        } else if (dir == 2) {
          key = 'ArrowRight';
          lastKey = 3;
        } else if (dir == 3) {
          key = 'ArrowLeft';
          lastKey = 1;
        }
        keyPressed();
    }
}

let fitnes = []
/**
 * Playing every individual from a generation
 * @returns the next generation to play
 */
function play (gen, last = false) {
    let scores = [];
    let sum = 0;
    let fitnesses = [];
    let bestPlay = {
      index: 0,
      score: -Infinity
    }
    let mostNegative = 0;
    
    population.forEach((individual, i) => {
        gameplay(individual, false);
        scores.push(score);
        if (score > bestPlay.score) {
            bestPlay.index = i;
            bestPlay.score = score;
        }
        if (score < mostNegative) {
          mostNegative = score;
        }
    })

    console.log("Gen: " + gen + "\nBest: Player " + (bestPlay.index) + " : " + bestPlay.score);

    if (last) return null;

    // Calculate Fitnesses 
    for (let i = 0; i < POP_SIZE; i++) {
      if (i === bestPlay.index) scores[i] = Math.abs(scores[i]);
      scores[i] += Math.abs(mostNegative);
      scores[i] **= 2;
      sum += scores[i];
    }

    for (let i = 0; i < POP_SIZE; i++) {
      fitnesses[i] = scores[i] / sum;
    }

    let nextGen = [];

    for (let i = 0; i < POP_SIZE; i++) {
        // let parentA = pickParent(fitnesses);
        // let parentB = pickParent(fitnesses);
        // let child = Player.crossover(parentA, parentB);
        let child = new Player(population[bestPlay.index]);
        child.mutate();
        nextGen.push(child);
    }


    fitnes = fitnesses;
    return nextGen;
}

function pickParent (fitnesses) {
  let maxFit = 0;
  for (let i = 0; i < fitnesses.length; i++) {
    if (fitnesses[i] > maxFit) maxFit = fitnesses[i];
  }

  while (1) {
    let i = Math.floor(Math.random() * POP_SIZE);
    if (Math.random() < (fitnesses[i] / maxFit)) {
      // console.log(i)
      return population[i];
    }
    i++;
  }
}

function playGenerations(generations = 10) {
    for (let i = 0; i < generations; i++) {
        let ng = play(i, i === generations-1);
        if (ng == null) break;
        if (breakTraining) break;
        population = ng;
    }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));