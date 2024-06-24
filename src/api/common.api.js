import { gql } from '@apollo/client';

class CommonAPI {

    getConfig() {
        return gql`
            query {
              config {
                languages {
                  key
                  val
                }
                doctorSpecializationTypes {
                  key
                  val
                }
                doctorSpecialities
                doctorGrades
                  
              }
            }`
    }
}

export default new CommonAPI();