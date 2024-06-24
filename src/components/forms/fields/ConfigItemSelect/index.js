import React, { useEffect, useState } from 'react';
import { SelectInput } from "components/forms";
import { useConfig } from "hooks/config";

const ConfigItemSelect = ({ config, label, onChange, allItemsLabel= "", value = "" }) => {

    const configOptions = useConfig(config);
    const [selectedValue, setSelectedValue] = useState(value)

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

    const configArrayToOptions = (options) => {
        const selectOptions = options && options
            .map(option => {
                if (typeof option === 'string') {
                    return ({ value: option.toLowerCase(), label: option })
                } else if (typeof option === 'object') {
                    return ({ value: option.key, label: option.val })
                }
                return ({ value: "", label: "" })
            }) || []

        return [{ value: "", label: allItemsLabel }, ...selectOptions];
    }
    return (
        <SelectInput label={label} value={selectedValue} onChange={handleOptionChange} options={configArrayToOptions(configOptions)} />
    )
}

export default ConfigItemSelect;