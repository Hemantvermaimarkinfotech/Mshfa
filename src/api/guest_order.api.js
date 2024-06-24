import {gql} from "@apollo/client";
import {
    ORDER_FIELDS,
    ORDER_DETAILS_FIELDS,
    ORDER_PHARMACY_FIELDS,
    ORDER_ITEM_FIELDS
} from "./fragments/guest_order";

class GuestOrderAPI {
    getAllOrders() {
        return gql`
            query orderList($category: String, $patient: String, $pharmacy: String, $period: String, $search: String, $status: [String], $dateFrom: Date, $dateTo: Date, $ordering: String, $before: String, $after: String, $first: Int, $last: Int) {
                orderList(category: $category, patient: $patient, pharmacy: $pharmacy, period: $period, search: $search, status: $status, dateFrom: $dateFrom, dateTo: $dateTo, ordering: $ordering, before: $before, after: $after, last: $last, first: $first) {
                    totalCount
                    pageInfo {
                      hasNextPage
                      hasPreviousPage 
                      startCursor
                      endCursor
                    }
                    edges {
                        node {
                            ...OrderFields
                        }
                    }
                }
            }
      ${ORDER_FIELDS}`
    }

    getOrderById() {
        return gql`
            query orderDetails($id: ID!) {
                orderDetails(id: $id) {
                    ...OrderDetailsFields
                    pharmacy {
                        ...OrderPharmacyFields
                    }
                    items {
                            ...OrderItemFields
                        }
                }
            }
        
        ${ORDER_DETAILS_FIELDS} ${ORDER_PHARMACY_FIELDS} ${ORDER_ITEM_FIELDS}
        `
    }


    updateOrder() {
        return gql`
            mutation OrderUpdate($input: PatientOrderUpdateInput!) {
                patientOrderUpdate(input: $input) {
                    order {
                        ...OrderDetailsFields
                        pharmacy {
                            ...OrderPharmacyFields
                        }
                         items {
                            ...OrderItemFields
                        }
                    }
                    success
                    errors
                }
            }
            ${ORDER_DETAILS_FIELDS} ${ORDER_PHARMACY_FIELDS} ${ORDER_ITEM_FIELDS}
        `
    }

    rejectOrder() {
        return gql`
            mutation OrderReject($input: OrderRejectInput!) {
                orderReject(input: $input) {
                    order {
                        ...OrderDetailsFields
                        pharmacy {
                            ...OrderPharmacyFields
                        }
                        items {
                            ...OrderItemFields
                        }
                    }
                    success
                    errors
                }
            }
            ${ORDER_DETAILS_FIELDS} ${ORDER_PHARMACY_FIELDS} ${ORDER_ITEM_FIELDS}
        `
    }

    confirmOrder() {
        return gql`
            mutation orderConfirm($input: OrderConfirmInput!) {
                orderConfirm(input: $input) {
                    success
                    errors
                }
            }`
    }

    declineOrder() {
        return gql`
            mutation orderDecline($input: OrderDeclineInput!) {
                orderDecline(input: $input) {
                    success
                    errors
                }
            }`
    }

    approveOrder() {
        return gql`
            mutation orderDecline($input: OrderApproveInput!) {
                orderApprove(input: $input) {
                    success
                    errors
                }
            }`
    }

    completeOrder() {
        return gql`
            mutation orderComplete($input: OrderCompleteInput!) {
                orderComplete(input: $input) {
                    success
                    errors
                }
            }`
    }
}

export default new GuestOrderAPI();