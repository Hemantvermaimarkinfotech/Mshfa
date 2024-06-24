import { string, object } from "yup";

export const InfoScheme = () => {
  return object({
    title: string()
      .required("Clinic name is required")
      .test(
        "title",
        "Name must be less than or equal 255 length",
        (val) => !val || (val && val.toString().length <= 255)
      ),
  });
};
