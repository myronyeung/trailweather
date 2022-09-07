import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import getDateFromString from '../utils/Dates';

export type PeriodData = {
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

export const UNIT_METER = 'wmoUnit:m';

export type WaypointData = {
    id: string;
    type: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
    properties: {
        cwa: string;
        forecastOffice: string;
        gridId: string;
        gridX: number;
        gridY: number;
        forecast: string;
        forecastHourly: string;
        forecastGridData: string;
        observationStations: string;
        relativeLocation: {
            type: string;
            geometry: {
                type: string;
                coordinates: [number, number];
            };
            properties: {
                city: string;
                state: string;
                distance: {
                    unitCode: string;
                    value: number;
                };
                bearing: {
                    unitCode: string;
                    value: number;
                };
            };
        };
        forecastZone: string;
        county: string;
        fireWeatherZone: string;
        timeZone: string;
        radarStation: string;
    };
    forecast?: ForecastData;
    hourlyForecast?: ForecastData;
};

export type ForecastData = {
    type: string;
    geometry: {
        type: string;
        coordinates: [[[number, number]]];
    };
    properties: {
        updated: string;
        units: string;
        forecastGenerator: string;
        generatedAt: string;
        updateTime: string;
        validTimes: string;
        elevation: {
            unitCode: string;
            value: number;
        };
        periods: PeriodData[];
    };
};

export type IWaypointWeatherProps = {
    name: string;
    lat: number;
    long: number;
};

const spinner = 'Data loading...';

const WaypointWeather: React.FunctionComponent<IWaypointWeatherProps> = ({ name, lat, long }) => {
    const [weatherData, setWeatherData] = useState<WaypointData>();

    useEffect(() => {
        let pointData: WaypointData;

        fetch(`https://api.weather.gov/points/${lat},${long}`)
            .then((response) => response.json())
            .then((data) => {
                pointData = data;

                // Fetch forecasts too
                return fetch(pointData.properties.forecast)
                    .then((response) => response.json())
                    .then((forecastData) => {
                        pointData.forecast = forecastData;

                        // Fetch hourly forecasts too
                        return fetch(pointData.properties.forecastHourly)
                            .then((response) => response.json())
                            .then((hourlyForecastData) => {
                                pointData.hourlyForecast = hourlyForecastData;
                            })
                            .catch((error) => {
                                console.log(error); // eslint-disable-line no-console
                            });
                    })
                    .catch((error) => {
                        console.log(error); // eslint-disable-line no-console
                    });
            })
            .finally(() => {
                setWeatherData(pointData);
            })
            .catch((error) => {
                console.log(error); // eslint-disable-line no-console
            });
    }, []);

    return (
        <div id={name.replace(/\s+/g, '')} className="weather-section">
            <h3 className="waypointData">{name}</h3>
            <p>Coordinates: {`(${lat}, ${long})`}</p>
            <p>
                Elevation:{' '}
                {`${Math.round(
                    (weatherData?.forecast?.properties?.elevation?.value || 0) * 3.28084,
                )}ft`}{' '}
                ({`${Math.round(weatherData?.forecast?.properties?.elevation?.value || 0)}m`})
            </p>
            <h4>Forecast:</h4>
            {weatherData ? (
                <div>
                    <p>
                        <a
                            href={`${weatherData?.properties?.forecast}`}
                        >{`${weatherData?.properties?.forecast}`}</a>
                    </p>

                    <table className="weather">
                        <tbody>
                            {weatherData?.forecast?.properties?.periods?.map((period, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{getDateFromString(period.startTime)}</td>
                                        <td>
                                            <img src={period.icon} alt={`Forecast for ${name}`} />
                                        </td>
                                        <td>
                                            {period.temperature}
                                            {period.temperatureUnit}
                                        </td>
                                        <td>{period.detailedForecast}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>{spinner}</p>
            )}
            <h4>Hourly forecast:</h4>
            {weatherData ? (
                <div>
                    <p>
                        <a
                            href={`${weatherData?.properties?.forecastHourly}`}
                        >{`${weatherData?.properties?.forecastHourly}`}</a>
                    </p>

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
                                <table className="weather">
                                    <tbody>
                                        {weatherData?.hourlyForecast?.properties?.periods?.map(
                                            (period, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {getDateFromString(period.startTime)}
                                                        </td>
                                                        <td>
                                                            <img
                                                                src={period.icon}
                                                                alt={`Forecast for ${name}`}
                                                            />
                                                        </td>
                                                        <td>
                                                            {period.temperature}
                                                            {period.temperatureUnit}
                                                        </td>
                                                        <td>{period.shortForecast}</td>
                                                    </tr>
                                                );
                                            },
                                        )}
                                    </tbody>
                                </table>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ) : (
                <p>{spinner}</p>
            )}
        </div>
    );
};

WaypointWeather.displayName = 'WaypointWeather';

export default WaypointWeather;
