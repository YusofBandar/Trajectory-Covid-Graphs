import React from 'react';
import PropTypes from 'prop-types';
import states from './states'

import Map from '../../common/map/Map';

import styles from './USMap.module.css';

/**
 * USMap
 */
function USMap({ title, data }) {
    let stateData = data.map(d => {
        const meta = states[d.state];
        return {
            ...d,
            ...meta,
            label: meta.displayName
        };
    });

    return (
        <div className={ styles.map }>
          <h1 className={ styles.title }>{ title }</h1>
          <Map data={ stateData }/>
        </div>
    );
};

USMap.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default USMap;
