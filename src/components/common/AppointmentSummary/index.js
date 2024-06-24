import "./index.scss";

import React from "react";

import { appointmentUploadedBy } from "config/appointment";
import { Attachment, Prescription } from "components/common";
import { SickLeave } from "components/common";
import { TitledText } from "components/layout";

const AppointmentSummary = ({ appointment }) => {
  const doctorAttachments = appointment?.attachments?.filter(
    (attachment) =>
      attachment.category === "Attachment" &&
      attachment.uploadedBy === appointmentUploadedBy.DOCTOR
  );

  return (
    <div className="appointment-summary">
      <TitledText title={"Complaint(s)"}>
        {appointment?.complaints && appointment?.complaints?.length ? (
          <ul>
            {appointment?.complaints?.map((complaint, key) => (
              <li key={`complaint-${key}`}>
                <div className="title">{complaint.complaint.val}</div>
                <div className="description">{complaint.details}</div>
              </li>
            ))}
          </ul>
        ) : (
          "N/A"
        )}
      </TitledText>
      <TitledText title={"Signs"}>
        {appointment?.signs && appointment?.signs?.length ? (
          <ul>
            {appointment?.signs?.map((sign, key) => (
              <li key={`sign-${key}`}>
                <div className="title">{sign.sign.val}</div>
                <div className="description">{sign.details}</div>
              </li>
            ))}
          </ul>
        ) : (
          "N/A"
        )}
      </TitledText>
      <TitledText localeId={"words.common.diagnosis"}>
        {appointment?.diagnosis || "N/A"}
      </TitledText>
      <TitledText title={"Resolution"}>
        {appointment?.resolution || "N/A"}
      </TitledText>
      <TitledText title={"Attached files by doctor"}>
        {doctorAttachments && doctorAttachments.length ? (
          <div>
            {appointment?.attachments?.map((attachment, key) => (
              <Attachment
                key={attachment.filename}
                data={attachment}
                readonly
              />
            ))}
          </div>
        ) : (
          "N/A"
        )}
      </TitledText>
      <TitledText localeId={"words.common.prescription"}>
        {appointment?.prescription ? (
          <div className="prescriptions">
            {/* {appointment?.prescriptionHistory?.map((prescription, key) => ( */}
            <Prescription
              // key={`prescription-${key}`}
              compact={true}
              data={appointment?.prescription}
            />
            {/* ))} */}
          </div>
        ) : (
          "N/A"
        )}
      </TitledText>
      <TitledText localeId={"words.common.lab-tests"}>
        {appointment?.doctorTests && appointment?.doctorTests?.length ? (
          <ul className="doctor-tests bordered-block">
            {appointment?.doctorTests?.map((test, key) => (
              <li key={`test-${key}`}>{test.title}</li>
            ))}
          </ul>
        ) : (
          "N/A"
        )}
      </TitledText>
      <TitledText title={"Referral"}>
        {appointment?.referral ? (
          <div className="referrals bordered-block">
            <div className="title">
              {appointment.referral.hospital || "N/A"}
            </div>
            <TitledText title={"Department"}>
              {appointment.referral.department || "N/A"}
            </TitledText>
            <TitledText localeId={"words.common.complaints-for-transfer"}>
              {appointment.referral.complaintsForTransfer || "N/A"}
            </TitledText>
            <TitledText title={"Reason for Referral"}>
              {appointment.referral.reasonForReferral || "N/A"}
            </TitledText>
          </div>
        ) : (
          "N/A"
        )}
      </TitledText>
      <TitledText title={"Sick Leave"}>
        {appointment?.sickLeave ? (
          <SickLeave data={appointment.sickLeave} />
        ) : (
          "N/A"
        )}
      </TitledText>
    </div>
  );
};

export default AppointmentSummary;
