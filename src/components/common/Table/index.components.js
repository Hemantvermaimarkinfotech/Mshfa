import React, { useRef } from "react";
import { get } from "lodash";
import { StatusBar, SubjectStatusBar } from "components/common/index";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";
import {
  appointmentActions,
  appointmentStatus,
  paymentMethods,
} from "config/appointment";
import { testRequestStatus } from "config/test_request";

import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import pdfFile from "assets/images/pdf-file.svg";
import pngFile from "assets/images/png-file.svg";
import jpgFile from "assets/images/jpg-file.svg";
import refundArrow from "assets/images/refund-arrow.svg";
import TrashIcon from "assets/images/trash-icon";
import AttachmentIcon from "assets/images/attachments.svg";
import RxIcon from "assets/images/rx.svg";
import ChatIcon from "assets/images/chat.svg";
import LabTestIcon from "assets/images/lab-tests.svg";
import PrintIcon from "assets/images/print-icon";
import { CheckboxField, TextField } from "components/forms";
import cx from "classnames";
import noAvatar from "assets/images/no-avatar.svg";
import { paymentService } from "config/payment";
import { isActionsPopupAvailable } from "utils/appointments";
import { updateToOpenArray, createToOpenArray } from "utils/common";
import { AdImage } from "./components/index";

export const renderCellWithText = (text) => {
  return (
    <div className={"cell cell--with-text"}>
      <span className={"cell__text"}>{text}</span>
    </div>
  );
};

export const renderCellOpenTo = (params) => {
  const adToOpenIndex = updateToOpenArray?.find((o) => o?.val === params);
  const getVal = createToOpenArray?.find((o) => o.key === adToOpenIndex?.key);
  const renderString = getVal?.val;
  return (
    <div className={"cell cell--with-text"}>
      <span className={"cell__text"}>{renderString}</span>
    </div>
  );
};

export const renderCellWithDiscount = (oldPrice, newPrice = null, qty) => {
  const formatCurrency = (cost, defaultValue = "N/A") => {
    return !isNaN(cost) ? `KD ${Number(cost).toFixed(3)}` : defaultValue;
  };

  return (
    <div className={"cell cell--with-text"}>
      {oldPrice === newPrice && (
        <span className={"cell__text"}>{formatCurrency(oldPrice) * qty}</span>
      )}
      {oldPrice > newPrice && newPrice != null ? (
        <div className={"column"}>
          <span className={"cell__text break-through"}>
            {formatCurrency(oldPrice)}
          </span>
          <span className={"cell__text cell__discount"}>
            {formatCurrency(newPrice * qty)}
          </span>
        </div>
      ) : (
        <span className={"cell__text"}>{formatCurrency(oldPrice * qty)}</span>
      )}
    </div>
  );
};

export const renderCellWithImage = (imageUrl, text, label, handleClick) => {
  return (
    <div className={"cell cell--with-image"} onClick={handleClick}>
      <div className="cell__image-outer">
        <img className={"cell__image"} src={imageUrl} alt={""} />
      </div>
      {label ? (
        <div className={"cell cell--with-label"}>
          <span className={"cell__text"}>{text}</span>
          <span className={"cell__label"}>{label}</span>
        </div>
      ) : (
        <span className={"cell__text"}>{text}</span>
      )}
    </div>
  );
};

export const renderCellWithUserName = (user) => {
  const { firstName, lastName, avatar } = user || {};
  return (
    <div className={"cell cell--with-image"}>
      <div className="cell__image-outer">
        <img className={"cell__image"} src={avatar || noAvatar} alt={""} />
      </div>
      <span className={"cell__text"}>{`${firstName || "-"} ${
        lastName || ""
      }`}</span>
    </div>
  );
};

export const generateFileLink = (params) => {
  const generateFile = (event) => {
    const action = get(params, "api.componentsProps.CellMenuClicked", null);
    if (typeof action === "function") {
      action(params.row);
    }
    event.stopPropagation();
  };

  return (
    <div
      className="cell--file-link"
      onClickCapture={generateFile}
    >{`sickleave${params.row.sickLeaveNum}.pdf`}</div>
  );
};

export const renderCellWithFileImage = (fileName, fileUrl) => {
  const getFileIcon = () => {
    const namePath = fileUrl || fileName;
    const type = namePath.split(".").pop();
    switch (type) {
      case "png":
        return pngFile;
      case "jpg":
        return jpgFile;
      default:
        return pdfFile;
    }
  };
  const handleClick = (e) => {
    fileUrl && window.open(fileUrl, "_new");
    e.stopPropagation();
  };

  return (
    <div
      className={"cell cell--with-image cell--clickable"}
      onClick={handleClick}
    >
      <img className={"cell__image"} src={getFileIcon()} alt="file" />
      <span className={"cell__text"}>{fileName}</span>
    </div>
  );
};

