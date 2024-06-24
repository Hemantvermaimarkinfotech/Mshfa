import { gql } from '@apollo/client';

class PaymentAPI {

  getPayments() {
    return gql`
            query paymentList($search: String, $patient: String, $paymentMethod: String, $service: String, $dateFrom: Date, $dateTo: Date, $ordering: String, $before: String, $after: String, $first: Int, $last: Int) {
              paymentList(search: $search, patient: $patient, paymentMethod: $paymentMethod, service: $service, dateFrom: $dateFrom, dateTo: $dateTo, ordering: $ordering, before: $before, after: $after, last: $last, first: $first) {
                totalCount
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
                edges {
                  node {                        
                        createdAt,
                        amount,
                        id,
                        service,
                        method,
                        sender{
                          firstName,
                          lastName,
                          id,
                          avatar,
                          uhi
                        }
                        receiver,
                        receiverType,
                        invoiceType,
                        relationId
                    }
                }
              }
            }`
  }
}

export default new PaymentAPI();