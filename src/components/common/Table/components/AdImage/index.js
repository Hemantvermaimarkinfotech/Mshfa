import "./index.scss";
import React, { useState } from "react";
import { useDialog } from "hooks/common";

const AdImage = ({ image, children }) => {
  const { open } = useDialog();

  const handleOpenImage = () => {
    open(renderImage, null, { title: `Ad Image` });
  };

  const renderImage = () => <img className={"image"} src={image} />;

  return <div onClick={() => handleOpenImage()}>{children}</div>;
};

export default AdImage;
