import React, { useEffect, useState } from "react";
import { useConfig } from "hooks/config";
import { useDoctorAPI } from "hooks/doctors";

import { SelectInput, AutocompleteInput } from "components/forms";
import noAvatar from "assets/images/no-avatar.svg";
import { appointmentTime } from "config/appointment";
import {useIntl} from "react-intl";

const DoctorSelect = ( { appointment, doctor, setDoctor } ) => {

    const { doctorSpecialities } = useConfig();

    const intl = useIntl();

    const [doctors, setDoctors] = useState([]);

    const getMainSpecialization = () => {
        const specializations =  appointment?.doctor?.specializations || [];
        const getPrimarySpecialization = (specializations) => {
            const primary =  specializations.find(specialization => specialization.isPrimary);
            if (primary) {
                return primary[0]?.speciality.key;
            }
            return '';
        }
        if (specializations.length) {
            return getPrimarySpecialization(specializations) || specializations[0].speciality.key || '';
        }
        return '';
    }

    const [ specialization, setSpecialization ] = useState(getMainSpecialization());

    const { getAvailableDoctors } = useDoctorAPI();

    useEffect(() => {
        if (specialization) {
            getAvailableDoctors({
                specialization,
                availabilityTime: appointment.start,
                timeBox: appointment?.doctor?.appointmentTimeBox?.key || appointmentTime.HALF_HOUR
            })
            .then(response => {
                setDoctors(response)
            })
        } else {
            setDoctors([])
        }
    }, [specialization, appointment])

    const filterDoctors = (options, state) => {
        return options.filter(doctor => `${doctor.firstName} ${doctor.lastName}`.toLowerCase().indexOf(state.inputValue.toLowerCase()) !== -1);
    }

    const renderDoctor = (doctor) => {
        if (doctor) {
            return <div className="select-doctor-info">
                <div className="avatar">
                    <img src={ doctor?.avatar || noAvatar } alt={ "doctor's avatar" }/>
                </div>
                <span
                    className={ 'name' }>
                    { `${ doctor?.firstName || '' } ${ doctor?.lastName || '' }` }
                </span>
            </div>
        }
        return null;
    }

    const renderDoctorOption = (option) => {
        return renderDoctor(option);
    }

    const renderValue = (value) => {
        if (!value) return '';
        const doctor = doctors?.find(doctor => doctor.id === value);
        if (doctor) {
            return renderDoctor(doctor);
        }
        setDoctor('');
        return '';
    }

    return <div className="doctor-select">
        <AutocompleteInput
            blurOnSelect
            label={ 'Specialization' }
            options={doctorSpecialities }
            onChange={(event) => setSpecialization(event.target.value)}
            value={specialization}
        />

        {doctors?.length ? <SelectInput
            label={ intl.formatMessage({id: 'words.common.doctor'}) }
            options={doctors }
            renderValue={renderValue}
            onChange={(event) => setDoctor(event.target.value)}
            renderOption={renderDoctorOption}
            filterOptions={filterDoctors}
            value={doctor}
        /> : <div className="not-found">There are no doctors at needed time</div>}


    </div>
}

export default DoctorSelect;
