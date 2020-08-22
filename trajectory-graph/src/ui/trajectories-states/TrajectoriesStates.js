import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Map from '../../common/map/Map';
import Trajectory from '../../common/trajectory/Trajectory';
import AngleScale from '../../common/angle-scale/AngleScale';

import styles from './TrajectoriesStates.module.css';

/**
 * TrajectoriesStates
 */
function TrajectoriesStates({ title, data, dimension, maxValue }) {
    const scale = useCallback(
        d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, 90])
        .clamp(true)
    );

    return (
        <div className={ styles.map }>
            <Map
                title={ title }
                data={ data }
                scale={ <div className={ styles.scale }><AngleScale min={ 0 } max={ maxValue }/></div> }>
                {(currentPoints) => {
                    const trajectories = [];
                    currentPoints.forEach(state => {
                        const diff = state.data[dimension];
                        let angle = diff < 0 ? scale(Math.abs(diff)) : -1 * scale(diff);

                        trajectories.push(
                            <Trajectory
                                key={ state.displayName }
                                label={ state.displayName }
                                x={ state.x }
                                y={ state.y }
                                angle={ angle }/>);
                    });

                    return trajectories;
                }}
            </Map>
        </div>
    );
};

TrajectoriesStates.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dimension: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
};


export default TrajectoriesStates;
