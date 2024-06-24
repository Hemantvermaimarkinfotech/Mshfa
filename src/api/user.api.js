import { gql } from "@apollo/client";

class UserAPI {
  me() {
    return gql`
      query ($isDoctor: Boolean!, $isPharmacist: Boolean!) {
        me {
          groups {
            name
            permissions {
              name
              codename
            }
          }
          id
          role
          isAdmin
          doctor @include(if: $isDoctor) {
            id
            avatar
            firstName
            lastName
            specializations {
              specialistType {
                key
                val
              }
              speciality {
                key
                val
              }
              grade
              licenseNumber
              isPrimary
              id
            }
            workStatus {
              key
              val
            }
            workModel {
              key
              val
            }
            isBlocked
            doctorStamp
            email
            phone
            educations {
              place
              degree
              yearStart
              yearEnd
              id
            }
            diplomas {
              name
              id
            }
            schedules {
              mon {
                timeFrom
                timeTo
                id
              }
              tue {
                timeFrom
                timeTo
                id
              }
              wed {
                timeFrom
                timeTo
                id
              }
              thu {
                timeFrom
                timeTo
                id
              }
              fri {
                timeFrom
                timeTo
                id
              }
              sat {
                timeFrom
                timeTo
                id
              }
              sun {
                timeFrom
                timeTo
                id
              }
            }
          }
          pharmacist @include(if: $isPharmacist) {
            firstName
            lastName
            pharmacyId
            avatar
            email
            notes
            id
          }
        }
      }
    `;
  }
}

export default new UserAPI();
