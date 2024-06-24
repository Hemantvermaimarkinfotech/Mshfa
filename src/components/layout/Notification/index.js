import "./index.scss";

import React, { forwardRef } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar, SnackbarContent } from "notistack";
import { Close } from "@material-ui/icons";
import { Link } from "react-router-dom";

import {
  StartAppointmentButton,
  OpenOrderButton,
} from "components/layout/buttons";
import {
  formatISOtoHumanReadable,
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_DATE_TIME_FORMAT_SHORT,
} from "utils/date";
import { GlobalAppRouter } from "routes";

import noAvatar from "assets/images/no-avatar.svg";

const REMINDER = {
  FIVE_MIN: 7,
};

const ACTION = {
  GOTO_APPOINTMENT: 1,
  GOTO_VIDEO_CALL: 2,
};

const Notification = forwardRef(({ onClose, message, id }, ref) => {
  const history = useHistory();
  const { closeSnackbar } = useSnackbar();

  const handleStartAppointment = () => {
    const {
      paths: { futureAppointmentsDetails },
    } = GlobalAppRouter;
    history.push(futureAppointmentsDetails + message.appointment.id);
    closeSnackbar(id);
  };
  const handleClose = () => {
    onClose && onClose(message);
    closeSnackbar(id);
  };

  const resolveHeaderByStatus = (status, reminder) => {
    switch (reminder) {
      case REMINDER.FIVE_MIN:
        return "Appointment will finish in 5 minutes";
    }
    switch (status.key) {
      case "3":
        return "Appointment is already starting";
      case "2":
        return "New appointment";
      case "5":
        return "Appointment was cancelled by Patient";
      case "4":
      case "9":
        return "Appointment was rejected by Admin";
      case "7":
        return "Appointment is finished";
      case "10":
        return "Appointment has been paid";
      default:
        return "-";
    }
  };

  const resolveOrderHeaderByStatus = (status) => {
    switch (status.key) {
      case "0":
        return "Order is drafted";
      case "1":
        return "Payment is being reviewed";
      case "2":
        return "Payment is confirmed";
      case "3":
        return "Payment is rejected";
      case "4":
        return "Payment is canceled";
      case "5":
        return "Payment is being processed";
      case "6":
        return "Order is delivered";
      case "7":
        return "Payment is being approved";
      case "8":
        return "Order is completed";
      default:
        return "-";
    }
  };

  const getDisplayName = (patient) => {
    return patient ? `${patient.firstName} ${patient.lastName}` : "";
  };
   
  return (
    <SnackbarContent ref={ref}>
      <div className={"notification"}>
        <div className="notification__header">
          <span className="notification__action">
            {message?.msg ||
              (message?.appointment
                ? resolveHeaderByStatus(
                    message.appointment.status,
                    message.reminder
                  )
                : message?.order
                ? resolveOrderHeaderByStatus(message.order.status)
                : "-")}
          </span>
          <div className={"notification__close"}>
            <Close onClick={handleClose} />
          </div>
        </div>
        <span className={"notification__date"}>
          {formatISOtoHumanReadable(
            message?.appointment?.start || message?.order?.createdAt,
            DEFAULT_DATE_TIME_FORMAT
          )}
        </span>
        <div className={"notification__patient"}>
          <img
            src={
              message?.appointment?.patient?.avatar ||
              message?.order?.patient?.avatar ||
              noAvatar
            }
            className={"notification__avatar"}
          />
          <div className="notification__patient-info">
            <span className={"notification__name"}>
              {message?.appointment?.patient
                ? getDisplayName(message.appointment.patient)
                : message?.order?.patient
                ? getDisplayName(message.order.patient)
                : ""}
            </span>
            <span className={"notification__uhi"}>
              UHI:
              {message?.appointment?.patient?.uhi ||
                message?.order?.patient?.uhi}
            </span>
          </div>
        </div>
        {message.action === ACTION.GOTO_VIDEO_CALL &&
          message?.reminder !== REMINDER.FIVE_MIN && (
            <StartAppointmentButton onClick={handleStartAppointment} />
          )}
        {message?.order?.id && (
          <Link to={`/lab-tests/details/${message?.order?.id}`}>
            <OpenOrderButton />
          </Link>
        )}
        <span className={"notification__pubdate"}>
          {formatISOtoHumanReadable(
            message.createdAt,
            DEFAULT_DATE_TIME_FORMAT_SHORT
          )}
        </span>
      </div>
    </SnackbarContent>
  );
});

export default Notification;
