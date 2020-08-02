import React, { useState } from 'react';
import PropTypes from 'prop-types';
import states from './states'

import Play from '../../img/play.svg';
import Pause from '../../img/pause.svg';

import Map from '../../common/map/Map';
import Slider from '../../common/slider/Slider';

import styles from './USMap.module.css';

/**
 * USMap
 */
function USMap({ title, data }) {
    const [play, setPlay] = useState(false);
    const [date, setDate] = useState(50);
    const stateData = data.map(d => {
        const meta = states[d.state];
        return {
            ...d,
            ...meta,
            label: meta.displayName
        };
    });

    const handleDateChange = (event) => {
        setDate(Number(event.target.value));
    };

    const handlePlayClick = () => {
        setPlay(play => !play);
    };

    return (
        <div className={ styles.map }>
          <h1 className={ styles.title }>{ title }</h1>
          <Map data={ stateData }/>
          <div className={ styles.slider }>
            <img className={ styles.play } onClick={ handlePlayClick } src={ play ? Pause : Play } alt='play'/>
            <Slider value={ date } onChange={ handleDateChange }/>
          </div>
        </div>
    );
};

USMap.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default USMap;
