import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from "./App";
import {WeeklyBookedCalender} from "./pages/weeklyBookedCalander/WeeklyBookedCalender";

export const MainRoutes: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/weeklyBooking/from/:from/to/:to" element={<WeeklyBookedCalender />}/>
                    <Route path="/" element={<App />} />
                </Routes>
        </Router>
    );
};

