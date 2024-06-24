import "./index.scss";

import React, { useState, useRef } from "react";

import { SecondaryButton, TextButton } from "components/layout/buttons";
import userConfig from "config/user.config";

const PhotoUploader = ({
  noPreviewImage,
  accept,
  ads = false,
  previewImage = null,
  onChange = () => {},
  caption,
  uploadBtnLabel = "Change Photo",
}) => {
  const [preview, setPreview] = useState(previewImage);

  const fileInput = useRef(null);

  const handleClickOnUpload = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.currentTarget.files;
    const file = files[0];

    if (file) {
      if (file.size > userConfig.maxAvatarSize) {
        onChange(null, { type: "file-size" });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileURL = reader.result;
          if (fileURL) {
            setPreview(fileURL);
            onChange(file, fileURL);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemovePreview = () => {
    setPreview(null);
  };

  const handleClearPreviousFile = (event) => {
    // allows user to pick up the same file many times
    event.target.value = null;
  };

  return (
    <div className={"photo-uploader"}>
      <img
        src={preview || noPreviewImage}
        className={
          ads ? `photo-uploader__preview_ads` : `photo-uploader__preview`
        }
      />
      <div className="photo-uploader__block">
        <div className="photo-uploader__actions">
          {preview ? (
            <>
              <SecondaryButton
                text={uploadBtnLabel}
                onClick={handleClickOnUpload}
              />
              <TextButton text={"Remove"} onClick={handleRemovePreview} />
            </>
          ) : (
            <SecondaryButton
              text={uploadBtnLabel}
              onClick={handleClickOnUpload}
            />
          )}
        </div>
        <div className="photo-uploader__caption">{caption}</div>
      </div>
      <input
        className={"photo-uploader__input"}
        accept={accept}
        onClick={handleClearPreviousFile}
        onChange={handleFileInputChange}
        ref={fileInput}
        name="file"
        type="file"
      />
    </div>
  );
};

export default PhotoUploader;
