import React, { useState } from 'react';
import PropTypes from 'prop-types';
import states from './states'

import Map from '../../common/map/Map';
import Slider from '../../common/slider/Slider';

import styles from './USMap.module.css';

/**
 * USMap
 */
function USMap({ title, data }) {
    const [date, setDate] = useState(50);
    let stateData = data.map(d => {
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

    return (
        <div className={ styles.map }>
          <h1 className={ styles.title }>{ title }</h1>
          <Map data={ stateData }/>
          <div className={ styles.slider }>
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
