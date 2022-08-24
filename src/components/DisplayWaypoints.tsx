import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Waypoints from "../data/Waypoints";
import getDateFromString from "../utils/Dates";

export type Period = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
};

export type UnitCode = "wmoUnit:m";

export type Waypoint = {
  location: string;
  lat: number;
  long: number;
  pointsURL: string;
  forecastURL: string;
  forecast?: {
    updated: string;
    elevation: {
      unitCode: UnitCode;
      value: number;
    };
    periods?: Period[];
  };
  hourlyForecastURL: string;
  hourlyForecast?: {
    updated: string;
    elevation: {
      unitCode: UnitCode;
      value: number;
    };
    periods?: Period[];
  };
  nearestCity: string;
  state: string;
};

const DisplayWaypoints: React.FunctionComponent<{}> = () => {
  const [weatherData, setWeatherData] = useState<Waypoint[]>([]);

  useEffect(() => {
    getInfo();
    console.dir(weatherData);
  }, []);

  useEffect(() => {
    console.dir(weatherData);
  }, [weatherData]);

  const getInfo = async (): Promise<void> => {
    Waypoints.forEach((waypoint) => {
      fetch(
        `https://api.weather.gov/points/${waypoint.rawLat},${waypoint.rawLong}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (
            !weatherData.find((elem) => {
              return elem.pointsURL === data.id;
            })
          ) {
            console.log(data);

            const firstLevelData: Waypoint = {
              location: waypoint.name,
              lat: data.geometry.coordinates[1],
              long: data.geometry.coordinates[0],
              pointsURL: data.id,
              forecastURL: data.properties.forecast,
              hourlyForecastURL: data.properties.forecastHourly,
              nearestCity: data.properties.relativeLocation.properties.city,
              state: data.properties.relativeLocation.properties.state,
            };

            // Fetch forecasts too
            fetch(data.properties.forecast)
              .then((response) => response.json())
              .then((data) => {
                firstLevelData.forecast = {
                  updated: data.properties.updated,
                  elevation: data.properties.elevation,
                  periods: data.properties.periods,
                };
              })
              .catch((error) => {
                console.log(error); // eslint-disable-line no-console
              });

            // Fetch hourly forecasts too
            fetch(data.properties.forecastHourly)
              .then((response) => response.json())
              .then((data) => {
                firstLevelData.hourlyForecast = {
                  updated: data.properties.updated,
                  elevation: data.properties.elevation,
                  periods: data.properties.periods,
                };
              })
              .catch((error) => {
                console.log(error); // eslint-disable-line no-console
              })
              .finally(() => {
                setWeatherData((weatherData) => [
                  ...weatherData,
                  {
                    ...firstLevelData,
                  },
                ]);
              });
          }
        })
        .catch((error) => {
          console.log(error); // eslint-disable-line no-console
        });
    });
  };

  return (
    <div>
      <h2>Weather Reports</h2>
      {weatherData ? (
        weatherData.map((obj, index) => {
          return (
            <ul key={index}>
              <li key={index} style={{ marginBottom: "50px" }}>
                <div>
                  <h3 id={obj.location}>{obj.location}</h3>
                  <a href={obj.pointsURL}>{obj.pointsURL}</a>
                  <br />
                  {`Nearest city: ${obj.nearestCity}, ${obj.state}`}
                  <br />
                  {`Coordinates: ${obj.lat}, ${obj.long}`}
                  <br />
                  <a href={obj.forecastURL}>{obj.forecastURL}</a>
                  <br />
                  {obj.forecast ? (
                    <div>
                      {obj.forecast.updated && (
                        <p>
                          Updated: {getDateFromString(obj.forecast.updated)}
                        </p>
                      )}
                      {obj.forecast.elevation && (
                        <div>
                          <p>
                            {obj.forecast.elevation.value} in{" "}
                            {obj.forecast?.elevation.unitCode}
                          </p>
                          <p>
                            {obj.forecast.elevation.value &&
                              (obj.forecast?.elevation.value * 3.2808).toFixed(
                                0
                              )}{" "}
                            in feet
                          </p>
                        </div>
                      )}
                      {obj.forecast.periods && (
                        <ul>
                          {obj.forecast?.periods?.map((period, index) => {
                            return (
                              <li key={index}>
                                <p>
                                  {getDateFromString(period.startTime)} (
                                  {period.name}
                                  ): {period.temperature}
                                  {period.temperatureUnit},{" "}
                                  {period.shortForecast}{" "}
                                  <img
                                    src={period.icon}
                                    alt={period.shortForecast}
                                  />
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <p className="error">
                      Unable to get forecast data for this location
                    </p>
                  )}
                  <a href={obj.hourlyForecastURL}>{obj.hourlyForecastURL}</a>
                  <br />
                  {obj.hourlyForecast ? (
                    <div>
                      {obj.hourlyForecast.updated && (
                        <p>
                          Updated:{" "}
                          {getDateFromString(obj.hourlyForecast.updated)}
                        </p>
                      )}
                      {obj.hourlyForecast.elevation && (
                        <div>
                          <p>
                            {obj.hourlyForecast.elevation.value} in{" "}
                            {obj.hourlyForecast?.elevation.unitCode}
                          </p>
                          <p>
                            {obj.hourlyForecast.elevation.value &&
                              (
                                obj.hourlyForecast.elevation.value * 3.2808
                              ).toFixed(0)}{" "}
                            in feet
                          </p>
                        </div>
                      )}
                      {obj.hourlyForecast.periods && (
                        <div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography>Hourly forecast</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                <ul>
                                  {obj.hourlyForecast?.periods?.map(
                                    (period, index) => {
                                      return (
                                        <li key={index}>
                                          <p>
                                            {getDateFromString(
                                              period.startTime
                                            )}{" "}
                                            {period.name && `(${period.name}) `}
                                            {period.temperature}
                                            {period.temperatureUnit},{" "}
                                            {period.shortForecast}{" "}
                                            <img
                                              src={period.icon}
                                              alt={period.shortForecast}
                                            />
                                          </p>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="error">
                      Unable to get hourly forecast data for this location
                    </p>
                  )}
                </div>
              </li>
            </ul>
          );
        })
      ) : (
        <p className="error">
          Unable to get data from National Weather Service
        </p>
      )}
      <h2>Debug</h2>
      <p>weatherData length = {weatherData.length}</p>
    </div>
  );
};

DisplayWaypoints.displayName = "DisplayWaypoints";

export default DisplayWaypoints;
