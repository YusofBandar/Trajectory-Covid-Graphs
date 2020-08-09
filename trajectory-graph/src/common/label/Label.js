import React from 'react';
import PropTypes from 'prop-types';

import styles from './Label.module.css';

/**
 * Label
 */
function Label({ label, x, y, scale }) {
    return (
        <g className={ styles.label } style={{ transform: `translate(${ x }px, ${ y }px)`, fontSize: `${ scale }px` }}>
          <text className={ styles.title } x={0} y={0}>{ label }</text>
        </g>
    )
};

Label.propTypes = {
    label: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
};


export default Label;
