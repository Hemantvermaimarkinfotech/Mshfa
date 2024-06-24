import './index.scss';

import React from "react";
import { TitledText } from "components/layout/index";
import { CheckCircle } from "@material-ui/icons";
import {FormattedMessage} from "react-intl";

const TitledTextVerified = ({ title, isVerified, localeId, children }) => {

    const getVerifiedTitle = () => {
      if (!isVerified) return title ? title : localeId ? <FormattedMessage id={localeId}/> : '';
      return (
        <div className="title-block"><span>{title ? title : localeId ? <FormattedMessage id={localeId}/> : ''}</span><span className="verified-title"><CheckCircle />Verified</span></div>
      )
    }

    return (
      <TitledText title={getVerifiedTitle()}>{children}</TitledText>
    )
}

export default TitledTextVerified;
