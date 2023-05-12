import React from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {CalendarComponent} from "./components/calendar/CalendarComponent";


function App() {

    return (<div className="App">
        <Header/>
        <CalendarComponent/>
    </div>);
}

export default App;
