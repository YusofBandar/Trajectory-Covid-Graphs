import React from 'react';
import PropTypes from 'prop-types';

import styles from './NestedCircles.module.css';

/**
 * NestedCircles
 */
function NestedCircles({label, x, y, parentRadius, childRadius}) {
    return (
        <g style={{ transform: `translate(${ x }px, ${ y }px)` }}>
          <circle className={ styles.parentCircle } r={parentRadius} cx={0} cy={0}/>
          <circle className={ styles.childCircle } r={childRadius} cx={0} cy={0}/>
          <text className={ styles.label } x={0} y={parentRadius + 20}>{ label }</text>
        </g>
    );
};

NestedCircles.propTypes = {
    label: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    parentRadius: PropTypes.number.isRequired,
    childRadius: PropTypes.number.isRequired
};

export default NestedCircles;
