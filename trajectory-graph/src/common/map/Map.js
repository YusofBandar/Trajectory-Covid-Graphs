import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IndexContext from '../../indexContext';
import StatesService from '../../services/statesService';

import MonthSlider from '../../ui/month-slider/MonthSlider';

import styles from './Map.module.css';

/**
 * Map
 */
function Map({ title, data, children }) {
    const { index, setIndex } = useContext(IndexContext);

    const dataLength = data.values().next().value.length;

    const labels = StatesService.distributedMonths('Mar', dataLength).map((l, i) => ({
        label: l,
        point: i * 25
    }));

    const currentPoints = [];
    getData(data, index).forEach(point => {
        currentPoints.push(point);
    });

    const handleDateChange = (value) => {
        setIndex(value);
    };

    return (
      <div className={ styles.mapWrapper }>
        <h1 className={ styles.title }>{ title }</h1>
        <svg className={ styles.map }>
          { children(currentPoints) }
        </svg>
        <MonthSlider value={ index } length={ dataLength - 1 } labels={ labels } onChange={ handleDateChange }/>
      </div>
    );
};

function getData(data, index) {
    let points = [];
    data.forEach(seriesData => {
        points.push(seriesData[index]);
    });
    return points;
};

Map.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
};

export default Map;
