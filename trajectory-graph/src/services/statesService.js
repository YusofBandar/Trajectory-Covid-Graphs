import * as d3 from 'd3';
import { group } from 'd3-array';


/**
 * Groups data by state
 * @param states
 */
function groupByState(states){
    console.log(states);
    return group(states, d => d.state);
}

export default {
    groupByState
}
