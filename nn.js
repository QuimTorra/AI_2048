const TOPOLOGY = [17, 25, 25, 4];

class Player {
    constructor (parent = null) {
        this.network = [];
        if (parent) {
            for(let i = 0; i < parent.network.length; i++) {
              this.network.push(new Layer(parent.network[i]));
            }
            return;
        }

        for (let i = 1; i < TOPOLOGY.length; i++) {
            if (i == TOPOLOGY.length-1) {
              this.network.push(new Layer(TOPOLOGY[i-1], TOPOLOGY[i], [], [], true));
              break;
            }
            this.network.push(new Layer(TOPOLOGY[i-1], TOPOLOGY[i]));
        }

    }

    predict (input) {
        // pass through the layers
        var out = input;
        for (let i = 0; i < this.network.length; i++) {
            out = this.network[i].forward(out);
        }

        return out;
    }

    mutate () {
        this.network.forEach(layer => {
            for (let i = 0; i < layer.neurons; i++) {
                for (let j = 0; j < layer.inputCount; j++) {
                    if (Math.random() < MUTATION_RATE) {
                      layer.weights[i][j] += Math.random() * 0.2 - 0.1;
                    }
                }
            }
        });
    }

    static crossover (parentA, parentB) {
        let child = new Player();
        for (let i = 0; i < parentA.network.length; i++) {
            var r =  Math.random();
            child.network[i] = r > 0.5 ? parentA.network[i] : parentB.network[i];
        }

        return child;
    }
}

class Layer {
    constructor (inNeurons, outNeurons, weights = [], biases = [], isOutput = false) {
        if (inNeurons instanceof Layer) {
          this.inputCount = inNeurons.inputCount;
          this.neurons = inNeurons.neurons;
          this.biases = [...inNeurons.biases];
          this.weights = [];
          for (let i = 0; i < inNeurons.neurons; i++) {
            this.weights.push([...inNeurons.weights[i]]);
          }
          return;
        }
        this.inputCount = inNeurons;
        this.neurons = outNeurons;
        this.weights = weights;
        this.biases = biases;
        this.isOutput = isOutput;
        if (weights.length === 0) {
            this.init();
        }
    }

    init() {
        for (let i = 0; i < this.neurons; i++) {
            let w = [];
            for (let j = 0; j < this.inputCount; j++) {
                w.push(Math.random() * 2 - 1); 
            }
            this.weights.push(w);
            this.biases.push(Math.random() * 2 - 1);
        }
    }

    forward (input) {
      if (input.length != this.inputCount) throw "Input count not correct!";

      // Foreach neuron, compute it's weighted sum & pass it through the activation
      let output = [];
      for (let i = 0; i < this.neurons; i++) {
        let sum = 0;
        for (let w = 0; w < this.inputCount; w++) {
            sum += input[w] * this.weights[i][w];
        }
        sum += this.biases[i];
        if (this.isOutput) {
          output.push(Layer.sigmoid(sum));
        } else {
          output.push(Layer.ReLU(sum));
        }
      }

      return output
    }

    static ReLU (x) {
      return Math.max(0, x);
    }

    static sigmoid (x) {
      return 1 / (1 + Math.exp(-x));
    }

    serialize () {
        let serializedLayer = {
            inputs: this.inputCount,
            neurons: this.neurons,
            weights: this.weights,
            biases: this.biases
        }
    }
}