export const renderCellWithIconsSet = (icons) => {
  const renderIcon = (icon) => (
    <img key={icon} className={"cell__icon"} src={icon} alt={"icon"} />
  );
  return (
    <div className={"cell cell--with-icons-set"}>
      {icons && icons.map(renderIcon)}
    </div>
  );
};

export const renderCellWithStatus = (type, status) => {
  const component =
    type === "subjectStatuses" ? (
      <SubjectStatusBar status={status} />
    ) : (
      <StatusBar status={status} type={type} />
    );
  return <div className={"cell cell--with-status"}>{component}</div>;
};

export const renderPaymentInvoice = (params) => {
  const onLinkClick = (event) => {
    const action = get(params, "api.componentsProps.CellMenuClicked", null);
    if (params?.row && typeof action === "function") {
      action(params.row);
      event.stopPropagation();
    }
  };

  return (
    <div className={"cell cell--with-url"}>
      {params.row.relationId &&
        params.row.service === paymentService.LAB_TEST && (
          <a
            className={"cell__url--pdf"}
            onClickCapture={onLinkClick}
            target={"_blank"}
            rel="noreferrer"
          >
            {renderCellWithImage(pdfFile, "Invoice")}
          </a>
        )}
    </div>
  );
};

export const RenderAdImage = (image) => {
  return (
    <div className={"cell cell--with-url"}>
      {image && (
        <AdImage image={image}>
          <a className={"cell__url--pdf"} target={"_blank"} rel="noreferrer">
            {renderCellWithImage(jpgFile, "Image")}
          </a>
        </AdImage>
      )}
    </div>
  );
};

export const RenderClinicImage = (image) => {
  return (
    <div className={"cell cell--with-url"}>
      {image && <img className={"cell--clinic-image "} src={image} />}
    </div>
  );
};

export const renderCellWithLink = (value) => {
  return (
    <div className={"cell cell--with-url"}>
      <a
        className={"cell__url--pdf"}
        href={value}
        target={"_blank"}
        rel="noreferrer"
      >
        {value}{" "}
      </a>
    </div>
  );
};

export const RenderCellWithPopup = (params, render = true) => {
  const buttonRef = useRef();
  const onMenuToggle = (event) => {
    const action = get(params, "api.componentsProps.CellMenuClicked", null);
    if (typeof action === "function") {
      action(buttonRef, params.row);
    }
    event.stopPropagation();
  };
  const classes = cx({
    hidden: !render,
  });
  return (
    <IconButton
      className={classes}
      ref={buttonRef}
      size="small"
      style={{ padding: 0 }}
      onClickCapture={onMenuToggle}
      aria-label="more"
    >
      <MoreVert />
    </IconButton>
  );
};

export const RenderTestRequestCellWithPopup = (params) => {
  const buttonRef = useRef();
  const onMenuToggle = (event) => {
    const action = get(params, "api.componentsProps.CellMenuClicked", null);
    if (typeof action === "function") {
      action(buttonRef, params.row);
    }
    event.stopPropagation();
  };
  const classes = cx({
    hidden:
      [testRequestStatus.REJECTED, testRequestStatus.COMPLETED].indexOf(
        params.row.status.key
      ) !== -1,
  });
  return (
    <IconButton
      className={classes}
      ref={buttonRef}
      size="small"
      style={{ padding: 0 }}
      onClickCapture={onMenuToggle}
      aria-label="more"
    >
      <MoreVert />
    </IconButton>
  );
};

export const RenderAppointmentCellWithPopup = (params) => {
  return RenderCellWithPopup(params, isActionsPopupAvailable(params.row));
};

export const renderCellRefund = (param) => {
  return param === "Refund" ? (
    <div className={"cell cell--refund"}>
      <span className={"cell__text"}>Refund</span>
      <img className={"cell__image"} src={refundArrow} alt={"Refund"} />
    </div>
  ) : (
    <div />
  );
};

export const renderCellWithLinkOrText = (params) => {
  const clickHandler = get(params, "api.componentsProps.CellMenuClicked", null);

  const onCellClick = (event) => {
    if (typeof clickHandler === "function") {
      clickHandler("show-payment_type", params.row);
    }
    event.stopPropagation();
  };

  return (
    <div className={"cell cell--with-url"}>
      {[paymentMethods.CONTRACT, paymentMethods.INSURANCE].indexOf(
        params.value
      ) !== -1 ? (
        <a className={"cell__url"} onClickCapture={onCellClick}>
          {params.value}
        </a>
      ) : (
        <span className={"cell__text"}>{params.value || "-"}</span>
      )}
    </div>
  );
};
export const renderCellTotal = (value, textColor, newValue) => {
  return (
    <div className={"cell cell--with-label"} style={{ color: textColor }}>
      <span className={"cell__text"}>{"KD " + value}</span>
      {!!newValue && (
        <span className={"cell__label"}>{`> KD ${newValue}`}</span>
      )}
    </div>
  );
};

