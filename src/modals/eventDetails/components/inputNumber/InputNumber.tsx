import React, {useEffect, useMemo, useState} from "react";
import "./InputNumber.scss"
import {RollModel} from "../../../../models/roll.model";
import {TextField} from "@mui/material";
import {text} from "../../../../utils/dictionary-management";
import {useAppSelector} from "../../../../app/hooks";
import {CapacityModel} from "../../../../models/capacity.model";


export const InputNumber: React.FC<{ key: number, roll: RollModel, capacity: CapacityModel, setCapacityItems: any }> = ({
                                                                                                                            roll,
                                                                                                                            key,
                                                                                                                            capacity,
                                                                                                                            setCapacityItems
                                                                                                                        }) => {
    const {isEnglish,selectedEvent} = useAppSelector(state => state.global)

    let capacityCount = useMemo(()=>{
        return selectedEvent?.capacity?.find((c) => c?.roleId === capacity?.roleId)?.count ?? capacity.count
    },[selectedEvent])

   useEffect(()=>{
       setInitState(false)
   },[selectedEvent])

   const [initState,setInitState]=useState(false)
    return <div style={{direction: isEnglish ? "ltr" : "rtl"}} className={"inputNumberWrapper"}>
        <div className={"descriptionLabel"}>{roll.description}</div>
        <TextField onChange={(e) => {
            capacityCount = parseInt(e.target.value);
            setInitState(true)
            setCapacityItems(capacity.roleId, e.target.value)
        }} required={true}
                   className={"textField"}
                   id={`roll${key}`}
                   type={"number"}
                   label={!initState ?text.amount:""}
                   defaultValue={capacity.count}
                   variant="outlined"
                   dir={isEnglish ? "ltr" : "rtl"}
                   style={{width: "20%"}}
                   inputProps={{ min: 0 }}
                   value={!initState ? capacityCount:undefined}
        />
    </div>
}