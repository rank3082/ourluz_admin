import React, { useState } from "react";
import axios from "axios";
import ourLuzLogo from "../../assets/images/ourLuzLogo.png"
import "./LoginPage.scss"
import {mainPath} from "../../utils/variable.const";
import {setToken} from "../../store/authentication.slice";
import {useDispatch} from "react-redux";



export const LoginPage: React.FC = () => {
    const dispatch= useDispatch()
    const [username, setUsername] = useState("rank");
    const [password, setPassword] = useState("Pxt40833");

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
                }
            );

            if (response?.data?.token){
                dispatch(setToken(response.data.token))
            }else {
                return false
            }
            // Handle the response (e.g., store token in local storage, redirect)
            console.log(response,"res");

        } catch (error) {
            // Handle error (e.g., display error message)
            console.error(error);
        }
    };

    return (
        <div className={"loginWrapper"}>
                <img height={300} width={300} src={ourLuzLogo}/>
                <form className={"formWrapper"} onSubmit={handleSubmit}>
                    <div className={"inputWrapper"}>
                        <div className={"labelStyle"}>Username:</div>
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className={"inputWrapper"}>
                        <div className={"labelStyle"}>Password:</div>
                        <input  type="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button className={"buttonStyle"} type="submit">Submit</button>
                </form>
            </div>
    );
};

