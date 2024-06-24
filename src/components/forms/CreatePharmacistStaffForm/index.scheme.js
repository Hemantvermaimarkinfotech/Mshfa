import { string, object, array, boolean, number, date } from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";
import { emailValidator } from "../index.validators";
import { parse, isDate } from "date-fns";

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}
export const PersonaInfoScheme = () => {
  return object({
    firstName: string().required("Entering first name is required"),

    lastName: string().required("Entering last name is required"),
    gender: string().nullable(true).required("Gender is required"),

    dob: string()
      .nullable(true)
      .test("DOB", "Pharmacist Staff must be older than 18 years old", (value) => {
        return moment().diff(moment(value), "years") >= 18;
      })
      .required("Entering date of birth is required"),

    languages: array()
      .min(1, `At least one language is required`)
      .required("Choosing at least one language is required"),

    email: string().test(emailValidator).required("Entering email is required"),

    phone: string()
      .nullable(true)
      .test(
        "phone-number",
        "Phone number must be valid",
        function (value = "") {
          if (value) {
            const result = parsePhoneNumberFromString(value);
            if (result) {
              return !!result.isValid();
            }
          }
          return false;
        }
      )
      .required("Entering a phone number is required"),

    adminNotes: string().nullable(true).notRequired(),
  });
};
