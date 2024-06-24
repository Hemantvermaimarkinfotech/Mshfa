import './index.scss';

import React from "react";
import cx from "classnames";

import { TitledText } from "components/layout/index";
import { CheckCircle } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const TitledTextActionButton = ({ title, icon, onClick, children, classes }) => {

    const rootClasses = cx('title-block', {
        [classes]: !!classes,
    })

    const getTitle = () => {
      return (
        <div className={rootClasses}><span>{title}</span><IconButton onClick={onClick}>{icon}</IconButton></div>
      )
    }

    return (
      <TitledText title={getTitle()}>{children}</TitledText>
    )
}

export default TitledTextActionButton;