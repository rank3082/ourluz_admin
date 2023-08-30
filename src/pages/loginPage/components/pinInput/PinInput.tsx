import React, {useState, useRef} from 'react';
import './PinInput.scss';
import {Box, Button, TextField} from "@mui/material";
import {changePassword, checkVerifyCode} from "../../../../utils/data-management";
import {setToken} from "../../../../store/authentication.slice";
import {useAppSelector} from "../../../../app/hooks";
import {useDispatch} from "react-redux";
import {text} from "../../../../utils/dictionary-management";
import {cacheRtl} from "../../../../utils/general";
import {CacheProvider} from "@emotion/react";
import {CreateNewPassword} from "../createNewPassword/CreateNewPassword";
import {retry} from "@reduxjs/toolkit/query";

const PinInput: React.FC<{ userName: string,setForgetPassword:any,setPassword:any, phoneNumber:string}> = ({userName,setForgetPassword,setPassword,phoneNumber}) => {
// const {token} = useAppSelector(state => state.authentication)
// const {isEnglish} = useAppSelector(state => state.global)
    // const dispatch = useDispatch()
    const [pins, setPins] = useState(['', '', '', '']);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (value.match(/^\d*$/)) {
            const newPins = [...pins];
            newPins[index] = value;
            setPins(newPins);

            // Move focus to the next input field
            if (value !== '' && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === 'Backspace' && pins[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
const [createNewPassWord,setCreateNewPassword]=useState(false)
const [invalidCode,setInvalidCode]=useState(false)
    const [localToken,setLocalToken]=useState<undefined|string>(undefined)
    const validatePin = async () => {
        const pinCode = pins.join('')
       await checkVerifyCode(pinCode, userName).then((res)=>{
           if (res && res?.data?.token){
               setInvalidCode(false)
               setLocalToken(res?.data?.token??"")
               setCreateNewPassword(true)
           }
           else {
               setInvalidCode(true)
           }
       })
    }

    const phoneNumberMask=(phoneNumber:string)=>  {
        const lastFourDigits = phoneNumber.slice(-3);
        const maskedDigits = phoneNumber.slice(0, phoneNumber.length - 3).replace(/\d/g, '*');
        return `${lastFourDigits}${maskedDigits}`;
    };


    return (<>
        {createNewPassWord ? <CreateNewPassword localToken={localToken} setForgetPassword={setForgetPassword} setPassword={setPassword}/>
            // <div className={"newPasswordContainer"}>
            //     <form className={"newPasswordWrapper"} onSubmit={handleSubmit}>
            //         <CacheProvider value={cacheRtl}>
            //         <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDirection="column" maxWidth="300px" m="auto">
            //             <TextField
            //                 id={"rePassword"}
            //                 type="password"
            //                 label="אמת סיסמא"
            //                 value={repeatPassword}
            //                 onChange={(e) => {
            //                     setErrorMassage(false)
            //                     setRepeatPassword(e.target.value)
            //                 }}
            //                 margin="normal"
            //                 required
            //                 variant="outlined"
            //                 dir={isEnglish ? "ltr" : "rtl"}
            //             />
            //             <TextField
            //                 id={"newPassword"}
            //                 type="password"
            //                 label="סיסמא חדשה"
            //                 value={newPassword}
            //                 onChange={(e) => {
            //                     setErrorMassage(false)
            //                     setNewPassword(e.target.value)
            //                 }}
            //                 margin="normal"
            //                 required
            //                 variant="outlined"
            //                 dir={isEnglish ? "ltr" : "rtl"}
            //             />
            //
            //             {errorMassage && <div style={{color:"var(--alert)",fontWeight:700}}>סיסמא לא תואמת</div>}
            //             <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
            //                 צור סיסמא חדשה
            //             </Button>
            //         </Box>
            //         </CacheProvider>
            //     </form>
            //
            //
            // </div>

            :
        <div style={{width:"100%"}}>
            <div style={{textAlign:"center",fontSize:20}}> {`      ${userName} שלום  `} </div>
            <div style={{display: "flex", gap: 10,marginTop:10 ,direction:"rtl"}}>
                {phoneNumber?<div>
                    <div>שלחנו אליך קוד אימות למספר</div>
                    <div>{phoneNumberMask(phoneNumber)}</div>
                </div>
            :
                <div style={{direction:"rtl"}}>
                    <div> אנא המתן... </div>
                    <div>מיד תקבל הודעת sms לנייד</div>
                </div>
            }
            </div>



            <div className="pin-container">
                {pins.map((pin, index) => (<input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        value={pin}
                        maxLength={1}
                        className="pin-input"
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />))}
            </div>
        {invalidCode && <div style={{padding:10,color:"var(--alert)"}}>הזנת קוד שגוי,נסה שנית</div>}
            <Button onClick={validatePin}> אישור</Button>
        </div>  }</>);
};

export default PinInput;
