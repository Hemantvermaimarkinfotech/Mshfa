import {FormattedMessage} from "react-intl";

export default {
    statuses: {
        appointments: {
            success: ['In progress', 'Resolved'],
            normal: ['Confirmed'],
            warn: ['Unresolved', 'Not paid', 'Not confirmed', 'Paid', 'Unpaid', 'Archived', 'Payment processing'],
            fail: ['Cancelled', 'Canceled', 'Rejected', 'Did not attend','Cancelled by patient']
        },
        orders: {
            success: ['In delivery', 'Delivered', 'Completed'],
            normal: ['Draft', 'In progress', 'Approved', 'Paid', 'Confirmed'],
            warn: ['Reviewing', 'Not confirmed', 'Payment processing', 'Approving'],
            fail: ['Cancelled', 'Canceled', 'Rejected']
        },
        medicines: {
            success: ['In stock'],
            warn: ['Awaiting confirmation'],
            fail: ['Rejected']
        },
        tests: {
            success: ['Complete'],
            normal: ['In progress'],
            warn: ['New'],
            fail: ['Rejected']
        },
    },
    subjectStatuses: {
        active: ['Active'],
        blocked: ['Blocked'],
        online: ['Online'],
        offline: ['Offline']
    },
}

export const periodOptions = [
    { key: "future", val: <FormattedMessage id={'words.common.future'}/> },
    { key: "past", val: <FormattedMessage id={'words.common.past'}/> }
]

export const categoryOptions = [
    { key: "0", val: "Scheduled" },
    { key: "1", val: "Walk-In" }
]

export const uploadedByOptions = [
    { key: "doctor", val: <FormattedMessage id={'words.common.doctor'}/> },
    { key: "patient", val: "Patient" },
    { key: "admin", val: "Admin" }
]
