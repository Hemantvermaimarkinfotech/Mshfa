import './index.scss';
import React from "react";

import {appointmentActions, appointmentCategory, appointmentStatus} from "config/appointment";

import doctor from 'assets/images/doctor-icon.svg';
import reschedule from 'assets/images/reschedule-icon.svg';
import reject from 'assets/images/reject-icon.svg';

const AppointmentActionsDropdown = (
    {
        onActionClick,
        appointment
    }) => {
    const currentAppointmentCategory = appointment?.category?.key;
    return (
        <div className={'appointment-actions-dropdown'}>
            <ul className={'appointment-actions-dropdown__list'}>
                {currentAppointmentCategory === appointmentCategory.SCHEDULED && (
                <>
                    {[ appointmentStatus.CONFIRMED, appointmentStatus.UNPAID, appointmentStatus.NOT_CONFIRMED, appointmentStatus.CANCELLED ].indexOf(appointment?.status?.key) !== -1 &&
                    <li className={'appointment-actions-dropdown__item'}
                        onClick={() => onActionClick(appointmentActions.REASSIGN)}>
                        <img className={'appointment-actions-dropdown__icon'} src={doctor} alt="doctor"/>
                        <span className={'appointment-actions-dropdown__text'}>Reassign Doctor</span>
                    </li>
                }
                {[appointmentStatus.CONFIRMED,appointmentStatus.PAID, appointmentStatus.UNPAID, appointmentStatus.NOT_CONFIRMED ].indexOf(appointment?.status?.key) !== -1 &&
                    <li className={'appointment-actions-dropdown__item'} onClick={() => onActionClick(appointmentActions.RESCHEDULE)}>
                        <img className={'appointment-actions-dropdown__icon'} src={reschedule} alt="reschedule"/>
                        <span className={'appointment-actions-dropdown__text'}>Reschedule</span>
                    </li>
                }</>)}
                {appointment?.status?.key === appointmentStatus.CONFIRMED &&
                <li className={'appointment-actions-dropdown__item'} onClick={() => onActionClick(appointmentActions.REJECT)}>
                    <img className={'appointment-actions-dropdown__icon'} src={reject} alt="reject"/>
                    <span className={'appointment-actions-dropdown__text'}>Reject</span>
                </li>}
            </ul>
        </div>
    );
}

export default AppointmentActionsDropdown;