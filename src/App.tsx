import React, {useEffect} from 'react';
import './App.css';
import {MainPanel} from "./pages/mainPanel/MainPanel";
import {useDispatch} from "react-redux";
import {setIsMobile} from "./store/global.slice";
import {isMobileFunction} from "./utils/general";
import {LoginPage} from "./pages/loginPage/LoginPage";
import {useAppSelector} from "./app/hooks";
import {SelectedPage} from "./utils/enum.const";
import {EmployeePage} from "./pages/adminPages/employeePage/EmployeePage";
import {MyAvailabilityPage} from "./pages/clientPages/myAvailabilityPage/MyAvailabilityPage";
import {MyShiftPage} from "./pages/clientPages/myShiftPage/MyShiftPage";
import {WeeklyBookedCalender} from "./pages/weeklyBookedCalander/WeeklyBookedCalender";

function App() {
    useEffect(() => {
        let deferredPrompt: Event | null = null;

        const handleBeforeInstallPrompt = (e: Event) => {
            // Prevent the default prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            // Display your custom install UI, e.g., show a button
            // that triggers the `prompt()` method
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

const dispatch = useDispatch()
    dispatch(setIsMobile(isMobileFunction()))
    const {token} = useAppSelector(state => state.authentication)
    const {selectedPage} = useAppSelector(state => state.global)
    return (<div  className="App">
        {!token ? <LoginPage/> :
            <>
            {selectedPage === SelectedPage.MainPanel && <MainPanel/>}
            {selectedPage === SelectedPage.EmployeePage && <EmployeePage/>}
            {selectedPage === SelectedPage.MyAvailabilityPage && <MyAvailabilityPage/>}
            {selectedPage === SelectedPage.MyShiftPage && <MyShiftPage/>}
            {selectedPage === SelectedPage.SendBookPage && <WeeklyBookedCalender/>}
            </>
        }

    </div>);
}

export default App;
