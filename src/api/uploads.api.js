import { gql } from "@apollo/client";

class UploadsAPI {
    patientTestUpload() {
        return gql`
            mutation patientUploadCreate($input: PatientUploadCreateInput!) {
                patientUploadCreate(input: $input) {
                    success
                    errors
                }
            }
            `
    }

}

export default new UploadsAPI();