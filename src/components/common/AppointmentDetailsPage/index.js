import "./index.scss";

import React, { useMemo, useRef, useState } from "react";
import { useAppointment } from "hooks/appointments";
import { useUser } from "hooks/user";

import { userRole } from "config/user.config";
import { formatISOtoHumanReadable } from "utils/date";
import { useChat } from "hooks/chat";
import {
  appointmentActions,
  appointmentStatus,
  paymentMethods,
  appointmentUploadedBy,
  appointmentAttachmentCategory,
} from "config/appointment";
import { formatCurrency } from "utils/common";

import noAvatar from "assets/images/no-avatar.svg";
import {
  StatusBar,
  PatientInfo,
  Attachment,
  AppointmentSummary,
  ChatHistory,
  AppointmentActionsDropdown,
  Popover,
  AppointmentActionsPopup,
  InsurancePopup,
  ContractPopup,
} from "components/common";
import {
  GlobalError,
  GlobalLoader,
  Tabs,
  TitledBlock,
  TitledText,
} from "components/layout";
import { MoreVert } from "@material-ui/icons";
import { IconButton, Link } from "@material-ui/core";

import { Dialog } from "components/layout";
import { FormattedMessage } from "react-intl";
import { isActionsPopupAvailable } from "utils/appointments";

