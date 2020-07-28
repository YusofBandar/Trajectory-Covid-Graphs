window.onload = () => {
    const width = 1090;
    const height = 900;

    const svg = d3.select('body')
                  .append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style('background', '#728ca2');

    d3.csv('https://covidtracking.com/api/v1/states/daily.csv').then(data => {
        let states = d3.group(data, d => d.state);
        const [pScale, nScale] = angleScales(states);

        console.log(states);

        d3.json('./states.json').then(metaStateData => {
            let stateTrajectories = [];
            getStates(states, 0).map(d => {
                d.state = abbrState(d.state, 'name');
                if(d.state){
                    const metaData = metaStateData[d.state]
                    stateTrajectories.push({ ...d, ...metaData, label: d.state });
                }
            });
            appendTitle(svg, 'The Trajectory of each States Positive Tests');
            appendTrajectories(svg, stateTrajectories);


            let index = 1;
            d3.interval(() => {
                let stateTrajectories = [];
                getStates(states, index).map(state => {
                    if(state){
                        if(state.state = abbrState(state.state, 'name')) {
                            const metaData = metaStateData[state.state]
                            const diff = state.positiveIncrease;

                            let angle = diff > 0 ? pScale(diff) : nScale(Math.abs(diff));
                            angle = Math.min(Math.max(angle, -90), 90);

                            stateTrajectories.push({ ...state, ...metaData, label: state.state, angle });
                        }
                    }
                });
                updateTrajectories(svg, stateTrajectories);
                index += 1;

            }, 500);
        });
    });
};
const abbrState = (input, to) => {

    let states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['District of Columbia', 'DC'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
};

const getStates = (states, index) => {
    let stateTrajectories = [];
    states.forEach(seriesData => {
        stateTrajectories.push(seriesData[index]);
    });
    return stateTrajectories;
};

const angleScales = (states) => {
    const min = [];
    states.forEach((d) => {
        min.push(d3.min(d, d => d.positiveIncrease));
    });

    const max = [];
    states.forEach((d) => {
        max.push(d3.max(d, d => d.positiveIncrease));
    });

    // scale for when trajectory is positive
    const anglePositiveScale = d3.scaleLinear()
                                 .domain([0, d3.max(max)])
                                 .range([0, -90]);

    // scale for when trajectory is negative
    const angleNegativeScale = d3.scaleLinear()
                                 .domain([0, d3.min(min)])
                                 .range([0, 90]);

    return [anglePositiveScale, angleNegativeScale];
};

const appendTitle = (selection, title) => {
    selection
        .append('g')
        .append('text')
        .attr('x', '50%')
        .attr('y', '150px')
        .style('text-anchor', 'middle')
        .text(title)
};

const updateTrajectories = (selection, data) => {
    data.forEach(d => {
        updateTrajectory(selection, d.label, d.angle);
    });
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
        .select(`#${label.replace(/ /g,'')}`)
        .select('.line')
        .transition()
        .duration(1000)
        .ease(d3.easeBack)
        .style('transform', `rotate(${angle}deg)`);
};

const appendTrajectory = (selection, data, width = 60) => {
    const { label, displayName, x, y } = data;
    const xPadding = 10;
    const yPadding = 10;

    const tGroup = selection
          .append('g')
          .attr('id', label.replace(/ /g,''))
          .attr('class', 'trajectory')
          .style('transform', `translate(${x}px, ${y}px)`);


    const lGroup  = tGroup
          .append('g')
          .attr('class', 'line')
          .style('transform-origin', `${xPadding}px ${yPadding}px`)
          .style('transform', `rotate(0deg)`);

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
