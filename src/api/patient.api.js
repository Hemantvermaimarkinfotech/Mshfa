import { gql } from "@apollo/client";
import {
  PATIENT_PRESCRIPTION_FIELDS,
  PRESCRIPTION_FIELDS,
} from "./fragments/prescription";
import {
  PATIENT_UPLOAD_FIELDS,
  PATIENT_SICK_LEAVE_FIELDS,
} from "./fragments/upload";

class PatientAPI {
  typename = "PatientType";

  updatePatient() {
    return gql`
      mutation patientUpdate($input: PatientUpdateInput!) {
        patientUpdate(input: $input) {
          success
          errors
          patient {
            firstName
            email
            isEmailConfirmed
            maritalStatus {
              key
              val
            }
            gender {
              key
              val
            }
          }
        }
      }
    `;
  }

  getPatientList() {
    return gql`
      query patient_list_by_emails($search: String!) {
        patientListByEmails(search: $search) {
          totalCount
          edges {
            cursor
            node {
              patientId
              email
              firstName
              lastName
              phone
            }
          }
        }
      }
    `;
  }

  getPatientById() {
    return gql`
      query patientDetails($id: ID!) {
        patientDetails(id: $id) {
          id
          uhi
          firstName
          lastName
          avatar
          dob
          idCard {
            number
            backside
            frontside
          }
          insurance {
            number
            backside
            frontside
          }
          addresses {
            area
            block
            street
            building
            apartment
            additionalInfo
            longitude
            latitude
            avenue
            isPrimary
            id
          }
          medicalInfo {
            bloodType
            weight
            height
            bmi
            allergies {
              val
            }
            diseases {
              val
            }
            socialHabits {
              val
            }
            additionalInfo
          }
          isBlocked
          email
          isEmailConfirmed
          phone
          isPhoneConfirmed
          contract
          maritalStatus {
            val
          }
          signupType
          onboardingComplete
          isPhoneConfirmed
          isEmailConfirmed
          occupation {
            val
          }
          nationality {
            val
          }
          gender {
            val
          }
          languages {
            val
          }
        }
      }
    `;
  }

  getAllPatients() {
    return gql`
      query patientList(
        $ordering: String
        $search: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        patientList(
          ordering: $ordering
          search: $search
          before: $before
          after: $after
          last: $last
          first: $first
        ) {
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
              uhi
              firstName
              lastName
              avatar
              isBlocked
              patientId
              email
              idCard {
                number
              }
              phone
              fullPhone
            }
          }
        }
      }
    `;
  }

  getPatientPrescriptions() {
    return gql`
      query patientPrescriptionHistory(
        $before: String
        $after: String
        $first: Int
        $last: Int
        $patient: String
        $ordering: String
      ) {
        patientPrescriptionHistory(
          before: $before
          after: $after
          first: $first
          last: $last
          patient: $patient
          ordering: $ordering
        ) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ...PrescriptionFields
              appointment {
                id
              }
              items {
                ...PrescriptionItemFields
              }
            }
          }
        }
      }
      ${PATIENT_PRESCRIPTION_FIELDS}
      ${PRESCRIPTION_FIELDS}
    `;
  }

  getPatientUploads() {
    return gql`
      query patientUploadHistory(
        $uploadedBy: String
        $dateFrom: Date
        $dateTo: Date
        $patient: String
        $category: String
        $before: String
        $after: String
        $first: Int
        $last: Int
        $ordering: String
      ) {
        patientUploadHistory(
          uploadedBy: $uploadedBy
          dateFrom: $dateFrom
          dateTo: $dateTo
          patient: $patient
          category: $category
          before: $before
          after: $after
          first: $first
          last: $last
          ordering: $ordering
        ) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ...PatientUploadFields
            }
          }
        }
      }
      ${PATIENT_UPLOAD_FIELDS}
    `;
  }

  getPatientSickLeaves() {
    return gql`
      query patientSickLeaveHistory(
        $companyName: String
        $dateFrom: Date
        $dateTo: Date
        $patient: String
        $doctor: String
        $ordering: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        patientSickLeaveHistory(
          companyName: $companyName
          dateFrom: $dateFrom
          dateTo: $dateTo
          patient: $patient
          doctor: $doctor
          ordering: $ordering
          before: $before
          after: $after
          first: $first
          last: $last
        ) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ...PatientSickLeaveFields
            }
          }
        }
      }
      ${PATIENT_SICK_LEAVE_FIELDS}
    `;
  }

  togglePatientStatus() {
    return gql`
      mutation blockUserToggle($input: BlockUserToggleInput!) {
        blockUserToggle(input: $input) {
          success
          errors
          isBlocked
        }
      }
    `;
  }
}

export default new PatientAPI();
