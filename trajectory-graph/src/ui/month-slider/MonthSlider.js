import React from 'react';
import PropTypes from 'prop-types';

import Play from '../../img/play.svg';
import Pause from '../../img/pause.svg';

import Slider from '../../common/slider/Slider';

import styles from './MonthSlider.module.css';


/**
 * MonthSlider
 */
function MonthSlider({ play, value, length, labels, onClick, onChange }) {
    return (
        <div className={ styles.slider }>
          <img className={ styles.play } onClick={ onClick } src={ play ? Pause : Play } alt='play'/>
          <Slider value={ value } onChange={ onChange } labels={ labels } inputProps={{min: 0, max: length}}/>
        </div>
    );
};

MonthSlider.propTypes = {
    play: PropTypes.bool,
    value: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired
    })),
    onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

MonthSlider.defaultProps = {
    play: false
};


export default MonthSlider;
