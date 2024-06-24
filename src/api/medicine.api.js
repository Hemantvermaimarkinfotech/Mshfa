import { gql } from '@apollo/client';

class MedicineAPI {

  getAllMedicines() {
    return gql`
      query MedicineList($search: String, $pharmacy: String, $status: Decimal, $before: String, $after: String, $first: Int, $last: Int) {
        medicineList(search: $search, pharmacy: $pharmacy, status: $status, before: $before, after: $after, last: $last, first: $first) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              ...MedicineFields
            }
          }
        }
      }
      ${MEDICINE_FIELDS}`
  }

  getMedicineById() {
    return gql`
    query MedicineDetails($id: ID!) {
      medicineDetails(id: $id) {
          ...MedicineFields
      }
    }
    ${MEDICINE_FIELDS}`
  }

  createMedicine() {
    return gql`
            mutation MedicineCreate($input: MedicineCreateInput!) {
              medicineCreate(input: $input) {
                medicine {
                    ...MedicineFields
                }
                success
                errors
              }
            }
        ${MEDICINE_FIELDS}`
  }

  deleteMedicine() {
    return gql`
            mutation MedicineDelete($input: MedicineDeleteInput!) {
              medicineDelete(input: $input) {
                success
                errors
              }
            }
        `
  }

  updateMedicine() {
    return gql`
            mutation MedicineUpdate($input: MedicineUpdateInput!) {
              medicineUpdate(input: $input) {
                medicine {
                    ...MedicineFields
                }
                success
                errors
              }
            }
        ${MEDICINE_FIELDS}`
  }

  approveMedicine() {
    return gql`
            mutation MedicineApprove($input: MedicineApproveInput!) {
              medicineApprove(input: $input) {
                medicine {
                    ...MedicineFields
                }
                success
                errors
              }
            }
        ${MEDICINE_FIELDS}`
  }

  approveAllMedicine() {
    return gql`
            mutation MedicineApproveAll($input: MedicineApproveAllInput!) {
              medicineApproveAll(input: $input) {
                success
                errors
              }
            }
        `
  }

  rejectMedicine() {
    return gql`
            mutation MedicineReject($input: MedicineRejectInput!) {
              medicineReject(input: $input) {
                medicine {
                    ...MedicineFields
                }
                success
                errors
              }
            }
        ${MEDICINE_FIELDS}`
  }

    bulkUpload() {
        return gql`
            mutation medicineBulkUpdate($input: MedicineBulkUpdateInput!) {
                medicineBulkUpdate(input: $input) {
                    success
                    errors
                }
            }`
    }

    bulkArchiveUpload() {
        return gql`
            mutation medicineArchiveBulkUpdate($input: MedicineArchiveBulkUpdateInput!) {
                medicineArchiveBulkUpdate(input: $input) {
                    success
                    errors
                }
            }`
    }

}

const MEDICINE_FIELDS = gql`
  fragment MedicineFields on MedicineType {
      id
      picture
      title
      titleNew
      description
      descriptionNew
      price
      priceNew
      prescriptionRequired
      prescriptionRequiredNew
      status {
          key
          val
        }
  }
`;

export default new MedicineAPI();