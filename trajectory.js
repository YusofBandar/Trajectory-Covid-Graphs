window.onload = () => {
    const width = 1000;
    const height = 500;

    const svg = d3.select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#728ca2');

    const trajectory = svg.append('g')
       .style('transform', 'translate(50px, 50px)')


    const tWidth = 80;

    trajectory
        .append('circle')
        .attr('r', 4)
        .attr('cx', 4)
        .attr('cy', 0)
        .style('fill', 'white')

    trajectory
        .append('path')
        .attr('d', `M 0 0 l ${tWidth} 0`)
        .style('stroke', 'white')
        .style('stroke-width', '2px')

    trajectory
        .append('polygon')
        .attr('points', `${tWidth},0 ${tWidth},-6 ${tWidth + 12},0 ${tWidth},6`)
        .style('fill', 'white');

}
