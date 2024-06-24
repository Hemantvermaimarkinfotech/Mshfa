import "./index.scss";
import React from "react";
import { Prescription } from "components/common/index";
import { GlobalMessage } from "components/layout";

const PatientPrescriptions = ({prescriptions = []}) => {

    return (
        <div className={'prescriptions'}>
            { prescriptions.length ?
                prescriptions.map((prescription, key) => <Prescription key={key} data={ prescription }/>)
                :
                <GlobalMessage message={'Patient have no prescriptions'}/>
            }
        </div>
    );
}

export default PatientPrescriptions;
