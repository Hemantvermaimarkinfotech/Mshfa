import { gql } from "@apollo/client";
class AdsApi {
  getAllAds() {
    return gql`
      query allAds(
        $search: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        allAds(
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

  createAd() {
    return gql`
      mutation createAd($input: AdCreateInput!) {
        createAd(input: $input) {
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

  deleteAd() {
    return gql`
      mutation deleteAd($input: AdDeleteInput!) {
        deleteAd(input: $input) {
          success
          errors
        }
      }
    `;
  }

  updateAd() {
    return gql`
      mutation updateAd($input: AdUpdateInput!) {
        updateAd(input: $input) {
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

  getAdById() {
    return gql`
      query ad($id: ID!) {
        ad(ID: $id) {
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
          isApproved
          isInteractive
          isPackage
        }
      }
    `;
  }
}

export default new AdsApi();
