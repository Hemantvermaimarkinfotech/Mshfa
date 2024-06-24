import { gql } from "@apollo/client";
class AdvertisementApi {
  getAllAdvertise() {
    return gql`
      query allAdvertise(
        $search: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        allAdvertise(
          search: $search
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
              name
              imageUrl
              clientUrl
              isActive
              expiryDateTime
              toOpen
              doctorId {
                id
                serviceType {
                  key
                  val
                }
              }
              isApproved
              isInteractive
            }
          }
        }
      }
    `;
  }

  createAdvertisement() {
    return gql`
      mutation createAdvertise($input: AdvertiseCreateInput!) {
        createAdvertise(input: $input) {
          AdObj {
            id
            name
            imageUrl
            toOpen
            serviceType {
              key
            }
            doctorId {
              id
            }
            clientUrl
            #expiryDateTime
            #isActive
            #isApproved
            #isInteractive
            #isPackage
          }
          success
          errors
        }
      }
    `;
  }

  deleteAdvertisement() {
    return gql`
      mutation deleteAdvertise($input: AdvertiseDeleteInput!) {
        deleteAdvertise(input: $input) {
          success
          errors
        }
      }
    `;
  }

  updateAdvertisement() {
    return gql`
      mutation updateAdvertise($input: AdvertiseUpdateInput!) {
        updateAdvertise(input: $input) {
          success
          errors
          AdObj {
            id
            name
            toOpen
            serviceType {
              key
            }
            doctorId {
              id
            }
            clientUrl
            imageUrl
            expiryDateTime
            isActive
            isApproved
            isInteractive
            isPackage
          }
        }
      }
    `;
  }

  getAdvertisementById() {
    return gql`
      query advertise($id: ID!) {
        advertise(ID: $id) {
          id
          name
          imageUrl
          isActive
          expiryDateTime
          toOpen
          doctorId {
            id
            serviceType {
              key
              val
            }
          }
          clientUrl
          isApproved
          isInteractive
          isPackage
        }
      }
    `;
  }
}

export default new AdvertisementApi();
