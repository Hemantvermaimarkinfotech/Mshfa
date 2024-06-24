import { createElement } from "react";
import { usePatient, usePatientAPI } from "hooks/patients";

const PatientLoad = ({ patientId, component, ...rest }) => {
    const { patient } = usePatient(patientId);
    return createElement(component, { patient, ...rest })
}

export default PatientLoad;