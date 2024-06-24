import { string, array, boolean, object, date, number } from "yup";
import moment from "moment";

export const InfoScheme = () => {
  return object({
    name: string()
      .required("Advertisement name is required")
      .test(
        "advertisementName",
        "Name must be less than or equal 255 length",
        (val) => !val || (val && val.toString().length <= 255)
      ),
    // imageUrl: object().test(
    // "imageUrl",
    // "image url",
    //  (val) => console.log(val)
    // ),
  });
};

export const PreferencesScheme = () => {
  return object({
    expireTime: string()
      .nullable()
      .required("Expiry time is required")
      .test("expireTime", (value) => {
        return value;
      }),
    expireDate: string()
      .nullable()
      .required("Expiry date is required")
      .test("expireDate", "Expiry date should be at least today", (value) => {
        return moment(value).isAfter(moment().subtract(1, "day"));
      }),
    isActive: boolean(),
    isApproved: boolean(),
    isInteractive: boolean(),
  });
};

export const OptionsScheme = () => {
  return object({
    clientUrl: string(),
    toOpen: string().nullable(),
    doctorId: string()
      .nullable()
      .test("doctorId", "Choose a doctor", (val, testContext) => {
        const toOpen = testContext.parent.toOpen;
        if (toOpen == "1" && !val) {
        } else if (toOpen !== "1") {
          return string().notRequired();
        } else if (toOpen == "1" && val) {
          return string().notRequired();
        }
      }),
  });
};
