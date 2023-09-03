import "./HeaderPage.scss"
import React from "react";
import {Icon} from "../../../../components/icon/Icon";
import {setSelectedPage} from "../../../../store/global.slice";
import {SelectedPage} from "../../../../utils/enum.const";
import {useDispatch} from "react-redux";
export const HeaderPage:React.FC<{headerName:string}>=({headerName})=>{
    const dispatch = useDispatch()

    const backToMainPanel=()=>{
        dispatch(setSelectedPage(SelectedPage.MainPanel))
    }
    return  <div className={"availabilityPageHeaderContainer"}>
        <div className={"availabilityPageHeaderWrapper"}/>
        <div style={{display:"flex",justifyContent:"center",fontSize:24,width:"100%"}}>
            {headerName}
        </div>
        <div onClick={backToMainPanel} className={"availabilityPageHeaderWrapper"}>
            <Icon name={"back_arrow"}/>
        </div>
    </div>
}