export const renderCellWithLabel = (text, label) => {
  return (
    <div className={"cell cell--with-label"}>
      <span className={"cell__text"}>{text}</span>
      <span className={"cell__label"}>{label}</span>
    </div>
  );
};

export const RenderCellMedicationsActions = (params) => {
  const clickHandler = get(params, "api.componentsProps.CellMenuClicked", null);

  const handleReject = (event) => handleAction(event, "reject");
  const handleApprove = (event) => handleAction(event, "approve");

  const handleAction = (event, action) => {
    if (typeof clickHandler === "function") {
      clickHandler(action, params.row);
    }
    event.stopPropagation();
  };

  return (
    <div className={"cell cell--with-actions"}>
      <NeutralButton text={"Reject"} onClick={handleReject} />
      <PrimaryButton text={"Approve"} onClick={handleApprove} />
    </div>
  );
};

export const renderPhoneNumber = (row) => get(row, `0.phone`, "");

export const renderAdminAppointmentActions = (params) => {
  const clickHandler = get(params, "api.componentsProps.CellMenuClicked", null);

  const getIcon = (type) => {
    switch (type) {
      case "prescriptions":
        return RxIcon;
      case "attachments":
        return AttachmentIcon;
      case "messages":
        return ChatIcon;
      case "tests":
        return LabTestIcon;
    }
  };

  const onBtnClicked = (event, action) => {
    if (typeof clickHandler === "function") {
      clickHandler(action, params.row);
    }
    event.stopPropagation();
  };

  return (
    <div className={"cell cell--with-icons-set"}>
      {clickHandler &&
      params.row.status.key === appointmentStatus.NOT_CONFIRMED ? (
        <div className={"cell cell--with-actions"}>
          <NeutralButton
            text={"Decline"}
            onClickCapture={(event) =>
              onBtnClicked(event, appointmentActions.DECLINE)
            }
          />
          <PrimaryButton
            text={"Confirm"}
            onClickCapture={(event) =>
              onBtnClicked(event, appointmentActions.CONFIRM)
            }
          />
        </div>
      ) : params.row.included.length ? (
        params.row.included.map((item) => (
          <img
            key={item}
            className={"cell__icon"}
            src={getIcon(item)}
            alt="icon"
          />
        ))
      ) : (
        "-"
      )}
    </div>
  );
};

export const renderOrderLabTestPrescription = (params) => {
  const clickHandler = get(params, "api.componentsProps.CellMenuClicked", null);
  const handleClick = (event, action) => {
    if (typeof clickHandler === "function") {
      clickHandler(action, params.row);
    }
    event.stopPropagation();
  };
  const getPrescriptionRequiredContent = () => (
    <div className="prescription-preview-block">
      <div
        onClickCapture={(event) => handleClick(event, "preview")}
        className="prescription-preview-block__preview"
      >
        Preview
      </div>
      <div className="prescription-preview-block__border" />
      <div
        onClickCapture={(event) => handleClick(event, "preview")}
        className="prescription-preview-block__print"
      >
        <PrintIcon />
      </div>
    </div>
  );

  return (
    <div className="cell cell-order-prescription">
      {params.row.prescriptionFile || params.row.prescription?.appointmentId
        ? getPrescriptionRequiredContent()
        : params.row.medicine?.prescriptionRequired
        ? "File not found"
        : "Not required"}
    </div>
  );
};

export const renderOrderLabTestEditingQty = (params) => {
  const clickHandler = get(params, "api.componentsProps.CellMenuClicked", null);
  const handleChange = (event) => {
    if (typeof clickHandler === "function") {
      clickHandler("edit_qty", params.row, event.target.value);
    }
    event.stopPropagation();
  };
  return (
    <TextField
      className="cell--number"
      variant="outlined"
      type="number"
      InputProps={{ inputProps: { min: 1 } }}
      value={params.row.qty < 1 ? 1 : params.row.qty}
      onChange={handleChange}
    />
  );
};

export const renderCellWithCheckbox = (params) => {
  const clickHandler = get(params, "api.componentsProps.CellMenuClicked", null);

  const handleChange = (event) => {
    if (typeof clickHandler === "function") {
      clickHandler("edit_home-service", params.row, !params.row.homeService);
    }
    event.stopPropagation();
  };
  return (
    <CheckboxField
      className="cell--number"
      checked={!!params.row.homeService}
      onChange={handleChange}
      value={params.row.homeService ? "on" : "off"}
    />
  );
};

export const renderOrderLabTestRemoveBtn = (params) => {
  const onMenuToggle = (event) => {
    const action = get(params, "api.componentsProps.CellMenuClicked", null);
    if (typeof action === "function") {
      action("remove", params.row);
    }
    event.stopPropagation();
  };
  return (
    <IconButton
      size="small"
      style={{ padding: 0 }}
      onClickCapture={onMenuToggle}
      aria-label="more"
    >
      <TrashIcon />
    </IconButton>
  );
};
