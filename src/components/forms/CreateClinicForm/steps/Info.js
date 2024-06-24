import React from "react";
import { useFormikContext } from "formik";
import { TextField, CheckboxField } from "components/forms";
import noImage from "assets/images/no-image.svg";
import { TitledBlock } from "components/layout";
import { useErrorMessage } from "hooks/formErrorMessage";
import { PhotoUploader } from "components/common";

const Info = ({ errors, handleImageUpload, imagePreview }) => {
  const formik = useFormikContext();
  useErrorMessage(errors);

  return (
    <>
      <div className="create-coupon-form__body">
        <TitledBlock title={"Clinic Info"} />
        <div className="create-doctor-form__row create-doctor-form__row--twin ">
          <TextField
            size={"small"}
            name={"title"}
            label={"En. Title"}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
           <TextField
            size={"small"}
            name={"titleAr"}
            label={"Ar. Title"}
            value={formik.values.titleAr}
            onChange={formik.handleChange}
            error={formik.touched.titleAr && Boolean(formik.errors.titleAr)}
          />
        </div>
        
        <div className="create-doctor-form__row ">
          <TitledBlock title={"Clinic Logo"}>
            <PhotoUploader
              accept={".png, .jpg"}
              ads={true}
              caption={"At least 256x256px PNG or JPG file"}
              onChange={handleImageUpload}
              uploadBtnLabel={"Change Logo"}
              noPreviewImage={formik.values.logo || noImage}
              previewImage={imagePreview}
            />
          </TitledBlock>
        </div>
        
        <div className="create-doctor-form__row--twin  create-doctor-form__row--twin">
          <TitledBlock title={"Clinic status"} />
          <CheckboxField
            title={"Activate"}
            name={"status"}
            checked={formik.values.status}
            onChange={formik.handleChange}
          />
        </div>
      
      </div>
    </>
  );
};

export default Info;
