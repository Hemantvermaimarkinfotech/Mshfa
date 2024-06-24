

export const ordering = {
    patients:
        {
            name: 'last_name',
            uhi: 'uhi',
            email: 'email',
            phone: 'phone',
            idCard: 'id_card',
            status: 'is_active'
        },
    doctors:
        {
            doctorId: 'id',
            name: 'last_name',
            workModel: 'work_model',
            workStatus: 'work_status',
            email: 'email',
            phone: 'phone',
            specializations: 'specializations',
            isBlocked: 'is_active'
        },
    appointments:
        {
            start: 'start',
            patient: 'patient',
            'patient.uhi': 'patient__uhi',
            doctor: 'doctor',
            diagnosis: 'diagnosis',
            paymentType: 'payment_method',
            status: 'status'
        },
    orders:
        {
            orderNum: 'id',
            createdAt: 'created_at',
            patient: 'patient',
            'patient.uhi': 'patient__uhi',
            doctor: 'doctor',
            deliveryAddress: 'delivery_address',
            total: 'total',
            status: 'status'
            // 'id',
            // 'created_at',
            // 'doctor',
            // 'patient',
            // 'delivery_address',
            // 'delivery_fee',
            // 'delivery_date',
            // 'status',
            // 'patient__uhi'
        },
    payments:
        {
            date: 'created_at',
            sender: 'sender',
            'patient.uhi': 'patient__uhi',
            service: 'service',
            method: 'method',
            receiver: 'doctor',
            invoiceType: 'invoice_type',
            amount: 'amount',
            invoice: 'invoice_type',
            // 'created_at',
            // 'sender',
            // 'doctor',
            // 'patient__uhi',
            // 'invoice_type',
            // 'invoice',
            // 'amount',
            // 'method'
        },
    sickLeaves:
        {
            date: 'created_at',
            sender: 'sender',
            'patient.uhi': 'patient__uhi',
            // service: 'service',
            method: 'method',
            receiver: 'doctor',
            invoiceType: 'invoice_type',
            amount: 'amount',
            invoice: 'invoice_type',
            // 'created_at',
            // 'sender',
            // 'doctor',
            // 'patient__uhi',
            // 'invoice_type',
            // 'invoice',
            // 'amount',
            // 'method'
        },

}



