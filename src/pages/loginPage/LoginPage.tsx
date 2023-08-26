import React, {useEffect, useState} from "react";
import axios from "axios";
import ourLuzLogo from "../../assets/images/ourLuzLogo.png"
import "./LoginPage.scss"
import {mainPath} from "../../utils/variable.const";
import {setToken} from "../../store/authentication.slice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {Button, Dialog} from "@mui/material";
import PinInput from "./components/pinInput/PinInput";
import {forgetPasswordSendVerifyCode} from "../../utils/data-management";


export const LoginPage: React.FC = () => {
    const [newPassWord,setNewPassword]=useState(false)

    const checkIfUserConnected = async (storageUsername: string, storagePassword: string, token: string) => {
        dispatch(setToken(token))
        console.log("checking", storageUsername, storagePassword)
    }
    useEffect(() => {
        const storageUsername = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const storagePassword = localStorage.getItem("password");
        storageUsername && storagePassword && token && checkIfUserConnected(storageUsername, storagePassword, token)
    }, [])
    const dispatch = useDispatch()
    const {isEnglish} = useAppSelector(state => state.global)
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
        console.log(username, "username")
        console.log(password, "password")
        try {
            const response = await axios.post(`${mainPath}api-token-auth/`,

                {
                    username, password,
                },);
            if (response?.data?.token) {
                dispatch(setToken(response.data.token))
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                localStorage.setItem("token", response.data.token);
            } else {
                console.log("sgfsdfgsdg")
                setErrorSubmit(true)
                return false
            }
            // Handle the response (e.g., store token in local storage, redirect)


        } catch (error) {
            setErrorSubmit(true)
            // Handle error (e.g., display error message)
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
    // console.log(isUserExists,"1234567")
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
                >שכחתי את הסיסמא</div>
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

