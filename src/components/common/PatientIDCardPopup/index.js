import './index.scss';

import React from "react";

import { TitledText } from "components/layout";
import noAvatar from "assets/images/no-avatar.svg";

const IDCardPopup = ( { patient }) => {

    return <div className={'patient-idcard-modal'}>
        <div className="patient-idcard-modal__patient-info">
            <TitledText title={'Patient'}>
                <img className={ 'avatar' }
                     src={ patient?.avatar || noAvatar } alt={ "patient's avatar" }/>
                <span
                    className={ 'name' }>
                    { `${ patient?.firstName || '' } ${ patient?.lastName || '' }` }
                </span>
            </TitledText>
            <TitledText localeId={'words.common.id-card-number'}>{ patient?.idCard?.number || 'N/A'}</TitledText>
        </div>
        <div className="patient-idcard-modal__images">
            {patient?.idCard?.frontside && <div><img src={patient?.idCard?.frontside} alt="Frontside"/></div>}
            {patient?.idCard?.backside && <div><img src={patient?.idCard?.backside} alt="Backside"/></div>}
        </div>
    </div>;
}

export default IDCardPopup;
