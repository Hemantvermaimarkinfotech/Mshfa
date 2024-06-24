import './index.scss';

import React from 'react';
import { formatISOtoHumanReadable, READABLE_DATE_FORMAT } from "utils/date";

import { Delete, InsertDriveFile } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import pdfFileIcon from "assets/images/pdf-file.svg";
import pngFileIcon from "assets/images/png-file.svg";
import jpgFileIcon from "assets/images/jpg-file.svg";
import {FormattedMessage} from "react-intl";

const Attachment = ({ data, completed, readonly, onRemove, id, showUploadTime=false }) => {

    const resolveFileIcon = (type) => {

        let path;
        switch (type) {
            case 'pdf':
                path = pdfFileIcon;
                break;
            case 'png':
                path = pngFileIcon;
                break;
            case 'jpg':
            case 'jpeg':
                path = jpgFileIcon;
                break;
            default:
                path = undefined;
                break;
        }

        return path ? <img className={'attachment__icon'} src={path} alt="file icon" /> : <InsertDriveFile />;

    }

    const parseFile = (data) => {

        const type = data.file.substring(data.file.lastIndexOf('.') + 1);

        return { icon: resolveFileIcon(type), name: data.filename }
    }


    const { icon, name } = parseFile(data);

    const printFile = () => {
        data.file && window.open(data.file, "_new");
    }

    return (
        <div
            className={
            `
                attachment
                attachment--${ completed ? 'completed' : 'process' }
                attachment--${ readonly ? 'readonly' : '' }
                `
        }>
            <div onClick={printFile} className={ 'attachment__image' }>{icon}</div>
            <div className="attachment__body">
                <div className="attachment__info">
                    <a
                        href={data.file}
                        target="_blank"
                        className={ 'attachment__name' }>
                        {name}
                    </a>
                    { !readonly &&
                    <span className={ 'attachment__status' }>{  <FormattedMessage id={completed ? "words.common.uploaded" : "words.common.uploading"}/>}</span> }
                    { showUploadTime && (
                        <span className="attachment__created">{formatISOtoHumanReadable(data.createdAt, READABLE_DATE_FORMAT)}</span>
                    ) }
                </div>
                { !readonly && (
                    <div className={ 'attachment__action' }>
                        { completed ? <Delete onClick={() => onRemove(id)} /> : <CircularProgress size={30} thickness={5}/> }
                    </div>
                ) }
            </div>
        </div>
    )
}

export default Attachment;
