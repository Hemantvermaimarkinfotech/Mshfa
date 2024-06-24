import "./index.scss";

import React from "react";
import { useTable } from "hooks/table";
import tableConfig from "config/table.config";
import { GlobalError, BoxLoader } from "components/layout";
import { PatientPrescriptions } from "components/common";

const AdminPatientPrescriptions = ({ patientId }) => {

    const {
        rows,
        dataIsLoading,
        dataError,
    } = useTable(tableConfig.prescriptions, { patient: patientId });

    if (dataError) {
        if (!rows || rows === []) {
            return <div className="prescriptions">
                <GlobalError />
            </div>

        }
    }

    if (dataIsLoading) {
        return <div className="prescriptions">
            <BoxLoader />
        </div>
    }

    return <div className="prescriptions">
        <PatientPrescriptions prescriptions={rows}/>
    </div>

}

export default AdminPatientPrescriptions