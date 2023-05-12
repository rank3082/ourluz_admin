import "./MainPanel.scss"
import {Header} from "./components/header/Header";
import {CalendarComponent} from "./components/calendarComponent/CalendarComponent";
import React from "react";
import {text} from "../../utils/dictionary-management";

export const MainPanel = () => {
    return <div className="mainPanelContainer">
        <Header/>
        <div className={"mainPanelBody"}>
        <div className={"addEventButtonWrapper"}>
            <span className={"addEventButtonText"}>
                {text.AddEventBtn}
            </span>
        </div>
        <CalendarComponent/>
        </div>
    </div>
}