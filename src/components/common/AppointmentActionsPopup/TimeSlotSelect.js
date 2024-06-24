import React, { useEffect, useState } from "react";
import { useDoctorAPI } from "hooks/doctors";
import { formatISOtoHumanReadable, READABLE_DATE_FORMAT } from "utils/date";
import { DateInput, SelectInput } from "components/forms";
import {useIntl} from "react-intl";


const TimeSlotSelect = ( { appointment, setTimeSlot } ) => {

    const {getAvailableDates, availableDatesLoading} = useDoctorAPI();

    const [appointmentDate, setAppointmentDate] = useState('');

    const [appointmentTime, setAppointmentTime] = useState('');

    const [daysEnabled, setDaysEnabled] = useState([]);

    const [timeSlotsEnabled, setTimeSlotsEnabled] = useState([]);

    const [doctorId, setDoctorId] = useState('');

    const intl = useIntl()

    useEffect(() => {
        if (appointment && appointment.start) {
            setAppointmentDate(formatISOtoHumanReadable(appointment.start, 'YYYY-MM-DD'))
            setAppointmentTime(formatISOtoHumanReadable(appointment.start, 'HH:mm'))
        }
        if (appointment?.doctor?.id) {
            setDoctorId(appointment?.doctor?.id);
        }
    }, [appointment])


    useEffect(() => {
        if (doctorId) {
            setTimeSlotsEnabled([]);
            getAvailableDates({id: doctorId, selectedDate: appointmentDate, serviceType: appointment.serviceType?.key})
                .then(data => {
                    setDaysEnabled(data.dateList);
                    setTimeSlotsEnabled(data.timeList.map(slot => ({key: slot.time, val: slot.timeStr})));
                })
        }
    }, [appointmentDate, doctorId])

    useEffect(() => {
        if (appointmentDate && appointmentTime) {
            setTimeSlot(`${appointmentDate}T${appointmentTime}`)
        } else {
            setTimeSlot('')
        }
    }, [appointmentDate, appointmentTime])

    const onTimeChanged = (event) => {
        setAppointmentTime(event.target.value);
    }

    const onDateChanged = (event) => {
        setAppointmentTime('');
        setTimeSlotsEnabled([]);
        setAppointmentDate(event.target.value)
    }

    return <div className="timeslot-select">
        {daysEnabled && daysEnabled.length ? <DateInput
                label={intl.formatMessage({id : 'words.common.date'})}
                value={appointmentDate}
                onChange={onDateChanged}
                dateFormat={READABLE_DATE_FORMAT}
                daysEnabled={daysEnabled}
            />
            : availableDatesLoading ?
                <div className="not-found">Available dates loading</div>
                : <div className="not-found">There are no available dates</div>
        }
        {timeSlotsEnabled && timeSlotsEnabled.length ? <SelectInput
                label={intl.formatMessage({id : 'words.common.time'})}
                value={appointmentTime}
                options={timeSlotsEnabled}
                onChange={onTimeChanged}
            />
            : availableDatesLoading ?
                <div className="not-found">Available time loading</div>
                : <div className="not-found">There are no available time</div>
        }
    </div>
}

export default TimeSlotSelect;
