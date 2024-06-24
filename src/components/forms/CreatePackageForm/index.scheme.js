import { string, object, number } from "yup";
import moment from "moment";

export const InfoScheme = () => {
  return object({
    title: string().required("Title en is required"),
    titleAr: string().required("Title ar is required"),
    description: string().required("Description is required"),
    descriptionAr: string().required("Description Ar is required"),
    doctorId: string()
    .nullable()
    .required("Doctor is required")
    .test(
      "is-not-empty",
      "Doctor is required",
      (value) => typeof value === "string" && value.trim() !== ""
    ),
  });
};

export const PreferencesScheme = () => {
  return object({
    numOfAppointments: number()
      .required("Number of appointments is required")
      .test(
        "is-positive-number",
        "Number of appointments is required",
        (value) => {
          const parsedValue = parseFloat(value);
          return !isNaN(parsedValue) && parsedValue > 0;
        }
      ),
    price: string().required("Price is required"),
    activationDate: string()
      .nullable()
      .required("Activation date is required")
      .test(
        "activationDate",
        "Activation date should be at least today",
        (value) => {
          return moment(value).isAfter(moment().subtract(1, "day"));
        }
      ),
    expirationDate: string()
      .nullable()
      .required("Expiration Date is required")
      .test(
        "expirationDate",
        "Expiration date should be at least today",
        (value) => {
          return moment(value).isAfter(moment().subtract(1, "day"));
        }
      )
      .test(
        "expirationDate",
        "Expiration date must be after Activation date",
        function (value, testContext) {
          const { fromDate } = testContext.parent;
          if (fromDate && value) {
            return moment(value).isSameOrAfter(fromDate);
          }
          return true;
        }
      ),
  });
};
