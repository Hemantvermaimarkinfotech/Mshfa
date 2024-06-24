import { useMutation } from "@apollo/client";
import { UploadsAPI } from "api";

export const useUploadsAPI = () => {
    const cacheFunc = {update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'patientUploadHistory' });
        }};

    const [uploadTest] = useMutation(UploadsAPI.patientTestUpload(), cacheFunc);

    const uploadPatientTest = (patientId, file) => {
        return uploadTest({ variables: { input: {
                file: file,
                category: 'test',
                patientId: patientId
            } }})
            .then((response) => response.data?.patientUploadCreate)
    }

    return { uploadPatientTest };

}