import React from 'react';
import { Typography } from '@mui/material';

import Waypoints from '../data/Waypoints';
import WaypointWeather from './WaypointWeather';

const DisplayWaypoints: React.FunctionComponent<{}> = () => {
    return (
        <div className="list-weather">
            {Waypoints.map((waypoint) => {
                return (
                    <WaypointWeather
                        name={waypoint.name}
                        lat={waypoint.rawLat}
                        long={waypoint.rawLong}
                        key={waypoint.rawLat + waypoint.rawLong}
                    />
                );
            })}
        </div>
    );
};

DisplayWaypoints.displayName = 'DisplayWaypoints';

export default DisplayWaypoints;
