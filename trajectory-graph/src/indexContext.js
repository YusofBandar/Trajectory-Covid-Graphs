import React from 'react';

const IndexContext = React.createContext({
    index: 0,
    setIndex: () => {},
});

export default IndexContext;
