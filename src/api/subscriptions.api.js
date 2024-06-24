import { gql } from "@apollo/client";
class SubscriptionsApi {
  getAllSubscriptions() {
    return gql`
      query subscriptionList(
        $status: [String]
        $before: String
        $search: String
        $after: String
        $first: Int
        $last: Int
      ) {
        subscriptionList(
          search: $search
          status: $status
          before: $before
          after: $after
          last: $last
          first: $first
        ) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            node {
              id
              patient{
                id
                  firstName
                  lastName
                  avatar
              }
              status {
                key
                val
              }
              remainingAppointments
              package {
                id
                numOfAppointments
                title
                titleAr
                descriptionAr
                description
                price
                doctor {
                  id
                  firstName
                  lastName
                  avatar
                }
              }
            }
          }
        }
      }
    `;
  }

  subscriptionDelete() {
    return gql`
      mutation subscriptionDelete($input: SubscriptionDeleteInput!) {
        subscriptionDelete(input: $input) {
          success
          errors
        }
      }
    `;
  }

  getSubscriptionById() {
    return gql`
      query subscription($id: ID!) {
        subscription(id: $id) {
          status {
            key
            val
          }
          patient{
            id
              firstName
              lastName
              avatar
          }
          package {
            id
            title
            titleAr
            descriptionAr
            description
            price
            doctor {
              id
              firstName
              lastName
              avatar
            }
            expirationDate
            activationDate
            numOfAppointments
          }
        }
      }
    `;
  }
}

export default new SubscriptionsApi();
