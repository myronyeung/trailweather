import React from "react";

import Locations from "../data/Locations";

const ListLocations: React.FunctionComponent<{}> = () => {
  return (
    Locations && (
      <table className="list-waypoints">
        <thead>
          <tr>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(Locations).map((location, index) => {
            return (
              <tr key={index}>
                <td>
                  <a href={`#${location}`}>{location}</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
};

ListLocations.displayName = "ListLocations";

export default ListLocations;
