import React from "react";
import "./RollManager.scss"
import {text} from "../../utils/dictionary-management";
import {FormBody} from "../components/formBody/FormBody";
import {setSelectedPopup} from "../../store/global.slice";
import {SelectedPopup} from "../../utils/enum.const";
import {useDispatch} from "react-redux";
export const RollManager=()=>{
    const dispatch=useDispatch()
    const closeModal = () => {
        dispatch(setSelectedPopup(SelectedPopup.Close))
    }
    const handleSubmit=()=>{

    }
    return <div className="side-modal">
        <FormBody closeModal={closeModal} title={text.rollManager} handleSubmit={handleSubmit}>
        <div>asd</div>
        </FormBody>
    </div>
}