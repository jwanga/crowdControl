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
