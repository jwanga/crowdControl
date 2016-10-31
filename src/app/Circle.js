/**
 * Circle SVG.
 */
class Circle {

  constructor(radius , center, text, isValid) {
    
    this.radius = radius;
    this.cx = center;
    this.cy = center;
    this.text = text;
    this.isValid = isValid
    this.containerSize = center * 2;
    this.textHeight = 20;

    //Create the svg wrapper.
    this._svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._svg.setAttribute('class', 'circle');
    this._svg.setAttribute('viewBox', `0 0 ${this.containerSize} ${this.containerSize + this.textHeight}`);
  }

  /**
   * Renders the circle as a DOM Element.
   * @return {Element} A circle SVG Element.
   */
  render() {

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this._svg.appendChild(text);
    this._svg.appendChild(circle);

    //Set the text attributes. We want toposition the text at the center bottom of the svg.
    text.textContent = this.text;
    text.setAttribute('x', this.cx);
    text.setAttribute('y', this.containerSize + this.textHeight - (this.textHeight * .25));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('class', this.isValid ? 'valid': 'invalid');

    //Set the circle attributes.
    circle.setAttribute('cx', this.cx);
    circle.setAttribute('cy', this.cy);
    circle.setAttribute('r', this.radius);

    return this._svg;
  }
}