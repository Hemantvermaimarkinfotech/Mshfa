import { PastAppointmentsPage, FutureAppointmentsPage, AppointmentDetailsPage, UnresolvedAppointmentsPage } from 'components/pages'
import {FormattedMessage} from "react-intl";

const doctorPaths = {
    futureAppointments: '/future-appointments',
    futureAppointmentsDetails: '/future-appointments/details/',
    unresolvedAppointmentsDetails: '/unresolved-appointments/details/',
    pastAppointments: '/past-appointments',
    pastAppointmentsDetails: '/past-appointments/details/',
    legal: '/legal'
}

const doctorRoutes = [
    {
        path: '/future-appointments',
        exact: true,
        strict: true,
        component: FutureAppointmentsPage,
        meta: {
            title: <FormattedMessage id={'header.navigation.future-appointments'}/>
        }
    },
    {
        path: '/unresolved-appointments',
        exact: true,
        strict: true,
        component: UnresolvedAppointmentsPage,
        meta: {
            title: <FormattedMessage id={'header.navigation.unresolved-appointments'}/>
        }
    },
    {
        path: '/unresolved-appointments/details/:id',
        exact: true,
        strict: true,
        component: AppointmentDetailsPage,
        meta: {
            title: 'Appointments Details',
            breadcrumbs: [
                { name: <FormattedMessage id={'header.navigation.unresolved-appointments'}/>, path: '/unresolved-appointments' }
            ]
        }
    },
    {
        path: '/future-appointments/details/:id',
        exact: true,
        strict: true,
        component: AppointmentDetailsPage,
        meta: {
            title: 'Appointments Details',
            breadcrumbs: [
                { name: <FormattedMessage id={'header.navigation.future-appointments'}/>, path: '/future-appointments' }
            ]
        }
    },
    {
        path: '/past-appointments',
        exact: true,
        strict: true,
        component: PastAppointmentsPage,
        meta: {
            title: <FormattedMessage id={'header.navigation.past-appointments'}/>,
        }
    }
];

export { doctorPaths, doctorRoutes };
