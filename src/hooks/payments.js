import { useQuery } from "@apollo/client";
import PaymentAPI from "api/payment.api";

export const usePayments = (patient) => {

    const { data, loading, error, refetch } = useQuery(PaymentAPI.getPayments(), {
        variables: { patient },
        errorPolicy: 'all',
    });
    let payments = [];

    if (data?.paymentList) {
        payments = data.paymentList.edges.map(edge => edge.node);
    }

    return { payments, paymentsLoading: loading, paymentsError: error, refetchPayments: refetch };

}
