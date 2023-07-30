import React, {useEffect, useState} from "react";
import axios from "axios";
import ourLuzLogo from "../../assets/images/ourLuzLogo.png"
import "./LoginPage.scss"
import {mainPath} from "../../utils/variable.const";
import {setToken} from "../../store/authentication.slice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";



export const LoginPage: React.FC = () => {

    const checkIfUserConnected= async (storageUsername:string,storagePassword:string,token:string)=>{
        dispatch(setToken(token))
        console.log("checking",storageUsername,storagePassword)
        // try {
        //     const response = await axios.post(
        //         `${mainPath}api-token-auth/`,
        //         {
        //             storageUsername,
        //             storagePassword,
        //         },
        //     );
        //     console.log(response.data.token,"res");
        //     if (response?.data?.token){
        //         dispatch(setToken(response.data.token))
        //         localStorage.setItem("username", username);
        //         localStorage.setItem("password", password);
        //     }else {
        //         return false
        //     }
        //     // Handle the response (e.g., store token in local storage, redirect)
        // } catch (error) {
        //     // Handle error (e.g., display error message)
        //     console.error(error);
        // }
    }
    useEffect(()=>{
        const storageUsername = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        const storagePassword = localStorage.getItem("password");
        storageUsername && storagePassword && token && checkIfUserConnected(storageUsername,storagePassword,token)
        },[])
    const dispatch= useDispatch()
    const {isEnglish}=useAppSelector(state => state.global)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(username,"username")
        console.log(password,"password")
        try {
            const response = await axios.post(
                `${mainPath}api-token-auth/`,

                {
                    username,
                    password,
                },
            );
            console.log(response.data.token,"res");
            if (response?.data?.token){
                dispatch(setToken(response.data.token))
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                localStorage.setItem("token", response.data.token);
            }else {
                return false
            }
            // Handle the response (e.g., store token in local storage, redirect)


        } catch (error) {
            // Handle error (e.g., display error message)
            console.error(error);
        }
    };

    return (
        <div className={"headerContainer"}>
            <div className={"loginWrapper"}>
                <img height={300} width={300} src={ourLuzLogo}/>
                <form className={"formWrapper"} onSubmit={handleSubmit}>
                    <div className={"inputWrapper"}>
                        <div className={"labelStyle"}>Username:</div>
                        <input className={"inputText"}  type="text" value={username} onChange={handleUsernameChange} autoFocus={false}/>
                    </div>
                    <div className={"inputWrapper"}>
                        <div className={"labelStyle"}>Password:</div>
                        <input className={"inputText"}  type="password" value={password} onChange={handlePasswordChange} autoFocus={false} />
                    </div>
                    <button className={"buttonStyle"} type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
};

