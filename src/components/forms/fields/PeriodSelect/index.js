import React, { useEffect, useState } from 'react';
import { SelectInput } from "components/forms";
import {useIntl} from "react-intl";

const PeriodSelect = ({ label, value="", onChange }) => {

    const [selectedValue, setSelectedValue] = useState("");
    const intl = useIntl()

    useEffect(() => {
        setSelectedValue(value);
    }, [value])

    const handleOptionChange = (event) => {
        if (event.target.value === "") {
            onChange(null);
        } else {
            onChange(event.target.value);
        }
        setSelectedValue(event.target.value);
    }

    const getSelectOptions = () => {
        const options = [intl.formatMessage({id: 'words.common.future'}), intl.formatMessage({id: 'words.common.past'})]
            .map(status => ({ value: status.toLowerCase(), label: status }))

        return [{ value: '', label }, ...options];
    }

    return (
        <SelectInput label={label} value={selectedValue} onChange={handleOptionChange} options={getSelectOptions()} />
    )
}

export default PeriodSelect;
