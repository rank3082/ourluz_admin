import "./Header.scss"
import {text} from "../../../../utils/dictionary-management";
import ourLuzLogo from "../../../../assets/images/ourluzIcon.png"
import {useAppSelector} from "../../../../app/hooks";
export const Header = () => {
    const {isMobile} = useAppSelector(state => state.global)
    return <div className="container">
        {!isMobile && <div className={"ourLuzIconWrapper"}>
          <img height={50} width={50} src={ourLuzLogo}/>
        </div>}
        <div className={"headerTextWrapper"}>
        <span className="mainHeader">{text.WelcomeText}</span>
        <span className="secondaryHeader">{text.ManageYourSchedule}</span>
        </div>
        {!isMobile && <div className={"avatarContainer"}></div>}
    </div>
}