import React from 'react';
import { Typography } from '@mui/material';

import Waypoints from '../data/Waypoints';
import WaypointWeather from './WaypointWeather';

const DisplayWaypoints: React.FunctionComponent<{}> = () => {
    return (
        <div>
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
            <WaypointWeather
                name={Waypoints[0].name}
                lat={Waypoints[0].rawLat}
                long={Waypoints[0].rawLong}
                key={Waypoints[0].rawLat + Waypoints[0].rawLong}
            />
        </div>
    );
};

DisplayWaypoints.displayName = 'DisplayWaypoints';

export default DisplayWaypoints;
