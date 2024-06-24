import './index.scss';
import React, { useState, Fragment, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import cx from "classnames";
import { useSnackbar } from "notistack";
import { useAppointment, useAppointmentAPI } from "hooks/appointments";

import { PrimaryButton, NeutralButton } from "components/layout/buttons";

import { appointmentActions, appointmentDeclineReason, appointmentRejectReason } from "config/appointment";
import attention from "assets/images/attention-icon.svg";
import { GlobalLoader, TitledText } from "components/layout";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { TextField } from "components/forms";
import DoctorSelect from "./DoctorSelect";
import TimeSlotSelect from "./TimeSlotSelect";
import { UserAvatar } from "components/common";
import {formatDate} from "utils/date";

const AppointmentActionsPopup = ({appointmentId, action, onConfirm, onCancel}) => {

    const intl = useIntl();
    const { enqueueSnackbar } = useSnackbar();
    const { confirmAppointment, declineAppointment, rejectAppointment, rescheduleAppointment, reassignDoctor } = useAppointmentAPI();

    const { appointment, appointmentLoading } = useAppointment(appointmentId);

    const [doctor, setDoctor] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

    useEffect(() => {
        setDoctor(appointment?.doctor?.id || '');
    }, [appointment])

    const [ actionReason, setActionReason ] = useState('');
    const [ actionReasonText, setActionReasonText ] = useState('');

    const onReasonChanged = (event, value) => {
        setActionReason(value);
        setActionReasonText('');
    }

    const handleConfirm = () => {
        switch (action) {
            case appointmentActions.CONFIRM:
                confirmAppointment({ id: appointmentId }).then(() => {
                    enqueueSnackbar("Appointment confirmed");
                    onConfirm();
                }).catch(() => {
                    enqueueSnackbar("Error happened while confirm");
                })
                break;
            case appointmentActions.DECLINE:
                declineAppointment({
                    id: appointmentId,
                    reason: actionReason ?
                        actionReason.indexOf('other') !== -1 ? actionReasonText : intl.formatMessage({id:`admin.appointment.${actionReason}`})
                        : ''}
                ).then(() => {
                    enqueueSnackbar("Appointment declined");
                    onConfirm();
                }).catch(() => {
                    enqueueSnackbar("Error happened while declining");
                })
                break;
            case appointmentActions.REJECT:
                rejectAppointment({
                    id: appointmentId,
                    reason: actionReason ?
                        actionReason.indexOf('other') !== -1 ? actionReasonText : intl.formatMessage({id:`admin.appointment.${actionReason}`})
                        : ''}
                ).then(() => {
                    enqueueSnackbar("Appointment rejected");
                    onConfirm();
                }).catch(() => {
                    enqueueSnackbar("Error happened while rejecting");
                })
                break;
            case appointmentActions.RESCHEDULE:
                rescheduleAppointment({
                    id: appointmentId,
                    start: formatDate(timeSlot, 'YYYY-MM-DDTh:mm:ss', 'YYYY-MM-DDTH:mm:ssZ')
                }).then(() => {
                    enqueueSnackbar("Appointment rescheduled");
                    onConfirm();
                }).catch(() => {
                    enqueueSnackbar("Error happened while reschedule");
                })
                break;
            case appointmentActions.REASSIGN:
                reassignDoctor({
                    id: appointmentId,
                    doctorId: doctor
                }).then(() => {
                    enqueueSnackbar("Appointment doctor changed");
                    onConfirm();
                }).catch(() => {
                    enqueueSnackbar("Error happened while reassign");
                })
                break;
        }
    }

    const confirmIsEnabled = () => {
        switch (action) {
            case appointmentActions.DECLINE:
            case appointmentActions.REJECT:
                return actionReason ?
                    actionReason.indexOf('other') !== -1 ? !!actionReasonText : true
                    : false
            case appointmentActions.REASSIGN:
                return doctor && (!appointment?.doctor?.id || appointment?.doctor?.id !== doctor);
            case appointmentActions.RESCHEDULE:
                return !!timeSlot;

        }
        return true;
    }

    const getReasonFields = (reasons) => {
        return <Fragment>
            <RadioGroup className="appointment-actions-modal__radio-group" value={actionReason} onChange={onReasonChanged}>
                {reasons.map(reason => (
                    <FormControlLabel
                        key={reason}
                        value={reason}
                        label={<FormattedMessage id={`admin.appointment.${reason}`}/>}
                        control={<Radio />}/>
                ))}
            </RadioGroup>
            <TextField
                disabled={actionReason.indexOf('other') === -1}
                value={actionReasonText}
                onChange={(e) => setActionReasonText(e.target.value)}
                placeholder="Description of the reason"
            />
        </Fragment>
    }

    const getContent = () => {
        switch(action) {
            case appointmentActions.DECLINE:
                return getReasonFields(appointmentDeclineReason);
            case appointmentActions.REJECT:
                return getReasonFields(appointmentRejectReason);
            case appointmentActions.REASSIGN:
                return <DoctorSelect appointment={appointment} {...{doctor, setDoctor}} />
            case appointmentActions.RESCHEDULE:
                return <TimeSlotSelect appointment={appointment} {...{timeSlot, setTimeSlot}} />
        }
        return null;
    }

    const getAttentionBlock = () => {
        return action !== appointmentActions.CONFIRM && <div className="appointment-actions-modal__description">
            <img
                className={'appointment-actions-modal__description__icon'}
                src={attention}
                alt="attention"
            />
            Make sure the patient is familiar with and agrees with the changes in the appointment.
        </div>
    }

    const getUserInfoBlock = () => {
        return action !== appointmentActions.CONFIRM && <div className="appointment-actions-modal__patient-info">
            <TitledText title={'Patient'}>
                <UserAvatar user={appointment?.patient}/>
            </TitledText>
            <TitledText localeId={'words.common.phone-number'}>{appointment?.patient?.phone || 'N/A'}</TitledText>
        </div>
    }
    const getCancelText = () => {
        return action === appointmentActions.CONFIRM ? "No" : <FormattedMessage id={'words.common.cancel'}/>;
    }

    const getConfirmText = () => {
        return action === appointmentActions.CONFIRM ? "Yes" : <FormattedMessage id={'words.common.done'}/>;
    }

    const modalClasses = cx({
        'appointment-actions-modal' : true,
        'small': action === appointmentActions.CONFIRM,
    })

    if (appointmentLoading) {
        return <div className={modalClasses}><GlobalLoader /></div>
    }


    return <div className={modalClasses}>
        {getAttentionBlock()}
        {getUserInfoBlock()}
        <div className="appointment-actions-modal__content">
            {getContent()}
        </div>
        <div className="appointment-actions-modal__buttons">
            <NeutralButton text={getCancelText()} onClick={onCancel}/>
            <PrimaryButton text={getConfirmText()} disabled={!confirmIsEnabled()} onClick={() => handleConfirm()}/>
        </div>
    </div>;
}

export default AppointmentActionsPopup;
