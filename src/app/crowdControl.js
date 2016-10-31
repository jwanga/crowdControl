(function() {
  
  //Get the dome elements.
  const graphElement = document.querySelector('.graph');
  const inputElement = document.querySelector('.input');


  //The magnitude of the severity graph axis.
  const severityMagnitude = 50;

  //Retrieve the inputs, outputs and solution.
  const input = crowdControlTestData.randomTestInput();
  const output = crowdControlCalc.calculateCrowdControlChange(input);
  const solution = crowdControlTestData.getSolutionForLastTestInput();
  const isValid = JSON.stringify(output) === JSON.stringify(solution);

  //Find the max and min sevarity in the output so we can scale the graph accordingly.
  const maxSeverity = Math.max(...output.map((transition) => transition[1]));

  //Calculate the percentage width of each circle so we can scale the graph accordingly.
  const circleWidth = 100 / output.length;

  //Set the legend
  inputElement.textContent = `Input: ${JSON.stringify(input)}`;


  //Loop through the out put and render the result on the graph.
  output.forEach((transition) => {
    const severityScaled = (transition[1] / maxSeverity) * severityMagnitude;
    const circle = new Circle(severityScaled, severityMagnitude, JSON.stringify(transition), isValid).render();

    circle.style.width = `${circleWidth}%`;

    graphElement.appendChild(circle);
  });

}());