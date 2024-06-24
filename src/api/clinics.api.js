import { gql } from "@apollo/client";
class ClinicsApi {
  getAllClinics() {
    return gql`
      query allClinics(
        $search: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        allClinics(
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
              title
              titleAr
              status
              activatedDate
              deactivatedDate
              logo
            }
          }
        }
      }
    `;
  }

  createClinic() {
    return gql`
      mutation createClinic($input: ClinicCreateInput!) {
        createClinic(input: $input) {
          clinicObj {
            id
            title
            titleAr
            logo
            status
          }
          success
          errors
        }
      }
    `;
  }

  deleteClinic() {
    return gql`
      mutation deleteClinic($input: ClinicDeleteInput!) {
        deleteClinic(input: $input) {
          success
          errors
        }
      }
    `;
  }

  updateClinic() {
    return gql`
      mutation updateClinic($input: ClinicUpdateInput!) {
        updateClinic(input: $input) {
          success
          errors
          clinicObj {
            id
            title
            titleAr
            logo
            status
          }
        }
      }
    `;
  }

  getClinicById() {
    return gql`
      query clinic($id: ID!) {
        clinic(ID: $id) {
          id
          title
          titleAr
          logo
          status
          activatedDate
          deactivatedDate
        }
      }
    `;
  }
}

export default new ClinicsApi();
