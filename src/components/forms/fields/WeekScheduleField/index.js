import './index.scss';

import React, { useMemo } from "react";
import { useFormikContext, FieldArray } from "formik";
import moment from "moment";
import { get } from "lodash";
import { SecondaryButton } from 'components/layout/buttons';
import { SelectInput } from 'components/forms';
import { Delete, Add } from '@material-ui/icons';

import TrashIcon from "assets/images/trash-icon";

import { createHoursArray } from "utils/common";
import { IconButton } from "@material-ui/core";
import { ConfirmationDialog } from "../../../common";
import { useDialog } from "hooks/common";
import {formatDate} from "utils/date";

const WeekScheduleField = ({ onDelete, fieldName='schedules' }) => {

    const { open, close } = useDialog();

    const formik = useFormikContext();
    const times = useMemo(() => {
        return createHoursArray();
    }, [createHoursArray])
    const isLastItem = (array, index) => {
        return index === array.length - 1;
    }
    const getFieldValue = (title, index, name) => {
        return get(formik.values[fieldName], `${title}.${index}.${name}`);
    }

    const isFieldHasError = (title, index, name) =>
        get(formik.touched[fieldName], `${title}.${index}.${name}`) &&
        !!get(formik.errors[fieldName], `${title}.${index}.${name}`);

    const renderDaySchedule = (title, schedules, onRemove, onAdd) => {
        return schedules.map(({ from, to, id = null }, index) => {
            return (
                <div className={'day__schedules schedules'} key={index}>
                    <div className="schedules__items">
                        <SelectInput
                            label={'From'}
                            name={`${fieldName}.${title}.${index}.timeFrom`}
                            value={getFieldValue(title, index, 'timeFrom')}
                            options={times}
                            centeredTo={'09:00:00'}
                            onChange={formik.handleChange}
                            error={isFieldHasError(title, index, 'timeFrom')}
                        />
                        <SelectInput
                            label={'To'}
                            name={`${fieldName}.${title}.${index}.timeTo`}
                            value={getFieldValue(title, index, 'timeTo')}
                            options={times}
                            centeredTo={'09:00:00'}
                            onChange={formik.handleChange}
                            error={isFieldHasError(title, index, 'timeTo')}
                        />
                        <IconButton aria-label="delete" onClick={() => {

                            open(ConfirmationDialog, { onConfirm: () => {
                                    onDelete(fieldName, id, title)
                                    onRemove(index);
                                    close();
                                }, onCancel: close, text: "Are you sure you want to delete this timeslot?" }, { title: 'Confirmation' });

                        }}><TrashIcon/></IconButton>
                    </div>
                    {isLastItem(schedules, index) && <SecondaryButton icon={<Add />} onClick={() => onAdd({ timeFrom: '', timeTo: '' })} />}
                </div>
            )
        });
    }

    const renderDay = (title) => {
        return (
            <div className={'week-schedule-field__day day'}>
                <div className={'day__title'}>{title.toUpperCase()}</div>
                <div className={'day__dates'}>
                    <FieldArray name={`${fieldName}.${title}`}>
                        {({ push, remove }) => {
                            return (
                                <>
                                    {
                                        (formik.values[fieldName][title] && formik.values[fieldName][title].length) ?
                                            renderDaySchedule(title, formik.values[fieldName][title], remove, push) :
                                            <SecondaryButton text={'+ Add timebox'} onClick={() => push({ timeFrom: '', timeTo: '' })} />
                                    }
                                </>
                            )
                        }}
                    </FieldArray>
                </div>
            </div>
        )
    }

    return (
        <div className={'week-schedule-field'}>
            {renderDay('sun')}
            {renderDay('mon')}
            {renderDay('tue')}
            {renderDay('wed')}
            {renderDay('thu')}
            {renderDay('fri')}
            {renderDay('sat')}
        </div>
    )
};


export default WeekScheduleField;