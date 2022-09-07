import React from 'react';
import './App.css';

import TopNav from './components/TopNav';
import ListWaypoints from './components/ListWaypoints';
import DisplayWaypoints from './components/DisplayWaypoints';
import WeatherContextProvider from './Context/WeatherContextProvider';

import { useWeatherData } from './hooks/useWeatherData';

function App() {
    return (
        <div className="App">
            <TopNav />
            <div className="container">
                <WeatherContextProvider>
                    <ListWaypoints />
                    <DisplayWaypoints />
                </WeatherContextProvider>
            </div>
        </div>
    );
}

export default App;
