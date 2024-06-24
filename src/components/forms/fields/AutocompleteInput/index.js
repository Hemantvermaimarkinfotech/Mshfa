import './index.scss';

import React, {memo, useEffect, useMemo, useState} from 'react';
import cx from "classnames";
import {
    FormControl,
    FormHelperText,
    TextField,
} from '@material-ui/core';
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const filter = createFilterOptions();

const AutocompleteInput = memo(function AutocompleteInput ({ creatable, value, name, label, options, onChange, multiple, error, errorText, blurOnSelect = false, renderOption, filterOptions, renderLabel, ...rest }) {

    const [ inputValue, setInputValue ] = useState('')
    const selectOptions = useMemo(() => {
        return Array.isArray(options) ? options.map(option => {
            if (typeof option === 'string') return { label: option, value: option  };
            else if (typeof option === 'object') {
                if (option.hasOwnProperty('key') && option.hasOwnProperty('val')) return {label: option.val, value: option.key }
                else if (option.hasOwnProperty('label') && option.hasOwnProperty('value')) return option;
                else if (option.hasOwnProperty('id')) {
                    return { label: option.id, value: option.id, ...option };
                }
            }
            return { label: "", value: "" };
        }) : [];
    }, [label, options]);

    const parsedValue = useMemo(() => {
        const parseValue = (item) => {
            if (!item) return null
            if (typeof item === 'string') return item;
            if (item.hasOwnProperty('key')) return item.key
            return null;
        }
        const stringValue = multiple ?  value.map(item => parseValue(item)) : parseValue(value);
        const filteredOptions = selectOptions.filter(option => {
            if (multiple) {
                return stringValue.indexOf(option.value) !== -1;
            } else {
                return option.value === stringValue;
            }
        })
        if (!multiple) {
            return filteredOptions && filteredOptions[0] || null;
        }
        return filteredOptions;
    }, [value, selectOptions, multiple, creatable])

    useEffect(() => {
        if (!parsedValue && value && creatable) {
            if (typeof value === 'string') setInputValue(value);
        }
    }, [parsedValue, value, creatable])

    const handleInputChange = (event, option) => {
        setInputValue(option)
    }

    const handleChange = (event, option) => {
        if (multiple) {
            onChange({
                target: {
                    name,
                    value: option
                }
            });
        } else {
            onChange({
                target: {
                    name,
                    value: option && option.value? option.value : option,
                    label: option && option.label ? option.label : option,
                }
            });
        }

    }

    const getOptionsSelected = (option, selected) => {
        if (!value) return false;
        return option.value === selected.value;
    }

    const controlClasses = cx({
       'has-error': error
    });

    return (
        <div className={'autocomplete-input'}>
            <FormControl variant={'outlined'} className={controlClasses} error={error}>
                <Autocomplete
                    blurOnSelect={blurOnSelect}
                    size="small"
                    renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
                    multiple={multiple}
                    name={name}
                    getOptionSelected={getOptionsSelected}
                    getOptionLabel={(option) => option.label || ""}
                    renderOption={renderOption}
                    filterOptions={creatable ? (options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push({
                                value: params.inputValue,
                                label: params.inputValue,
                            });
                        }
                        return filtered;
                    } : undefined}
                    value={parsedValue}
                    defaultValue={!parsedValue && creatable ? value : undefined}
                    inputValue={inputValue}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={selectOptions}
                    filterSelectedOptions={true}
                    freeSolo={creatable}
                    { ...rest }
                >
                </Autocomplete>
                {error && <FormHelperText>{errorText}</FormHelperText> }
            </FormControl>
        </div>
    )
});

export default AutocompleteInput;
