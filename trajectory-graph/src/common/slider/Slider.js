import React from 'react';
import PropTypes from 'prop-types';

import styles from './Slider.module.css';

/**
 * Slider
 */
function Slider({ labels, value, onChange, inputProps }) {
    return (
        <div className={ styles.sliderWrapper }>
          <input
            className={ styles.slider }
            value={ value }
            onChange={ onChange }
            type='range' { ...inputProps }/>
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
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};


export default Slider;
