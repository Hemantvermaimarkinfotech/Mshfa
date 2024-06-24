import { gql } from "@apollo/client";

export const TEST_REQUEST_FIELDS = gql`
    fragment TestRequestFields on UserTestRequestType {
        id
        patient {
            id
            avatar
            firstName
            lastName
            uhi
        }
        doctor {
            id
            avatar
            firstName
            lastName
        }
        tests
        status {
            key
            val
        }
        createdAt
    }
`;

