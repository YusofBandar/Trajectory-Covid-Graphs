import React from 'react';
import PropTypes from 'prop-types';

import styles from './CircleScale.module.css';

/**
 *  Scale
 */
function CircleScale({ min, max }) {
    return (
        <svg width={120} height={100}>
            <g>
                <circle className={ styles.circle } cx={10} cy={40} r={1}/>
                <text className={ styles.label } x={10} y={95}>{ min }</text>
            </g>
            <g>
                <circle className={ styles.circle } cx={80} cy={40} r={35}/>
                <text className={ styles.label } x={80} y={95}>{ max }</text>
            </g>
        </svg>
    );
};

CircleScale.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default CircleScale;
