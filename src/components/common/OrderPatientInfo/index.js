import "./index.scss";

import React from "react";
import { useSnackbar } from "notistack";

import { IconButton, Link } from "@material-ui/core";

import noAvatar from "assets/images/no-avatar.svg";
import CalendarEditIcon from "assets/images/calendar-edit-icon";

import { TitledText } from "components/layout";
import {
  ContractPopup,
  InsurancePopup,
  OrderDeliveryTimePopup,
  StatusBar,
} from "components/common";
import {
  DEFAULT_DATE_TIME_FORMAT,
  formatISOtoHumanReadable,
  READABLE_DATE_FORMAT_SHORT,
} from "utils/date";
import { useDialog } from "hooks/common";
import { useOrderAPI } from "hooks/orders";
import { paymentMethods } from "config/appointment";
import { FormattedMessage } from "react-intl";

const OrderPatientInfo = ({ order }) => {
  console.log('insiiiiiidee',order.status.val)
  const { open, close } = useDialog();
  const { enqueueSnackbar } = useSnackbar();
  const { updateOrder } = useOrderAPI();
  const closePopup = () => close();

  const onOrderDeliveryTimeClick = () => {
    open(
      OrderDeliveryTimePopup,
      { onCancel: closePopup, onConfirm: setDeliveryTime, order },
      {
        title: <FormattedMessage id={"words.common.set-delivery-time"} />,
        maxWidth: false,
      }
    );
  };

  const showPaymentMethod = () => {
    console.log('orderrrrrrrr>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',order)
    if (order.patient.id) {
      if (order.paymentMethod === paymentMethods.INSURANCE) {
        open(
          InsurancePopup,
          { patient: order.patient, onCancel: closePopup },
          { title: <FormattedMessage id={"dialog.title.insurance"} /> }
        );
      } else if (order.paymentMethod === paymentMethods.CONTRACT) {
        open(
          ContractPopup,
          { patient: order.patient, onCancel: closePopup },
          { title: <FormattedMessage id={"dialog.title.contract"} /> }
        );
      }
    }
  };

  const setDeliveryTime = (date, time) => {
    closePopup();
    updateOrder({
      orderId: order.id,
      deliveryDate: date,
      deliveryTime: time,
      category: 2,
      // pharmacyId: order.pharmacy.id,
    })
      .then((resp) => {
        if (resp.success) {
          enqueueSnackbar("Delivery time changed");
        } else {
          enqueueSnackbar("Error");
        }
      })
      .catch((e) => enqueueSnackbar("Error"));
  };

  return (
    <div className={"order-patient-info"}>
      <div className="order-user">
        <img
          className="user-avatar"
          src={order?.patient?.avatar || noAvatar}
          alt={""}
        />
        <span className="user-name">
          {order?.patient?.firstName || ""} {order?.patient?.lastName || ""}
        </span>
      </div>
      <TitledText title={"Status"}>
        {" "}
        
        <StatusBar status={order.status.val} type={"orders"} />
      </TitledText>
      <TitledText title={"Date & Time"}>
        {formatISOtoHumanReadable(order.createdAt, DEFAULT_DATE_TIME_FORMAT)}
      </TitledText>
      <TitledText localeId={"words.common.phone-number"}>
        {order.patientPhoneNumber || "N/A"}
      </TitledText>
      <TitledText localeId={"words.common.payment-method"}>
        {order.paymentMethod ? (
          [paymentMethods.CONTRACT, paymentMethods.INSURANCE].indexOf(
            order.paymentMethod
          ) !== -1 ? (
            <Link onClick={showPaymentMethod}>{order.paymentMethod}</Link>
          ) : (
            order.paymentMethod
          )
        ) : (
          "N/A"
        )}
      </TitledText>
      <div className="delivery-info-title">Delivery info</div>
      <TitledText title={"Home service preferred time"}>
        {order.deliveryDate || order.deliveryTime
          ? `${formatISOtoHumanReadable(
              order.deliveryDate,
              READABLE_DATE_FORMAT_SHORT
            )} - ${
              order.deliveryTime === null ? "Not Set" : order.deliveryTime
            }`
          : "Not set"}

        <IconButton onClick={onOrderDeliveryTimeClick}>
          <CalendarEditIcon />
        </IconButton>
      </TitledText>
      <TitledText title={"Home service address"}>
        {order.deliveryAddress || "N/A"}
      </TitledText>
      <TitledText title={"Home service address notes"}>
        {order.deliveryAddressNotes || "N/A"}
      </TitledText>
      <TitledText title={"Home service notes"}>
        {order.deliveryNotes || "N/A"}
      </TitledText>
    </div>
  );
};

export default OrderPatientInfo;
