import { string, object, array, boolean, number, date } from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import moment from "moment";
import { emailValidator, workingDayValidator } from "../index.validators";
import { doctorCommissionType, doctorSpecialistType } from "config/doctor";
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
      .test("DOB", "Doctor must be older than 18 years old", (value) => {
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

export const ProfessionalInfoScheme = () => {
  return object({
    specializations: array(
      object({
        speciality: number().nullable(true).required("Speciality is required"),

        specialistType: number()
          .nullable(true)
          .required("Specialist type is required"),
        grade: string().nullable(true).required("Grade is required"),
      })
    ),
    category: string().nullable(true).required("Category is required"),

    boardCertified: boolean(),
    bookBeforeType: string()
      .nullable()
      .test("not-null", "Book before type is required", function (value) {
        return value !== null;
      }),
    canelBeforeType: string()
      .nullable()
      .test("not-null", "Cancel before type is required", function (value) {
        return value !== null;
      }),
    cancelBefore: number().nullable().required("Cancel before is required"),
    // .positive("Cancel before must be a positive number")
    // .test(
    //   "not-zero",
    //   "Cancel before must not be equal to 0",
    //   function (value) {
    //     return value !== 0;
    //   }
    // )
    bookBefore: number().nullable().required("Book before is required"),
    //.positive("Book before must be a positive number")
    // .test("not-zero", "Book before must not be equal to 0", function (value) {
    //   return value !== 0;
    // })
    educations: array(
      object({
        place: string().required("Place is required"),
        degree: string().required("Degree is required"),
        yearStart: string().required("Year start is required"),
        yearEnd: string()
          .required("Year end is required")
          .test(
            "year diff",
            "Year End should be greater than Year Start",
            function (value = "", data) {
              return moment({ year: data.parent.yearStart }).isSameOrBefore(
                value,
                "year"
              );
            }
          ),
      })
    ),

    diplomas: array(
      object({
        name: string().required("Diploma is required"),
      })
    ).test("required", "Please add at least one diploma", function (value) {
      return !!value.length;
    }),
  });
};

export const PriceInfoScheme = () => {
  return object({
    serviceCost: number()
      .nullable(true)
      .typeError("Consultation price must be a number")
      .required("Consultation price is required"),
    serviceCostFollowup: number()
      .nullable(true)
      .typeError("Follow-up consultation price must be a number")
      .required("Follow-up consultation price is required"),

    // percentCommission: number()
    //     .nullable(true)
    //     .typeError("Price commission must be a number")
    //     .test(
    //         'percent commission',
    //         'Value is required',
    //         function (value = '', data) {
    //             return data.parent.commissionType === doctorCommissionType.PERCENT ? value > 0 : true
    //         }
    //     ),
    // flatCommission: number()
    //     .nullable(true)
    //     .typeError("Flat commission must be a number")
    //     .test(
    //         'flat commission',
    //         'Value is required',
    //         function (value = '', data) {
    //             return data.parent.commissionType === doctorCommissionType.FLAT ? value > 0 : true
    //         }
    //     ),
    // consultationPrice: number()
    //     .nullable(true)
    //     .typeError("Consultation price must be a number"),
    // walkInPrice: number()
    //     .nullable(true)
    //     .typeError("Walk In price must be a number")
    //     .required("Walk In price is required"),
  });
};

export function SchedulesScheme() {
  return object({
    schedules: object()
      .shape({
        sun: workingDayValidator(),
        mon: workingDayValidator(),
        tue: workingDayValidator(),
        wed: workingDayValidator(),
        thu: workingDayValidator(),
        fri: workingDayValidator(),
        sat: workingDayValidator(),
      })
      .test(
        "required",
        "Please add at least one Time Slot",
        function (value, data) {
          return Object.keys(value).some((day) => !!value[day].length);
        }
      ),
  });
}
