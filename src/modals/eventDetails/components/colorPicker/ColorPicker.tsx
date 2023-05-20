import React from 'react'
import { MuiColorInput } from 'mui-color-input'
import {text} from "../../../../utils/dictionary-management";
import {useAppSelector} from "../../../../app/hooks";

export const ColorPicker:React.FC<{backgroundColor:string,setBackgroundColor:any}> = ({backgroundColor,setBackgroundColor}) => {
    const {isEnglish} = useAppSelector(state => state.global);
    const handleChange = (newValue:any) => {
        setBackgroundColor(newValue)
    }
    return <MuiColorInput    dir={isEnglish?"ltr":"rtl"} label={text.color} value={backgroundColor} onChange={handleChange} format={"hex"}  />
}