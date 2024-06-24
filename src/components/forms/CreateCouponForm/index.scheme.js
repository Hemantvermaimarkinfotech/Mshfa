import { string, array, boolean, object, date, number } from "yup";
import moment from "moment";

export const InfoScheme = () => {
  return object({
    couponName: string()
      .required("Coupon name is required")
      .test(
        "couponName",
        "Name must be less than or equal 255 length",
        (val) => !val || (val && val.toString().length <= 255)
      ),
    couponCode: string()
      .required("Coupon code is required")
      .test(
        "couponCode",
        "Coupon must be less than or equal 255 length",
        (val) => !val || (val && val.toString().length <= 255)
      ),
    allDoctors: boolean(),
    doc: array().test(
      "doc",
      "Choose at least one doctor",
      (val, testContext) => {
        const isService = testContext.parent.serviceType; // 0 - 2 - 3
        const isChecked = testContext.parent.allDoctors;
        const isAllServices = testContext.parent.allServices;
        if (
          !isChecked &&
          val.length !== 0 &&
          (isService == "0" || isService === "2" || isService === "3")
        ) {
          return array().required();
        } else if (isChecked) {
          return array().notRequired();
        } else if (isAllServices) {
          return array().notRequired();
        } else if (isService === "1" || isService === "5") {
          return array().notRequired();
        }
      }
    ),
  });
};

export const PatientsScheme = () => {
  return object({
    allPatients: boolean(),
    pat: array().test(
      "pat",
      "Choose at least one patient",
      (val, testContext) => {
        const isChecked = testContext.parent.allPatients;
        if (!isChecked && val.length !== 0) {
          return array().required();
        } else if (isChecked) {
          return array().notRequired();
        }
      }
    ),
  });
};

export const LabTestScheme = () => {
  return object({
    allLabTests: boolean(),
    labTests: array().test(
      "labtests",
      "Choose at least one lab test",
      (val, testContext) => {
        const isChecked = testContext.parent.allLabTests;
        if (!isChecked && val.length !== 0) {
          return array().required();
        } else if (isChecked) {
          return array().notRequired();
        }
      }
    ),
  });
};

export const DiscountScheme = () => {
  return object({
    fixedAmount: number()
      .nullable()
      .test(
        "fixedAmount",
        "Amount must be less than or equal 5",
        (val) => !val || (val && val.toString().length <= 5)
      )
      .when("discountPercentage", {
        is: (value) => value !== 0,
        then: number().nullable().notRequired(),
        otherwise: number().required("Discount amount is required"),
      }),
    discountPercentage: number()
      .nullable()
      .test(
        "discountPercentage",
        "Amount must be less than or equal 5",
        (val) => !val || (val && val.toString().length <= 5)
      ),
    maxDiscountAmount: number().test(
      "maxDiscountAmount",
      "Max amount must be less than or equal 5",
      (val) => !val || (val && val.toString().length <= 5)
    ),
  });
};

export const OptionsScheme = () => {
  return object({
    fromDate: string()
      .nullable()
      .required("Start Date is required")
      .test("fromDate", "Start date should be at least today", (value) => {
        return moment(value).isAfter(moment().subtract(1, "day"));
      }),

    toDate: string()
      .nullable()
      .required("Expiry Date is required")
      .test("toDate", "End date should be at least today", (value) => {
        return moment(value).isAfter(moment().subtract(1, "day"));
      })
      .test(
        "toDate",
        "Expiry Date must be after Start Date",
        function (value, testContext) {
          const { fromDate } = testContext.parent;
          if (fromDate && value) {
            return moment(value).isSameOrAfter(fromDate);
          }
          return true;
        }
      ),

    fromTime: string().nullable().required("Start Time is required"),
    toTime: string().nullable().required("Expiry Time is required"),

    maxNoRedeem: number()
      .min(1, `Max Coupon Usage must be greater than or equal to 1`)
      .nullable()
      .required("Max usage number is required"),
  });
};
