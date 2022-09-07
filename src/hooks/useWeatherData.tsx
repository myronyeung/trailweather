import { useEffect, useState } from 'react';

import { Location, Coordinate, Coordinates } from '../data/Locations';

export const useWeatherData = (locationData: Record<Location, Coordinates>): any => {
    const [weatherData, setWeatherData] = useState<Record<Location, WeatherData>>({});

    const name = Object.keys(locationData)[0];
    const { lat, long } = locationData[name];

    // If no data for a location, fetch it and store it.
    const goGetIt = async (): Promise<any> => {
        console.log('Hello');
        fetch(`https://api.weather.gov/points/${lat},${long}`)
            .then((response) => response.json())
            .then((data) => {
                const firstLevelData: WeatherData = {
                    location: name,
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
                        setWeatherData((weatherData) => {
                            weatherData[name] = firstLevelData;
                            return weatherData;
                        });
                        console.log('finally');
                    })
                    .catch((error) => {
                        console.log(error); // eslint-disable-line no-console
                    });
            });
    };

    useEffect(() => {
        console.log('From useWeatherData');
        console.dir(weatherData);
        if (weatherData[name]) return;
        goGetIt();
        // console.dir(weatherData);
    });

    // Save data for location
    if (weatherData[name]) return weatherData[name];
};
