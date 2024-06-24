import "./index.scss";

import React, { useState, useEffect, useRef } from "react";
import { SecondaryButton, TextButton } from "components/layout/buttons";
import uploadDone from "assets/images/uploadDone.svg";
import upload from "assets/images/upload.svg";

const CSVUploader = ({
  csvData = [],
  accept = ".xlsx, .xls, .csv, text/csv",
  setCsvData = () => {},
  caption = "Upload csv file",
  uploadBtnLabel = "Upload File",
}) => {
  const [array, setArray] = useState([]);
  const fileInput = useRef(null);
  const fileReader = new FileReader();

  useEffect(() => {
    setCsvData(array);
  }, [array]);

  const handleClickOnUpload = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };
   
  const handleFileInputChange = (event) => {
    const files = event.currentTarget.files;
    const file = files[0];

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setArray([]);
  };
  const handleClearPreviousFile = (event) => {
    event.target.value = null;
  };

  return (
    <div className={"photo-uploader"}>
      {csvData && csvData.length > 0 ? (
        <img src={uploadDone} className="uploadFile" />
      ) : (
        <img src={upload} className="uploadFile" />
      )}
      <div className="photo-uploader__block">
        <div className="photo-uploader__actions">
          {csvData && csvData.length > 0 ? (
            <>
              <SecondaryButton
                text={uploadBtnLabel}
                onClick={handleClickOnUpload}
              />
              <TextButton text={"Remove"} onClick={handleRemoveFile} />
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

export default CSVUploader;
