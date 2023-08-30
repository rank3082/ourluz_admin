import "./ShiftManager.scss"
import {text} from "../../utils/dictionary-management";
import React, { useState} from "react";
import {setSelectedPopup} from "../../store/global.slice";
import {useDispatch} from "react-redux";
import {SelectedPopup} from "../../utils/enum.const";
import {Autocomplete, TextField} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {FormBody} from "../components/formBody/FormBody";
import {EventModel} from "../../models/event.model";
import {ShiftManagerMenu} from "./components/shiftMannagerMenu/ShiftManagerMenu";

export const ShiftManager = () => {
    const dispatch = useDispatch()
    const {eventList, isEnglish, rollList} = useAppSelector(state => state.global);
    const closeModal = () => {
        dispatch(setSelectedPopup(SelectedPopup.Close))
    }
    const [inputValue, setInputValue] = useState("");
    const [selectedEventFromList, setSelectedEventFromList] = useState<EventModel | undefined>();
    const eventOptions = Object.values(eventList).map((eventItem) => eventItem)

    const selectedEvent = (eventObj: EventModel) => {
        setSelectedEventFromList(eventObj)
    }

    const handleSubmit = () => {

    }


    return <div className="side-modal">
        <FormBody closeModal={closeModal} title={text.shiftManager} handleSubmit={handleSubmit} withoutSubmit>
            <Autocomplete
                className={"selectEventAutoComplete"}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(event: any, newValue: EventModel | null) => {
                    newValue && selectedEvent(newValue);
                }}
                dir={isEnglish ? "ltr" : "rtl"}
                size={"small"}
                disablePortal
                id="combo-box-demo"
                options={eventOptions}
                getOptionLabel={(option) => option.description}
                renderInput={params => <TextField style={{fontSize: "30px !important"}}
                                                  className="text-Field-style" {...params}
                                                  label={text.selectEventForm}/>}
            />
            {selectedEventFromList && <ShiftManagerMenu selectedEvent={selectedEventFromList}/>}
        </FormBody>
    </div>
}