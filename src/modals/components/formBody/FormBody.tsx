import "./FormBody.scss"
import {ModalHeader} from "../header/ModalHeader";
import {text} from "../../../utils/dictionary-management";
import React from "react";
import {CacheProvider} from "@emotion/react";
import {cacheRtl} from "../../../utils/general";
import {Button} from "@mui/material";

export const FormBody: React.FC<{ children: React.ReactNode, closeModal: any, title: string, handleSubmit: any ,deleteEventFunction?:any,isNewEvent?:boolean}> = ({
                                                                                                                         children,
                                                                                                                         closeModal,
                                                                                                                         title,
                                                                                                                         handleSubmit,
                                                                                                                         deleteEventFunction,
                                                                                                                         isNewEvent=true,
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
                <Button className={"submitButton"} type="submit" variant="contained">{text.submit}</Button>
                {!isNewEvent && <Button color={"error"} className={"submitButton"} type="button" variant="contained" onClick={deleteEventFunction}>{text.delete}</Button>}
            </div>

        </form>
    </div>
}