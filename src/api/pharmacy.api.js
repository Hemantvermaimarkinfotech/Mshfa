import { gql } from '@apollo/client';
import { PHARMACIST_FIELDS } from "api/pharmacist.api";

class PharmacyAPI {

  typename = 'PharmacyType';

  togglePharmacyStatus() {
    return gql`
            mutation BlockPharmacyToggle($input: BlockPharmacyToggleInput!) {
              blockPharmacyToggle(input: $input) {
                isBlocked
                success
                errors
              }
            }
        `
  }

  deletePharmacy() {
    return gql`
            mutation PharmacyDelete($input: PharmacyDeleteInput!) {
              pharmacyDelete(input: $input) {
                success
                errors
              }
            }
        `
  }

  createPharmacy() {
    return gql`
            mutation PharmacyCreate($input: PharmacyCreateInput!) {
              pharmacyCreate(input: $input) {
                pharmacy {
                    ...PharmacyFields
                }
                success
                errors
              }
            }
        ${PHARMACY_FIELDS}`
  }

  updatePharmacy() {
    return gql`
            mutation PharmacyUpdate($input: PharmacyUpdateInput!) {
              pharmacyUpdate(input: $input) {
                pharmacy {
                    ...PharmacyFields
                }
                success
                errors
              }
            }
        ${PHARMACY_FIELDS}`
  }

  getPharmacyById() {
    return gql`
    query PharmacyDetails($id: ID!) {
      pharmacyDetails(id: $id) {
        ...PharmacyFields
      }
    }
    ${ PHARMACY_FIELDS }`
  }

  getAllPharmacies() {
    return gql`
      query PharmacyList($search: String, $awaitingConfirmation: Boolean, $before: String, $after: String, $first: Int, $last: Int) {
        pharmacyList(search: $search, awaitingConfirmation: $awaitingConfirmation, before: $before, after: $after, last: $last, first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              title
              area
              block
              street
              building
              email
              phones {
                id
                phone
              }
              isBlocked
            }
          }
        }
      }`
  }
}

const PHARMACY_FIELDS = gql`
  fragment PharmacyFields on PharmacyType {
      id
        title
        area
        block
        street
        building
        deliveryTime
        deliveryFee
        minimumOrderPrice
        email
        phones {
          id
          phone
        }
        workingHours {
          mon {
            id
            timeFrom
            timeTo
            delete
          }
          tue  {
            id
            timeFrom
            timeTo
            delete
          }
          wed {
            id
            timeFrom
            timeTo
            delete
          }
          thu {
            id
            timeFrom
            timeTo
            delete
          }
          fri {
            id
            timeFrom
            timeTo
            delete
          }
          sat {
            id
            timeFrom
            timeTo
            delete
          }
          sun {
            id
            timeFrom
            timeTo
            delete
          }
        }
        isBlocked
        pharmacists {
          ...PharmacistFields
        }
        medications {
          id
          title
          titleNew
          description
          descriptionNew
          price
          priceNew
          prescriptionRequired
          prescriptionRequiredNew
          picture
          status {
              key
              val
            }
        }
  }
  ${PHARMACIST_FIELDS}`;

export default new PharmacyAPI();