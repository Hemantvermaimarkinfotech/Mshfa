

export const orderStatus = {
    DRAFT: '0',
    REVIEWING: '1',
    CONFIRMED: '2',
    REJECTED: '3',
    CANCELLED: '4',
    PAID: '5',
    DELIVERED: '6',
    APPROVING: '7',
    COMPLETED: '8'
}

export const deliveryTimeSlots = [
    {
        key: 'asap',
        val: 'ASAP',
    },
    {
        key: '0',
        val: '00:00 am - 3:00 am',
    },
    {
        key: '3',
        val: '3:00 am - 6:00 am',
    },
    {
        key: '6',
        val: '6:00 am - 9:00 am',
    },
    {
        key: '9',
        val: '9:00 am - 12:00 pm',
    },
    {
        key: '12',
        val: '12:00 pm - 3:00 pm',
    },
    {
        key: '15',
        val: '3:00 pm - 6:00 pm',
    },
    {
        key: '18',
        val: '6:00 pm - 9:00 pm',
    },
    {
        key: '21',
        val: '9:00 pm - 00:00 am',
    },
];

export const orderRejectReason = [
    'reject-reason.1',
    'reject-reason.2',
    'reject-reason.3',
    'reject-reason.other'
]