import React, { useState, useEffect } from 'react';

import styles from './App.module.css'

import TrajectoriesStates from './ui/trajectories-states/TrajectoriesStates';

function App() {
    const [isLoading, response] = useFetch('https://covidtracking.com/api/v1/states/daily.json');
    return (
        <div className={ styles.app }>
          { !isLoading && <TrajectoriesStates title='The Trajectory of each States Positive Tests' data={ response } dimension='positiveInrease'/> }
        </div>
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
            console.log(json);
            setLoading(false);
        }

        request();
    }, [url, options]);

    return [isLoading, response];
}
