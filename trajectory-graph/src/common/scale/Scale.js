import React from 'react';
import PropTypes from 'prop-types';

import styles from './Scale.module.css';

/**
 *  Scale
 */
function Scale({ min, max }) {
    return (
        <div className={ styles.scale }>
          <div className={ styles.points }>
            <span className={ styles.min }>A</span>
            <span className={ styles.max }>A</span>
          </div>
          <div className={ styles.labels }>
            <span>{ min }</span>
            <span>{ max }</span>
          </div>
        </div>
    );
};

Scale.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default Scale;
