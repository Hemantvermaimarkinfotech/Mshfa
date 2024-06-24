import { useMutation } from "@apollo/client";
import { TestRequestAPI } from "api";

export const useTestRequestAPI = () => {

    const cacheFunc = {
        update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'testList' });
        }
    };

    const [statusChange] = useMutation(TestRequestAPI.toggleTestStatus(), cacheFunc);

    const toggleTestRequestStatus = (data) => {
        return statusChange({ variables: { input: data }})
            .then((response) => response.data?.testChangeStatus)
    }

    return { toggleTestRequestStatus };
}