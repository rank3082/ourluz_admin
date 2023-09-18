import "./FormBody.scss"
import {ModalHeader} from "../header/ModalHeader";
import {text} from "../../../utils/dictionary-management";
import React, {useState} from "react";
import {CacheProvider} from "@emotion/react";
import {cacheRtl} from "../../../utils/general";
import {Button, Dialog} from "@mui/material";
import {Icon} from "../../../components/icon/Icon";
import {SignUp} from "../../../pages/adminPages/employeePage/components/signUp/SignUp";

export const FormBody: React.FC<{ children: React.ReactNode, closeModal: any, title: string, handleSubmit: any, deleteEventFunction?: any, isNewEvent?: boolean, withoutSubmit?: boolean }> = ({
                                                                                                                                                                                                   children,
                                                                                                                                                                                                   closeModal,
                                                                                                                                                                                                   title,
                                                                                                                                                                                                   handleSubmit,
                                                                                                                                                                                                   deleteEventFunction,
                                                                                                                                                                                                   isNewEvent = true,
                                                                                                                                                                                                   withoutSubmit = false
                                                                                                                                                                                               }) => {

    const [openDialog, setOpenDialog] = useState(false)
    return <div className={"formBodyContainer"}>
        <ModalHeader closeFunction={closeModal} title={title}/>
        <form className={"formContainer"} onSubmit={handleSubmit}>
            <div className={"fieldWrapper"}>
                <CacheProvider value={cacheRtl}>
                    {children}
                </CacheProvider>
            </div>
            <div className={"bottomButtonsWrapper"}>
                {!withoutSubmit &&
                    <Button className={"submitButton"} type="submit" variant="contained">{text.submit}</Button>}
                {!withoutSubmit &&
                    <Button onClick={closeModal} color={"inherit"} className={"submitButton"} type="button"
                            variant="contained">סגור</Button>}
                {!isNewEvent && <Button color={"error"} className={"submitButton"} type="button" variant="contained"
                                        onClick={() => setOpenDialog(true)}>{text.delete}</Button>}
            </div>


            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div className={"dialogContainer"}>
                    <div>
                        <div onClick={() => setOpenDialog(false)} className={"closeX"}>
                            <Icon name={"close_x"}/>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div style={{fontSize: 20, fontWeight: 600}}> ?האם אתה בטוח שברצונך למחוק את האירוע</div>
                        <div style={{color: "var(--alert)"}}> לאחר מחיקה לא יהיה ניתן לשחזר נתונים*</div>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "100%"
                        }}>
                            <Button type="button" variant="contained" color={"error"} onClick={() => {
                                deleteEventFunction()
                                setOpenDialog(false)
                            }}>מחק</Button>
                            <Button type="button" variant="contained" color={"inherit"}
                                    onClick={() => setOpenDialog(false)}>ביטול</Button>
                        </div>
                    </div>

                </div>
            </Dialog>
        </form>
    </div>
}