import React from 'react';
import './App.css';
import {MainPanel} from "./components/mainPanel/MainPanel";
import {useDispatch} from "react-redux";
import {setIsMobile} from "./store/global.slice";
import {isMobileFunction} from "./utils/general";
import {LoginPage} from "./components/loginPage/LoginPage";
import {useAppSelector} from "./app/hooks";

function App() {
const dispatch = useDispatch()
    dispatch(setIsMobile(isMobileFunction()))
    const {token} = useAppSelector(state => state.authentication)
    return (<div className="App">

        {!token ? <LoginPage/> :
            <MainPanel/>}
    </div>);
}

export default App;
