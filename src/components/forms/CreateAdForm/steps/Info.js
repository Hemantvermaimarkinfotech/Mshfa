import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { TextField } from "components/forms";
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
        <TitledBlock title={"Ad Info"} />
        <div className="create-doctor-form__row create-doctor-form__row--twin ">
          <TextField
            size={"small"}
            name={"name"}
            label={"Ad Name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </div>
        <div className="create-doctor-form__row">
          <TitledBlock title={"Ad photo"}>
            <PhotoUploader
              accept={".png, .jpg"}
              ads={true}
              caption={"At least 256x256px PNG or JPG file"}
              onChange={handleImageUpload}
              uploadBtnLabel={"Change Image"}
              noPreviewImage={formik.values.imageUrl || noImage}
              previewImage={imagePreview}
            />
          </TitledBlock>
        </div>
      </div>
    </>
  );
};

export default Info;
