import React from "react";
import "./ModalHeader.scss";
import {Icon} from "../../../components/icon/Icon";
import {useAppSelector} from "../../../app/hooks";

export const ModalHeader: React.FC<{ closeFunction: () => void; title?: string }> = ({ closeFunction, title  }) => {
  const {isEnglish} = useAppSelector(state => state.global)
    return (
    <div style={{direction:isEnglish?"ltr":"rtl"
    }} className="operation-details-header-container">
      <div className="header-text"><span className="typography-h3-secondary-sub">{title}</span></div>
      <div className={"exitIconWrapper"} onClick={closeFunction}><Icon name={"close_x"}/></div>
    </div>
  );
};
