export default {
    maxSizeDoctorsAttachment: 20971520, // 20MB
    allowedExtensionsDoctorsAttachments: ['application/pdf', 'image/png', 'image/jpg', 'image/jpeg'],
}

export const appointmentStatus = {
    ARCHIVED: '0',
    NOT_CONFIRMED: '1',
    CONFIRMED: '2',
    IN_PROGRESS: '3',
    REJECTED: '4',
    CANCELLED: '5',
    RESOLVED: '6',
    UNRESOLVED: '7',
    UNPAID: '8',
    PAID: '10',
    DID_NOT_ATTENDED: '11',
}

export const appointmentCategory = {
    SCHEDULED: '0',
    WALK_IN: '1'
}
export const paymentMethods = {
    INSURANCE: "Insurance",
    CONTRACT: "Contract"
}

export const appointmentAttachmentCategory = {
    ATTACHMENT: "Attachment",
}

export const appointmentUploadedBy = {
    PATIENT: "Patient",
    DOCTOR: "Doctor"
}

export const appointmentTime = {
    QUARTER_HOUR: '15',
    HALF_HOUR: '30',
    HOUR: '60'
}

export const appointmentActions = {
    DECLINE: 'decline',
    CONFIRM: 'confirm',
    REASSIGN: 'reassign',
    RESCHEDULE: 'reschedule',
    REJECT: 'reject',
}

export const appointmentDeclineReason = [
    'decline-reason.1',
    'decline-reason.2',
    'decline-reason.3',
    'decline-reason.other'
]

export const appointmentRejectReason = [
    'reject-reason.1',
    'reject-reason.2',
    'reject-reason.3',
    'reject-reason.other'
]
