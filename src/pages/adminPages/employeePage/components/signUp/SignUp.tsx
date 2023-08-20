import React, {useState} from "react";
import "./SignUp.scss"
import {Button, TextField} from "@mui/material";
import {text} from "../../../../../utils/dictionary-management";
import {useAppSelector} from "../../../../../app/hooks";
import {CacheProvider} from "@emotion/react";
import {cacheRtl} from "../../../../../utils/general";
import {createNewUser, updateUserById} from "../../../../../utils/data-management";
import {SelectRoles} from "./components/selectRoles/SelectRoles";
import {UserModel} from "../../../../../models/user.model";

export const SignUp: React.FC<{ isEditMode?: boolean, selectedUser?: UserModel, closeDialog?: any, setEmployeeList?: any }> = ({
                                                                                                                                   isEditMode = false,
                                                                                                                                   selectedUser,
                                                                                                                                   closeDialog,
                                                                                                                                   setEmployeeList
                                                                                                                               }) => {
    const {isEnglish,isAdmin} = useAppSelector(state => state.global)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState(isEditMode ? (selectedUser as UserModel).firstName : "")
    const [lastName, setLastName] = useState(isEditMode ? (selectedUser as UserModel).lastName : "")
    const [email, setEmail] = useState(isEditMode ? (selectedUser as UserModel).email : "")
    const [phoneNumber, setPhoneNumber] = useState(isEditMode ? (selectedUser as UserModel).mobile : "")
    const [selectedRoles, setSelectedRoles] = useState<number[]>(isEditMode ? (selectedUser as UserModel).roleIds : []);
    const [permanentEmployee, setPermanentEmployee] = useState<number>(isEditMode ? (selectedUser as UserModel).permanentEmployee as number??0 : 0);
    console.log(permanentEmployee,"permanentEmployee")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode) {
            updateUserById({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: phoneNumber,
                roleIds: selectedRoles,
                id: (selectedUser as UserModel).id,
                permanentEmployee: permanentEmployee
            }).then(() => {
                closeDialog()
            })
        } else {
            createNewUser({
                username: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: phoneNumber,
                roleIds: selectedRoles,
            }).then((r) => {
                setEmployeeList()

            })
        }
    }

    return <div className={"signUpContainer"}>
        <form className={"signUpForm"} onSubmit={handleSubmit}>
            <CacheProvider value={cacheRtl}>
                <div className={"signUpFormBodyContainer"}>

                    {!isEditMode &&
                        <TextField onChange={(e) => setUserName(e.target.value)} required={true} className={"textField"}
                                   id="username"
                                   label={text.userName}
                                   defaultValue={userName}
                                   variant="outlined"
                                   dir={isEnglish ? "ltr" : "rtl"}
                        />}
                    {!isEditMode &&
                        <TextField onChange={(e) => setPassword(e.target.value)} required={true} className={"textField"}
                                   id="password"
                                   label={text.password}
                                   defaultValue={password}
                                   variant="outlined"
                                   dir={isEnglish ? "ltr" : "rtl"}
                        />}
                    <TextField onChange={(e) => setFirstName(e.target.value)} required={true} className={"textField"}
                               id="firstName"
                               label={text.firstName}
                               defaultValue={firstName}
                               variant="outlined"
                               dir={isEnglish ? "ltr" : "rtl"}
                    />
                    <TextField onChange={(e) => setLastName(e.target.value)} required={true} className={"textField"}
                               id="lastName"
                               label={text.lastName}
                               defaultValue={lastName}
                               variant="outlined"
                               dir={isEnglish ? "ltr" : "rtl"}
                    />
                    <TextField onChange={(e) => setEmail(e.target.value)} required={true} className={"textField"}
                               id="email"
                               label={text.email}
                               defaultValue={email}
                               variant="outlined"
                               dir={isEnglish ? "ltr" : "rtl"}
                    />
                    <TextField onChange={(e) => setPhoneNumber(e.target.value)} required={true} className={"textField"}
                               id="mobile"
                               label={text.phoneNumber}
                               defaultValue={phoneNumber}
                               variant="outlined"
                               type={"number"}
                               dir={isEnglish ? "ltr" : "rtl"}
                    />
                    <div>
                        <SelectRoles selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles}/>
                    </div>
                    <div
                        className="select-dropdown-item"
                        onClick={() => setPermanentEmployee(permanentEmployee===0?1:0)}
                        style={{direction: isEnglish ? "ltr" : "rtl"}}
                    >
                        <input
                            type="checkbox"
                            checked={permanentEmployee===1}
                            readOnly
                        />
                        <span>הגדר כעובד קבוע</span>
                    </div>
                </div>

            </CacheProvider>
            <div className={"signUpBottomWrapper"}>
                <Button className={"signUpButton"} type="submit"
                        variant="contained">{isEditMode ? text.updateDetails : text.signUp}</Button>
            </div>
        </form>
    </div>
}