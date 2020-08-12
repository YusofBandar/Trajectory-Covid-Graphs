import React from 'react';

const IndexContext = React.createContext({
    index: 0,
    setIndex: () => {},
    play: false,
    setPlay: () => {}
});

export default IndexContext;
