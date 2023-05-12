import './EventDetails.scss'
import {useDispatch} from "react-redux";
import {setEventDetailPopupOpen} from "../../../../store/global.slice";
import React from "react";
import {ModalHeader} from "../components/header/ModalHeader";
import {text} from "../../../../utils/dictionary-management";

export const EventDetails = () => {
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setEventDetailPopupOpen(false))
    }
    // const [outsideRef] = useOutsideAlerter(closeModal);

    return <div  className="side-modal">
        <ModalHeader closeFunction={closeModal} title={text.eventDetails}/>

    </div>
}