import { gql } from "@apollo/client";

import { APPOINTMENT_FIELDS } from "./fragments/appointment";
import { DOCTOR_APPOINTMENT_INFO } from "./fragments/doctor";

class AppointmentAPI {
  getAppointmentById() {
    return gql`
      query appointmentDetails($id: ID!, $isAdmin: Boolean = false) {
        appointmentDetails(id: $id) {
          ...AppointmentFields
          doctor @include(if: $isAdmin) {
            ...DoctorNameFields
            specializations {
              speciality {
                key
              }
              isPrimary
            }
          }
        }
      }
      ${APPOINTMENT_FIELDS}
      ${DOCTOR_APPOINTMENT_INFO}
    `;
  }

  getAllAppointments() {
    return gql`
      query appointmentListOfAdmin(
        $period: String
        $doctor: String
        $patient: String
        $patientSickLeave: String
        $search: String
        $dateFrom: Date
        $dateTo: Date
        $status: [String]
        $category: Float
        $ordering: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        appointmentListOfAdmin(
          period: $period
          doctor: $doctor
          patient: $patient
          patientSickLeave: $patientSickLeave
          search: $search
          dateFrom: $dateFrom
          dateTo: $dateTo
          status: $status
          category: $category
          ordering: $ordering
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
              start
              updatedAt
              messages {
                text
                sender {
                  firstName
                  lastName
                  email
                }
              }
              prescription {
                createdAt
              }
              diagnosis
              included
              doctor {
                lastName
                firstName
                avatar
                id
                workModel {
                  key
                }
              }
              patient {
                lastName
                firstName
                avatar
                id
                uhi
                dob
                gender {
                  key
                  val
                }
              }
              paymentType
              category {
                key
                val
              }
              status {
                key
                val
              }
            }
          }
        }
      }
    `;
  }


   getDoctorAllAppointments() {
    return gql`
      query appointmentList(
        $period: String
        $doctor: String
        $patient: String
        $patientSickLeave: String
        $search: String
        $dateFrom: Date
        $dateTo: Date
        $status: Float
        $ordering: String
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        appointmentList(
          period: $period
          doctor: $doctor
          patient: $patient
          patientSickLeave: $patientSickLeave
          search: $search
          dateFrom: $dateFrom
          dateTo: $dateTo
          status: $status
          ordering: $ordering
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
              start
              updatedAt
              messages {
                text
                sender {
                  firstName
                  lastName
                  email
                }
              }
              prescription {
                createdAt
              }
              diagnosis
              included
              doctor {
                lastName
                firstName
                avatar
                id
                workModel {
                  key
                }
              }
              patient {
                lastName
                firstName
                avatar
                id
                uhi
                dob
                gender {
                  key
                  val
                }
              }
              paymentType
              category {
                key
                val
              }
              status {
                key
                val
              }
            }
          }
        }
      }
    `;
  }

  
  getPatientAppointments() {
    return gql`
      query appointmentListOfAdmin(
        $period: String
        $patient: String
        $status: [String] 
        $dateFrom: Date
        $dateTo: Date
        $before: String
        $after: String
        $first: Int
        $last: Int
      ) {
        appointmentListOfAdmin(
          period: $period
          patient: $patient
          status: $status
          dateFrom: $dateFrom
          dateTo: $dateTo
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
              start
              doctor {
                firstName
                lastName
                avatar
              }
              diagnosis
              attachments {
                file
                filename
              }
              status {
                key
                val
              }
            }
          }
        }
      }
    `;
  }

  updateAppointment() {
    return gql`
      mutation appointmentUpdate($input: AppointmentUpdateInput!) {
        appointmentUpdate(input: $input) {
          appointment {
            ...AppointmentFields
          }
          success
          errors
        }
      }
      ${APPOINTMENT_FIELDS}
    `;
  }

  autoSaveAppointment() {
    return gql`
      mutation appointmentUpdate($input: AppointmentUpdateInput!) {
        appointmentUpdate(input: $input) {
          success
          errors
        }
      }
    `;
  }

  resolveAppointment() {
    return gql`
      mutation appointmentResolve($input: AppointmentResolveInput!) {
        appointmentResolve(input: $input) {
          appointment {
            ...AppointmentFields
          }
          success
          errors
        }
      }
      ${APPOINTMENT_FIELDS}
    `;
  }

  uploadToAppointment() {
    return gql`
      mutation appointmentUploadCreate($input: AppointmentUploadCreateInput!) {
        appointmentUploadCreate(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
          }
        }
      }
      ${APPOINTMENT_FIELDS}
    `;
  }

  appointmentStart() {
    return gql`
      mutation appointmentStart($input: AppointmentStartInput!) {
        appointmentStart(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
          }
        }
      }
      ${APPOINTMENT_FIELDS}
    `;
  }

  onAppointmentChange() {
    return gql`
      subscription onAppointmentChange($room: String) {
        onAppointmentChange(room: $room) {
          room
          appointment {
            id
            patient {
              firstName
              lastName
              id
              uhi
              avatar
            }
            status {
              key
              val
            }
            start
          }
          type
          reminder
          action
        }
      }
    `;
  }

  appointmentDecline() {
    return gql`
      mutation appointmentDecline($input: AppointmentDeclineInput!) {
        appointmentDecline(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
            doctor {
              ...DoctorNameFields
            }
          }
        }
      }
      ${APPOINTMENT_FIELDS}
      ${DOCTOR_APPOINTMENT_INFO}
    `;
  }

  appointmentReject() {
    return gql`
      mutation appointmentReject($input: AppointmentRejectInput!) {
        appointmentReject(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
            doctor {
              ...DoctorNameFields
            }
          }
        }
      }
      ${APPOINTMENT_FIELDS}
      ${DOCTOR_APPOINTMENT_INFO}
    `;
  }

  appointmentReschedule() {
    return gql`
      mutation appointmentReschedule($input: AppointmentRescheduleInput!) {
        appointmentReschedule(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
            doctor {
              ...DoctorNameFields
            }
          }
        }
      }
      ${APPOINTMENT_FIELDS}
      ${DOCTOR_APPOINTMENT_INFO}
    `;
  }

  appointmentReassign() {
    return gql`
      mutation appointmentReassign($input: AppointmentReassignInput!) {
        appointmentReassign(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
            doctor {
              ...DoctorNameFields
            }
          }
        }
      }
      ${APPOINTMENT_FIELDS}
      ${DOCTOR_APPOINTMENT_INFO}
    `;
  }

  appointmentConfirm() {
    return gql`
      mutation appointmentConfirm($input: AppointmentConfirmInput!) {
        appointmentConfirm(input: $input) {
          success
          errors
          appointment {
            ...AppointmentFields
            doctor {
              ...DoctorNameFields
            }
          }
        }
      }
      ${APPOINTMENT_FIELDS}
      ${DOCTOR_APPOINTMENT_INFO}
    `;
  }

  reportAbuse() {
    return gql`
      mutation abuseRecordCreate($input: AbuseRecordCreateInput!) {
        abuseRecordCreate(input: $input) {
          success
          errors
        }
      }
    `;
  }
}

export default new AppointmentAPI();
