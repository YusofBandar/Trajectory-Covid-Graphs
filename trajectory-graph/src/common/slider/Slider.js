import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slider.module.css';

/**
 * Slider
 */
function Slider({ labels, valueLabel, value, min, max, onChange, inputProps }) {
    return (
        <div className={ styles.sliderWrapper }>
            { valueLabel && <span className={ styles.valueLabel } style={{ left: `${(value / max) * 100}%` }}>{ valueLabel }</span> }
            <input
                className={ styles.slider }
                value={ value }
                min={ min }
                max={ max }
                onChange={ onChange }
                type='range'
                { ...inputProps }/>
            { labels && labels.map(({ label, point }) => (
                <span style={{ left: `${point}%` }} className={ styles.label }>{ label }</span>
            ))}
        </div>
    )
};

Slider.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired
    })),
    valueLabel: PropTypes.string,
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};


export default Slider;
