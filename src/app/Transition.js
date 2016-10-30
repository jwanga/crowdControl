/**
 * The Transition class is a node in a linked list that defines the time of a severity transition.
 */
class Transition {

  constructor(time = 0, duration = 0, severity = 0, previous = null, next = null) {
    this.time = time;
    this.duration = duration;
    this.severity = severity;
    this.previous = previous;
    this.next = next;
    
    //All new transitions should be proceded by a transition back to 0.
    if (duration !== 0 && !next) {
      this.next = new Transition(this.time + this.duration, 0, 0, this);
    }
  }

  /**
   * Compares the passed transition to the current instance and appends it appropriately.
   * @param {Transition} - The transition to append.
   */
  append(transition) {
    
    if (transition.time === this.time 
        && (transition.time + transition.duration) === (this.time + this.duration)
        && transition.severity > this.severity) {
      //The passed transition starts and ends at the same time and has a greater severity.

      this.previous.next = transition;

    } else if (transition.time === this.time 
        && (transition.time + transition.duration) > (this.time + this.duration)
        && transition.severity > this.severity) {
      //The passed transition starts at the same time, ends later, and has a greater and severity.

      if (!this.previous) {
        this.previous = this;
      }

      this.previous.next = transition.severity != this.previous.severity 
                          ? transition 
                          : transition.next; 
      
    } else if (transition.time === this.time 
        && (transition.time + transition.duration) > (this.time + this.duration)
        && transition.severity === this.severity) {
      //The passed transition starts at the same time, ends later, and has the same sevarity.

      this.previous.next = transition;
      
    } else if (transition.time === this.time 
        && (transition.time + transition.duration) > (this.time + this.duration)
        && transition.severity < this.severity) {
      //The passed transition starts at the same time , ends later, and has a lesser sevarity.

      const newTransition = new Transition(this.time + this.duration, 
                                  (this.time + this.duration) - (transition.time + transition.duration),
                                  transition.severity, 
                                  this, 
                                  transition.next);
      this.next = newTransition;
      
    } else if (transition.time === this.time 
        && (transition.time + transition.duration) < (this.time + this.duration) 
        && transition.severity > this.severity) {
      //The passed transition starts at the same time, ends earlier, and has a greater sevarity.

      const newTransition = new Transition(transition.time + transition.duration, 
                                  (this.time + this.duration) - (transition.time + transition.duration),
                                  this.severity, 
                                  transition, 
                                  this.next);
        
      transition.next = newTransition;
      this.previous.next = transition;
      
    } else if (transition.time > this.time 
        && (transition.time + transition.duration) === (this.time + this.duration)
        && transition.severity > this.severity) {
      //The passed transition starts later, ends at the same time, and has a greater sevarity.

      if(this.next.next){
        transition.next = this.next.next;
      }

      this.next = transition;
      
    } else if (transition.time > this.time 
        && (transition.time + transition.duration) < (this.time + this.duration)
        && transition.severity > this.severity) {
       //The passed transition starts later, ends before, and has a greater sevarity.

      const newTransition = new Transition(transition.time + transition.duration, 
                                  (this.time + this.duration) - (transition.time + transition.duration),
                                  this.severity, 
                                  transition, 
                                  this.next);
        
      transition.next = newTransition;
      this.next = transition;
      
    } else if (transition.time > this.time 
        && transition.time < (this.time + this.duration)
        && (transition.time + transition.duration) > (this.time + this.duration)
        && transition.severity >= this.severity) {
      //The passed transition starts before the currrent transition ends, ends after and has a greater or equal sevarity.

      this.next = transition.severity > this.severity 
                  ? transition
                  : transition.next;

    } else if (transition.time > this.time 
        && transition.time < (this.time + this.duration)
        && (transition.time + transition.duration) > (this.time + this.duration)
        && transition.severity < this.severity) {
      //The passed transition starts before the currrent transition ends, ends after and has a lesser sevarity.

      if (this.next.next) {
        transition.next.append(this.next.next);
      }

      const newTransition = new Transition(this.time + this.duration, 
                                    (transition.time + transition.duration) - (this.time + this.duration),
                                    transition.severity, 
                                    this, 
                                    transition.next);
                                    
      this.next = newTransition;
      
    } else if (transition.time >= (this.time + this.duration)) {
      //The passed transition starts after the current transition ends.

      transition.previous = this;
      if (!this.next) {
        this.next = transition;
      } else {
        this.next.append(transition);
      }
    }
  }
}