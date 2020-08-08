import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import StatesService from '../../services/statesService';
import states from './states'

import Play from '../../img/play.svg';
import Pause from '../../img/pause.svg';

import Map from '../../common/map/Map';
import Slider from '../../common/slider/Slider';
import Scale from '../../common/scale/Scale';

import styles from './USMap.module.css';

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
 * USMap
 */
function USMap({ title, data }) {
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
        const scale = StatesService.scales(8000);
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

    const [play, setPlay] = useTimer(() => {
        setDate(date => date < dataLength - 1 ? date + 1 : date);
    }, 500, false);


    const currentPoint = [];
    getStates(stateData.groups, date).forEach(state => {
        const diff = state.data.positiveIncrease;
        let angle = diff < 0 ? scale(Math.abs(diff)) : -1 * scale(diff);
        angle = Math.min(Math.max(angle, -90), 90);

        currentPoint.push({ ...state, angle });
    })

    const handleDateChange = (event) => {
        setDate(Number(event.target.value));
    };

    const handlePlayClick = () => {
        setPlay(play => !play);
    };

    const labels = StatesService.distributedMonths('Mar', dataLength).map((l, i) => ({
        label: l,
        point: i * 25
    }));

    return (
        <div className={ styles.map }>
          <h1 className={ styles.title }>{ title }</h1>
          <Map data={ currentPoint }/>
          <div className={ styles.slider }>
            <img className={ styles.play } onClick={ handlePlayClick } src={ play ? Pause : Play } alt='play'/>
            <Slider value={ date } onChange={ handleDateChange } labels={ labels } inputProps={{min: 0, max: dataLength - 5}}/>
          </div>
          <div className={ styles.scale }>
            <Scale min={ 0 } max={ 8000 }/>
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

USMap.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default USMap;
