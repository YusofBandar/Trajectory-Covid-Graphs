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
 * Converts string date (yyyy/mm/dd) to Date object
 */
function convertToDate(date){
    return  new Date(
        date.toString().slice(0, 4),
        Number(date.toString().slice(4, 6)) -1,
        date.toString().slice(6)
    );
}

/**
 * Returns data array ordered by date in ascending order
 */
function orderByDate(data, accessor){
    accessor = accessor || (({ data }) => (convertToDate(data.date)));

    return data.sort((a, b) => accessor(a) - accessor(b));
}

/**
 * Returns unshifted array by specified length.
 */
function startPadArray (array, value, length){
    const padding = new Array(length).fill().map(() => value);
    return [...padding, ...array];
}

/**
 * Returns max value in map
 */
function maxDimensionValue(map, dimension){
    let max = 0;
    for(const key of map.keys()){
        for(const value of map.get(key)){
            max = Math.max(max, value.data[dimension]);
        }
    }
    return max;
}

/**
 * Returns array of months evenly distrubuted
 */
function distributedMonths(startMonth, days, maxLen = 5){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    const d = Math.floor(days / 30);

    let startIndex = months.indexOf(startMonth);
    let labels = [];
    for(let i =0; i < d; i++){
        labels.push(months[startIndex % months.length]);
        startIndex += 1;
    }

    return distributedCopy(labels, Math.min(labels.length, maxLen));
}

/**
 * Retrieve a fixed number of elements from an array, evenly distributed but
 * always including the first and last elements.
 *
 */
function distributedCopy(items, n) {
    var elements = [items[0]];
    var totalItems = items.length - 2;
    var interval = Math.floor(totalItems/(n - 2));
    for (var i = 1; i < n - 1; i++) {
        elements.push(items[i * interval]);
    }
    elements.push(items[items.length - 1]);
    return elements;
}

export default {
    groupByState,
    abbrStateToName,
    convertToDate,
    orderByDate,
    startPadArray,
    maxDimensionValue,
    distributedMonths
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
