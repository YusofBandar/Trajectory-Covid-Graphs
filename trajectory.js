const data = [
    {
        label: 'Wash.',
        angle: 0,
        x: 20,
        y: 20
    },
    {
        label: 'Idaho',
        angle: 0,
        x: 120,
        y: 20
    }
];

window.onload = () => {
    const width = 1000;
    const height = 500;

    const svg = d3.select('body')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('background', '#728ca2');

    appendTrajectories(svg, data);
}

const appendTrajectories = (selection, data) => {
    const trajectories = selection
          .selectAll('.trajectory')
          .data(data)
          .enter()

    trajectories.each((d) => {
        appendTrajectory(selection, d.label, d.angle, d.x, d.y);
    })

    updateTrajectory(selection, 'Idaho', 80);
};

const updateTrajectory = (selection, label, angle) => {
    selection
        .select(`#${label}`)
        .select('.line')
        .transition()
        .duration(1000)
        .ease(d3.easeBack)
        .style('transform', `rotate(${angle}deg)`);
};

const appendTrajectory = (selection, label, angle, x, y, width = 60) => {
    const xPadding = 10;
    const yPadding = 10;

    const tGroup = selection
          .append('g')
          .attr('id', label)
          .attr('class', 'trajectory')
          .style('transform', `translate(${x}px, ${y}px)`);


    const lGroup  = tGroup
          .append('g')
          .attr('class', 'line')
          .style('transform-origin', `${xPadding}px ${yPadding}px`)
          .style('transform', `rotate(${angle}deg)`);

    // start cap
    lGroup
        .append('circle')
        .attr('r', 4)
        .attr('cx', xPadding)
        .attr('cy', yPadding)
        .style('fill', 'white');

    // line
    lGroup
        .append('path')
        .attr('d', `M ${xPadding} ${yPadding} l ${width} 0`)
        .style('stroke', 'white')
        .style('stroke-width', '2px');

    // end cap
    lGroup
        .append('polygon')
        .attr('points',
              `${width + xPadding},`+
              `${yPadding} ${width + xPadding},`+
              `4 ${width + xPadding + 12},`+
              `${yPadding} ${width + xPadding},`+
              `${ yPadding + 6 }`)
        .style('fill', 'white');

    //label
    tGroup
        .append('text')
        .text(label)
        .attr('x', 0)
        .attr('y', 0)
        .style('fill', 'white');
};
