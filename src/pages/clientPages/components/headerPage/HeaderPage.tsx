import "./HeaderPage.scss"
import React from "react";
import {Icon} from "../../../../components/icon/Icon";
import {setSelectedPage} from "../../../../store/global.slice";
import {SelectedPage} from "../../../../utils/enum.const";
import {useDispatch} from "react-redux";
export const HeaderPage=()=>{
    const dispatch = useDispatch()

    const backToMainPanel=()=>{
        dispatch(setSelectedPage(SelectedPage.MainPanel))
    }
    return  <div className={"availabilityPageHeaderContainer"}>
        <div onClick={backToMainPanel} className={"availabilityPageHeaderWrapper"}>
            <Icon name={"back_arrow"}/>
        </div>
    </div>
}