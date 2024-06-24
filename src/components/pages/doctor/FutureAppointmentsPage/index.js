import './index.scss';

import { useEffect } from "react";
import { useUser } from "hooks/user";

import {useAppointmentsEvents, useDoctorAppointments} from "hooks/appointments";
import { arrangeAppointmentsByDates, sortByDateProperty } from "utils/appointments";
import { appointmentStatus } from "config/appointment";

import {
    PageMetadata,
    PageHeader,
    PageTitle,
    Board,
    GlobalLoader,
    GlobalError,
    GlobalMessage
} from 'components/layout';
import { AppointmentsList } from 'components/common';

const FutureAppointmentsPage = ({ route }) => {
    const { user } = useUser();
    const { doctorAppointments, doctorAppointmentsError, doctorAppointmentsLoading, refetchDoctorAppointments } = useDoctorAppointments({ period: 'future' });

    const { notification, loading } = useAppointmentsEvents(
        { room: user.id },
        { skip: !user.id }
    );
    useEffect(() => {
        refetchDoctorAppointments()
    }, [notification, loading]);

    if (doctorAppointmentsLoading) {
        return <GlobalLoader />
    }

    if (doctorAppointmentsError) {
        return <GlobalError />
    }

    const doctorType = user.workModel?.key === '2' ? 'walk-in' : 'schedule';

    return (
        <div className={`page future-appointments-page ${doctorType === 'walk-in' ? 'future-appointments-page--walk-in' : ''}`}>
            <PageHeader>
                <PageMetadata>
                    <PageTitle title={route.meta.title} />
                </PageMetadata>
            </PageHeader>
            {
                doctorAppointments && doctorAppointments.length ?
                    doctorType === 'walk-in' ?
                        <AppointmentsList
                            user={user}
                            items={sortByDateProperty(doctorAppointments, 'start', '3')
                                .filter(appointment => [appointmentStatus.PAID, appointmentStatus.IN_PROGRESS, appointmentStatus.CONFIRMED].indexOf(appointment.status.key) !== -1)}
                        /> :
                        <Board user={user} data={sortByDateProperty(arrangeAppointmentsByDates(doctorAppointments), 'date')} />
                    : <GlobalMessage message={'You have no scheduled appointments'} />

            }
        </div>
    )
}

export default FutureAppointmentsPage;
