import React, { useContext, useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import IndexContext from '../../indexContext';
import StatesService from '../../services/statesService';

import MonthSlider from '../../ui/month-slider/MonthSlider';

import styles from './Map.module.css';

const useTimer = (callback, interval, play) => {
    const timer = useRef();

    useEffect(() => {
        if(play){
            typeof timer.current === 'object' && timer.current.stop();
            timer.current = d3.interval(callback, interval);
        }else{
            typeof timer.current === 'object' && timer.current.stop();
        }
    }, [timer, callback, interval, play]);
};

/**
 * Map
 */
function Map({ title, data, children }) {
    const { index, setIndex, play, setPlay } = useContext(IndexContext);

    const dataLength = data.values().next().value.length;

    useTimer(() => {
        index < dataLength && setIndex(index => index + 1);
        index >= dataLength && setPlay(false);
    }, 500, play);

    const labels = StatesService.distributedMonths('Mar', dataLength).map((l, i) => ({
        label: l,
        point: i * 25
    }));

    const currentPoints = [];
    getData(data, Math.min(dataLength-1, index)).forEach(point => {
        currentPoints.push(point);
    });

    const handleIndexChange = (event) => {
        setIndex(Number(event.target.value));
    };

    const handlePlayClick = () => {
        setPlay(play => !play);
    };

    return (
      <div className={ styles.mapWrapper }>
        <h1 className={ styles.title }>{ title }</h1>
        <svg className={ styles.map }>
          { children(currentPoints) }
        </svg>
        <MonthSlider
          play={ play }
          value={ index }
          length={ dataLength - 1 }
          labels={ labels }
          onClick={ handlePlayClick }
          onChange={ handleIndexChange }/>
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
