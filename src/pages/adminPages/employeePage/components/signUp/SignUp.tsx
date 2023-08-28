import React, {useState} from "react";
import "./SignUp.scss"
import {Button, Dialog, TextField} from "@mui/material";
import {text} from "../../../../../utils/dictionary-management";
import {useAppSelector} from "../../../../../app/hooks";
import {CacheProvider} from "@emotion/react";
import {cacheRtl} from "../../../../../utils/general";
import {createNewUser, sendLinkForNewUser, updateUserById} from "../../../../../utils/data-management";
import {SelectRoles} from "./components/selectRoles/SelectRoles";
import {UserModel} from "../../../../../models/user.model";
import {setSelectedEvent, setSelectedPopup} from "../../../../../store/global.slice";
import {SelectedPopup} from "../../../../../utils/enum.const";
import {
    ClientEventDetailsDialog
} from "../../../../mainPanel/components/clientEventDetailsDialog/ClientEventDetailsDialog";

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
    const [subscribeToReminderMessage, setSubscribeToReminderMessage] = useState<number>(isEditMode ? (selectedUser as UserModel).subscribeToReminderMessage as number??0 : 0);
    const [signUpError,setSignUpError]=useState("")


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isEditMode) {
           await updateUserById({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: phoneNumber,
                roleIds: selectedRoles,
                id: (selectedUser as UserModel).id,
                permanentEmployee: permanentEmployee,
                subscribeToReminderMessage: subscribeToReminderMessage
            }).then(() => {
                closeDialog()
            })
        } else {
            await createNewUser({
                username: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: phoneNumber,
                roleIds: selectedRoles,
            }).then((r:any) => {
                if (r && r.response  && r?.response?.data?.error) {
                    console.log("i here")
                    console.log(r.response.data.error,"r.response.data.error")
                    setSignUpError(r.response.data.error)
                }else {
                    setEmployeeList()
                }
                console.log(r,"r123")

            })
        }
    }
    const sendLinkToSpecificUser= async ()=>{
        selectedUser && await sendLinkForNewUser(selectedUser?.id).then((res)=>{
            if (res && res.data.userId){
                setTheLinkWasSend(true)
            }
        })
        // selectedUser?.id
        //yoman/users/:userId/invite
    }

const[ theLinkWasSend,setTheLinkWasSend]=useState(false)


    console.log(signUpError,"signUpError")
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
                    <div
                        className="select-dropdown-item"
                        onClick={() => setSubscribeToReminderMessage(subscribeToReminderMessage===0?1:0)}
                        style={{direction: isEnglish ? "ltr" : "rtl"}}
                    >
                        <input
                            type="checkbox"
                            checked={subscribeToReminderMessage===1}
                            readOnly
                        />
                        <span>הפסק התרעות עבור עובד זה</span>
                    </div>
                </div>

            </CacheProvider>
            <div className={"signUpBottomWrapper"}>
                <Button className={"signUpButton"} type="submit"
                        variant="contained">{isEditMode ? text.updateDetails : text.signUp}</Button>

                {isAdmin && !theLinkWasSend && <Button style={{marginTop:20}} color={"inherit"} className={"signUpButton"} type="button"
                        variant="contained"
                onClick={sendLinkToSpecificUser}
                >שלח לינק ליצירת סיסמא חדשה</Button>}
                {isAdmin && theLinkWasSend && <div style={{color:"var(--primary)",fontWeight:700,fontSize:16,justifyContent:"center",display:"flex",marginTop:10}}>הלינק נשלח לעובד החדש</div>}
            </div>
        </form>


        <Dialog
            fullWidth={true}
            onClose={()=> {
               setSignUpError("")
            }}
            open={signUpError.length>0}
        >
            <div style={{textAlign:"center",fontSize:20,color:"var(--alert)",display:"flex",justifyContent:"center",padding:"20%"}}>{signUpError}</div>
      <Button  style={{alignSelf:"center",width:100,marginBottom:20,backgroundColor:"var(--primary)",color:"var(--white)"}} onClick={()=>setSignUpError("")}>הבנתי</Button>
        </Dialog>
    </div>
}