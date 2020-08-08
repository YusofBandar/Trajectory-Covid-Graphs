import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import Play from '../../img/play.svg';
import Pause from '../../img/pause.svg';

import Slider from '../../common/slider/Slider';

import styles from './MonthSlider.module.css';

const useTimer = (callback, interval, inital) => {
    const timer = useRef();

    const [play, setPlay] = useState(inital);
    useEffect(() => {
        if(play){
            typeof timer.current === 'object' && timer.current.stop();
            timer.current = d3.interval(callback, interval);
        }else{
            typeof timer.current === 'object' && timer.current.stop();
        }
    }, [timer, callback, interval, play]);

    return [play, setPlay];
};

/**
 * MonthSlider
 */
function MonthSlider({ value, length, labels, onChange }) {
    const [play, setPlay] = useTimer(() => {
        onChange(value < length ? value + 1 : value);
        value >= length && setPlay(false);
    }, 500, false);


    const handleDateChange = (event) => {
        onChange(Number(event.target.value));
    };

    const handlePlayClick = () => {
        setPlay(play => !play);
    };

    return (
        <div className={ styles.slider }>
          <img className={ styles.play } onClick={ handlePlayClick } src={ play ? Pause : Play } alt='play'/>
          <Slider value={ value } onChange={ handleDateChange } labels={ labels } inputProps={{min: 0, max: length}}/>
        </div>
    );
};

MonthSlider.propTypes = {
    value: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired
    })),
    onChange: PropTypes.func.isRequired
};


export default MonthSlider;
