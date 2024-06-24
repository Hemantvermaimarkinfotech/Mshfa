import { gql } from "@apollo/client";

export const PRESCRIPTION_FIELDS = gql`
    fragment PrescriptionItemFields on PatientPrescriptionItemType {
        id
        medicine
        dosage
        route
        frequency
        directions
        duration
    }
`;

export const PATIENT_PRESCRIPTION_FIELDS = gql`
    fragment PrescriptionFields on PatientPrescriptionType {
        createdAt
        notes
        doctor {
            avatar
            firstName
            lastName
        }
    }
`;
