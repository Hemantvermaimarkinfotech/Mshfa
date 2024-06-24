import { gql } from "@apollo/client";

export const APPOINTMENT_FIELDS = gql`
  fragment AppointmentFields on AppointmentType {
    id
    diagnosis
    doctor {
      id
    }
    resolution
    complaints {
      id
      details
      complaint {
        key
        val
      }
    }
    sickLeave {
      id
      companyName
      occupation
      startDate
      days
    }
    referral {
      hospital
      department
      complaintsForTransfer
      reasonForReferral
    }
    prescriptionHistory {
      createdAt
      notes
      doctor {
        firstName
        lastName
        avatar
      }
      items {
        medicine
        dosage
        route
        frequency
        directions
        duration
        id
      }
    }
    prescription {
      notes
      doctor {
        firstName
        lastName
        avatar
      }
      items {
        dosage
        medicine
        frequency
        directions
        duration
        route
        id
      }
    }
    start
    end
    patient {
      avatar
      attachments {
        filename
        file
        category
        id
        createdAt
      }
      uhi
      id
      firstName
      lastName
      dob
      phone
      insurance {
        number
        backside
        frontside
      }
      contract
      occupation {
        key
        val
      }
      maritalStatus {
        val
      }
      nationality {
        val
      }
      gender {
        key
        val
      }
      languages {
        val
      }
      addresses {
        id
        area
        block
        street
        building
        avenue
        longitude
        latitude
        apartment
        additionalInfo
        isPrimary
      }
      medicalInfo {
        bloodType
        weight
        height
        bmi
        allergies {
          val
          key
        }
        diseases {
          val
          key
        }
        socialHabits {
          val
          key
        }
        additionalInfo
      }
    }
    serviceType {
      key
      val
    }
    status {
      key
      val
    }
    category {
      key
      val
    }
    patientTests {
      filename
      file
      category
      id
    }
    attachments {
      category
      createdAt
      uploadedBy
      file
      filename
      id
    }
    doctorTests {
      id
      title
    }
    paymentType
    total
    beforeDiscount
    signs {
      id
      details
      sign {
        key
        val
      }
    }
  }
`;
