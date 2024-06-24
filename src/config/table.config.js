import { get } from "lodash";

import {
  AppointmentAPI,
  DoctorAPI,
  PatientAPI,
  PaymentAPI,
  PharmacyAPI,
  MedicineAPI,
  OrderAPI,
  TestRequestAPI,
  CouponsApi,
  AdsApi,
  AdvertisementApi,
  ClinicsApi,
  PackagesApi,
  SubscriptionsApi,
  PharmacistStaffAPI
} from "api";

import { formatCurrency } from "utils/common";
import { formatISOtoHumanReadable } from "utils/date";

import {
  renderCellWithText,
  renderCellWithDiscount,
  renderCellWithImage,
  renderCellWithStatus,
  renderCellWithLinkOrText,
  renderCellWithLink,
  RenderCellWithPopup,
  renderCellWithIconsSet,
  RenderAppointmentCellWithPopup,
  renderCellRefund,
  renderCellTotal,
  renderCellWithFileImage,
  renderCellWithLabel,
  RenderCellMedicationsActions,
  renderPhoneNumber,
  renderAdminAppointmentActions,
  generateFileLink,
  RenderTestRequestCellWithPopup,
  renderCellWithUserName,
  renderPaymentInvoice,
  RenderAdImage,
  RenderClinicImage,
  renderOrderLabTestPrescription,
  renderOrderLabTestEditingQty,
  renderOrderLabTestRemoveBtn,
  renderCellOpenTo,
  renderCellWithCheckbox,
} from "components/common/Table/index.components";
import { TextFormatter } from "services";

import noAvatar from "assets/images/no-avatar.svg";
import pdfFileIcon from "assets/images/pdf-file.svg";
import rx from "assets/images/rx.svg";
import attachments from "assets/images/attachments.svg";
import labTests from "assets/images/lab-tests.svg";
import chat from "assets/images/chat.svg";
import { appointmentStatus } from "./appointment";
import { FormattedMessage } from "react-intl";

const includedIcons = {
  rx: rx,
  "lab-tests": labTests,
  attachments: attachments,
  chat: chat,
};

const includedToIcons = (included) => {
  return included.map((item) => {
    return includedIcons[item];
  });
};

const getFullName = (params) =>
  params.row.firstName + " " + params.row.lastName;
