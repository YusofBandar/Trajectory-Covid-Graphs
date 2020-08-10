import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import StatesService from '../../services/statesService';

import Label from '../../common/label/Label';
import MonthSlider from '../month-slider/MonthSlider';

import styles from './ScalesStates.module.css';

/**
 * ScalesStates
 */
function ScalesStates({ title, data, dimension }) {
    const [date, setDate] = useState(0);
    const dataLength = data.values().next().value.length;
    const maxValue = maxDimensionValue(data, dimension);
    const scale = useCallback(
        d3.scaleLinear()
          .domain([0, maxValue])
          .range([10, 60])
    );

    const currentPoint = [];
    getStates(data, date).forEach(state => {
        const value = state.data[dimension];
        state.data.state === 'NY' && console.log(value, scale(value));
        currentPoint.push({ ...state, scale: scale(value) });
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
          <svg className={ styles.states }>
            { currentPoint.map(d => (
                <Label key={ d.label } label={ d.data.state } x={ d.x } y={ d.y } scale={ d.scale }/>
            ))}
          </svg>
          <MonthSlider value={ date } length={ dataLength - 1 } labels={ labels } onChange={ handleDateChange }/>
        </div>
    );
};

function maxDimensionValue(map, dimension){
    let max = 0;
    for(const key of map.keys()){
        for(const value of map.get(key)){
            max = Math.max(max, value.data[dimension]);
        }
    }

    return max;
}

function getStates (states, index) {
    let stateTrajectories = [];
    states.forEach(seriesData => {
        stateTrajectories.push(seriesData[index]);
    });
    return stateTrajectories;
};

ScalesStates.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dimension: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
};


export default ScalesStates;
