import { FunctionComponent, ReactNode, useState, useEffect, createContext } from 'react';
import Locations, { Location, Coordinate, Coordinates } from '../data/Locations';

export type WeatherData = {
    location: string;
    lat: Coordinate;
    long: Coordinate;
    pointsURL: string;
    forecastURL: string;
    forecast?: {
        updated: string;
        elevation: {
            unitCode: UnitLengthShort;
            value: number;
        };
        periods?: Period[];
    };
    hourlyForecastURL: string;
    hourlyForecast?: {
        updated: string;
        elevation: {
            unitCode: UnitLengthShort;
            value: number;
        };
        periods?: Period[];
    };
    nearestCity: string;
    state: string;
};

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

export const UNIT_CODE_LENGTH = 'wmoUnit:m';

export type UnitLengthShort = 'm' | 'ft';

export type WeatherContextProps = Record<Location, WeatherData>;

export const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

const WeatherContextProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [weatherData, setWeatherData] = useState<Record<Location, WeatherData>>({});

    useEffect(() => {
        // fetchWeather();
    });

    return (
        <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
            {children}
        </WeatherContext.Provider>
    );
};

export default WeatherContextProvider;
