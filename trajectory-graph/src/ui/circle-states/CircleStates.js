import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import statesService from '../../services/statesService';

import Map from '../../common/map/Map';
import NestedCircles from '../../common/nested-circles/NestedCircles';

import styles from './CircleStates.module.css';

/**
 * CircleStates
 */
function CircleStates({ title, data, parentDimension, childDimension }) {
    const maxValue = statesService.maxDimensionValue(data, parentDimension);
    const scale = useCallback(
        d3.scaleLinear()
          .domain([0, maxValue])
          .range([1, 35])
    );

    return (
        <div className={ styles.map }>
          <Map title={ title } data={ data }>
            { (currentPoints) => {
                const circles = [];
                currentPoints.forEach(state => {
                    const parentValue = scale(state.data[parentDimension]);
                    const childValue = scale(state.data[childDimension]);
                    circles.push(
                        <NestedCircles
                          key={ state.displayName }
                          label={state.data.state}
                          parentRadius={parentValue}
                          childRadius={childValue}
                          x={state.x}
                          y={state.y}/>
                    );
                })

                return circles;
            }}
          </Map>
        </div>
    );
};

CircleStates.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    parentDimension: PropTypes.string.isRequired,
    childDimension: PropTypes.string.isRequired
};


export default CircleStates;
