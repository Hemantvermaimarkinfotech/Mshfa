import './index.scss';

import React from 'react';

import { TitledText } from 'components/layout';

const Referral = ({ data }) => {
    return (
        <div className={'referral'}>
            <p className={'referral__title'}>{data.hospital}</p>
            <TitledText title={'Department'}>{data.department}</TitledText>
            <TitledText localeId={'words.common.complaints-for-transfer'}>{data.complaintsForTransfer}</TitledText>
            <TitledText title={'Reason for Referral'}>{data.reasonForReferral}</TitledText>
        </div>
    )
}

export default Referral;
