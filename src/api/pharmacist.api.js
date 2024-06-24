import { gql } from '@apollo/client';

class PharmacistAPI {

  typename = "PharmacyStaffType";

  getAllPharmacists() {
    return gql`
      query PharmacistList($search: String, $pharmacy: String, $status: Float, $before: String, $after: String, $first: Int, $last: Int) {
        pharmacistList(search: $search, pharmacy: $pharmacy, status: $status, before: $before, after: $after, last: $last, first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ...PharmacistFields
            }
          }
        }
      }
      ${PHARMACIST_FIELDS}`
  }

  getPharmacistById() {
    return gql`
    query PharmacyStaffDetails($id: ID!) {
    pharmacyStaffDetails(ID: $id) {
      id
      avatar
      email
      firstName
      lastName
      dob
      phone
      adminNotes
    }
}

    `
  }

  createPharmacist() {
    return gql`
            mutation PharmacistCreate($input: PharmacistCreateInput!) {
              pharmacistCreate(input: $input) {
                pharmacist {
                    ...PharmacistFields
                }
                success
                errors
              }
            }
        ${PHARMACIST_FIELDS}`
  }

  deletePharmacist() {
    return gql`
            mutation PharmacistDelete($input: PharmacistDeleteInput!) {
              pharmacistDelete(input: $input) {
                success
                errors
              }
            }
        `
  }

  updatePharmacist() {
    return gql`
            mutation PharmacistUpdate($input: PharmacistUpdateInput!) {
              pharmacistUpdate(input: $input) {
                pharmacist {
                    ...PharmacistFields
                }
                success
                errors
              }
            }
        ${PHARMACIST_FIELDS}`
  }
}

export const PHARMACIST_FIELDS = gql`
  fragment PharmacistFields on PharmacistType {
    id
    avatar
    email
    firstName
    lastName
    dob
    phone
    adminNotes
  }
`;

export default new PharmacistAPI();