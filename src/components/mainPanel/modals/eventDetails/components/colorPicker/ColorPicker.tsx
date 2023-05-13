import React from 'react'
import { MuiColorInput } from 'mui-color-input'

export const ColorPicker:React.FC<{color:string,setColor:any}> = ({color,setColor}) => {
    const handleChange = (newValue:any) => {
        setColor(newValue)
    }
    return <MuiColorInput label={"color"} value={color} onChange={handleChange} format={"hex"}  />
}