import './index.scss';

import React from 'react';

import { formatISOtoHumanReadable } from 'utils/date';

import pdfFileIcon from "assets/images/pdf-file.svg";

const Test = ({ data, compact }) => {
    return (
        <div className={`test ${compact ? 'test--compact' : '' }`}>
            {!compact && (
                <div className={ 'test__image' }>
                    <img className={'attachment__icon'} src={pdfFileIcon} alt="file icon" />
                </div>
            )}
            <div className="test__info">
                <span className={ 'test__name' }>{data.title || data.filename}</span>
                {!compact && <span className={ 'test__date' }>{formatISOtoHumanReadable(data.createdAt, "Do MMMM YYYY") || '-'}</span>}
            </div>
        </div>
    )
}

export default Test;