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
      //Singly linked list of effect transitions.
      this.output = new Transition();
    }

    /**
     * Maps an array of crowd control effects to an array crowd control transitions.
     * @param {array} input - An array of all applied crowd control effects.
     * @ returns {array} An array of crowd controll transitions
     */
    calculateCrowdControlChange( input ) {
      
      if (!Array.isArray(input)) {
        throw new Error('"calculateCrowdControlChange" must be called with an array');
      }

      input.forEach((effect) => {
        if (!Array.isArray(effect)){

        }
        //this.output
      });

      console.log('foo2', JSON.stringify(input), JSON.stringify(this.toArray()));
    }

    /**
     * Maps the output linked list to a 2D array.
     * @returns {array} 2D array of effect transitions.
     */
    toArray() {
      let node = this.output;
      // 2D array of transitions.
      let output = [];

      while(node.next) {
        output.push([node.time, node.severity]);
        node = node.next;
      }

      return output;
    }
  }

  return new Calculator();
}());

crowdControlCalc.calculateCrowdControlChange([[1, 2, 3], [2, 3, 3], [1, 5, 3], [6, 2, 3], [6, 1, 3]]);
crowdControlCalc.calculateCrowdControlChange();