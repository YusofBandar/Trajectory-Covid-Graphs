import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import statesService from '../../services/statesService';

import Map from '../../common/map/Map';
import Label from '../../common/label/Label';
import Scale from '../../common/scale/Scale';

import styles from './ScalesStates.module.css';

/**
 * ScalesStates
 */
function ScalesStates({ title, data, dimension }) {
    const maxValue = statesService.maxDimensionValue(data, dimension);
    const scale = useCallback(
        d3.scaleLinear()
          .domain([0, maxValue])
          .range([10, 60])
    );

    return (
        <div className={ styles.map }>
          <Map title={ title } data={ data } scale={ <Scale min={0} max={ maxValue }/>}>
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

ScalesStates.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dimension: PropTypes.string.isRequired
};


export default ScalesStates;
