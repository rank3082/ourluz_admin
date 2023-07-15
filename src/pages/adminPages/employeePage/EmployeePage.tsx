import React, {useState} from "react";
import "./EmployeePage.scss"
import {Icon} from "../../../components/icon/Icon";
import {setSelectedPage} from "../../../store/global.slice";
import {SelectedPage} from "../../../utils/enum.const";
import {useDispatch} from "react-redux";
import {SignUp} from "./components/signUp/SignUp";
import "./EmployeePage.scss"
import {Button} from "@mui/material";
import {text} from "../../../utils/dictionary-management";
import "../../mainPanel/MainPanel.scss"
import {Header} from "../../mainPanel/components/header/Header";
import {EmployeeList} from "./components/employeeList/EmployeeList";
export const EmployeePage = () => {
    const dispatch = useDispatch()
    const [showEmployeeList,setEmployeeList]=useState(false)
    return <div className={"employeePageContainer"}>
        <Header/>
        <div  className={"employeeHeaderWrapper"} onClick={() => dispatch(setSelectedPage(SelectedPage.MainPanel))}>
            <div className={"arrowWrapper"}>
            <Icon  name={"back_arrow"} />
            </div>
            <span>{text.back}</span>
        </div>
        <div className={"employeeHeaderButtons addEventButtonWrapper"}>
        <Button
            className={!showEmployeeList ? "addEventButtonSelected" : "addEventButtonNotSelected"}
            onClick={()=>setEmployeeList(false)}>
            {text.showEmployeeList}
        </Button>
        <Button
            className={showEmployeeList ? "addEventButtonSelected" : "addEventButtonNotSelected"}
            onClick={()=>setEmployeeList(true)}>
            {text.addNewEmployee}
        </Button>
        </div>
        {showEmployeeList ?<SignUp isEditMode={false} setEmployeeList={()=>setEmployeeList(false)}/>:<EmployeeList/>}
        </div>
}