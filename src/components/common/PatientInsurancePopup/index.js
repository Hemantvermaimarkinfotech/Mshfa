import './index.scss';

import React from "react";

import { TitledText } from "components/layout";
import noAvatar from "assets/images/no-avatar.svg";

const InsurancePopup = ( { patient }) => {

    return <div className={'patient-insurance-modal'}>
        <div className="patient-insurance-modal__patient-info">
            <TitledText title={'Patient'}>
                <img className={ 'avatar' }
                     src={ patient?.avatar || noAvatar } alt={ "patient's avatar" }/>
                <span
                    className={ 'name' }>
                    { `${ patient?.firstName || '' } ${ patient?.lastName || '' }` }
                </span>
            </TitledText>
            <TitledText localeId={'dialog.title.insurance'}>{ patient?.insurance?.number || 'N/A'}</TitledText>
        </div>
        <div className="patient-insurance-modal__images">
            {patient?.insurance?.frontside && <div><img src={patient?.insurance?.frontside} alt="Frontside"/></div>}
            {patient?.insurance?.backside && <div><img src={patient?.insurance?.backside} alt="Backside"/></div>}
        </div>
    </div>;
}

export default InsurancePopup;
