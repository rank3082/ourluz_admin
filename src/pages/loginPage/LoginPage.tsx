import React, {useEffect, useState} from "react";
import axios from "axios";
import ourLuzLogo from "../../assets/images/ourLuzLogo.png"
import "./LoginPage.scss"
import {mainPath} from "../../utils/variable.const";
import {setToken} from "../../store/authentication.slice";
import {useDispatch} from "react-redux";
import {Button, Dialog} from "@mui/material";
import PinInput from "./components/pinInput/PinInput";
import {forgetPasswordSendVerifyCode, isUserIsManager} from "../../utils/data-management";


export const LoginPage: React.FC = () => {

    const checkIfUserConnected = async ( token: string) => {
        dispatch(setToken(token))
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        token && token !== "" && checkIfUserConnected(token)
    }, [])
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [forgetPassword, setForgetPassword] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
const [errorSubmit,setErrorSubmit]=useState(false
)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${mainPath}api-token-auth/`,

                {
                    username, password,
                },);
            if (response?.data?.token) {
                await dispatch(setToken(response.data.token))
                localStorage.setItem("token", response.data.token);
            } else {
                setErrorSubmit(true)
                return false
            }
        } catch (error) {
            setErrorSubmit(true)
            console.error(error);
        }
    };
const [phoneNumber,setPhoneNumber]=useState("")
const pressForgetPassword=async ()=>{
    await forgetPasswordSendVerifyCode(username).then((res)=>{
        if(res && res.data.mobile){
            setPhoneNumber(res.data.mobile)
        }
    })
}
    return (<div className={"headerContainer"}>
            <div className={"loginWrapper"}>
                <img height={300} width={300} src={ourLuzLogo}/>
                <form className={"formWrapper"} onSubmit={handleSubmit}>
                    <div className={"inputWrapper"}>
                        <div className={"labelStyle"}>Username:</div>
                        <input className={"inputText"} type="text" value={username} onChange={handleUsernameChange}
                               autoFocus={false}/>
                    </div>
                    <div className={"inputWrapper"}>
                        <div className={"labelStyle"}>Password:</div>
                        <input className={"inputText"} type="password" value={password} onChange={handlePasswordChange}
                               autoFocus={false}/>
                    </div>
                    <button className={"buttonStyle"} type="submit">Submit</button>
                </form>
                <div onClick={ async () => {
                    setForgetPassword(true)
                    username.length>0 && await pressForgetPassword()
                }} className={"forgetPassword"}
                >
                    שכחתי את הסיסמא</div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",bottom:"5%",position:"absolute"}}>
                    version 1.1.3
                </div>
                {forgetPassword && username.length>0 && <div>
                    <Dialog
                        maxWidth={false}
                        open={true}
                        onClose={() => setForgetPassword(false)}
                    >

                        <div className={"employeeDialogContainer"}>
                            <div style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",marginTop:"5%"}}>
                            <PinInput userName={username}  setForgetPassword={setForgetPassword} setPassword={setPassword} phoneNumber={phoneNumber}/>
                            </div>
                        </div>
                    </Dialog>
                </div>}
                {forgetPassword && username.length===0 && <div>
                    <Dialog
                        maxWidth={false}
                        open={true}
                        onClose={() => setForgetPassword(false)}
                    >

                        <div className={"employeeDialogContainer"} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                            <div>אנא רשום שם משתמש</div>
                      <Button onClick={()=>setForgetPassword(false)}>הבנתי</Button>
                        </div>
                    </Dialog>
                </div>}

                {errorSubmit && <div>
                    <Dialog
                        maxWidth={false}
                        open={true}
                        onClose={() => setErrorSubmit(false)}
                    >

                        <div className={"employeeDialogContainer"} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
                            <div>הפרטים שהזנת שגויים</div>
                      <Button onClick={()=>setErrorSubmit(false)}>הבנתי</Button>
                        </div>
                    </Dialog>
                </div>}

            </div>

        </div>

    );
};

