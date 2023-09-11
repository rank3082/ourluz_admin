import "./CreateNewPassword.scss"
import {cacheRtl} from "../../../../utils/general";
import {Box, Button, Dialog, TextField} from "@mui/material";
import React, {useState} from "react";
import {changePassword} from "../../../../utils/data-management";
import {useAppSelector} from "../../../../app/hooks";
import {CacheProvider} from "@emotion/react";
import {setToken} from "../../../../store/authentication.slice";
import {useDispatch} from "react-redux";

export const CreateNewPassword: React.FC<{ localToken: undefined | string, setForgetPassword: any, setPassword: any }> = ({
                                                                                                                              localToken,
                                                                                                                              setForgetPassword,
                                                                                                                              setPassword
                                                                                                                          }) => {
    const dispatch = useDispatch()
    const {isEnglish} = useAppSelector(state => state.global)
    const [errorChangePass, setErrorChangePass] = useState("")
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMassage, setErrorMassage] = useState("")
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword === repeatPassword && localToken && localToken!=="") {
            if (newPassword.length < 8 || newPassword.length > 16) {
                setErrorMassage("הסיסמא צריכה להכיל בין 8-16 תווים")
            } else {
                await changePassword(localToken, newPassword).then((r: any) => {
                    if (r && r.response && r?.response?.data?.error) {
                        setErrorChangePass(r.response.data.error)
                    } else {
                        dispatch(setToken(localToken))
                        localStorage.setItem("token",localToken);

                        setForgetPassword(false)
                        setPassword("")
                    }
                }).then((res) => {
                })
            }
        } else {
            setErrorMassage("סיסמא לא תואמת")
        }
    };


    return <div className={"newPasswordContainer"}>
        <form className={"newPasswordWrapper"} onSubmit={handleSubmit}>
            <CacheProvider value={cacheRtl}>
                <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDirection="column"
                     maxWidth="300px" m="auto">

                    <TextField
                        id={"newPassword"}
                        type="password"
                        label="סיסמא חדשה"
                        value={newPassword}
                        onChange={(e) => {
                            setErrorMassage("")
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
                            setErrorMassage("")
                            setRepeatPassword(e.target.value)
                        }}
                        margin="normal"
                        required
                        variant="outlined"
                        dir={isEnglish ? "ltr" : "rtl"}
                    />
                    {errorMassage.length > 0 &&
                        <div style={{color: "var(--alert)", fontWeight: 700}}>{errorMassage}</div>}
                    <Button type="submit" variant="contained" color="primary" style={{marginTop: '16px'}}>
                        צור סיסמא חדשה
                    </Button>
                </Box>
            </CacheProvider>
        </form>
        <Dialog
            fullWidth={true}
            onClose={() => {
                setErrorChangePass("")
            }}
            open={errorChangePass.length > 0}
        >
            <div style={{
                textAlign: "center",
                fontSize: 20,
                color: "var(--alert)",
                display: "flex",
                justifyContent: "center",
                padding: "20%"
            }}>{errorChangePass}</div>
            <Button style={{
                alignSelf: "center",
                width: 100,
                marginBottom: 20,
                backgroundColor: "var(--primary)",
                color: "var(--white)"
            }} onClick={() => setErrorChangePass("")}>הבנתי</Button>
        </Dialog>

    </div>
}