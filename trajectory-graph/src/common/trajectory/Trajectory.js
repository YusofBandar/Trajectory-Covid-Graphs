import React from 'react';
import PropTypes from 'prop-types';

import styles from './Trajectory.module.css';

/**
 * Trajectory
 */
function Trajectory({ label, x, y, angle, width }) {
    return (
        <g className={ styles.trajectory } style={{ transform: `translate(${ x }px, ${ y }px)` }}>
          <text className={ styles.label } x={0} y={0}>{ label }</text>
          <g className={ styles.arrow } style={{ transformOrigin: `${10}px ${10}px`, transform: `rotate(${angle}deg)` }}>
            <circle className={ styles.startCap } r={4} cx={10} cy={10}/>
            <path className={ styles.line } d={`M 10 10 l ${ width } 0`}/>
            <polygon className={ styles.endCap } points={
                `${ width + 10 },` +
                `10 ${ width + 10 },` +
                `4 ${ width + 10 + 12 },` +
                `10 ${ width + 10 },` +
                `${ 10 + 6 }`
            }/>
          </g>
        </g>
    );
};

Trajectory.propTypes = {
    label: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
    width: PropTypes.number
};

Trajectory.defaultProps = {
    width: 60
};


export default Trajectory;
