import './index.scss';

import React from 'react';
import { useFormikContext } from "formik";

import { Attachment } from "components/common";

const AttachmentsField = ({ items, onRemove }) => {
    return (
        <div className={'attachments-field'}>
            {items.map((file) => <Attachment id={file.id} key={file.filename} data={file} completed={!file.loading} onRemove={onRemove} />)}
        </div>
    )
}

export default AttachmentsField;