import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StatesService from '../../services/statesService';
import states from './states'

import Map from '../../common/map/Map';
import Scale from '../../common/scale/Scale';
import MonthSlider from '../month-slider/MonthSlider';

import styles from './TrajectoriesStates.module.css';

/**
 * TrajectoriesStates
 */
function TrajectoriesStates({ title, data, dimension, maxValue }) {
    const [date, setDate] = useState(0);

    const [stateData ] = useState(() => {
        const stateData = data
              .filter(d => StatesService.abbrStateToName(d.state))
              .map(d => {
                  const label = StatesService.abbrStateToName(d.state);
                  const meta = states[label];
                  return {
                      ...meta,
                      data: { ...d },
                      label: meta.displayName
                  }
              });
        const scale = StatesService.scales(maxValue);
        const groups = StatesService.groupByState(stateData);
        const maxLen = getMaxDataLength(groups);

        for(const state of groups.keys()){
            let orderedData = StatesService.orderByDate(groups.get(state));
            const len = orderedData.length;
            orderedData = StatesService.startPadArray(orderedData, orderedData[0], maxLen - len);

            groups.set(state, orderedData);
        }

        return { groups, scale };
    })

    const scale = stateData.scale;
    const dataLength = stateData.groups.values().next().value.length;

    const currentPoint = [];
    getStates(stateData.groups, date).forEach(state => {
        const diff = state.data[dimension];
        let angle = diff < 0 ? scale(Math.abs(diff)) : -1 * scale(diff);
        angle = Math.min(Math.max(angle, -90), 90);

        currentPoint.push({ ...state, angle });
    })

    const handleDateChange = (value) => {
        console.log(value, dataLength);
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


function getMaxDataLength(map) {
    let len = 0;
    for(const key of map.keys()){
        len = Math.max(map.get(key).length, len);
    }

    return len;
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
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    dimension: PropTypes.string.isRequired,
    maxValue: PropTypes.number.isRequired
};


export default TrajectoriesStates;
