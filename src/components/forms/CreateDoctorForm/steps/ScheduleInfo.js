import React from "react";
import { useFormikContext } from "formik";

import { TitledBlock } from "components/layout";
import { DateInput, RadioGroupField, WeekScheduleField } from "components/forms";
import { useConfig } from "hooks/config";
import { formatISOtoHumanReadable, READABLE_DATE_FORMAT } from "utils/date";
import { Chip } from "@material-ui/core";
import { useErrorMessage } from "hooks/formErrorMessage";

const ScheduleInfo = ({ onDelete, errors }) => {

    const formik = useFormikContext();
    const config = useConfig();

    useErrorMessage(errors);
    const addDaysOff = ( value) => {

        formik.setFieldValue('daysOff', [...formik.values.daysOff, value]);
    }

    const formatDayOffLabel = (value) => {
        if (typeof value === 'string') return formatISOtoHumanReadable(value, READABLE_DATE_FORMAT)
        if (value.hasOwnProperty('dateFrom') && value.hasOwnProperty('dateTo')) {
            if (!value.dateTo) {
                return formatISOtoHumanReadable(value.dateFrom, READABLE_DATE_FORMAT)
            } else {
                return `${formatISOtoHumanReadable(value.dateFrom, READABLE_DATE_FORMAT)} - ${formatISOtoHumanReadable(value.dateTo, READABLE_DATE_FORMAT)}`
            }
        }
    }

    const handleDeleteDayOff = (key) => {
        const daysOff = [...formik.values.daysOff];
        daysOff.splice(key, 1);
        formik.setFieldValue('daysOff', daysOff);
    }

    return (
        <>
            <div className="create-doctor-form__body">
                <div className="create-doctor-form__row">
                    <TitledBlock title={'Weekly schedule'}>
                        <WeekScheduleField onDelete={onDelete} />
                    </TitledBlock>
                </div>
                <div className="create-doctor-form__row">
                    <TitledBlock title={'Appointment time box (New)'}>
                        <RadioGroupField
                            size={'small'}
                            options={config.doctorTimeBoxes}
                            value={formik.values.appointmentTimeBox}
                            name={`appointmentTimeBox`}
                            onChange={formik.handleChange}
                        />

                    </TitledBlock>
                </div>
                <div className="create-doctor-form__row">
                    <TitledBlock title={'Appointment time box (Follow-up)'}>
                        <RadioGroupField
                            size={'small'}
                            options={config.doctorTimeBoxes}
                            value={formik.values.appointmentTimeBoxFollowup}
                            name={`appointmentTimeBoxFollowup`}
                            onChange={formik.handleChange}
                        />

                    </TitledBlock>
                </div>
                <div className="create-doctor-form__row days-off">
                    <TitledBlock title={'Days off'}>
                        <DateInput
                            label={"Choose date, holiday..."}
                            onChange={addDaysOff}
                            isRange={true}
                        />
                    </TitledBlock>
                    <div className="day-off-values">
                        {formik.values.daysOff && formik.values.daysOff.map((value, index) =>
                            <Chip
                                key={`day-off-${index}`}
                                label={formatDayOffLabel(value)}
                                onDelete={() => handleDeleteDayOff(index)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleInfo;