import React, {useState} from "react";
import {text} from "../../utils/dictionary-management";
import {useAppSelector} from "../../app/hooks";
import "./WelcomePage.scss"
import {LoginPage} from "../../pages/loginPage/LoginPage";
import {SignUp} from "../../pages/employeePage/components/signUp/SignUp";
import {Icon} from "../icon/Icon";
import ourluzIcon from "../../assets/images/ourluzIcon.png";

export const WelcomePage = () => {
    const [isLoginPage, setLoginPage] = useState(true)
    const {isEnglish} = useAppSelector(state => state.global)

    const updateLoginState = () => {
        setLoginPage(!isLoginPage)
    }
    return <div className={"welcomePage"}>
        <div style={{direction: !isEnglish ? "ltr" : "rtl"}} className={"welcomePageHeader"}>
            <div className={"signUpWrapper"}>
            <span onClick={updateLoginState}
                  className={!isLoginPage ? "selectedButton" : "signUpText"}>{text.signUp}</span>
                <span onClick={updateLoginState}
                      className={isLoginPage ? "selectedButton" : "signUpText"}>{text.logIn}</span>
            </div>
            <img height={50} width={50} src={ourluzIcon}/>
        </div>
        {isLoginPage ? <LoginPage/> : <SignUp/>}
    </div>
}