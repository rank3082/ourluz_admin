import React from 'react';
import './App.css';
import {MainPanel} from "./pages/mainPanel/MainPanel";
import {useDispatch} from "react-redux";
import {setIsMobile} from "./store/global.slice";
import {isMobileFunction} from "./utils/general";
import {LoginPage} from "./pages/loginPage/LoginPage";
import {useAppSelector} from "./app/hooks";
import {SelectedPage} from "./utils/enum.const";
import {EmployeePage} from "./pages/employeePage/EmployeePage";

function App() {
const dispatch = useDispatch()
    dispatch(setIsMobile(isMobileFunction()))
    const {token} = useAppSelector(state => state.authentication)
    const {selectedPage} = useAppSelector(state => state.global)
    return (<div className="App">
        {!token ? <LoginPage/> :
            <>
            {selectedPage === SelectedPage.MainPanel && <MainPanel/>}
            {selectedPage === SelectedPage.EmployeePage && <EmployeePage/>}
            </>
        }

    </div>);
}

export default App;
