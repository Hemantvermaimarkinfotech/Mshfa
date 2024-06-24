import './index.scss';

import React, { useMemo, useState } from "react";
import cx from "classnames";
import DateFnsUtils from '@date-io/date-fns';
import { isSameDay, isWithinInterval, lightFormat } from 'date-fns';
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

import CalendarIcon from "assets/images/calendar";

import { PrimaryButton, SecondaryButton } from "components/layout/buttons";
import { FormHelperText, IconButton, InputAdornment } from "@material-ui/core";
import { DEFAULT_DATE_FORMAT } from "utils/date";

const DateInput = ({
        name, value, label="Select date(s)",
        onChange, isRange = false, error, errorText, closeOnSelect = true, yearSelect=false, dateFormat = DEFAULT_DATE_FORMAT,
        daysEnabled
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const inputDateStart = useMemo(() => {
        if (!value) return null;
        if (typeof value === "object" && value.hasOwnProperty("dateFrom") && value.dateFrom)  return new Date(value.dateFrom);
        return null;
    }, [value]);

    const inputDateEnd = useMemo(() => {
        if (!value) return null;
        if (typeof value === "object" && value.hasOwnProperty("dateTo") && value.dateTo) return new Date(value.dateTo);
        return null;
    }, [value]);

    const inputValue = useMemo(() => {
        if (!value) return "";
        if (typeof value === "object" && value.hasOwnProperty("dateFrom") && value.dateFrom) return new Date(value.dateFrom);
        if (typeof value === "string" && value) return new Date(value)
        return "";
    }, [value]);

    const formatDate = (date, formatStr = "YYYY-MM-DD") => date ? moment(date).format(formatStr) : '';

    const toOutputFormat = (date) => date ? lightFormat(date, "yyyy-MMM-dd") : '';

    function checkDayDisabled(date) {
        return daysEnabled && daysEnabled.indexOf(formatDate(date)) === -1;
    }


    const getStartDate = () => {
        if (startDate) return startDate;
        return inputDateStart;
    }

    const getEndDate = () => {
        if (endDate) return endDate;
        return inputDateEnd;
    }

    const handleDateChange = (date, params) => {
        if (checkDayDisabled(date)) return;
        if (!isRange) {
            setStartDate(date);
            if (!yearSelect) {
                setIsOpen(false);
                onDateChanged(date);
            }
            return
        }
        if (endDate) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate) {
            if (startDate > date) {
                setEndDate(startDate);
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        } else {
            setStartDate(date);
        }
    };

    const formatLabel = () => {
        if (!isRange) return formatDate(inputValue, dateFormat)
        const dateStart = getStartDate();
        const dateEnd = getEndDate();
        if (!dateStart && !dateEnd) return "";
        if (!dateEnd) {
            return formatDate(dateStart);
        }
        return `${formatDate(dateStart)} - ${formatDate(dateEnd)}`
    }

    const renderPickedDays = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
        const dateStart = getStartDate();
        const dateEnd = getEndDate();
        const isDayDisabled = checkDayDisabled(date);
        if (!dateStart && !isDayDisabled) {
            return dayComponent;
        }
        const dayIsBetween = dateStart && dateEnd && dateStart < dateEnd && isWithinInterval(date, { start: dateStart, end: dateEnd });
        const isFirstDay = dateStart && isSameDay(date, dateStart);
        const isLastDay = dateEnd && isSameDay(date, dateEnd);
        const dayClasses = cx({
            ['highlight']: dayIsBetween,
            ['first-highlight']: isFirstDay,
            ['last-highlight']: isLastDay,
            ['disabled']: isDayDisabled
        });

        return (
            <div className={dayClasses}>
                {dayComponent}
            </div>
        );
    }

    const onDateChanged = (date) => {
        onChange({
            target: {
                name: name,
                value: toOutputFormat(date)
            }
        });
    }

    const handleSelectDate = () => {
        if (typeof onChange === 'function') {
            isRange ? onChange({dateFrom: toOutputFormat(getStartDate()), dateTo: toOutputFormat(getEndDate())}) :
                onDateChanged(getStartDate());
            setStartDate(null);
            setEndDate(null);
        }
        setIsOpen(false);
    }

    const handleClearSelection = () => {
        isRange ? onChange({dateFrom: '', dateTo: '' }) : onDateChanged('');
        setStartDate(null);
        setEndDate(null);
        setIsOpen(false);
    }

    const isDateSelected = () => !!getStartDate();
    const renderToolbar = () => isRange ? <div className="picker-toolbar">
        <PrimaryButton disabled={!isDateSelected()} text={'Apply'} onClick={handleSelectDate}/>
        <SecondaryButton disabled={!isDateSelected()} text={'Clear'} onClick={handleClearSelection}/>
    </div> : <div className={yearSelect ? "picker-toolbar" : "picker-toolbar-wide"}>
        {yearSelect && <PrimaryButton disabled={!isDateSelected()} text={'Apply'} onClick={handleSelectDate}/>}
        <SecondaryButton disabled={!isDateSelected()} text={'Clear'} onClick={handleClearSelection}/>
    </div>;

    const labelIsShrink = () => {
        if (isOpen) return true;
        if (!isRange && inputValue) return true;
        return !!getStartDate();
    }

    const pickerClassNames = cx({
        "input-wide": isRange,
    })

    return (
        <div className={'date-input'}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    color={'primary'}
                    open={isOpen}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                    ToolbarComponent={renderToolbar}
                    className={pickerClassNames}
                    label={label}
                    error={error}
                    openTo={yearSelect ? "year" : "date"}
                    views={yearSelect ? ["year", "month", "date"] : ["date"]}
                    InputLabelProps={{
                        shrink: labelIsShrink(),
                        dir: 'rtl'
                    }}
                    labelFunc = {formatLabel}
                    name={name}
                    value={inputValue}
                    variant="inline"
                    onChange={handleDateChange}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position='start'>
                                <IconButton>
                                    <CalendarIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    renderDay={renderPickedDays}
                />
            </MuiPickersUtilsProvider>
            {error && <FormHelperText error={error}>{errorText}</FormHelperText> }
        </div>
    )
}

export default DateInput;