import moment from "moment";
import {doctorWorkModel} from "config/doctor";
import {appointmentCategory, appointmentStatus} from "config/appointment";

export const arrangeAppointmentsByDates = (appointments) => {
    const datesObject = appointments
        .filter(appointment => appointment.start)
        .reduce((result, appointment) => {

        const date = appointment.start.split('T')[0];

        if (result[date]) {
            result[date] = [...result[date], appointment]
        } else {
            result[date] = [appointment];
        }

        return result;
    }, {})

    return Object.keys(datesObject)
        .map(key => ({ date: key, appointments: datesObject[key] }));
}

export const sortByDateProperty = (items, propName, statusFirst) => {


    const sorter = (a, b) => {
        const aD = a[propName];
        const bD = b[propName];
        const dateA = moment(aD);
        const dateB = moment(bD);

        if (dateA.isBefore(dateB)) {
            return - 1;
        } else if (dateA.isAfter(dateB)) {
            return 1;
        } else {
            return 0;
        }
    };


    if (statusFirst) {
        const withStatus = items.filter(item => item.status.key === statusFirst);
        const toSort = items.filter(item => item.status.key !== statusFirst);
        const sorted = toSort.sort(sorter);
        return [...withStatus, ...sorted];
    }

    return items
        .sort(sorter)
}

export const isActionsPopupAvailable = (appointment) => {
    const currentDoctorWorkModel = appointment?.doctor?.workModel?.key;
    const currentAppointmentCategory = appointment?.category?.key;
    let isRender = false;
    if (currentDoctorWorkModel === doctorWorkModel.SCHEDULED) {
        if ([appointmentStatus.CONFIRMED,appointmentStatus.PAID, appointmentStatus.UNPAID, appointmentStatus.NOT_CONFIRMED, appointmentStatus.CANCELLED].indexOf(appointment?.status.key) !== -1) {
            isRender = true;
        }

    }
    if (currentAppointmentCategory === appointmentCategory.WALK_IN) {
        if ([appointmentStatus.CONFIRMED].indexOf(appointment?.status.key) !== -1)
            isRender = true
    }
    return isRender
}