import "./ShiftManager.scss"
import {text} from "../../utils/dictionary-management";
import React, {useState} from "react";
import {setSelectedPopup} from "../../store/global.slice";
import {useDispatch} from "react-redux";
import {SelectedPopup} from "../../utils/enum.const";
import {Autocomplete, TextField} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {FormBody} from "../components/formBody/FormBody";

export const ShiftManager = () => {
    const dispatch = useDispatch()
    const {eventList,isEnglish} = useAppSelector(state => state.global);

    const closeModal = () => {
        dispatch(setSelectedPopup(SelectedPopup.Close))
    }
    const [inputValue, setInputValue] = useState("");
    const [selectedEventFromList, setSelectedEventFromList] = useState<string>(Object.values(eventList)[0]?.description ?? {});
    const eventOptions = Object.values(eventList).map((eventItem) => eventItem.description)


    const handleSubmit=()=>{

    }
    return <div className="side-modal">
        <FormBody closeModal={closeModal} title={text.shiftManager} handleSubmit={handleSubmit}>
            <Autocomplete
                className={"selectEventAutoComplete"}
                value={selectedEventFromList}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(event: any, newValue: string | null) => {
                    newValue && setSelectedEventFromList(newValue);
                }}
                dir={isEnglish?"ltr":"rtl"}
                size={"small"}
                disablePortal
                id="combo-box-demo"
                options={eventOptions}
                renderInput={params => <TextField style={{fontSize: "30px !important"}} className="text-Field-style" {...params} label={text.selectEventForm}/>}
            />
        </FormBody>
    </div>
}