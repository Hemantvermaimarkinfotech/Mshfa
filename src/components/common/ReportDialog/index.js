import './index.scss';
import React, {useState} from "react";

import { NeutralButton, PrimaryButton } from "components/layout/buttons";
import {TextField} from "../../forms";

const ReportDialog = ({onConfirm, onCancel}) => {

    const [text, setText] = useState();

    return <div className="report-modal">
        <div className="report-modal__description">
            <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Description of the reason"
            />
        </div>
        <div className="report-modal__buttons">
            <NeutralButton text="No" onClick={onCancel}/>
            <PrimaryButton text="Yes" onClick={() => onConfirm(text)}/>
        </div>
    </div>;
}
export default ReportDialog;