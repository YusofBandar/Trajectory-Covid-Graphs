import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import styles from './Scale.module.css';

/**
 * Scale
 */
function Scale({ min, max }) {
    const arc = d3.arc()
                  .innerRadius(98)
                  .outerRadius(100)
                  .startAngle(0 * (Math.PI/180))
                  .endAngle(90 * (Math.PI/180))();

    return (
        <svg className={ styles.scale }>
          <g className={ styles.arc }>
            <text x={ 0 } y={ -110 } >{ max }</text>
            <path d={ arc }/>
            <text x={ 110 } y={ 0 } >{ min }</text>
          </g>
        </svg>
    );
};

Scale.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default Scale;
