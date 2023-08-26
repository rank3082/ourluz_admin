import "./FirstLoginPage.scss"
import {useParams,useNavigate} from "react-router-dom";
import ourLuzLogo from "../../assets/images/ourLuzLogo.png";
import React, {useEffect, useState} from "react";
import {CreateNewPassword} from "../loginPage/components/createNewPassword/CreateNewPassword";

export const FirstLoginPage=()=>{
    let {token} = useParams();
const [redirectToMainPanel,setRedirectToMainPanel]=useState(true)
    const navigate = useNavigate();
    useEffect(()=>{
        if (!redirectToMainPanel){
            navigate("/")
        }
    },[redirectToMainPanel])

    return <div className={"headerContainer"}>
        <div className={"loginWrapper"}>
            <img height={300} width={300} src={ourLuzLogo}/>
<div style={{backgroundColor:"white",borderRadius:8,padding:"5%",boxShadow:"0 0 20px 1px var(--dark)"}}>
            <CreateNewPassword localToken={token} setForgetPassword={setRedirectToMainPanel} setPassword={()=>{}}/>

</div>

        </div>
        first pass
        {token}
    </div>
}