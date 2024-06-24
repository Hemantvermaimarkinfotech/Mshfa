import './index.scss';

import React from 'react';

import { TokenStorage } from "services";
import { DEFAULT_DATE_TIME_FORMAT, formatISOtoHumanReadable } from 'utils/date';
import { TitledText } from 'components/layout';

import noAvatar from 'assets/images/no-avatar.svg';
import { useFile } from "hooks/file";

const Prescription = ({ data, compact = false }) => {

    const  { previewFile } = useFile();

    const renderFormattedDetails = (data) => {
        const { dosage, route, frequency, directions, duration } = data;
        return `${dosage} ${route} ${frequency} ${directions} ${duration}`;
    }

    const onPrintClick = () => {
        if (data?.appointment?.id) {
            previewFile(`pdf/prescription/${data?.appointment?.id}/${TokenStorage.getToken()}`, `prescription.pdf`)
        }
    }

    const renderMedicine = (item) => {
        return (
            <li className={'prescription-item'} key={item.id}>
                <span className={'prescription-item__name'}>{item.medicine}</span>
                <span className={'prescription-item__details'}>{renderFormattedDetails(item)}</span>
            </li>
        )
    }

    return (
        <div className={`prescription ${ compact ? 'prescription--compact' : '' }`}>
            {!compact && (
                <div onClickCapture={onPrintClick} className="prescription__header">
                        <span className={'prescription__date'}>{formatISOtoHumanReadable(data.createdAt, DEFAULT_DATE_TIME_FORMAT)}</span>
                        <div className={'prescription__doctor'}>
                            <img src={data?.doctor?.avatar || noAvatar} className="prescription__doctor-avatar" />
                            <span className={'prescription__doctor-name'}>{data?.doctor?.firstName || ''} {data?.doctor?.lastName || ''}</span>
                        </div>
                </div>
            )}
            <ul className="prescription__list">
                {data.items.map(renderMedicine)}
            </ul>
            {data.notes && <TitledText localeId={'words.common.doctor-note'}>{data.notes}</TitledText>}
        </div>
    )
}

export default Prescription;
