import {gql} from '@apollo/client';
import {ADDITIONAL_DOCTOR_FIELDS, CORE_DOCTOR_FIELDS, DOCTOR_APPOINTMENT_INFO} from "./fragments/doctor";

class DoctorAPI {

    typename = "DoctorType";

    toggleDoctorStatus() {
        return gql`
            mutation blockUserToggle($input: BlockUserToggleInput!) {
                blockUserToggle(input: $input) {
                    success
                    errors
                    isBlocked
                }
            }
        `
    }

    deleteDoctor() {
        return gql`
            mutation DoctorDelete($input: DoctorDeleteInput!) {
                doctorDelete(input: $input) {
                    success
                    errors
                }
            }
        `
    }

    createDoctor() {
        return gql`
            mutation DoctorCreate($input: DoctorCreateInput!) {
                doctorCreate(input: $input) {
                    doctor {
                        ...AdditionalDoctorFields
                    }
                    success
                    errors
                }
            }
        ${ADDITIONAL_DOCTOR_FIELDS}`
    }

    updateDoctor() {
        return gql`
            mutation DoctorUpdate($input: DoctorUpdateInput!) {
                doctorUpdate(input: $input) {
                    doctor {
                        ...AdditionalDoctorFields
                    }
                    success
                    errors
                }
            }
        ${ADDITIONAL_DOCTOR_FIELDS}`
    }

    getDoctorById() {
        return gql`
            query doctorDetails($id: ID!) {
                doctorDetails(id: $id) {
                    ...AdditionalDoctorFields
                }
            }
        ${ADDITIONAL_DOCTOR_FIELDS}`
    }

    getAllDoctors() {
        return gql`
            query doctorList($search: String, $specialization: Float, $patientSickLeave: String, $ordering: String, $before: String, $after: String, $first: Int, $last: Int) {
                doctorList(search: $search, specialization: $specialization, patientSickLeave: $patientSickLeave, ordering: $ordering, before: $before, after: $after, last: $last, first: $first) {
                    totalCount
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                        startCursor
                        endCursor
                    }
                    edges {
                        node {
                            ...CoreDoctorFields
                        }
                    }
                }
            }
        ${CORE_DOCTOR_FIELDS}`
    }

    onDoctorChange() {
        return gql`
            subscription onDoctorChange($room: String) {
                onDoctorChange(room: $room) {
                    doctor {
                       id 
                       workStatus {
                        key
                        val
                       }
                    } 
                }
            }
        `
    }

    updateStatus() {
        return gql`
            mutation doctorStatusUpdate($input: DoctorStatusUpdateInput!) {
                doctorStatusUpdate(input: $input) {
                    status
                    success
                }
            }
        `
    }

    doctorAvailability() {
        return gql`
            mutation doctorAvailability($input: DoctorAvailabilityInput!) {
                doctorAvailability(input: $input) {
                    dateList
                    timeList {
                        timeStr
                        time
                        datetimeFrom
                        datetimeTo
                    }
                    success
                    errors
                }
            }
        `
    }

    availableDoctors() {
        return gql`
            mutation availableDoctors($availabilityTime: DateTime!, $specialization: Int! $timeBox: Int!) {
                availableDoctors(availabilityTime: $availabilityTime, specialization: $specialization, timeBox: $timeBox) {
                    ...DoctorNameFields
                }
            }
        ${DOCTOR_APPOINTMENT_INFO}`
    }
}

export default new DoctorAPI();