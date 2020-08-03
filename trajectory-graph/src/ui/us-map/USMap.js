import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StatesService from '../../services/statesService';
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
    const [date, setDate] = useState(100);
    const [stateData ] = useState(() => {
        const stateData = data
              .filter(d => StatesService.abbrStateToName(d.state))
              .map(d => {
                  const label = StatesService.abbrStateToName(d.state);
                  const meta = states[label];
                  return {
                      ...meta,
                      data: { ...d },
                      label
                  }
              });
        const increaseExtents = StatesService.minMaxIncrease(stateData);
        const scales = StatesService.scales(increaseExtents[0], increaseExtents[1]);
        const groups = StatesService.groupByState(stateData);

        return { groups, scales };
    })

    const [nScale, pScale] = stateData.scales;



    const currentPoint = [];
    getStates(stateData.groups, date).forEach(state => {
        if(state){
            const diff = state.data.positiveIncrease;
            let angle = diff < 0 ? nScale(diff) : pScale(diff);
            angle = Math.min(Math.max(angle, -90), 90);

            currentPoint.push({ ...state, angle });
        }
    })


    const handleDateChange = (event) => {
        setDate(Number(event.target.value));
    };

    const handlePlayClick = () => {
        setPlay(play => !play);
    };

    return (
        <div className={ styles.map }>
          <h1 className={ styles.title }>{ title }</h1>
          <Map data={ currentPoint }/>
          <div className={ styles.slider }>
            <img className={ styles.play } onClick={ handlePlayClick } src={ play ? Pause : Play } alt='play'/>
            <Slider value={ date } onChange={ handleDateChange }/>
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

USMap.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default USMap;
