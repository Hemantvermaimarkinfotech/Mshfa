import { gql } from '@apollo/client';

export const PHARMACISTSTAFF_FIELDS = gql`
  fragment PharmacistStaffFields on PharmacyStaffType {
      id
      firstName
      lastName
      email
      phone
      gender {
        key
        val
      }
      dob
      languages {
        key
        val
      }
      adminNotes
  }
`;

export const CORE_PHARMACY_STAFF_FIELDS = gql`
  fragment CoreStaffFields on PharmacyStaffType {
    id
    firstName
    lastName
    email
    phone
  }
`;

class PharmacistStaffAPI {
    constructor() {
        this.typename = "pharmacyStaffList";
    }

    getAllPharmacyStaff() {
        return gql`
            query pharmacyStaffList($search: String, $ordering: String, $before: String, $after: String, $first: Int, $last: Int) {
                pharmacyStaffList(search: $search, ordering: $ordering, before: $before, after: $after, last: $last, first: $first) {
                    totalCount
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                    edges {
                        node {
                            ...CoreStaffFields
                        }
                    }
                }
            }
            ${CORE_PHARMACY_STAFF_FIELDS} 
        `;
    }
    getPharmacyStaffById() {
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
          gender{
            key
            val
          }
          languages {
                  key
                  val
                }
        }
    }
        `;
    }
       

    deletePharmacyStaff() {
        return gql`
            mutation PharmacistStaffDelete($input: PharmacyStaffDeleteInput!) {
                PharmacistStaffDelete(input: $input) {
                    success
                    errors
                }
            }
        `
    }
    createPharmacistStaff() {
        return gql`
            mutation PharmacistStaffCreate($input: PharmacistStaffCreateInput!) {
                PharmacistStaffCreate(input: $input) {
                    pharmacistStaff {
                        id
                        firstName
                        lastName
                        email
                        phone
                        gender {
                            key
                            val
                        }
                        dob
                        languages {
                            key
                            val
                        }
                        adminNotes
                    }
                    success
                    errors
                }
            }
        `;
    }

    updatePharmacistStaff() {
        return gql`
                mutation PharmacistStaffUpdate($input: PharmacistStaffUpdateInput!) {
                  PharmacistStaffUpdate(input: $input) {
                    pharmacistStaff {
                        
                        id
                        firstName
                        lastName
                        email
                        phone
                        gender {
                            key
                            val
                        }
                        dob
                        languages {
                            key
                            val
                        }
                        adminNotes
                    }
                    success
                    errors
                  }
                }
            `
      }
}

// export const PHARMACIST_FIELDS = gql`
//   fragment PharmacistFields on PharmacistType {
//     id
//     avatar
//     email
//     firstName
//     lastName
//     dob
//     phone
//     adminNotes
//   }
// `;
export default new PharmacistStaffAPI();
