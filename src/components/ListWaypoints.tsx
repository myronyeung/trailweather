import React from 'react';

import Waypoints from '../data/Waypoints';

const ListWaypoints: React.FunctionComponent<{}> = () => {
    return (
        Waypoints && (
            <table className="list-waypoints">
                <thead>
                    <tr>
                        <th>
                            <h3 className="waypoint">Location</h3>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Waypoints.map((waypoint, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <a href={`#${waypoint.name.replace(/\s+/g, '')}`}>
                                        {waypoint.name}
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    );
};

ListWaypoints.displayName = 'ListWaypoints';

export default ListWaypoints;
