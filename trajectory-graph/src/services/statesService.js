import * as d3 from 'd3';
import { group } from 'd3-array';

/**
 * Groups data by state
 * @param states
 */
function groupByState(states){
    return group(states, d => d.label);
}

/**
 * Returns state name from abbr
 */
function abbrStateToName(state){
    state = state.toUpperCase();
    for(let i = 0; i < stateNames.length; i++){
        if(stateNames[i][1] === state){
            return(stateNames[i][0]);
        }
    }
}

/**
 * Returns min and max increase in cases
 */
function minMaxIncrease(states){
    const min = d3.min(states, d => d.data.positiveIncrease);
    const max = d3.max(states, d => d.data.positiveIncrease);

    return [min, max];
}

/**
 * Return positive and negative scales
 */
function scales(min, max){
    const pScale = d3.scaleLinear()
                     .domain([0, max])
                     .range([0, -90]);

    const nScale = d3.scaleLinear()
                     .domain([0, min])
                     .range([0, 90]);

    return [nScale, pScale];
}

export default {
    groupByState,
    abbrStateToName,
    minMaxIncrease,
    scales
}

const stateNames = [
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
