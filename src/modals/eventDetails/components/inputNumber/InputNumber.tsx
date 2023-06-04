import React from "react";
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
    const {isEnglish} = useAppSelector(state => state.global)
    return <div style={{direction: isEnglish ? "ltr" : "rtl"}} className={"inputNumberWrapper"}>
        <div className={"descriptionLabel"}>{roll.description}</div>
        <TextField onChange={(e) => setCapacityItems(capacity.roleId, e.target.value)} required={true}
                   className={"textField"}
                   id={`roll${key}`}
                   type={"number"}
                   label={text.amount}
                   defaultValue={capacity.count}
                   variant="outlined"
                   dir={isEnglish ? "ltr" : "rtl"}
                   style={{width: "20%"}}
                   inputProps={{ min: 0 }}
        />
    </div>
}