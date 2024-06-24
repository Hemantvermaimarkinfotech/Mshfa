import './index.scss';

import React from 'react';
import moment from "moment";
import {FormattedMessage} from "react-intl";

import { TitledText } from 'components/layout';
import { formatISOtoHumanReadable, READABLE_DATE_FORMAT } from "utils/date";


const SickLeave = ({ data }) => {
    const endDate = formatISOtoHumanReadable(moment(data.startDate).add(data.days, 'days'), READABLE_DATE_FORMAT);
    return (
        <div className={'sick-leave'}>
            <p className={'sick-leave__title'}><FormattedMessage id={'words.common.sick-leave-id'}/>: {data.id}</p>
            <TitledText title={'Company name'}>{data.companyName}</TitledText>
            <TitledText localeId={'words.common.occupation'}>{data.occupation}</TitledText>
            <div className="sick-leave__dates">
                <TitledText localeId={'words.common.start-date'}>{formatISOtoHumanReadable(data.startDate, READABLE_DATE_FORMAT)}</TitledText>
                <TitledText localeId={'words.common.end-date'}>{endDate}</TitledText>
                <TitledText localeId={'words.common.days'}>{data.days}</TitledText>
            </div>
        </div>
    )
}

export default SickLeave;
