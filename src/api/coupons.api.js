import { gql } from "@apollo/client";
class CouponsApi {
  getAllCoupons() {
    return gql`
      query promoCodes(
        $before: String
        $after: String
        $first: Int
        $last: Int
        $search: String
      ) {
        promoCodes(
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
              couponName
              couponCode
              maxDiscountAmount
              maxNoRedeem
              startDate
              endDate
              isActive
              allLabTests
              homeServiceSetup
              serviceType
              allServices
              fixedAmount
              discountPercentage
              allDoctors
              allPatients
              labTests {
                id
                price
              }
              users {
                edges {
                  node {
                    id
                    firstName
                  }
                }
              }
            }
          }
        }
      }
    `;
  }

  createCoupon() {
    return gql`
      mutation promoCodeCreate($input: PromoCodeCreateInput!) {
        promoCodeCreate(input: $input) {
          promoCode {
            couponName
            couponCode
            maxDiscountAmount
            maxNoRedeem
            startDate
            endDate
            isActive
            allServices
            fixedAmount
            discountPercentage
            homeServiceSetup
            allDoctors
            allPatients
            allLabTests
            serviceType
          }
          success
          errors
        }
      }
    `;
  }

  updateCoupon() {
    return gql`
      mutation promoCodeUpdate($input: PromoCodeUpdateInput!) {
        promoCodeUpdate(input: $input) {
          success
          errors
          promoCode {
            id
            couponName
            couponCode
            maxDiscountAmount
            maxNoRedeem
            startDate
            endDate
            homeServiceSetup
            isActive
            allLabTests
            serviceType
            allServices
            fixedAmount
            discountPercentage
            allDoctors
            allPatients
            labTests {
              id
              price
            }
            users {
              edges {
                node {
                  id
                  firstName
                }
              }
            }
          }
        }
      }
    `;
  }

  getCouponById() {
    return gql`
      query promoCodeById($id: ID!) {
        promoCodeById(ID: $id) {
          id
          couponName
          couponCode
          maxDiscountAmount
          maxNoRedeem
          startDate
          endDate
          homeServiceSetup
          isActive
          serviceType
          allLabTests
          allServices
          fixedAmount
          discountPercentage
          allDoctors
          allPatients
          labTests {
            id
            price
          }
          doctors {
            doctorId
            firstName
            lastName
          }
          patients {
            patientId
            firstName
            lastName
          }
        }
      }
    `;
  }
  toggleCouponStatus() {
    return gql`
      mutation promoCodeUpdate($input: PromoCodeUpdateInput!) {
        promoCodeUpdate(input: $input) {
          success
          errors
          promoCode {
            id
            isActive
          }
        }
      }
    `;
  }
}

export default new CouponsApi();
