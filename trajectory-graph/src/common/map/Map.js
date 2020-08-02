import React from 'react';
import PropTypes from 'prop-types';

import Trajectory from '../trajectory/Trajectory';

import styles from './Map.module.css';

/**
 * Map
 */
function Map({ data }) {
    return (
        <svg className={ styles.map } width={1100} height={900}>
          { data && data.map(d => (
              <Trajectory
                key ={ d.label }
                label={ d.label }
                x={ d.x }
                y={ d.y }
                angle={ d.angle }/>
          ))}
        </svg>
    );
};

Map.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape(Trajectory.PropTypes)).isRequired
};

export default Map;
