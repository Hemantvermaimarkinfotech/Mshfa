import { FormattedMessage, useIntl } from "react-intl";
import { useFormikContext } from "formik";
import { useCategory } from "hooks/category";
import AutocompleteInput from "../AutocompleteInput";

const CategoryField = ({ onCategoryChange }) => {
  const intl = useIntl();
  const formik = useFormikContext();
  const { categories } = useCategory();

  return (
    <>
      <AutocompleteInput
        blurOnSelect
        name={`category`}
        label={"Category"}
        options={categories}
        onChange={onCategoryChange}
        value={formik.values.category}
        getOptionLabel={(option) => option.titleEn}
        error={formik.touched.category && Boolean(formik.errors.category)}
        renderOption={(option) => {
          return <>{option.titleEn}</>;
        }}
      />
    </>
  );
};

export default CategoryField;
