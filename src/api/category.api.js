import { gql } from "@apollo/client";

class CategoryApi {
  getAllCategoriesFlat() {
    return gql`
      query categoriesFlatList {
        categoriesFlatList {
          id
          titleAr
          titleEn
          icon
          isActive
        }
      }
    `;
  }
}

export default new CategoryApi();
