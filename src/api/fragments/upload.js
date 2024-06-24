import { gql } from "@apollo/client";

export const PATIENT_UPLOAD_FIELDS = gql`
    fragment PatientUploadFields on PatientUploadType {
        id
        file
        filename
        category
        uploadedBy
        createdAt
    }
`;

export const PATIENT_SICK_LEAVE_FIELDS = gql`
    fragment PatientSickLeaveFields on PatientSickLeaveType {
        id
        sickLeaveNum
        days
        startDate
        occupation
        companyName
        appointment {
            id
            doctor {
                id
                firstName
                lastName
                avatar
            }
        }
        createdAt
    }
`;
