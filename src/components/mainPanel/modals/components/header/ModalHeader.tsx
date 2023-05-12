import React from "react";
import "./ModalHeader.scss";
import {Button} from "@mui/material";
import {Icon} from "../../../../icon/Icon";

export const ModalHeader: React.FC<{ closeFunction: () => void; title?: string }> = ({ closeFunction, title  }) => {
  return (
    <div className="operation-details-header-container">
      <div className="header-text">
        <span className="typography-h3-secondary-sub">{title}</span>
      </div>
        {/*<Button title={title} onClick={closeFunction} iconKey="close_x" />*/}
        <div className={"exitIconWrapper"} onClick={closeFunction}><Icon name={"close_x"}/></div>

    </div>
  );
};
