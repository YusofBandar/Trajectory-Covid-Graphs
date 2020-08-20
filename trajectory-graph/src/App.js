import React, { useState, useEffect } from 'react';
import IndexContext from './indexContext';
import StatesService from './services/statesService';
import states from './states';

import Twitter from './img/twitter.svg';
import Github from './img/github.svg';

import styles from './App.module.css'

import TrajectoriesStates from './ui/trajectories-states/TrajectoriesStates';
import ScalesStates from './ui/scales-states/ScalesStates';
import CircleStates from './ui/circle-states/CircleStates';

function App() {
    const [isLoading, response] = useStateData();
    const [index, setIndex] = useState(0);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if(!isLoading){
            setIndex(response.values().next().value.length);
        }
    }, [isLoading, response])

    return (
        <IndexContext.Provider value={{ index, setIndex, play, setPlay }}>
          <div className={ styles.app }>
            { !isLoading &&
              <TrajectoriesStates
                title='US States Positive Cases Trajectories'
                data={ response }
                dimension='positiveIncrease'
                maxValue={ 8000 }/> }
            { !isLoading &&
              <TrajectoriesStates
                title='US States Number of Deaths Trajectories'
                data={ response }
                dimension='deathIncrease'
                maxValue={ 800 }/> }
            { !isLoading &&
              <ScalesStates
                title='US States Number of Positive Cases'
                data={ response }
                dimension='positive'/> }
            { !isLoading &&
              <ScalesStates
                title='US States Number of Deaths'
                data={ response }
                dimension='death'/> }
            { !isLoading &&
              <CircleStates
                title='US States Number of Positive Cases Compared to the Number of Deaths'
                data={ response }
                parentDimension='positive'
                childDimension='death'/> }
          </div>
          <footer className={ styles.footer }>
            <span className={ styles.author }>Yusof Bandar</span>
            <a href='https://twitter.com/BandarYusof' target='_blank' rel='noopener noreferrer'>
              <img className={ styles.icon } src={ Twitter } alt='twitter'/>
            </a>
            <a href='https://github.com/YusofBandar' target='_blank' rel='noopener noreferrer'>
              <img className={ styles.icon } src={ Github } alt='github'/>
            </a>
          </footer>
        </IndexContext.Provider>
    );
}

export default App;


function useFetch(url, options) {
    const [isLoading, setLoading] = useState(true);
    const [response, setResponse] = useState({});

    useEffect(() => {
        const request = async () => {
            setLoading(true);
            const res = await fetch(url, options);
            const json = await res.json();

            setResponse(json);
            setLoading(false);
        }

        request();
    }, [url, options]);

    return [isLoading, response];
}

function useStateData(){
    const [ isFetchLoading, response ] = useFetch(
      !window.location.href.includes('api') ? './daily.json' :
      'https://covidtracking.com/api/v1/states/daily.json');
    const [ data, setData ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if(!isFetchLoading){
            const stateData = response
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
            const groups = StatesService.groupByState(stateData);
            const maxLen = getMaxDataLength(groups);

            for(const state of groups.keys()){
                let orderedData = StatesService.orderByDate(groups.get(state));
                const len = orderedData.length;
                orderedData = StatesService.startPadArray(orderedData, orderedData[0], maxLen - len);

                groups.set(state, orderedData);
            }


            setData(groups);
            setIsLoading(false);
        }

    }, [isFetchLoading, response])

    return [isLoading, data]
}

function getMaxDataLength(map) {
    let len = 0;
    for(const key of map.keys()){
        len = Math.max(map.get(key).length, len);
    }

    return len;
};
