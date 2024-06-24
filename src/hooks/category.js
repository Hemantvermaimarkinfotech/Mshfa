import { useQuery } from "@apollo/client";
import categoryApi from "api/category.api";

export const useCategory = () => {
  const { data, loading, error, refetch } = useQuery(
    categoryApi.getAllCategoriesFlat()
  );
  let categories;
  if (data) {
    categories = data.categoriesFlatList;
  }
  return {
    categories,
    loading,
    error,
    refetch,
  };
};
