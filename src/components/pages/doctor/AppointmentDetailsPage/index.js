import "./index.scss";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import config from "config/forms.config";

import {
  PageMetadata,
  PageHeader,
  Breadcrumbs,
  Tabs,
  GlobalLoader,
  GlobalError,
  Paper,
  TitledBlock,
} from "components/layout";
import {
  EndAppointmentButton,
  StartAppointmentButton,
  PrimaryButton,
  SecondaryButton,
} from "components/layout/buttons";
import {
  StatusBar,
  Attachment,
  Prescription,
  Test,
  ReportDialog,
} from "components/common";
import { ChatContainer } from "components/conversation";
import { SummaryAppointmentForm } from "components/forms";
import { formatISOtoHumanReadable } from "utils/date";
import { useConversation } from "hooks/conversation";
import { useUser } from "hooks/user";
import { useAppointment, useAppointmentAPI } from "hooks/appointments";

import noAvatar from "assets/images/no-avatar.svg";
import emptyChat from "assets/images/empty_chat.svg";
import PatientInfo from "components/common/PatientInfo";
import { appointmentStatus } from "config/appointment";
import PatientPastAppointments from "./PatientPastAppointments";
import { useDialog } from "hooks/common";
import { useIntl } from "react-intl";

const AppointmentDetailsPage = ({ route }) => {
  const { id } = useParams();
  const { user } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useDialog();
  const intl = useIntl();
  const { appointment, appointmentLoading, appointmentError } =
    useAppointment(id);
  const { resolveAppointment, startAppointment, reportAbuse } =
    useAppointmentAPI();
  const isInProgress =
    appointment?.status?.key === appointmentStatus.IN_PROGRESS;

  // const idWithENV = process.env.NODE_ENV === 'development' ?  `${id}_dev` : `${id}_prod`;

  const resolveIsPossible =
    appointment?.status?.key === appointmentStatus.UNRESOLVED ||
    (appointment?.status?.key === appointmentStatus.IN_PROGRESS &&
      parseInt(user.workModel?.key) === config.doctorTypes.walkIn);

  const isSummaryVisible = useMemo(() => {
    return (
      appointment?.status &&
      [
        appointmentStatus.IN_PROGRESS,
        appointmentStatus.RESOLVED,
        appointmentStatus.UNRESOLVED,
      ].indexOf(String(appointment.status.key)) !== -1
    );
  }, [appointment]);

  const { getToken } = useConversation();
  const [isOnCall, setOnCall] = useState(false);
  const [token, setToken] = useState(null);
  const [wasStarted, setWasStarted] = useState(false);
  const [sidebarOffset, setSidebarOffset] = useState(90);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const top = 90;
    const scrollTop = window.scrollY;
    if (scrollTop + 10 < top) {
      setSidebarOffset(top - scrollTop);
    } else {
      setSidebarOffset(10);
    }
  };

  useMemo(() => {
    if (
      appointment &&
      appointment.status.key === appointmentStatus.DID_NOT_ATTENDED
    ) {
      setOnCall(false);
    }
  }, [appointment, setOnCall]);

  useEffect(() => {
    if (appointment && isInProgress) {
      // Calls getToken fn with id, then set the state of token with token value.
      getToken(id).then((token) => {
        setToken(token);
      });
    }
  }, [appointment]);

  const handleResolveAppointment = () => {
    setOnCall(false);
    resolveAppointment({ id: appointment.id })
      .then(() => enqueueSnackbar("Appointment was successfully resolved"))
      .catch(() => enqueueSnackbar("Sorry, something went wrong"));
  };

  const handleStartCall = () => {
    if (appointment.category.key === "0") {
      startAppointment({ id });
    }
    setWasStarted(true);
    setOnCall(true);
  };
  const handleEndCall = useCallback(() => {
    setOnCall(false);
  }, [isOnCall]);

  const handleOpenReportPatientModal = () => {
    open(
      ReportDialog,
      { onConfirm: handleReportAbuse, onCancel: close },
      { title: "Report patient abuse" }
    );
  };

  const handleReportAbuse = (text) => {
    reportAbuse({
      appointmentId: appointment.id,
      text,
      clientMutationId: "none",
    })
      .then(() => enqueueSnackbar("Patient abuse report was successfully sent"))
      .catch(() => enqueueSnackbar("Sorry, something went wrong"));
    close();
  };

  const renderDisabledChatMessage = () => {
    return (
      <div className={"appointment-details-page__message box-message"}>
        <img
          className={"box-message__image"}
          src={emptyChat}
          alt="chat is unavailable"
        />
        <div className="box-message__text">
          Chat will be available after the start of appointment.
        </div>
      </div>
    );
  };

  if (appointmentLoading) {
    return <GlobalLoader />;
  }

  if (appointmentError) {
    return <GlobalError />;
  }

  const patientAttachments = appointment.attachments?.filter(
    (attachment) =>
      attachment.category === "Attachment" &&
      attachment.uploadedBy === "Patient"
  );
  const patientTests = appointment.attachments?.filter(
    (attachment) =>
      attachment.category === "Test" && attachment.uploadedBy === "Patient"
  );

  const renderEmptyMessage = (subject) => {
    return <h3 className={"content__message"}>Patient has no {subject}</h3>;
  };

  const tabs = ["Patient info"];
  isSummaryVisible && tabs.unshift("Summary appointment");
  patientAttachments.length !== 0 &&
    tabs.push(`Attachments (${patientAttachments.length})`);
  appointment?.prescriptionHistory?.length !== 0 &&
    tabs.push(intl.formatMessage({ id: "words.common.prescription" }));
  patientTests.length !== 0 && tabs.push(`Tests`);
  tabs.push(intl.formatMessage({ id: "header.navigation.past-appointments" }));

  return (
    <div className={"page page--scroll appointment-details-page"}>
      <div className="appointment-details-page__content">
        <PageHeader>
          <PageMetadata>
            <Breadcrumbs route={route} />
          </PageMetadata>
          <SecondaryButton
            text={"Report patient"}
            onClick={handleOpenReportPatientModal}
            classes={"report-button"}
          />
        </PageHeader>

        <Paper className="appointment-details-page__header">
          <div className="appointment-general">
            <div className="appointment-general__patient">
              <img
                className={"appointment-general__avatar"}
                src={appointment.patient.avatar || noAvatar}
                alt={"patient's avatar"}
              />
              <div className={"appointment-general__info"}>
                <span
                  className={"appointment-general__name"}
                >{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</span>
                <span className={"appointment-general__caption"}>
                  UHI: {appointment.patient.uhi || "KWAA XXXX XXXX XXXX"}
                </span>
              </div>
            </div>
            {appointment.start && (
              <div className="appointment-general__date">
                <span className="appointment-general__title">Date & Time</span>
                <span className="appointment-general__value">
                  {formatISOtoHumanReadable(
                    appointment.start,
                    "DD/MM/YYYY, hh:mmA"
                  )}
                </span>
              </div>
            )}
            <div className="appointment-general__status">
              <span className="appointment-general__title">Status</span>
              <StatusBar
                status={appointment.status.val}
                type={"appointments"}
              />
            </div>
          </div>
          <div className="appointment-actions">
            {isInProgress &&
              (isOnCall ? (
                <EndAppointmentButton onClick={handleEndCall} />
              ) : (
                <StartAppointmentButton onClick={handleStartCall} />
              ))}
            {resolveIsPossible && (
              <PrimaryButton
                text={"Resolve"}
                onClick={handleResolveAppointment}
              />
            )}
          </div>
        </Paper>
        <Paper className="appointment-details-page__body">
          <Tabs items={tabs} centered>
            {isSummaryVisible && (
              <div>
                <div className={"summary-appointment"}>
                  {appointment && <SummaryAppointmentForm data={appointment} />}
                </div>
              </div>
            )}
            <div>
              <PatientInfo patient={appointment.patient} editable />
            </div>

            {patientAttachments.length && (
              <div>
                <div className={"patient-attachments-list content"}>
                  <TitledBlock title={"Uploaded by patient:"}>
                    {patientAttachments.map((attachment) => (
                      <Attachment
                        key={attachment.filename}
                        data={attachment}
                        readonly
                      />
                    ))}
                  </TitledBlock>
                </div>
              </div>
            )}
            {appointment?.prescriptionHistory?.length && (
              <div>
                <div className={"patient-prescriptions-list content"}>
                  {appointment.prescriptionHistory.length > 0
                    ? appointment.prescriptionHistory.map(
                        (prescription, index) => (
                          <Prescription key={index} data={prescription} />
                        )
                      )
                    : renderEmptyMessage("prescriptions")}
                </div>
              </div>
            )}

            {patientTests.length && (
              <div>
                <div className={"patient-tests-list content"}>
                  {patientTests?.length > 0
                    ? patientTests.map((test) => (
                        <Test key={test.id} data={test} />
                      ))
                    : renderEmptyMessage("tests")}
                </div>
              </div>
            )}

            <div>
              <div className={"past-appointments-table content"}>
                {appointment?.patient?.id && (
                  <PatientPastAppointments
                    patientId={appointment?.patient?.id}
                  />
                )}
              </div>
            </div>
          </Tabs>
        </Paper>
      </div>
      <Paper
        className="appointment-details-page__sidebar"
        style={{
          top: `${sidebarOffset}px`,
          height:
            sidebarOffset >= 0
              ? `calc(100vh - ${80 + sidebarOffset}px)`
              : "100vh",
        }}
      >
        {token && wasStarted ? (
          <ChatContainer
            isOnCall={isOnCall}
            onDecline={handleEndCall}
            identity={user.id}
            token={token}
            roomName={id}
            doctor={user}
            patient={appointment.patient}
            endTime={appointment.end}
          />
        ) : (
          renderDisabledChatMessage()
        )}
      </Paper>
    </div>
  );
};

export default AppointmentDetailsPage;
