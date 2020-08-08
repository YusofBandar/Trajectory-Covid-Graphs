import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import StatesService from '../../services/statesService';

import Map from '../../common/map/Map';
import Scale from '../../common/scale/Scale';
import MonthSlider from '../month-slider/MonthSlider';

import styles from './TrajectoriesStates.module.css';

/**
 * TrajectoriesStates
 */
function TrajectoriesStates({ title, data, dimension, maxValue }) {
    const [date, setDate] = useState(0);
    const scale = useCallback(StatesService.scales(maxValue), [maxValue]);
    const dataLength = data.values().next().value.length;

    const currentPoint = [];
    getStates(data, date).forEach(state => {
        const diff = state.data[dimension];
        let angle = diff < 0 ? scale(Math.abs(diff)) : -1 * scale(diff);
        angle = Math.min(Math.max(angle, -90), 90);

        currentPoint.push({ ...state, angle });
    })

    const handleDateChange = (value) => {
        setDate(value);
    };

    const labels = StatesService.distributedMonths('Mar', dataLength).map((l, i) => ({
        label: l,
        point: i * 25
    }));

    return (
        <div className={ styles.map }>
          <h1 className={ styles.title }>{ title }</h1>
          <Map data={ currentPoint }/>
          <MonthSlider value={ date } length={ dataLength - 1 } labels={ labels } onChange={ handleDateChange }/>
          <div className={ styles.scale }>
            <Scale min={ 0 } max={ maxValue }/>
          </div>
        </div>
    );
};

function getStates (states, index) {
    let stateTrajectories = [];
    states.forEach(seriesData => {
        stateTrajectories.push(seriesData[index]);
    });
    return stateTrajectories;
};

TrajectoriesStates.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dimension: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
};


export default TrajectoriesStates;
