import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Map from '../../common/map/Map';
import Label from '../../common/label/Label';

import styles from './ScalesStates.module.css';

/**
 * ScalesStates
 */
function ScalesStates({ title, data, dimension }) {
    const maxValue = maxDimensionValue(data, dimension);
    const scale = useCallback(
        d3.scaleLinear()
          .domain([0, maxValue])
          .range([10, 60])
    );

    return (
        <div className={ styles.map }>
          <Map title={ title } data={ data }>
            { (currentPoints) => {
                const labels = [];
                currentPoints.forEach(state => {
                    const value = scale(state.data[dimension]);
                    labels.push(
                        <Label
                          key={ state.label }
                          label={ state.data.state }
                          x={ state.x }
                          y={ state.y }
                          scale={ value }/>
                    );
                })

                return labels;
            }}
          </Map>
        </div>
    );
};

function maxDimensionValue(map, dimension){
    let max = 0;
    for(const key of map.keys()){
        for(const value of map.get(key)){
            max = Math.max(max, value.data[dimension]);
        }
    }

    return max;
}

ScalesStates.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dimension: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
};


export default ScalesStates;
