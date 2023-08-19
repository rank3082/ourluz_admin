import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from "./App";
import {WeeklyBookedCalender} from "./pages/weeklyBookedCalander/WeeklyBookedCalender";
import {useAppSelector} from "./app/hooks";
import moment from "moment/moment";

export const MainRoutes: React.FC = () => {
    // const {weeklyEventList,weekDates} = useAppSelector(state => state.global);
    // console.log(weeklyEventList,"weeklyEventList")
    // path="/parameter/:param1/:param2"
    return (
        <Router>
                <Routes>
                    <Route path="/weeklyBooking/from/:from/to/:to" element={<WeeklyBookedCalender />}/>
                    <Route path="/" element={<App />} />
                </Routes>
        </Router>
    );
};

