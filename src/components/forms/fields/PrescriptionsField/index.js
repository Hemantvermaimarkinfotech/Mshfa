import './index.scss';

import React from 'react';
import { useFormikContext } from "formik";

import { Attachment } from "components/common";

const PrescriptionsField = ({ onRemove }) => {

    const formik = useFormikContext();

    return (
        <div className={'prescriptions-field'}>
            {formik.values.attachments?.map((file) => <Attachment name={file.name} type={file.type} onRemove={onRemove} />)}
        </div>
    )
}

export default PrescriptionsField;