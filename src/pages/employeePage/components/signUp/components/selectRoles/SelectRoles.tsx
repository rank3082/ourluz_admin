import React  from 'react';
import "./SelectRoles.scss"
import {useAppSelector} from "../../../../../../app/hooks";
import {text} from "../../../../../../utils/dictionary-management";

export const SelectRoles:React.FC<{selectedRoles:number[],setSelectedRoles:any}>=({selectedRoles,setSelectedRoles})=> {
const {rollList,isEnglish}=useAppSelector(state => state.global)
    const handleOptionChange = (optionId: number) => {
        if (selectedRoles.includes(optionId)) {
            setSelectedRoles(selectedRoles.filter((id) => id !== optionId));
        } else {
            setSelectedRoles([...selectedRoles, optionId]);
        }
    };

    return (
        <div className={"selectRolesContainer"}>
            <div style={{direction: isEnglish ? "ltr" : "rtl"}}  className={"chooseRollsHeader"}>
                <span>{text.selectRoles}</span>
            </div>
                <div className="select-dropdown">
                    {rollList.map((roll) => (
                        <div
                            key={roll.id}
                            className="select-dropdown-item"
                            onClick={() => handleOptionChange(roll.id)}
                       style={{direction: isEnglish ? "ltr" : "rtl"}}
                        >
                            <input
                                type="checkbox"
                                checked={selectedRoles.includes(roll.id)}
                                readOnly
                            />
                            <span>{roll.description}</span>
                        </div>
                    ))}
                </div>
        </div>
    );
}

