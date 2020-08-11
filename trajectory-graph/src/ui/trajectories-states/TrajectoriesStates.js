import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import StatesService from '../../services/statesService';

import Map from '../../common/map/Map';
import Trajectory from '../../common/trajectory/Trajectory';
import AngleScale from '../../common/angle-scale/AngleScale';

import styles from './TrajectoriesStates.module.css';

/**
 * TrajectoriesStates
 */
function TrajectoriesStates({ title, data, dimension, maxValue }) {
    const scale = useCallback(StatesService.scales(0, maxValue, 0, 90), [maxValue]);

    return (
        <div className={ styles.map }>
          <Map title={ title } data={ data }>
            {(currentPoints) => {
                const trajectories = [];
                currentPoints.forEach(state => {
                    const diff = state.data[dimension];
                    let angle = diff < 0 ? scale(Math.abs(diff)) : -1 * scale(diff);
                    angle = Math.min(Math.max(angle, -90), 90);

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
          <div className={ styles.scale }>
            <AngleScale min={ 0 } max={ maxValue }/>
          </div>
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
