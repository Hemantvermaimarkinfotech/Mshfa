import React from 'react';
import { SelectInput } from "components/forms";
import { useConfig } from "hooks/config";

const StatusSelect = ({ label, onChange, value= "" }) => {

    const { appointmentStatuses } = useConfig();

    const statusesToSelectOptions = (statuses) => {
        const options = statuses && statuses
            .map(status => ({ value: status.key, label: status.val })) || []

        return [{ value: "", label: 'All statuses' }, ...options];
    }

    return (
        <SelectInput label={label} value={value} onChange={onChange} options={statusesToSelectOptions(appointmentStatuses)} />
    )
}

export default StatusSelect;