import { gql } from "@apollo/client";
class PackagesApi {
  getAllPackages() {
    return gql`
      query packageList(
        $search: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        packageList(
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
              doctor {
                id
                firstName
                lastName
                avatar
              }
              title
              titleAr
              descriptionAr
              description
              price
              numOfAppointments
              activationDate
              expirationDate
            }
          }
        }
      }
    `;
  }

  createPackage() {
    return gql`
      mutation packageCreate($input: PackageCreateInput!) {
        packageCreate(input: $input) {
          package {
            id
            doctor {
              id
            }
            title
            titleAr
            descriptionAr
            description
            price
            numOfAppointments
            activationDate
            expirationDate
          }
          success
          errors
        }
      }
    `;
  }

  deletePackage() {
    return gql`
      mutation packageDelete($input: PackageDeleteInput!) {
        packageDelete(input: $input) {
          success
          errors
        }
      }
    `;
  }

  updatePackage() {
    return gql`
      mutation packageUpdate($input: PackageUpdateInput!) {
        packageUpdate(input: $input) {
          success
          errors
          package {
            title
            titleAr
            descriptionAr
            description
            id
            price
            numOfAppointments
            activationDate
            expirationDate
            doctor {
              id
            }
          }
        }
      }
    `;
  }

  getPackageById() {
    return gql`
      query packageDetails($id: ID!) {
        packageDetails(id: $id) {
          id
          title
          titleAr
          descriptionAr
          description
          doctor {
            id
          }
          price
          numOfAppointments
          activationDate
          expirationDate
        }
      }
    `;
  }
}

export default new PackagesApi();
