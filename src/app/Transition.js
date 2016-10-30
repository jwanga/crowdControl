/**
 * The Transition class is a node in a singly linked list that defines the time an effect severity transition.
 */
class Transition {
  constructor(time = 0, severity = 0) {
    this.time = time;
    this.severity = severity;
    this.next = null;
  }
}