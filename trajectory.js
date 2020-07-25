window.onload = () => {
    const width = 1090;
    const height = 900;

    const svg = d3.select('body')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('background', '#728ca2');

    d3.json('./states.json').then((data) => {
        const names = Object.keys(data);
        const states = names.map((n) => {
            const state = data[n];
            state.angle = 0;
            return state;
        });

        appendTrajectories(svg, states);
    });
    
};

const angleScales = (data) => {
    const min = data[d3.minIndex(data,(d) => d - data[0])];
    const max = data[d3.maxIndex(data,(d) => d - data[0])];

    // scale for when trajectory is positive
    const anglePositiveScale = d3.scaleLinear()
                                 .domain([data[0], max])
                                 .range([0, -90]);

    // scale for when trajectory is negative
    const angleNegativeScale = d3.scaleLinear()
                                 .domain([data[0], min])
                                 .range([0, 90]);

    return [anglePositiveScale, angleNegativeScale];
};

const appendTrajectories = (selection, data) => {
    const trajectories = selection
          .selectAll('.trajectory')
          .data(data)
          .enter()

    trajectories.each((d) => {
        appendTrajectory(selection, d);
    });
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

const appendTrajectory = (selection, data, width = 60) => {
    const { label, displayName, angle, x, y } = data;
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
        .text(displayName)
        .attr('x', 0)
        .attr('y', 0)
        .style('fill', 'white');
};
