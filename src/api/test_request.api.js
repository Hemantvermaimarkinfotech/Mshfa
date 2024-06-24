import { gql } from '@apollo/client';
import { TEST_REQUEST_FIELDS } from "./fragments/test_request";

class TestRequestAPI {

    typename = "TestRequestType";

    toggleTestStatus() {
        return gql`
            mutation testChangeStatus($input: TestChangeStatusInput!) {
              testChangeStatus(input: $input) {
                success
                errors
                test {
                    ...TestRequestFields
                }
              }
            }
        ${TEST_REQUEST_FIELDS}`
    }

    getTestRequests() {
        return gql`
            query testList($search: String, $status: String, $dateFrom: Date, $dateTo: Date, $ordering: String, $before: String, $after: String, $first: Int, $last: Int) {
              testList(search: $search, status: $status, dateFrom: $dateFrom, dateTo: $dateTo, ordering: $ordering, before: $before, after: $after, last: $last, first: $first) {
                totalCount
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }              
                edges {
                  node {
                    ...TestRequestFields
                  }
                }
              }
            }
            ${TEST_REQUEST_FIELDS}`
    }
}

export default new TestRequestAPI();