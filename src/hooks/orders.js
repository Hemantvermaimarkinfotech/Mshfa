import { useMutation, useQuery,useSubscription } from "@apollo/client";
import { OrderAPI } from "api";

export const useOrder = (id) => {
    const { data, loading, error } = useQuery(OrderAPI.getOrderById(), {
        variables: { id },
        errorPolicy: 'all',
    });
    console.log('api responseeeeeeeeeeee',data)
    let order;

    if (data?.orderDetails) {
        order = data.orderDetails;
    }

    return { order, orderLoading: loading, orderError: error };
}

export const useLabTestOrderPaid = (variables, options) => {

    const {data, loading} = useSubscription(OrderAPI.onLabTestOrderPaid(), {
        variables, ...options,
        onSubscriptionData: ({client}) => {
            client.cache.evict({id: 'ROOT_QUERY', fieldName: 'orderList'});
        }
    });

    let notification;

    if (data?.onLabTestOrderPaid) {
        notification = data.onLabTestOrderPaid;
    }

    return {notification, loading};
}

export const useOrderAPI = () => {

    const cacheFunc = {update(cache) {
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'orderList' });
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'orderDetails' });
    }};

    const [update] = useMutation(OrderAPI.updateOrder(), cacheFunc);
    const [reject] = useMutation(OrderAPI.rejectOrder(), cacheFunc);
    const [confirm] = useMutation(OrderAPI.confirmOrder(), cacheFunc);
    const [complete] = useMutation(OrderAPI.completeOrder(), cacheFunc);
    const [decline] = useMutation(OrderAPI.declineOrder(), cacheFunc);
    const [approve] = useMutation(OrderAPI.approveOrder(), cacheFunc);

    const updateOrder = (data) => {
        console.log('updateeeeee',data)
        return update({ variables: { input: data }})
            .then((response) => response.data?.patientOrderUpdate)
    }

    const rejectOrder = (data) => {
        return reject({ variables: { input: data }})
            .then((response) => response.data?.orderReject)
    }

    const confirmOrder = (data) => {
        return confirm({ variables: { input: data }})
            .then((response) => response.data?.orderConfirm)
    }

    const completeOrder = (id) => {
        return complete({ variables: { input: { id } }})
            .then((response) => response.data?.orderComplete)
    }

    const declineOrder = (data) => {
        
        return decline({ variables: { input: data }})
            .then((response) => response.data?.orderDecline)
    }

    const approveOrder = (id) => {
        return approve({ variables: { input: { id } }})
            .then((response) => response.data?.orderApprove)
    }

    return { updateOrder, confirmOrder, completeOrder, declineOrder, rejectOrder, approveOrder };
}
