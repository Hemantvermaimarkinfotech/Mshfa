import "./index.scss";
import React, { useMemo } from "react";

import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { useMedicines } from "hooks/medicine";

const Index = ( { pharmacyId, selected, onSelect }) => {

    const {
        medicines,
    } = useMedicines({ pharmacy: pharmacyId});

    const handleChange = (event, option) => {
        if (!option) return;
        onSelect && onSelect(option);
    }

    const selectedOptions = useMemo(() => {
        return selected.map(medication => medication.id);
    }, [selected]);

    return <Autocomplete
        size="small"
        value=""
        className="add-medicine-input"
        renderInput={params =>
            <TextField {...params}
                placeholder="Add new medication"
                variant="outlined"
                InputProps={{
                    ...params.InputProps,
                    startAdornment: <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }}
            />}
        multiple={false}
        getOptionDisabled={(option) => selectedOptions.indexOf(option.id) !== -1}
        getOptionLabel={(option) => option.title || ""}
        onChange={handleChange}
        options={medicines}
    />
}
export default Index;
