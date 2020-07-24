window.onload = () => {
    const width = 1000;
    const height = 500;

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#728ca2');

    appendTrajectory(svg, 'Alaska', 0, 200, 200);

}


const appendTrajectory = (selection, label, angle, x, y, width = 60) => {
    const tGroup = selection.append('g')
       .style('transform', `translate(${x}px, ${y}px)`)

    // start cap
    tGroup
        .append('circle')
        .attr('r', 4)
        .attr('cx', 0)
        .attr('cy', 0)
        .style('fill', 'white')

    const lGroup  = tGroup
          .append('g')
          .style('transform', `rotate(${angle}deg)`);

    // line
    lGroup
        .append('path')
        .attr('d', `M 0 0 l ${width} ${0}`)
        .style('stroke', 'white')
        .style('stroke-width', '2px')

    // end cap
    lGroup
        .append('polygon')
        .attr('points', `${width},0 ${width},-6 ${width + 12},0 ${width},6`)
        .style('fill', 'white');

    //label
    tGroup
        .append('text')
        .text(label)
        .attr('x', -5)
        .attr('y', -10)
        .style('fill', 'white')
};
