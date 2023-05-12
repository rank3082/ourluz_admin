import "./Header.scss"
import {text} from "../../utils/dictionary-management";

export const Header = () => {
    return <div className="container">
        <span className="mainHeader">{text.WelcomeText}</span>
        <span className="secondaryHeader">{text.ManageYourSchedule}</span>
    </div>
}