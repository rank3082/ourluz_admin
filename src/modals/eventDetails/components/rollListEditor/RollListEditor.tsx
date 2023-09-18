import React from "react";
import "./RollListEditor.scss"
import {CapacityModel} from "../../../../models/capacity.model";
import {InputNumber} from "../inputNumber/InputNumber";
import {useAppSelector} from "../../../../app/hooks";
export const RollListEditor:React.FC<{capacity:CapacityModel[],setCapacity:any}>=({capacity,setCapacity})=>{
    const {rollList} = useAppSelector(state => state.global)

    const updateCapacityArray = (rollId:number, newCount:number) => {
        const updatedCapacityItem = capacity.map((c) =>
            c.roleId === rollId ? { ...c, count: newCount } : c
        );
        setCapacity(updatedCapacityItem);
    };

    const currentCapacityMemo= (rollId:number):CapacityModel|undefined =>{
       return  capacity.find((c)=>c.roleId === rollId)
    }
    return <>
        {rollList.map((roll,index)=>{
            const currentCapacity:CapacityModel|undefined = currentCapacityMemo(roll.id)
            return currentCapacity && <InputNumber
                capacity={currentCapacity}
                setCapacityItems={(rollId:number, newCount:number)=>updateCapacityArray(rollId, newCount)} key={index} roll={roll}/>
        })}
    </>
}