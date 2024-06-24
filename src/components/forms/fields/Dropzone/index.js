import './index.scss';

import React from 'react';
import { useDropzone } from 'react-dropzone';

import appointmentConfig from "config/appointment";

const Dropzone = ({ onSelect, onReject, multiple = false }) => {

    const { getRootProps, getInputProps } = useDropzone({
        multiple: multiple,
        maxSize: appointmentConfig.maxSizeDoctorsAttachment,
        accept: appointmentConfig.allowedExtensionsDoctorsAttachments,
        onDrop: onSelect,
        onDropRejected: onReject
    });

    return (
        <div className={ 'dropzone' } { ...getRootProps() }>
            <input { ...getInputProps() } />
            <span className={ 'dropzone__title' }>Attach files</span>
            <span className={ 'dropzone__caption' }>Drag & Drop files here or <span
                className={ 'dropzone__link' }>browse</span>. You can add files of 20 MB each.</span>
        </div>
    )
}

export default Dropzone;