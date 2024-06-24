import './index.scss';

import React, { useRef, useState } from 'react';
import { InsertDriveFile } from "@material-ui/icons";

import { TextButton } from 'components/layout/buttons';

import { medicineUploadAcceptTypes } from "config/upload";

const FileUpload = ({ placeholder, onUpload, acceptType= medicineUploadAcceptTypes }) => {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);

    const fileInput = useRef(null);

    const handleFileInputChange = (event) => {
        const files = event.currentTarget.files;
        const file = files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileURL = reader.result;
                if (fileURL) {
                    setFile(file);
                    setTitle(file.name);
                    onUpload(file)
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const handleBrowse = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    return (
        <div className={'file-upload'}>
            <div className="file-upload__image">
                <InsertDriveFile className={"file-upload__icon"} />
            </div>
            <div className="file-upload__info">
                {file ? <span className="file-upload__title">{title}</span> : <span className={'file-upload__placeholder'}>{placeholder}</span> }
            </div>
            <TextButton text={'Browse'} onClick={handleBrowse} />
            <input className="file-upload__input" accept={acceptType} onChange={handleFileInputChange} ref={fileInput} name="file" type="file"/>
        </div>
    )
};

export default FileUpload;