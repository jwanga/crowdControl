/**
 * Created by daniel.cluff on 5/30/16.
 */
const crowdControlCalc = (function() {
  'use strict';

  /**
   * The Calculator class calculates the transitions between dominant crowd control effects.
   */
  class Calculator {

    constructor() {
      this._reset();
    }

    /**
     * Resets the transitions to [[0, 0]].
     */
    _reset() {
      //Singly linked list of effect transitions.
      this.transitions = new Transition();
    }

    /**
     * Maps an array of crowd control effects to an array crowd control transitions.
     * @param {array} input - An array of all applied crowd control effects.
     * @ returns {array} An array of crowd controll transitions
     */
    calculateCrowdControlChange( input ) {
      
      //Assert the input is a valid array.
      if (!Array.isArray(input)) {
        throw new Error('"calculateCrowdControlChange" must be called with an array');
      }

      this._reset();

      input.forEach((effect, index) => {

        //Assert the effect array is a vaid collection of three number values.
        if (!Array.isArray(effect) || effect.length != 3 || typeof(effect[0]) !== 'number' || typeof(effect[1]) !== 'number' || typeof(effect[2]) !== 'number' ) {
          throw new Error(`Input index: ${index} must be an array of 3 numbers`);
        }

        //Append the new transition.
        const transition = new Transition(...effect);
        this.transitions.append(transition);

      });

      return this.toArray();
    }

    /**
     * Maps the output linked list to a 2D array.
     * @returns {array} 2D array of effect transitions.
     */
    toArray() {
      let node = this.transitions;
      // 2D array of transitions.
      let output = [];
      while(node) {

        //Don't add the first node if it has no severity.
        if (!(node.time === 0 && node.severity === 0)){
          output.push([node.time, node.severity]);
        }

        node = node.next;

      }

      return output;
    }
  }

  return new Calculator();
}());

const effects = [ 
  {
    effect: [[1, 2, 5], [2, 3, 3], [4, 2, 4]],
    result: [[1, 5], [3, 3], [4, 4], [6, 0]]
  },
  {
    effect: [[0, 2, 3], [2, 3, 4], [5, 2, 2]],
    result: [[0, 3], [2, 4], [5, 2], [7, 0]]
  },  
  {
    effect: [[2, 4, 5], [8, 1, 1], [3, 4, 2], [4, 1, 6]],
    result: [[2, 5], [4, 6], [5, 5], [6, 2], [7, 0], [8, 1], [9, 0]]
  },
  {
    effect: [[1, 2, 3], [2, 3, 3], [1, 5, 3], [6, 2, 3], [6, 1, 3]],
    result: [[1, 3], [8, 0]]
  },
  {
    effect: [[1, 3, 3], [4, 1, 3]],
    result: [[1, 3], [5,0]]
  },
  {
    effect: [[1, 3, 3], [2, 1, 4]],
    result: [[1, 3], [2, 4], [3, 3], [4, 0]]
  },
  {
    effect: [[1, 3, 3], [2, 1, 2]],
    result: [[1, 3], [4, 0]]
  },
  {
    effect: [[1, 3, 3], [2, 1, 3]],
    result: [[1, 3], [4, 0]]
  },
  {
    effect: [[1, 2, 3], [2, 2, 2]],
    result: [[1, 3], [3, 2], [4, 0]]
  },
  {
    effect: [[1, 2, 3], [2, 2, 3]],
    result: [[1, 3], [4, 0]]
  },
  {
    effect: [[1, 2, 3], [2, 1, 2]],
    result: [[1, 3], [3, 0]]
  },
  {
    effect: [[1, 2, 3], [2, 1, 3]],
    result: [[1, 3], [3, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 3, 2]],
    result: [[1, 3], [3, 2], [4, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 3, 3]],
    result: [[1, 3], [4, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 3, 4]],
    result: [[1, 4], [4, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 1, 4]],
    result: [[1, 4], [2, 3], [3, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 2, 4]],
    result: [[1, 4], [3, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 2, 3]],
    result: [[1, 3], [3, 0]]
  },
  {
    effect: [[1, 2, 3], [1, 2, 3]],
    result: [[1, 3], [3, 0]]
  },
  {
    effect: [[1, 2, 3]],
    result: [[1, 3], [3, 0]]
  }
];

effects.forEach((effect) => {
  const result = crowdControlCalc.calculateCrowdControlChange(effect.effect);

  console.log(JSON.stringify(effect.effect));
  console.log(JSON.stringify(result));
  console.log(JSON.stringify(result) === JSON.stringify(effect.result));
  console.log('-----------------------------------------------------------');
});
