import React from 'react';

import { AppBar } from '@mui/material';

const TopNav: React.FunctionComponent<{}> = () => {
    return (
        <div className="header">
            <h1>TrailWeather</h1>
        </div>
    );
};

TopNav.displayName = 'TopNav';

export default TopNav;