const isAppointmentResolved = (params) =>
  [appointmentStatus.RESOLVED].indexOf(params.row.status.key) !== -1;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  paginationModes: {
    CLIENT: "client",
    SERVER: "server",
  },
  prescriptions: {
    dataApi: PatientAPI.getPatientPrescriptions,
    dataPath: "patientPrescriptionHistory",
  },
  pastAppointments: {
    name: "appointments",
    dataApi: AppointmentAPI.getAllAppointments,
    dataPath: "appointmentListOfAdmin",
    itemsPerPage: 20,
    columns: [
      {
        field: "start",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.7,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "patient",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 1.3,
        renderCell: (params) => {
          return renderCellWithImage(
            params.row.avatar || noAvatar,
            `${params.value?.firstName} ${params.value?.lastName}`
          );
        },
      },
      {
        field: "uhi",
        headerName: "UHI",
        sortable: true,
        resizable: false,
        flex: 1.3,
        renderCell: (params) => params.row?.patient?.uhi || "",
      },
      {
        field: "diagnosis",
        headerName: <FormattedMessage id={"words.common.diagnosis"} />,
        sortable: true,
        resizable: false,
        flex: 1.3,
        renderCell: (params) => params.value || "-",
      },
      {
        field: "included",
        headerName: "Included",
        sortable: true,
        resizable: false,
        flex: 0.7,
        renderCell: (params) => renderAdminAppointmentActions(params),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.7,
        renderCell: (params) =>
          renderCellWithStatus("appointments", params.row.status.val),
      },
    ],
  },
  tests: {
    dataApi: TestRequestAPI.getTestRequests,
    dataPath: "testList",
    itemsPerPage: 20,
    columns: [
      {
        field: "createdAt",
        headerName: "Date",
        sortable: true,
        flex: 0.7,
        renderCell: (params) =>
          renderCellWithText(
            formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA")
          ),
      },
      {
        field: "patient",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 0.8,
        valueGetter: (params) => params.row.patient?.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.patient?.avatar || noAvatar,
            params.row.patient?.firstName && params.row.patient?.lastName
              ? params.row.patient?.firstName +
                  " " +
                  params.row.patient?.lastName
              : "-"
          ),
        // valueGetter: (params) => params.value?.lastName || '',
        // renderCell: (params) => renderCellWithImage(params.value?.avatar || noAvatar, params.value ? params.value.firstName + ' ' + params.value.lastName : '-'),
      },
      {
        field: "patient.uhi",
        headerName: "Patient UHID",
        sortable: true,
        resizable: false,
        flex: 0.6,
        valueGetter: (params) => params?.row?.patient?.uhi || "",
        renderCell: (params) =>
          renderCellWithText(params?.row?.patient?.uhi || "-"),
      },
      {
        field: "doctor",
        headerName: "Doctor",
        sortable: true,
        resizable: false,
        flex: 0.8,
        valueGetter: (params) => params.row.doctor?.lastName,
        renderCell: (params) =>
          params.value
            ? renderCellWithImage(
                params.row.doctor?.avatar || noAvatar,
                params.row.doctor?.firstName && params.row.doctor?.lastName
                  ? params.row.doctor?.firstName +
                      " " +
                      params.row.doctor?.lastName
                  : "-"
              )
            : renderCellWithText("Patient Request"),
      },
      {
        field: "tests",
        headerName: "Test name",
        sortable: true,
        resizable: false,
        flex: 2.6,
        valueGetter: (params) => params.row.tests?.join(", ") || "-",
        renderCell: (params) =>
          renderCellWithText(params.row.tests?.join(", ") || "-"),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.6,
        valueGetter: (params) => params.row.status.val,
        renderCell: (params) =>
          renderCellWithStatus("tests", params.row.status.val),
      },
      {
        field: "",
        headerName: " ",
        sortable: false,
        resizable: false,
        flex: 0.3,
        renderCell: (params) => RenderTestRequestCellWithPopup(params),
      },
    ],
  },
  patientTests: {
    dataApi: PatientAPI.getPatientUploads,
    dataPath: "patientUploadHistory",
    defaultSort: "created_at",
  },
  attachments: {
    dataApi: PatientAPI.getPatientUploads,
    dataPath: "patientUploadHistory",
    itemsPerPage: 20,
    columns: [
      {
        field: "createdAt",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.7,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "uploadedBy",
        headerName: "Uploaded by",
        sortable: true,
        resizable: false,
        flex: 1,
      },
      {
        field: "filename",
        headerName: "File",
        sortable: true,
        resizable: false,
        flex: 1,
        renderCell: (params) =>
          renderCellWithFileImage(params.value, params.row.file),
      },
    ],
  },
  sickLeaves: {
    name: "sickLeaves",
    dataApi: PatientAPI.getPatientSickLeaves,
    dataPath: "patientSickLeaveHistory",
    itemsPerPage: 20,
    columns: [
      {
        field: "sickLeaveNum",
        headerName: <FormattedMessage id={"words.common.sick-leave-id"} />,
        sortable: true,
        flex: 0.4,
        sortComparator: () => {},
      },
      {
        field: "createdAt",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.6,
        sortComparator: () => {},
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "appointment",
        headerName: <FormattedMessage id={"words.common.doctor"} />,
        sortable: true,
        resizable: false,
        flex: 0.9,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithUserName(params.value.doctor),
      },
      {
        field: "companyName",
        headerName: "Company name",
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
      },
      {
        field: "filename",
        headerName: "File",
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
        renderCell: (params) => generateFileLink(params),
      },
    ],
  },
  patients: {
    dataApi: PatientAPI.getAllPatients,
    dataPath: "patientList",
    defaultSort: "first_name,last_name",
    itemsPerPage: 20,
    name: "patients",
    columns: [
      {
        field: "name",
        headerName: <FormattedMessage id={"words.common.name"} />,
        sortable: true,
        flex: 0.9,
        sortComparator: () => {},
        valueGetter: (params) => params.row.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.avatar || noAvatar,
            params.row.firstName && params.row.lastName
              ? params.row.firstName + " " + params.row.lastName
              : "-"
          ),
      },
      {
        field: "uhi",
        headerName: "UHI",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value),
      },
      {
        field: "email",
        headerName: <FormattedMessage id={"words.common.email"} />,
        sortable: true,
        resizable: false,
        flex: 1.4,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value || "-"),
      },
      {
        field: "fullPhone",
        headerName: <FormattedMessage id={"words.common.phone-number"} />,
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value || "-"),
      },
      {
        field: "idCard",
        headerName: <FormattedMessage id={"words.common.id-card-number"} />,
        sortable: true,
        resizable: false,
        flex: 0.9,
        sortComparator: () => {},
        valueGetter: (params) => params.row.idCard.number,
        renderCell: (params) =>
          renderCellWithText(get(params, "row.idCard.number", "") || "-"),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.5,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isBlocked ? "Blocked" : "Active"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isBlocked ? "Blocked" : "Active"
          ),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.3,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  doctors: {
    name: "doctors",
    dataApi: DoctorAPI.getAllDoctors,
    dataPath: "doctorList",
    itemsPerPage: 20,
    columns: [
      {
        field: "doctorId",
        headerName: "ID",
        sortable: true,
        resizable: false,
        flex: 0.3,
        sortComparator: () => {},
      },
      {
        field: "name",
        headerName: <FormattedMessage id={"words.common.name"} />,
        sortable: true,
        flex: 1,
        sortComparator: () => {},
        // valueGetter: (params) => console.log(params.row),
        renderCell: (params) =>
          renderCellWithImage(
            params.row.avatar || noAvatar,
            params.row.firstName && params.row.lastName
              ? params.row.firstName + " " + params.row.lastName
              : "-"
          ),
      },
      {
        field: "workModel",
        headerName: "Type of doctor",
        sortable: true,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        valueGetter: (params) =>
          TextFormatter.formatDoctorWorkModel(params.row.workModel),
        renderCell: (params) =>
          TextFormatter.formatDoctorWorkModel(params.row.workModel),
      },
      {
        field: "workStatus",
        headerName: "Work status",
        sortable: true,
        resizable: false,
        flex: 0.5,
        sortComparator: () => {},
        valueGetter: (params) => {
          if (params?.row?.workModel?.key === "2") {
            return params.row.workStatus.val;
          } else {
            return "-";
          }
        },
        renderCell: (params) => {
          if (params?.row?.workModel?.key === "2") {
            return renderCellWithStatus(
              "subjectStatuses",
              params.row.workStatus.val
            );
          } else {
            return renderCellWithText("-");
          }
        },
      },
      {
        field: "email",
        headerName: <FormattedMessage id={"words.common.email"} />,
        sortable: true,
        resizable: false,
        flex: 0.9,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value || "-"),
      },
      {
        field: "phone",
        headerName: <FormattedMessage id={"words.common.phone-number"} />,
        sortable: true,
        resizable: false,
        flex: 0.7,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value || "-"),
      },
      {
        field: "specializations",
        headerName: "Specialties",
        sortable: true,
        resizable: false,
        flex: 0.6,
        sortComparator: () => {},
        valueGetter: (params) =>
          params.row.specializations
            ?.filter((s) => !!s.speciality)
            .map((specialization) => specialization.speciality.val)
            .join(", ") || "-",
        renderCell: (params) =>
          renderCellWithText(
            params.row.specializations
              ?.filter((s) => !!s.speciality)
              .map((specialization) => specialization.speciality.val)
              .join(", ") || "-"
          ),
      },
      {
        field: "logo",
        headerName: "Clinic",
        sortable: false,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        renderCell: (params) => RenderClinicImage(params?.row?.clinic?.logo),
      },
      {
        field: "isBlocked",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isBlocked ? "Blocked" : "Active"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isBlocked ? "Blocked" : "Active"
          ),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.2,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },

  pharmacyStaff: {
    name: "pharmacyStaff",
    dataApi: PharmacistStaffAPI.getAllPharmacyStaff,
    dataPath: "pharmacyStaffList",
    itemsPerPage: 20,
    columns: [
      {
        field: "staffId",
      headerName: "ID",
      sortable: true,
      resizable: false,
      flex: 0.3,
      sortComparator: () => {},
      renderCell: (params) => "№" + params.id,
      },
    
      {
        field: "name",
        headerName: <FormattedMessage id={"words.common.name"} />,
        sortable: true,
        flex: 1,
        sortComparator: () => {},
        // valueGetter: (params) => console.log(params.row),
        renderCell: (params) =>
          renderCellWithImage(
            params.row.avatar || noAvatar,
            params.row.firstName && params.row.lastName
              ? params.row.firstName + " " + params.row.lastName
              : "-"
          ),
      },
      {
        field: "email",
        headerName: <FormattedMessage id={"words.common.email"} />,
        sortable: true,
        resizable: false,
        flex: 0.9,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value || "-"),
      },
      {
        field: "phone",
        headerName: <FormattedMessage id={"words.common.phone-number"} />,
        sortable: true,
        resizable: false,
        flex: 0.7,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.value || "-"),
      },
      
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.2,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },

  pharmacies: {
    dataApi: PharmacyAPI.getAllPharmacies,
    dataPath: "pharmacyList",
    itemsPerPage: 20,
    columns: [
      {
        field: "title",
        headerName: "Name",
        sortable: true,
        flex: 1.3,
        renderCell: (params) => renderCellWithText(params?.value),
      },
      {
        field: "address",
        headerName: "Address",
        sortable: true,
        resizable: false,
        flex: 1.6,
        valueGetter: (params) => TextFormatter.formatAddress(params.row),
        renderCell: (params) => TextFormatter.formatAddress(params.row),
      },
      {
        field: "email",
        headerName: "Email",
        sortable: true,
        resizable: false,
        flex: 1.2,
        renderCell: (params) => renderCellWithText(params?.value || "-"),
      },
      {
        field: "phones",
        headerName: "Phone Number",
        sortable: true,
        resizable: false,
        flex: 0.9,
        renderCell: (params) =>
          renderCellWithText(
            params.value.map((p) => p.phone).join(", ") || "-"
          ),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.5,
        valueGetter: (params) => (params.row.isBlocked ? "Blocked" : "Active"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isBlocked ? "Blocked" : "Active"
          ),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.3,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  appointments: {
    name: "appointments",
    dataApi: AppointmentAPI.getAllAppointments,
    dataPath: "appointmentListOfAdmin",
    itemsPerPage: 20,
    columns: [
      {
        field: "start",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.6,
        sortComparator: () => {},
        valueGetter: (params) =>
          isAppointmentResolved(params)
            ? params.row.updatedAt
            : params.row.start,
        renderCell: (params) =>
          renderCellWithText(
            formatISOtoHumanReadable(
              isAppointmentResolved(params)
                ? params.row.updatedAt
                : params.row.start,
              "DD/MM/YYYY, hh:mmA"
            ) || "-"
          ),
      },
      {
        field: "patient",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        valueGetter: (params) => params.row.patient?.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.patient?.avatar || noAvatar,
            params.row.patient?.firstName && params.row.patient?.lastName
              ? params.row.patient?.firstName +
                  " " +
                  params.row.patient?.lastName
              : "-"
          ),
      },
      {
        field: "patient.uhi",
        headerName: "Patient UHID",
        sortable: true,
        resizable: false,
        flex: 0.6,
        sortComparator: () => {},
        valueGetter: (params) => params?.row?.patient?.uhi || "",
        renderCell: (params) =>
          renderCellWithText(params?.row?.patient?.uhi || "-"),
      },
      {
        field: "doctor",
        headerName: <FormattedMessage id={"words.common.doctor"} />,
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        valueGetter: (params) => params.row.doctor?.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.doctor?.avatar || noAvatar,
            params.row.doctor?.firstName && params.row.doctor?.lastName
              ? params.row.doctor?.firstName + " " + params.row.doctor?.lastName
              : "-"
          ),
      },
      {
        field: "diagnosis",
        headerName: <FormattedMessage id={"words.common.diagnosis"} />,
        sortable: true,
        resizable: false,
        flex: 1.1,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params.row.diagnosis || "-"),
      },
      {
        field: "paymentType",
        headerName: <FormattedMessage id={"words.common.payment-method"} />,
        sortable: true,
        resizable: false,
        flex: 0.5,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithLinkOrText(params),
      },
      {
        //TODO: add ordering
        field: "included",
        headerName: "Included",
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
        valueGetter: (params) => params.row.included.length,
        renderCell: (params) => renderAdminAppointmentActions(params),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.7,
        sortComparator: () => {},
        valueGetter: (params) => params.row.status.val,
        renderCell: (params) =>
          renderCellWithStatus("appointments", params.row.status.val),
      },
      {
        field: "actions",
        headerName: " ",
        sortable: true,
        resizable: false,
        flex: 0.2,
        renderCell: (params) => RenderAppointmentCellWithPopup(params),
      },
    ],
  },
  orders: {
    name: "orders",
    dataApi: OrderAPI.getAllOrders,
    dataPath: "orderList",
    defaultSort: "-created_at",
    itemsPerPage: 20,
    columns: [
      // {
      //   field: "orderNum",
      //   headerName: "Order ID",
      //   sortable: true,
      //   resizable: false,
      //   flex: 0.3,
      //   sortComparator: () => {},
      //   renderCell: (params) => "№" + params.pharmacy.createdAt,
      // },
      {
        field: "createdAt",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.8,
        sortComparator: () => {},
        renderCell: (params) =>
          renderCellWithText(
            formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA")
          ),
      },
      {
        field: "patient",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        valueGetter: (params) => params.row.patient?.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.patient?.avatar || noAvatar,
            params.row.patient?.firstName && params.row.patient?.lastName
              ? params.row.patient?.firstName +
                  " " +
                  params.row.patient?.lastName
              : "-"
          ),
      },
      {
        field: "patient.uhi",
        headerName: "Patient UHID",
        sortable: true,
        resizable: false,
        flex: 0.6,
        sortComparator: () => {},
        valueGetter: (params) => params?.row?.patient?.uhi || "",
        renderCell: (params) =>
          renderCellWithText(params?.row?.patient?.uhi || "-"),
      },
      // {
      //     field: 'doctor',
      //     headerName: <FormattedMessage id={'words.common.doctor'}/>,
      //     sortable: true,
      //     resizable: false,
      //     flex: 0.8,
      //     sortComparator: () => {},
      //     valueGetter: (params) => params.row.doctor?.lastName,
      //     renderCell: (params) => renderCellWithImage(params.row.doctor?.avatar || noAvatar, (params.row.doctor?.firstName && params.row.doctor?.lastName) ? params.row.doctor?.firstName + ' ' + params.row.doctor?.lastName: '-'),
      // },
      {
        field: "deliveryAddress",
        headerName: <FormattedMessage id={"words.common.delivery-address"} />,
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params?.value || "-"),
      },
      {
        field: "total",
        headerName: <FormattedMessage id={"words.common.total"} />,
        sortable: true,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText("KD   " + params.value),
      },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   sortable: true,
      //   resizable: false,
      //   flex: 0.6,
      //   sortComparator: () => {},
      //   valueGetter: (params) => params.row.status.val,
      //   renderCell: (params) =>
      //     renderCellWithStatus("orders", params.row.status.val),
      // },
    ],
  },
  guestOrders: {
    name: "orders",
    dataApi: OrderAPI.getAllOrders,
    dataPath: "orderList",
    defaultSort: "-created_at",
    itemsPerPage: 20,
    columns: [
      // {
      //   field: "orderNum",
      //   headerName: "Order ID",
      //   sortable: true,
      //   resizable: false,
      //   flex: 0.3,
      //   sortComparator: () => {},
      //   renderCell: (params) => "№" + params.pharmacy.createdAt,
      // },
      {
        field: "createdAt",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.8,
        sortComparator: () => {},
        renderCell: (params) =>
          renderCellWithText(
            formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA")
          ),
      },
      {
        field: "patient",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        valueGetter: (params) => params.row.patient?.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.patient?.avatar || noAvatar,
            params.row.patient?.firstName && params.row.patient?.lastName
              ? params.row.patient?.firstName +
                  " " +
                  params.row.patient?.lastName
              : "-"
          ),
      },
      {
        field: "patient.uhi",
        headerName: "Patient UHID",
        sortable: true,
        resizable: false,
        flex: 0.6,
        sortComparator: () => {},
        valueGetter: (params) => params?.row?.patient?.uhi || "",
        renderCell: (params) =>
          renderCellWithText(params?.row?.patient?.uhi || "-"),
      },
      // {
      //     field: 'doctor',
      //     headerName: <FormattedMessage id={'words.common.doctor'}/>,
      //     sortable: true,
      //     resizable: false,
      //     flex: 0.8,
      //     sortComparator: () => {},
      //     valueGetter: (params) => params.row.doctor?.lastName,
      //     renderCell: (params) => renderCellWithImage(params.row.doctor?.avatar || noAvatar, (params.row.doctor?.firstName && params.row.doctor?.lastName) ? params.row.doctor?.firstName + ' ' + params.row.doctor?.lastName: '-'),
      // },
      {
        field: "deliveryAddress",
        headerName: <FormattedMessage id={"words.common.delivery-address"} />,
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params?.value || "-"),
      },
      {
        field: "total",
        headerName: <FormattedMessage id={"words.common.total"} />,
        sortable: true,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText("KD   " + params.value),
      },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   sortable: true,
      //   resizable: false,
      //   flex: 0.6,
      //   sortComparator: () => {},
      //   valueGetter: (params) => params.row.status.val,
      //   renderCell: (params) =>
      //     renderCellWithStatus("orders", params.row.status.val),
      // },
    ],
  },

  activeOrders: {
    dataApi: OrderAPI.getAllOrders,
    dataPath: "orderList",
    itemsPerPage: 10,
    columns: [
      {
        field: "orderNum",
        headerName: "Order ID",
        sortable: true,
        resizable: false,
        flex: 0.4,
        renderCell: (params) => "№" + params.value,
      },
      {
        field: "createdAt",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.7,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "user",
        headerName: "Name",
        sortable: true,
        resizable: false,
        flex: 0.8,
        renderCell: (params) =>{

          return params.row.patient?.firstName || "N/A";
        }

      },
      {
        field: "patientPhoneNumber",
        headerName: "Phone number",
        sortable: true,
        resizable: false,
        flex: 0.8,
        renderCell: (params) => {
          console.log('phoneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',params);
          return params.row.patient?.phone || "N/A";
        },
            },
      {
        field: "pharmacy.area",
        headerName: "Area",
        sortable: true,
        resizable: false,
        flex: 0.9,
        renderCell: (params) => params.row.pharmacy?.area || "",
      },
      // {
      //   field: "items",
      //   headerName: "Prescription",
      //   sortable: true,
      //   resizable: false,
      //   flex: 0.4,
      //   renderCell: (params) => {
      //     return params.value.some((item) => item.hasPrescription)
      //       ? renderCellWithIconsSet(includedToIcons(["rx"]))
      //       : "-";
      //   },
      // },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.7,
        renderCell: (params) =>
          renderCellWithStatus("orders", params.row.status.val),
      },
    ],
  },
  archivedOrders: {
    dataApi: OrderAPI.getAllOrders,
    dataPath: "orderList",
    itemsPerPage: 10,
    columns: [
      {
        field: "orderNum",
        headerName: "Order ID",
        sortable: true,
        resizable: false,
        flex: 0.4,
        renderCell: (params) => "№" + params.value,
      },
      {
        field: "createdAt",
        headerName: "Date & Time",
        sortable: true,
        flex: 0.7,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "user",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 0.8,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.user?.avatar || noAvatar,
            params.row.user?.firstName && params.row.user?.lastName
              ? params.row.user?.firstName + " " + params.row.user?.lastName
              : "-"
          ),
      },
      {
        field: "patientPhoneNumber",
        headerName: "Phone number",
        sortable: true,
        resizable: false,
        flex: 0.8,
        renderCell: (params) => params.value || "N/A",
      },
      {
        field: "pharmacy.area",
        headerName: "Area",
        sortable: true,
        resizable: false,
        flex: 0.9,
        renderCell: (params) => params.row.pharmacy?.area || "",
      },
      {
        field: "items",
        headerName: "Prescription",
        sortable: true,
        resizable: false,
        flex: 0.4,
        renderCell: (params) => {
          return params.value.some((item) => item.hasPrescription)
            ? renderCellWithIconsSet(includedToIcons(["rx"]))
            : "-";
        },
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.7,
        renderCell: (params) =>
          renderCellWithStatus("orders", params.row.status.val),
      },
    ],
  },
  payments: {
    name: "payments",
    dataApi: PaymentAPI.getPayments,
    dataPath: "paymentList",
    defaultSort: "created_at",
    itemsPerPage: 20,
    columns: [
      {
        field: "date",
        headerName: <FormattedMessage id={"words.common.date"} />,
        sortable: true,
        flex: 0.7,
        sortComparator: () => {},
        valueGetter: (params) =>
          formatISOtoHumanReadable(params.row.createdAt, "DD/MM/YYYY, hh:mmA"),
        renderCell: (params) =>
          renderCellWithText(
            formatISOtoHumanReadable(params.row.createdAt, "DD/MM/YYYY, hh:mmA")
          ),
      },
      {
        field: "sender",
        headerName: "Patient",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        valueGetter: (params) => params.row.sender?.lastName,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.sender?.avatar || noAvatar,
            params.row.sender?.firstName && params.row.sender?.lastName
              ? params.row.sender?.firstName + " " + params.row.sender?.lastName
              : "-"
          ),
      },
      {
        field: "patient.uhi",
        headerName: "Patient UHID",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        valueGetter: (params) => params?.row?.sender?.uhi || "",
        renderCell: (params) =>
          renderCellWithText(params?.row?.sender?.uhi || "-"),
      },
      {
        field: "service",
        headerName: "Paid for",
        sortable: true,
        resizable: false,
        flex: 0.6,
        sortComparator: () => {},
      },
      {
        field: "method",
        headerName: <FormattedMessage id={"words.common.payment-method"} />,
        sortable: true,
        resizable: false,
        flex: 0.5,
        sortComparator: () => {},
      },
      {
        field: "receiver",
        headerName: <FormattedMessage id={"words.common.doctor"} />,
        sortable: true,
        resizable: false,
        flex: 1,
        sortComparator: () => {},
        renderCell: (params) => renderCellWithText(params?.value || "-"),
      },
      {
        field: "invoiceType",
        headerName: " ",
        sortable: true,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        renderCell: (params) => renderCellRefund(params.row.invoiceType),
      },
      {
        field: "amount",
        headerName: "Payment amount",
        sortable: true,
        resizable: false,
        flex: 0.8,
        sortComparator: () => {},
        renderCell: (params) =>
          renderCellTotal(
            params.row.amount,
            params.row.invoiceType === "Refund" ? "red" : ""
          ),
      },
      {
        field: "invoice",
        headerName: <FormattedMessage id={"words.common.invoice"} />,
        sortable: true,
        resizable: false,
        flex: 0.6,
        sortComparator: () => {},
        renderCell: (params) => renderPaymentInvoice(params),
      },
    ],
  },
  educations: {
    columns: [
      {
        field: "place",
        headerName: "Place",
        sortable: true,
        flex: 0.7,
      },
      {
        field: "degree",
        headerName: "Degree",
        sortable: true,
        flex: 0.5,
      },
      {
        field: "yearStart",
        headerName: <FormattedMessage id={"words.common.start-date"} />,
        sortable: true,
        flex: 0.5,
      },
      {
        field: "yearEnd",
        headerName: <FormattedMessage id={"words.common.end-date"} />,
        sortable: true,
        flex: 0.5,
      },
    ],
  },
  specializations: {
    columns: [
      {
        field: "speciality",
        headerName: "Specialty",
        sortable: true,
        flex: 0.7,
        renderCell: (params) =>
          `${params.row.specialistType.val || ""}: ${params.value?.val || ""}`,
      },
      {
        field: "grade",
        headerName: <FormattedMessage id={"words.common.grade"} />,
        sortable: true,
        flex: 0.5,
      },
      {
        field: "licenseNumber",
        headerName: <FormattedMessage id={"words.common.licence-number"} />,
        sortable: true,
        flex: 0.5,
      },
    ],
  },
  pharmacists: {
    columns: [
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        flex: 1,
        renderCell: (params) =>
          params.row.firstName + " " + params.row.lastName,
      },
      {
        field: "email",
        headerName: "Email",
        sortable: true,
        flex: 1,
      },
      {
        field: "notes",
        headerName: "Notes",
        sortable: true,
        flex: 1.6,
      },
      {
        field: "popup_actions",
        headerName: " ",
        sortable: true,
        resizable: false,
        flex: 0.3,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  medications: {
    dataApi: MedicineAPI.getAllMedicines,
    dataPath: "medicineList",
    itemsPerPage: 20,
    columns: [
      {
        field: "title",
        headerName: "Name of medicine",
        sortable: true,
        flex: 1,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.picture || noAvatar,
            params.row.title,
            params.row.titleNew
          ),
      },
      // {
      //   field: "prescription",
      //   headerName: "Prescription",
      //   sortable: true,
      //   resizable: false,
      //   flex: 0.6,
      //   valueGetter: (params) =>
      //     params.row.prescriptionRequired ? "Required" : "Not required",
      //   renderCell: (params) =>
      //     renderCellWithLabel(
      //       params.row.prescriptionRequired ? "Required" : "Not required",
      //       params.row.prescriptionRequiredNew
      //         ? "> Required"
      //         : params.row.prescriptionRequired !==
      //             params.row.prescriptionRequiredNew && "> Not required"
      //     ),
      // },
      {
        field: "price",
        headerName: "Price",
        sortable: true,
        resizable: false,
        flex: 0.5,
        renderCell: (params) =>
          renderCellTotal(params.row.price),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.8,
        valueGetter: (params) => params.row.status.val,
        renderCell: (params) =>
          renderCellWithStatus("medicines", params.row.status.val),
      },
      {
        field: "actions",
        headerName: " ",
        sortable: true,
        resizable: false,
        flex: 0.8,
        renderCell: (params) => RenderCellMedicationsActions(params),
      },
      {
        field: "popup_actions",
        headerName: " ",
        sortable: true,
        resizable: false,
        flex: 0.3,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  orderItems: {
    columns: [
      {
        field: "picture",
        headerName: "Medicine",
        sortable: true,
        flex: 2,
        renderCell: (params) =>
          renderCellWithImage(params.row.picture || noAvatar, params.row.title),
      },
      {
          field: 'prescription',
          headerName: 'Prescription',
          sortable: true,
          flex: 0.8,
          renderCell: (params) => renderOrderLabTestPrescription(params),
      },
      // {
      //   field: "homeService",
      //   headerName: "Home service",
      //   sortable: true,
      //   flex: 0.6,
      //   renderCell: (params) =>
      //     renderCellWithText(params.row.homeService ? "+" : "-"),
      // },
      // {
      //   field: "homeService_edit",
      //   headerName: "Home service",
      //   sortable: true,
      //   flex: 0.6,
      //   renderCell: (params) => renderCellWithCheckbox(params),
      // },
      {
        field: "qty",
        headerName: "Qty",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.qty || "N/A",
      },
      {
        field: "qty_edit",
        headerName: "Qty",
        sortable: true,
        flex: 0.6,
        renderCell: (params) => renderOrderLabTestEditingQty(params),
      },
      {
        field: "price",
        headerName: <FormattedMessage id={"words.common.price"} />,
        sortable: true,
        flex: 0.6,
        renderCell: (params) =>
          renderCellWithDiscount(
            params.row.price,
            params.row.priceAfterDiscount,
            params.row.qty
          ),
      },

      {
        field: "remove",
        headerName: " ",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => renderOrderLabTestRemoveBtn(params),
      },
    ],
  },

  medicines: {
    dataApi: MedicineAPI.getAllMedicines,
    dataPath: "medicineList",
    itemsPerPage: 20,
    columns: [
      {
        field: "title",
        headerName: "Name of medicine",
        sortable: true,
        flex: 4,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.picture || noAvatar,
            params.row.title,
            params.row.titleNew
          ),
      },
      {
        field: "prescription",
        headerName: "Prescription",
        sortable: true,
        resizable: false,
        flex: 1,
        renderCell: (params) =>
          renderCellWithLabel(
            params.row.prescriptionRequired ? "Required" : "Not required",
            // params.row.prescriptionRequiredNew
            //   ? "Required"
            //   : params.row.prescriptionRequired !==
            //       params.row.prescriptionRequiredNew && "Not required"
          ),
      },
      {
        field: "price",
        headerName: "Price",
        sortable: true,
        resizable: false,
        flex: 1,
        renderCell: (params) =>
          renderCellTotal(params.row.price, "", params.row.priceNew),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 1,
        renderCell: (params) =>
          renderCellWithStatus("medicines", params.row.status.val),
      },
      {
        field: "popup_actions",
        headerName: " ",
        sortable: true,
        resizable: false,
        flex: 0.2,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  coupons: {
    name: "coupons",
    dataApi: CouponsApi.getAllCoupons,
    dataPath: "promoCodes",
    itemsPerPage: 20,
    columns: [
      {
        field: "couponCode",
        headerName: "Coupon Code",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.couponCode,
      },
      {
        field: "couponName",
        headerName: "Name",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.couponName,
      },
      {
        field: "startDate",
        headerName: "Start Date",
        sortable: true,
        flex: 0.3,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "endDate",
        headerName: "Expiry Date",
        sortable: true,
        flex: 0.3,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "isActive",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.3,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isActive ? "Active" : "Blocked"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isActive ? "Active" : "Blocked"
          ),
      },
      {
        field: "maxNoRedeem",
        headerName: "Max usage",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.3,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },


  ads: {
    name: "ads",
    dataApi: AdsApi.getAllAds,
    dataPath: "allAds",
    itemsPerPage: 20,
    columns: [
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.name,
      },
      {
        field: "expiryDateTime",
        headerName: "Expiry Date",
        sortable: true,
        flex: 0.3,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "isActive",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isActive ? "Active" : "Blocked"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isActive ? "Active" : "Blocked"
          ),
      },
      {
        field: "isApproved",
        headerName: "Approval",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isApproved ? "Active" : "Blocked"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isApproved ? "Active" : "Blocked"
          ),
      },
      {
        field: "isInteractive",
        headerName: "Interactive",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        valueGetter: (params) =>
          params.row.isInteractive ? "Active" : "Blocked",
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isInteractive ? "Active" : "Blocked"
          ),
      },
      {
        field: "toOpen",
        headerName: "Open to",
        sortable: true,
        flex: 0.2,
        renderCell: (params) => renderCellOpenTo(params?.row?.toOpen),
      },
      {
        field: "serviceType",
        headerName: "Service Type",
        sortable: true,
        flex: 0.2,
        renderCell: (params) => params?.row?.doctorId?.serviceType?.val,
      },
      {
        field: "imageUrl",
        headerName: "Image",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        renderCell: (params) => RenderAdImage(params.row.imageUrl),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.1,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  advertisement: {
    name: "advertisement",
    dataApi: AdvertisementApi.getAllAdvertise,
    dataPath: "allAdvertise",
    itemsPerPage: 20,
    columns: [
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.name,
      },
      {
        field: "expiryDateTime",
        headerName: "Expiry Date",
        sortable: true,
        flex: 0.3,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "isActive",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isActive ? "Active" : "Blocked"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isActive ? "Active" : "Blocked"
          ),
      },
      {
        field: "isApproved",
        headerName: "Approval",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.isApproved ? "Active" : "Blocked"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isApproved ? "Active" : "Blocked"
          ),
      },
      {
        field: "isInteractive",
        headerName: "Interactive",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        valueGetter: (params) =>
          params.row.isInteractive ? "Active" : "Blocked",
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.isInteractive ? "Active" : "Blocked"
          ),
      },
      {
        field: "toOpen",
        headerName: "Open to",
        sortable: true,
        flex: 0.2,
        renderCell: (params) => renderCellOpenTo(params?.row?.toOpen),
      },
      {
        field: "serviceType",
        headerName: "Service Type",
        sortable: true,
        flex: 0.2,
        renderCell: (params) => params?.row?.doctorId?.serviceType?.val,
      },
      {
        field: "clientUrl",
        headerName: "Client Url",
        sortable: true,
        flex: 0.2,
        renderCell: (params) => params?.row?.clientUrl,
      },
      {
        field: "imageUrl",
        headerName: "Image",
        sortable: true,
        resizable: false,
        flex: 0.2,
        sortComparator: () => {},
        renderCell: (params) => RenderAdImage(params.row.imageUrl),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.1,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },

  clinics: {
    name: "clinics",
    dataApi: ClinicsApi.getAllClinics,
    dataPath: "allClinics",
    itemsPerPage: 20,
    columns: [
      {
        field: "title",
        headerName: "En. Title",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.title,
      },
      {
        field: "titleAr",
        headerName: "Ar. Title",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.titleAr,
      },
      {
        field: "activatedDate",
        headerName: "Activated Date",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "deactivatedDate",
        headerName: "Deactivated Date",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.3,
        sortComparator: () => {},
        valueGetter: (params) => (params.row.status ? "Active" : "InActive"),
        renderCell: (params) =>
          renderCellWithStatus(
            "subjectStatuses",
            params.row.status === "ACTIVE" ? "Active" : "Blocked"
          ),
      },
      {
        field: "logo",
        headerName: "Logo",
        sortable: false,
        resizable: false,
        flex: 0.4,
        sortComparator: () => {},
        renderCell: (params) => RenderAdImage(params.row.logo),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.2,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },
  packages: {
    name: "packages",
    dataApi: PackagesApi.getAllPackages,
    dataPath: "packageList",
    itemsPerPage: 20,
    columns: [
      {
        field: "doctor",
        headerName: "Doctor",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.doctor.avatar || noAvatar,
            params.row.doctor.firstName && params.row.doctor.lastName
              ? params.row.doctor.firstName + " " + params.row.doctor.lastName
              : "-"
          ),
      },
      {
        field: "title",
        headerName: "Title En",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.title,
      },
      {
        field: "titleAr",
        headerName: "Title Ar",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.titleAr,
      },
      {
        field: "descriptionAr",
        headerName: "Description",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.descriptionAr,
      },
      {
        field: "description",
        headerName: "Description",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.description,
      },
      {
        field: "activationDate",
        headerName: "Activated Date",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "expirationDate",
        headerName: "Expiration Date",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          formatISOtoHumanReadable(params.value, "DD/MM/YYYY, hh:mmA"),
      },
      {
        field: "numOfAppointments",
        headerName: "Number of appointments",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.numOfAppointments,
      },
      {
        field: "price",
        headerName: "Price",
        sortable: true,
        flex: 0.3,
        renderCell: (params) =>
          //   params.row.price,
          renderCellTotal(params.row.price),
      },
      {
        field: "",
        headerName: "",
        sortable: false,
        resizable: false,
        flex: 0.1,
        renderCell: (params) => RenderCellWithPopup(params),
      },
    ],
  },

  subscriptions: {
    name: "subscriptions",
    dataApi: SubscriptionsApi.getAllSubscriptions,
    dataPath: "subscriptionList",
    itemsPerPage: 20,
    columns: [
      {
        field: "doctor",
        headerName: "Doctor",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.package.doctor.avatar || noAvatar,
            params.row.package.doctor.firstName &&
              params.row.package.doctor.lastName
              ? params.row.package.doctor.firstName +
                  " " +
                  params.row.package.doctor.lastName
              : "-"
          ),
      },
      {
        field: "patient",
        headerName: "Patient",
        sortable: true,
        flex: 0.4,
        renderCell: (params) =>
          renderCellWithImage(
            params.row.patient.avatar || noAvatar,
            params.row.patient.firstName && params.row.patient.lastName
              ? params.row.patient.firstName + " " + params.row.patient.lastName
              : "-"
          ),
      },
      {
        field: "titleAr",
        headerName: "Title Ar",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.package.titleAr,
      },
      {
        field: "title",
        headerName: "Title En",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.package.title,
      },
      {
        field: "descriptionAr",
        headerName: "Description Ar",
        sortable: true,
        flex: 0.4,
        renderCell: (params) => params.row.package.descriptionAr,
      },
      {
        field: "description",
        headerName: "Description En",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.package.description,
      },
      {
        field: "numOfAppointments",
        headerName: "Number of appointments",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.package.numOfAppointments,
      },
      {
        field: "price",
        headerName: "Price",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => renderCellTotal(params.row.package.price),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        resizable: false,
        flex: 0.3,
        sortComparator: () => {},
        valueGetter: (params) => params.row.status.val,
        renderCell: (params) =>
          renderCellWithStatus("orders", params.row.status.val),
      },
      {
        field: "remainingAppointments",
        headerName: "Remaining Appointments",
        sortable: true,
        flex: 0.3,
        renderCell: (params) => params.row.remainingAppointments,
      },
      // {
      //   field: "",
      //   headerName: "",
      //   sortable: false,
      //   resizable: false,
      //   flex: 0.2,
      //   renderCell: (params) => RenderCellWithPopup(params),
      // },
    ],
  },
};
