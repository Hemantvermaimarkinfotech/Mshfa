import { gql } from "@apollo/client";

export const DOCTOR_APPOINTMENT_INFO = gql`
  fragment DoctorNameFields on DoctorType {
    id
    doctorId
    avatar
    firstName
    lastName
    appointmentTimeBox {
      key
    }
    workModel {
      key
      val
    }
  }
`;

export const CORE_DOCTOR_FIELDS = gql`
  fragment CoreDoctorFields on DoctorType {
    id
    doctorId
    avatar
    firstName
    lastName
    email
    dob
    phone
    clinic {
      id
      title
      logo
      status
      activatedDate
      deactivatedDate
    }
    specializations {
      speciality {
        val
      }
      id
    }
    isBlocked
    workModel {
      key
      val
    }
    workStatus {
      key
      val
    }
  }
`;

export const ADDITIONAL_DOCTOR_FIELDS = gql`
  fragment AdditionalDoctorFields on DoctorType {
    id
    doctorId
    avatar
    firstName
    lastName
    email
    dob
    phone
    category {
      id
      titleEn
    }
    clinic {
      id
    }
    adminNotes
    serviceCost
    serviceCostFollowup
    languages {
      key
      val
    }
    appointmentTimeBox {
      key
      val
    }
    appointmentTimeBoxFollowup {
      key
      val
    }
    doctorStamp
    adminNotes
    educations {
      id
      degree
      place
      yearStart
      yearEnd
    }
    specializations {
      isPrimary
      licenseNumber
      speciality {
        key
        val
      }
      specialistType {
        key
        val
      }
      grade
      id
    }
    boardCertified
    workModel {
      key
      val
    }
    cancelBeforeType {
      key
      val
    }
    bookBeforeType {
      key
      val
    }
    cancelBefore
    bookBefore
    diplomas {
      id
      name
    }
    schedules {
      mon {
        id
        timeFrom
        timeTo
        delete
      }
      tue {
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
    daysOff
    isBlocked
    gender {
      key
      val
    }
  }
`;
