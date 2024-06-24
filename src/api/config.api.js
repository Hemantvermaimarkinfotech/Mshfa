import { gql } from "@apollo/client";

class ConfigAPI {
  getConfig() {
    return gql`
      query {
        config {
           walkinDaysOff
        id
        areas
        doctorGrades
        bloodTypes
        prescriptionDosages
        prescriptionRoutes
        prescriptionFrequencies
        prescriptionDirections
        prescriptionDurations
        serviceCost
        walkinEnabled
        scheduleEnabled
        labTestEnabled
        languages {
            key
            val
        }
        genders {
            key
            val
        }
        }
      }
    `;
  }
  getDrugList() {
    return gql`
      query {
        listOfDrugs {
          val
        }
      }
    `;
  }
}

export default new ConfigAPI();
