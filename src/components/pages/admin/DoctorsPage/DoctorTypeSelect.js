import './index.scss';
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { useState } from "react";
import { PrimaryButton, NeutralButton } from "components/layout/buttons";

import config from 'config/forms.config';
import { useConfig } from "hooks/config";

const DoctorTypeSelect = ({onSelect, onCancel}) => {

    const [ doctorType, setDoctorType ] = useState(config.doctorTypes.schedule.toString())

    const { doctorWorkModels } = useConfig();

    return <div className={'select-doctor-type-modal'}>
        <div className="description">
            Before creating a doctor, select his work model. This parameter cann’t be edited.
        </div>
        <RadioGroup className="select-doctor-type-modal--radio-group" value={doctorType} onChange={(e, val) => setDoctorType(val)}>
            {doctorWorkModels.map(workModel => (
                <FormControlLabel key={workModel.key} value={workModel.key} label={workModel.val} control={<Radio />}/>
            ))}
        </RadioGroup>
        <div className="select-doctor-type-modal--buttons">
            <NeutralButton text="Cancel" onClick={onCancel}/>
            <PrimaryButton text="Create" onClick={() => onSelect(doctorType)}/>
        </div>
    </div>;
}

export default DoctorTypeSelect;