import './index.scss';
import cx from "classnames";


import React, { memo, useMemo, useRef } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    ListItemText,
    Checkbox, IconButton,
} from '@material-ui/core';
import { Close } from "@material-ui/icons";

const SelectInput = memo(
    function SelectInput ({
        clearable = true, value, name, label, options, onChange, multiple, error, errorText, classNames, centeredTo = '', renderValue, renderOption, size="normal", ...rest
    }) {

    const selectedNodeRef = useRef();
    const inputRef = useRef();

    const menuItemsStyle = {
        fontSize: '14px'
    }

    const MenuProps = {
        variant: "menu",
        getContentAnchorEl: null
    };
    const parsedValue = useMemo(() => {
        const parseValue = (item) => {
            if (!item) return "";
            if (typeof item === 'object' && item.hasOwnProperty('key')) return item.key
            return item;
        }
        return multiple ?  value.map(item => parseValue(item)) : parseValue(value);
    }, [value])

    const selectOptions = useMemo(() => {
        return Array.isArray(options) ? options.map(option => {
            if (typeof option === 'string') return { label: option, value: option  };
            else if (typeof option === 'object') {
                if (option.hasOwnProperty('key') && option.hasOwnProperty('val')) return {label: option.val, value: option.key, disabled: !!option.disabled }
                else if (option.hasOwnProperty('label') && option.hasOwnProperty('value')) return option;
                else if (option.hasOwnProperty('id')) {
                    return { label: option.id, value: option.id, ...option };
                }

            }
            return { label: "", value: "" };
        }) : [];
    }, [label, options]);

    const renderValues = (value) => {
        return selectOptions.filter(option => value.includes(option.value))
            .map(option => option.label)
            .join(', ');
    }

    const getSelectedOption = (value) => selectOptions.find(option => option.value === value);

    const clearValue = (e) => {
        onChange({target: {name, value: multiple ? [] : null}});
        e.preventDefault();
    }

    const onClearBtnMouseDown = (event) => {
        event.stopPropagation();
    }

    const renderInputValue = (value) => {
        const option = getSelectedOption(value);
        return <div className="input-value">
            { renderValue ? renderValue(value) : <div className="value">{!!option?.value ? option?.label : ''}</div> }
            {(!!option?.value && clearable ) && <IconButton onMouseDown={onClearBtnMouseDown} onClickCapture={clearValue} aria-label="clear" size="small">
                <Close fontSize="inherit" />
            </IconButton>}
        </div> || '';
    }

    const isActiveValue = (value) => {
        return parsedValue ? parsedValue === value : centeredTo === value;
    }

    const renderOptions = (options) => {
        return options.map((option, id) => {
            return (
                <MenuItem ref={isActiveValue(option.value) ? selectedNodeRef : null} disabled={option.disabled} style={menuItemsStyle} key={`${id}-${option.value}`} value={option.value}>
                    {renderOption ?
                        renderOption(option) :
                    <>
                        { multiple && <Checkbox checked={parsedValue.indexOf(option.value) > -1} color={'primary'} /> }
                        <ListItemText primary={option.label} />
                    </>}
                </MenuItem>
            )
        })
    }

    const formatLabelToId = (label) => label.split(' ').join('-');

    const inputClasses = cx('select-input', {
        [classNames]: !!classNames,
        "small": size === 'small',
    } );

    const handleEntered = (node) => {
        if (selectedNodeRef.current && inputRef.current) {
            const { top: elementTop } = selectedNodeRef.current.getBoundingClientRect();
            const { top: inputTop } = inputRef.current.getBoundingClientRect();
            const scrollTop = elementTop - inputTop;
            if (scrollTop > 0 ) {
                node.scrollTop = scrollTop;
            }
        }

    }

    return (
        <div className={inputClasses}>
            <FormControl variant={'outlined'} error={error}>
                {label && <InputLabel shrink={Array.isArray(parsedValue) ? parsedValue.length > 0 : !!parsedValue} id={formatLabelToId(label)}>{label}</InputLabel>}
                <Select
                    ref={inputRef}
                    displayEmpty
                    renderValue={multiple ? renderValues : renderInputValue}
                    MenuProps={{...MenuProps, TransitionProps: { onEntered: handleEntered}}}
                    multiple={multiple}
                    name={name}
                    labelId={label ? formatLabelToId(label) : null}
                    value={parsedValue}
                    onChange={onChange}

                    { ...rest }
                >
                    {renderOptions(selectOptions)}
                </Select>
                {error && <FormHelperText>{errorText}</FormHelperText> }
            </FormControl>
        </div>
    )
});

export default SelectInput;
