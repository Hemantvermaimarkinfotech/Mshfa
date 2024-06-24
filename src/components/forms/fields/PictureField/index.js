import './index.scss';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import PictureIcon from "assets/images/picture-icon";
import { FormHelperText, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE= 20971520


const PictureField = ({ preview, onSelect, errorText }) => {

    const [image, setImage] = useState(preview);

    const handleFileInputClear = () => {
        setImage(null);
        onSelect(null)
    }

    const handleFileInputChange = (files) => {
        const file = files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileURL = reader.result;
                if (fileURL) {
                    setImage(fileURL);
                    onSelect(file)
                }
            };
            reader.readAsDataURL(file);
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        maxSize: MAX_FILE_SIZE,
        accept: SUPPORTED_FORMATS,
        onDrop: handleFileInputChange
    });

    return (
        <div className="picture-field">
            {image ? <div className="preview">
                <IconButton className="close-icon" onClickCapture={handleFileInputClear} aria-label="clear" size="small">
                    <Delete />
                </IconButton>
                <img src={image} alt=""/>
            </div> :
            <div className={'dropzone'} {...getRootProps()}>
                <input {...getInputProps()} />
                <span className={'dropzone__title'}><PictureIcon/></span>
                <span className={'dropzone__caption'}>
                <span className={'dropzone__link'}>Add picture</span></span>
            </div>}
            {errorText && <FormHelperText error={true}>{errorText}</FormHelperText> }
        </div>
    )
};

export default PictureField;