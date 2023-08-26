import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from "./App";
import {WeeklyBookedCalender} from "./pages/weeklyBookedCalander/WeeklyBookedCalender";
import {FirstLoginPage} from "./pages/firstLoginPage/FirstLoginPage";

export const MainRoutes: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/weeklyBooking/from/:from/to/:to" element={<WeeklyBookedCalender />}/>
                    <Route path="/firstLogin/:token" element={<FirstLoginPage />}/>
                    <Route path="/" element={<App />} />
                </Routes>
        </Router>
    );
};

