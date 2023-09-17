import "./FormBody.scss"
import {ModalHeader} from "../header/ModalHeader";
import {text} from "../../../utils/dictionary-management";
import React from "react";
import {CacheProvider} from "@emotion/react";
import {cacheRtl} from "../../../utils/general";
import {Button} from "@mui/material";

export const FormBody: React.FC<{ children: React.ReactNode, closeModal: any, title: string, handleSubmit: any ,deleteEventFunction?:any,isNewEvent?:boolean,withoutSubmit?:boolean}> = ({
                                                                                                                         children,
                                                                                                                         closeModal,
                                                                                                                         title,
                                                                                                                         handleSubmit,
                                                                                                                         deleteEventFunction,
                                                                                                                         isNewEvent=true,
                                                                                                                         withoutSubmit=false
                                                                                                                     }) => {


    return <div className={"formBodyContainer"}>
        <ModalHeader closeFunction={closeModal} title={title}/>
        <form className={"formContainer"} onSubmit={handleSubmit}>
            <div className={"fieldWrapper"}>
                <CacheProvider value={cacheRtl}>
                    {children}
                </CacheProvider>
            </div>
            <div className={"bottomButtonsWrapper"}>
                {!withoutSubmit && <Button className={"submitButton"} type="submit" variant="contained">{text.submit}</Button>}
                {!withoutSubmit && <Button onClick={closeModal} color={"inherit"} className={"submitButton"} type="button" variant="contained">סגור</Button>}
                {!isNewEvent && <Button color={"error"} className={"submitButton"} type="button" variant="contained" onClick={deleteEventFunction}>{text.delete}</Button>}
            </div>

        </form>
    </div>
}