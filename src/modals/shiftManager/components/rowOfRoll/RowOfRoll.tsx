import "./RowOfRoll.scss"
import React from "react";
import {RollModel} from "../../../../models/roll.model";
import {Icon} from "../../../../components/icon/Icon";
export const RowOfRoll:React.FC<{roll:RollModel,selectedRoll:number|null}>=({roll,selectedRoll})=>{
    return <div className={"rollRow"}>
        {selectedRoll===roll.id && <div className={"checkIcon"}> <Icon name={"check"} /></div>}
        <span className={`rollDescription ${selectedRoll===roll.id?"selectedRoll":"notSelectedRoll"}`}>{roll.description}</span>
    </div>
}