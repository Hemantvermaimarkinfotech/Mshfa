import './index.scss';

import React from "react";
import { FixedSizeList } from 'react-window'
import { useHistory } from 'react-router-dom';
import { GlobalAppRouter } from "routes";
import { useSnackbar } from "notistack";
import { QueryBuilder } from "@material-ui/icons";
import {useIntl} from "react-intl";

import { appointmentStatus } from 'config/appointment';
import { getAgeFromDateOfBirthday } from 'utils/date';
import { useAppointmentAPI } from "hooks/appointments";
import { GlobalMessage, Paper } from 'components/layout';
import { PrimaryButton, StartAppointmentButton } from 'components/layout/buttons'
import { useDoctorAPI } from "hooks/doctors";

import noAvatar from 'assets/images/no-avatar.svg';


const AppointmentsList = ({ items, user }) => {

    const ITEM_SIZE = 68;
    const ITEM_SIZE_GUTTER = 20;

    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { startAppointment, resolveAppointment } = useAppointmentAPI();
    const { updateStatus } = useDoctorAPI();
    const intl = useIntl()

    const activeAppointment = () => {
        if (!items) return null;
        return items.filter(appointment => appointment?.doctor?.id === user.doctorId && [ appointmentStatus.IN_PROGRESS, appointmentStatus.UNRESOLVED ].indexOf(appointment.status.key) !== -1)[0]
    }

    const availableAppointment = () => {
        if (!items || activeAppointment()) return null;
        return items.find(appointment => appointment?.doctor === null && [ appointmentStatus.PAID, appointmentStatus.CONFIRMED ].indexOf(appointment.status.key) !== -1)
    }

    const handleResolveAppointment = (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        resolveAppointment({ id }).then((response) => {
            if (response.success) {
                enqueueSnackbar("Appointment was successfully resolved");
            } else {
                enqueueSnackbar("Sorry, something went wrong", { variant: 'error' });
            }
        }).catch(() => {
            enqueueSnackbar("Sorry, something went wrong", { variant: 'error' });
        })
    }


    const handleStartAppointment = (id) => {
        const { paths: { futureAppointmentsDetails } } = GlobalAppRouter;
        startAppointment({ id }).then(() => {
            if (user?.workStatus?.val === 'Offline') {
                updateStatus('Online')
                    .then((response) => {
                        if (response.success) {
                            history.push(futureAppointmentsDetails + id);
                        }
                    })
            } else {
                history.push(futureAppointmentsDetails + id);
            }
        })
    }

    const handleViewAppointment = (id) => {
        const { paths: { futureAppointmentsDetails } } = GlobalAppRouter;
        history.push(futureAppointmentsDetails + id);
    }

    const renderLabel = (item) => {
        const activeApp = activeAppointment();
        const availableApp = availableAppointment();
        const isInProgress = item.status.key === '3';
        if (availableApp?.id === item.id) {
            return <StartAppointmentButton onClick={ () => handleStartAppointment(item.id) }/>
        } else if (activeApp?.id === item.id || isInProgress) {
            return renderTextLabel('in-progress');
        } else {
            return renderTextLabel('waiting')
        }
    }

    const renderTextLabel = (status = 'waiting') => {
        return (
            <div className={ `appointments-item__label ${status === 'in-progress' ? 'appointments-item__label--active' : ''}` }>
                <QueryBuilder />
                <span className={ 'appointments-item__label-text' }>{status === 'waiting' ? 'Waiting for a free doctor' : intl.formatMessage({id: 'words.statuses.in-progress'})}</span>
            </div>
        );
    }

    const renderName = (patient) => {
        if (patient.firstName || patient.lastName) {
            return patient.firstName + ' ' + patient.lastName;
        }
        return 'N/A';
    }

    const resolveIsPossible = (appointment) => {
        const activeApp = activeAppointment();
        return activeApp?.id === appointment.id;
    }

    const renderItem = (item, style, index) => {
        const { patient, id } = item;
        const isInProgress = item.status.key === '3';
        const isMyAppointment = item.doctor?.id === user.doctorId

        return (
            <li className={ 'appointments-item' } key={ id } style={ style } onClick={(isInProgress && isMyAppointment) ? () => handleViewAppointment(id) : undefined}>
                <Paper className="appointments-item__content">
                    <div className="appointments-item__info">
                        <img className={ 'appointments-item__avatar' } src={ patient.avatar || noAvatar }
                             alt="patient's avatar"/>
                        <span className={ 'appointments-item__name' }>{renderName(patient)}</span>
                        <div className={ 'appointments-item__block' }>
                            <span className={ 'appointments-item__title' }>Age:</span>
                            <span
                                className={ 'appointments-item__value' }>{ getAgeFromDateOfBirthday(patient.dob) || 'N/A' }</span>
                        </div>
                        <div className={ 'appointments-item__block' }>
                            <span className={ 'appointments-item__title' }>Gender:</span>
                            <span className={ 'appointments-item__value' }>{ patient.gender?.val || 'N/A' }</span>
                        </div>
                    </div>
                    <div className={ 'appointments-item__actions' }>
                        { renderLabel(item, index) }
                        {resolveIsPossible(item) && <PrimaryButton text={'Resolve'} onClickCapture={(event) => handleResolveAppointment(item.id, event)} />}
                    </div>
                </Paper>
            </li>
        )
    }

    const renderScrollableList = ({ data, index, style }) => {
        const item = data[index];
        return item ? renderItem(item, style, index) : null;
    }

    return (

        <ul className={ 'appointments-list' }>
            { items.length ?
                <FixedSizeList itemData={ items } height={ 850 } itemCount={ items.length }
                               itemSize={ ITEM_SIZE + ITEM_SIZE_GUTTER } width={ '100%' }>
                    { renderScrollableList }
                </FixedSizeList>
                :
                <GlobalMessage message={ 'You have no appointments' }/>
            }
        </ul>
    )
}


export default AppointmentsList;