const AppointmentDetailsPage = ({ appointmentId }) => {
  const actionsButtonRef = useRef();

  const { appointment, appointmentLoading, appointmentError } =
    useAppointment(appointmentId);
 
  const [actionsPopupIsOpened, setActionsPopupIsOpened] = useState(false);
  const [actionsPopupTitle, setActionsPopupTitle] = useState(null);
  const [actionsPopupAction, setActionsPopupAction] = useState("");

  const [paymentMethodPopupIsOpened, setPaymentMethodPopupIsOpened] =
    useState(false);
  const [paymentMethodPopupTitle, setPaymentMethodPopupTitle] = useState(null);
  const [paymentMethodPopupComponent, setPaymentMethodPopupComponent] =
    useState(null);

  const { user } = useUser();
  const patientAttachments = appointment?.attachments?.filter(
    (attachment) =>
      attachment.category === appointmentAttachmentCategory.ATTACHMENT &&
      attachment.uploadedBy === appointmentUploadedBy.PATIENT
  );

  const [actionsPopoverIsOpen, setActionsPopoverIsOpen] = useState(false);

  const isSummaryVisible = () =>
    appointment?.status?.key === appointmentStatus.RESOLVED;

  const appointmentDoctor = useMemo(() => {
    if (user.role === userRole.ADMIN) {
      return appointment?.doctor;
    } else if (user.role === userRole.DOCTOR) {
      return user;
    }
    return undefined;
  }, [appointment, user]);

  const { messages: chatMessages, isLoading: chatIsLoading } = useChat(
    appointmentId,
    appointment?.doctor?.id,
    appointment?.patient?.id
  );

  const showPaymentMethod = () => {
    if (appointment.paymentType === paymentMethods.INSURANCE) {
      setPaymentMethodPopupTitle(
        <FormattedMessage
          id="dialog.title.insurance"
          defaultMessage="Insurance"
        />
      );
      setPaymentMethodPopupComponent(
        <InsurancePopup
          patient={appointment.patient}
          onCancel={() => setPaymentMethodPopupIsOpened(false)}
        />
      );
      setPaymentMethodPopupIsOpened(true);
    } else if (appointment.paymentType === paymentMethods.CONTRACT) {
      setPaymentMethodPopupTitle(
        <FormattedMessage
          id="dialog.title.contract"
          defaultMessage="Contract"
        />
      );
      setPaymentMethodPopupComponent(
        <ContractPopup
          patient={appointment.patient}
          onCancel={() => setPaymentMethodPopupIsOpened(false)}
        />
      );
      setPaymentMethodPopupIsOpened(true);
    }
  };

  const tabs = useMemo(() => {
    let result = [];
    if (appointment) {
      if (isSummaryVisible()) {
        result = [
          ...result,
          <FormattedMessage
            id="tab.name.appointment_summary"
            defaultMessage="Summary Appointment"
          />,
        ];
      }
      result = [
        ...result,
        <FormattedMessage
          id="tab.name.patient_info"
          defaultMessage="Patient info"
        />,
      ];
      if (patientAttachments && patientAttachments.length) {
        result = [
          ...result,
          <FormattedMessage
            id="tab.name.appointment.attachments"
            values={{ count: patientAttachments.length }}
            defaultMessage={`Attachments (${patientAttachments.length})`}
          />,
        ];
      }
      result = [
        ...result,
        <FormattedMessage
          id="tab.name.chat_history"
          defaultMessage="Chat history"
        />,
      ];
    }
    return result;
  }, [appointment, patientAttachments]);

  const onActionsBtnClicked = () => {
    setActionsPopoverIsOpen(true);
  };

  const openAppointmentActionPopup = (action) => {
    let title = (
      <FormattedMessage
        id="dialog.title.appointment.reject"
        defaultMessage="Reject Appointment"
      />
    );
    switch (action) {
      case appointmentActions.CONFIRM:
        title = (
          <FormattedMessage
            id="dialog.title.appointment.areyousure"
            defaultMessage="Are You sure?"
          />
        );
        break;
      case appointmentActions.RESCHEDULE:
        title = (
          <FormattedMessage
            id="dialog.title.appointment.reschedule"
            defaultMessage="Reschedule appointment"
          />
        );
        break;
      case appointmentActions.REASSIGN:
        title = (
          <FormattedMessage
            id="dialog.title.appointment.reassign"
            defaultMessage="Reassign Doctor"
          />
        );
        break;
      case appointmentActions.DECLINE:
        title = (
          <FormattedMessage
            id="dialog.title.appointment.decline"
            defaultMessage="Decline Appointment"
          />
        );
        break;
    }
    setActionsPopupAction(action);
    setActionsPopupTitle(title);
    setActionsPopupIsOpened(true);
  };

  const resolveAppointmentTypeTextByKey = (key) => {
    switch (key) {
      case "1":
        return "New";
      case "2":
        return "Follow-up";
    }
  };

  const handleActionClick = (action) => {
    openAppointmentActionPopup(action);
    setActionsPopoverIsOpen(false);
  };

  if (appointmentLoading) {
    return (
      <div className="admin-appointment-page">
        <GlobalLoader />
      </div>
    );
  }

  if (appointmentError && !appointment) {
    return (
      <div className="admin-appointment-page">
        <GlobalError />
      </div>
    );
  }
const beforeDiscount= appointment.beforeDiscount
const afterDiscount= appointment.total
  return (
    <div className="admin-appointment-page">
      <Dialog
        open={actionsPopupIsOpened}
        onClose={() => setActionsPopupIsOpened(false)}
        title={actionsPopupTitle}
      >
        <AppointmentActionsPopup
          action={actionsPopupAction}
          appointmentId={appointment.id}
          onCancel={() => setActionsPopupIsOpened(false)}
          onConfirm={() => setActionsPopupIsOpened(false)}
        />
      </Dialog>
      <Dialog
        open={paymentMethodPopupIsOpened}
        onClose={() => setPaymentMethodPopupIsOpened(false)}
        title={paymentMethodPopupTitle}
      >
        {paymentMethodPopupComponent}
      </Dialog>
      <Popover
        open={actionsPopoverIsOpen}
        anchor={actionsButtonRef?.current}
        onClose={() => setActionsPopoverIsOpen(false)}
      >
        <AppointmentActionsDropdown
          appointment={appointment}
          onActionClick={handleActionClick}
        />
      </Popover>
      <div className="admin-appointment-page__header">
        <div className="appointment-general">
          <div className="appointment-general__group">
            <div className="appointment-general__block">
              <img
                className={"appointment-general__avatar"}
                src={appointment.patient?.avatar || noAvatar}
                alt={"patient's avatar"}
              />
            </div>
            <div className="appointment-general__block profile">
              <span className={"appointment-general__name"}>
                {`${appointment.patient?.firstName} ${appointment.patient?.lastName}`}
              </span>
              <span className={"appointment-general__caption"}>
                UHI: {appointment.patient?.uhi || "KWAA XXXX XXXX XXXX"}
              </span>
            </div>
          </div>
          {appointment.doctor && (
            <div className="appointment-general__group">
              <div className="appointment-general__block">
                <img
                  className={"appointment-general__avatar"}
                  src={appointment.doctor.avatar || noAvatar}
                  alt={"doctor's avatar"}
                />
              </div>
              <div className="appointment-general__block profile">
                <span className={"appointment-general__name"}>
                  {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                </span>
                <span className={"appointment-general__caption"}>
                  ID: {appointment.doctor.doctorId || "N/A"}
                </span>
              </div>
            </div>
          )}
          <div className="appointment-general__block">
            <span className="appointment-general__title">Appointment type</span>
            <span className="appointment-general__value">
              {resolveAppointmentTypeTextByKey(appointment.serviceType?.key) ||
                "N/A"}
            </span>
          </div>
          {appointment.start && (
            <div className="appointment-general__block">
              <span className="appointment-general__title">
                <FormattedMessage
                  id="words.common.datetime"
                  defaultMessage="Date & Time"
                />
              </span>
              <span className="appointment-general__value">
                {formatISOtoHumanReadable(
                  appointment.start,
                  "DD/MM/YYYY, hh:mmA"
                )}
              </span>
            </div>
          )}
          <div className="appointment-general__block">
            <span className="appointment-general__title">
              <FormattedMessage
                id="words.common.status"
                defaultMessage="Status"
              />
            </span>
            <StatusBar status={appointment.status.val} type={"appointments"} />
          </div>
          {isActionsPopupAvailable(appointment) && (
            <div className="appointment-general__block">
              <IconButton
                ref={actionsButtonRef}
                className="more-btn"
                size="small"
                onClick={onActionsBtnClicked}
                aria-label="more"
              >
                <MoreVert />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <div className="admin-appointment-page__body">
        <Tabs items={tabs}>
          {isSummaryVisible() && (
            <AppointmentSummary appointment={appointment} />
          )}
          <div>
            {appointment.patient && (
              <>
                <PatientInfo
                  showAddress={false}
                  patient={appointment.patient}
                />
                <TitledBlock title={"Payment info"}>
                  <div className="patient-info__row">
                    <TitledText localeId={"words.common.payment-method"}>
                      {appointment.paymentType ? (
                        [
                          paymentMethods.CONTRACT,
                          paymentMethods.INSURANCE,
                        ].indexOf(appointment.paymentType) !== -1 ? (
                          <Link onClick={showPaymentMethod}>
                            {appointment.paymentType}
                          </Link>
                        ) : (
                          appointment.paymentType
                        )
                      ) : (
                        "N/A"
                      )}
                    </TitledText>
                    {appointment.paymentType === paymentMethods.INSURANCE && (
                      <TitledText localeId={"words.common.insurance"}>
                        {appointment.patient?.insurance?.number || "N/A"}
                      </TitledText>
                    )}
                    {appointment.paymentType === paymentMethods.CONTRACT && (
                      <TitledText localeId={"words.common.contract"}>
                        {appointment.patient?.contract || "N/A"}
                      </TitledText>
                    )}
                    <TitledText localeId={"words.common.service-fees"}>
                      {beforeDiscount === afterDiscount ? (
                        <span>
                          {formatCurrency(beforeDiscount)}
                        </span>
                      ) : beforeDiscount > afterDiscount &&
                        afterDiscount != null ? (
                        <>
                          <span className={"break-through"}>
                            {formatCurrency(beforeDiscount)}
                          </span>{" "}
                          <span className={"cell__discount"}>
                            {formatCurrency(afterDiscount)}
                          </span>
                        </>
                      ) : (
                        <span>
                          {formatCurrency(beforeDiscount)}
                        </span>
                      )}
                    </TitledText>
                  </div>
                </TitledBlock>
              </>
            )}
          </div>
          {patientAttachments && patientAttachments.length && (
            <div>
              <div className={"patient-attachments-list content"}>
                <TitledText title={"Attached files by patient"}>
                  {patientAttachments.map((attachment) => (
                    <Attachment
                      key={attachment.id}
                      data={attachment}
                      readonly
                    />
                  ))}
                </TitledText>
              </div>
            </div>
          )}
          <ChatHistory
            appointmentId={appointmentId}
            doctor={appointmentDoctor}
            patient={appointment.patient}
            messages={chatMessages}
            isLoading={chatIsLoading}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;
