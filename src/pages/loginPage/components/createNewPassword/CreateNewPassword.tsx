import "./CreateNewPassword.scss"
import {cacheRtl} from "../../../../utils/general";
import {Box, Button, TextField} from "@mui/material";
import React, {useState} from "react";
import {changePassword} from "../../../../utils/data-management";
import {useAppSelector} from "../../../../app/hooks";
import {CacheProvider} from "@emotion/react";
export const CreateNewPassword:React.FC<{localToken:undefined|string,setForgetPassword:any,setPassword:any}>=({localToken,setForgetPassword,setPassword})=>{
    const {isEnglish} = useAppSelector(state => state.global)
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword === repeatPassword && localToken) {
            await changePassword(localToken,newPassword).then((res)=>{
                console.log(res,"res1345566")
                setForgetPassword(false)
                setPassword("")
                // if (res && res?.data?.authToken){
                //     dispatch(setToken(res?.data?.authToken))
                // }
            })
        } else {
            setErrorMassage(true)
        }
    };
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMassage,setErrorMassage]=useState(false)
    const [newPassword, setNewPassword] = useState('');

    return <div className={"newPasswordContainer"}>
        <form className={"newPasswordWrapper"} onSubmit={handleSubmit}>
            <CacheProvider value={cacheRtl}>
                <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDirection="column" maxWidth="300px" m="auto">

                    <TextField
                        id={"newPassword"}
                        type="password"
                        label="סיסמא חדשה"
                        value={newPassword}
                        onChange={(e) => {
                            setErrorMassage(false)
                            setNewPassword(e.target.value)
                        }}
                        margin="normal"
                        required
                        variant="outlined"
                        dir={isEnglish ? "ltr" : "rtl"}
                    />
                    <TextField
                        id={"rePassword"}
                        type="password"
                        label="אמת סיסמא"
                        value={repeatPassword}
                        onChange={(e) => {
                            setErrorMassage(false)
                            setRepeatPassword(e.target.value)
                        }}
                        margin="normal"
                        required
                        variant="outlined"
                        dir={isEnglish ? "ltr" : "rtl"}
                    />
                    {errorMassage && <div style={{color:"var(--alert)",fontWeight:700}}>סיסמא לא תואמת</div>}
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
                        צור סיסמא חדשה
                    </Button>
                </Box>
            </CacheProvider>
        </form>


    </div>
}