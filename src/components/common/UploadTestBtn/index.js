import "./index.scss";

import React, { useRef } from "react";

import { SecondaryButton } from "components/layout/buttons";
import { labTestAcceptMimeTypes, labTestAcceptTypes, maxLabTestSize } from "config/upload";
import {FormattedMessage} from "react-intl";

const UploadTestBtn = ({onChange}) => {

    const fileInput = useRef(null);

    const handleClickOnUpload = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    const handleFileInputChange = (event) => {
        const files = event.currentTarget.files;
        const file = files[0];

        if (file) {
            if (file.size > maxLabTestSize) {
                onChange(null, <FormattedMessage id={'words.common.upload-file-20mb'}/>)
            } else if (labTestAcceptMimeTypes.indexOf(file.type) === -1) {
                onChange(null, <FormattedMessage id={'words.common.invalid-file'}/>)
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const fileURL = reader.result;
                    if (fileURL) {
                        onChange(file, null)
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    }

    return <>
        <SecondaryButton text={<FormattedMessage id={'words.common.add-files'}/>} onClick={handleClickOnUpload} />
        <input className="file-upload-input" accept={labTestAcceptTypes} onChange={handleFileInputChange} ref={fileInput} name="file" type="file"/>
    </>
}

export default UploadTestBtn;
