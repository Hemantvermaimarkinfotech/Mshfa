import './index.scss';

import React from "react";

import { TitledText } from "components/layout";
import noAvatar from "assets/images/no-avatar.svg";

const ContractPopup = ( { patient }) => {

    return <div className={'patient-contract-modal'}>
        <div className="patient-contract-modal__patient-info">
            <TitledText title={'Patient'}>
                <img className={ 'avatar' }
                     src={ patient?.avatar || noAvatar } alt={ "patient's avatar" }/>
                <span
                    className={ 'name' }>
                    { `${ patient?.firstName || '' } ${ patient?.lastName || '' }` }
                </span>
            </TitledText>
            <TitledText localeId={'words.common.contract'}>{ patient?.contract || 'N/A'}</TitledText>
        </div>
    </div>;
}

export default ContractPopup;
