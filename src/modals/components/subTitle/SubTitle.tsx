import "./SubTitle.scss"
import React from "react";
import {useAppSelector} from "../../../app/hooks";
export const SubTitle:React.FC<{title:string}>=({title})=>{
    const {isEnglish} = useAppSelector(state => state.global)
    return <div className={"subTitleContainer"}>
        <div className={"greyLine"}></div>
        <div style={{direction:isEnglish?"ltr":"rtl"}} className={"subTitleText"}>
            {title}
        </div>
    </div>
}