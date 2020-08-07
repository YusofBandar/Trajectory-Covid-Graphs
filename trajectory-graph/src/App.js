import React, { useState, useEffect } from 'react';

import styles from './App.module.css'

import USMap from './ui/us-map/USMap';

function App() {
    const [isLoading, response] = useFetch('https://covidtracking.com/api/v1/states/daily.json');
    return (
        <div className={ styles.app }>
          { !isLoading && <USMap title='The Trajectory of each States Positive Tests' data={ response }/> }
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
            setLoading(false);
        }

        request();
    }, [url, options]);

    return [isLoading, response];
}
