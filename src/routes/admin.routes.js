import {
  LabTestsPage,
  PatientsPage,
  PatientProfilePage,
  DoctorsPage,
  CreateDoctorPage,
  EditDoctorPage,
  EditCouponPage,
  AppointmentsPage,
  OrderDetailsPage,
  PaymentsPage,
  CreateCouponPage,
  DoctorProfilePage,
  CouponsPage,
  AdsPage,
  AdvertisementPage,
  ClinicsPage,
  EditClinicPage,
  CreateAdPage,
  CreateClinicPage,
  EditAdPage,
  PackagesPage,
  CreatePackagePage,
  EditPackagePage,
  SubscriptionsPage,
  PharmacistOrderDetailsPage,
} from "components/pages";
import CreateAdvertisementPage from "components/pages/admin/CreateAdvertisementPage";
import EditAdvertisementPage from "components/pages/admin/EditAdvertisementPage";
import { FormattedMessage } from "react-intl";

const adminPaths = {
  labTests: "/lab-tests",
  patients: "/patients",
  patientsProfile: "/patients/profile/",
  doctors: "/doctors",
  coupons: "/coupons",
  ads: "/ads",
  advertisement: "/advertisement",
  clinics: "/clinics",
  doctorsProfile: "/doctors/profile/",
  subscriptionProfile: "/subscriptions/profile/",
  couponsProfile: "/coupons/profile/",
  doctorsCreate: "/doctors/create",
  couponsCreate: "/coupons/create",
  adsCreate: "/ads/create",
  advertisementCreate: "/advertisement/create",
  clinicsCreate: "/clinics/create",
  doctorsEdit: "/doctors/edit/",
  couponsEdit: "/coupons/edit/",
  adsEdit: "/ads/edit/",
  advertisementEdit: "/advertisement/edit/",
  clinicsEdit: "/clinics/edit/",
  appointments: "/appointments",
  ordersDetails: "/lab-tests/details/",
  PharmacistOrderDetailsPage: "/pharmacies/order/",
  patientOrderDetails: "/patients/order/",
  payments: "/payments",
  packages: "/packages",
  packagesEdit: "/packages/edit/",
  packagesCreate: "/packages/create",
  subscriptions: "/subscriptions",
};

const adminRoutes = [
  {
    path: "/lab-tests",
    exact: true,
    permission: "view_labtest",
    role: "admin",
    component: LabTestsPage,
    meta: {
      title: <FormattedMessage id={"words.common.lab-tests"} />,
    },
  },
  {
    path: "/patients",
    exact: true,
    permission: "view_user",
    role: "admin",
    component: PatientsPage,
    meta: {
      title: "Patients",
    },
  },
  {
    path: "/pharmacies/order/",
    exact: true,
    permission: "view_user",
    role: "admin",
    component: PharmacistOrderDetailsPage,
    meta: {
      title: "Pharmacy",
    },
  },
  {
    path: "/patients/profile/:id/:activeTab?",
    exact: true,
    permission: "view_user",
    role: "admin",
    component: PatientProfilePage,
    meta: {
      title: "Patient profile",
      breadcrumbs: [{ name: "Patients", path: "/patients" }],
    },
  },
  {
    path: "/patients/order/:patientId/:id",
    exact: true,
    permission: "view_order",
    role: "admin",
    component: OrderDetailsPage,
    meta: {
      title: "Order details",
      breadcrumbs: [
        { name: "Patients", path: "/patients" },
        {
          name: "Patient profile",
          path: `${adminPaths.patientsProfile}:patientId/orders`,
        },
      ],
    },
  },
  {
    path: "/doctors",
    exact: true,
    permission: "view_user",
    role: "admin",
    component: DoctorsPage,
    meta: {
      title: <FormattedMessage id={"words.common.doctors"} />,
    },
  },
  {
    path: "/doctors/create/:type?",
    exact: true,
    permission: "add_user",
    role: "admin",
    component: CreateDoctorPage,
    meta: {
      title: "Create a doctor",
      breadcrumbs: [
        {
          name: <FormattedMessage id={"words.common.doctors"} />,
          path: "/doctors",
        },
      ],
    },
  },
  {
    path: "/doctors/profile/:id/:activeTab?",
    exact: true,
    permission: "view_user",
    role: "admin",
    component: DoctorProfilePage,
    meta: {
      title: "Doctor profile",
      breadcrumbs: [
        {
          name: <FormattedMessage id={"words.common.doctors"} />,
          path: "/doctors",
        },
      ],
    },
  },
  {
    path: "/doctors/edit/:id/:activeTab?",
    exact: true,
    permission: "change_user",
    role: "admin",
    component: EditDoctorPage,
    meta: {
      title: <FormattedMessage id={"words.common.edit"} />,
      breadcrumbs: [
        {
          name: <FormattedMessage id={"words.common.doctors"} />,
          path: "/doctors",
        },
        { name: "Doctors profile", path: "/doctors/profile/:id" },
      ],
    },
  },
  {
    path: "/appointments",
    exact: true,
    permission: "view_appointment",
    role: "admin",
    component: AppointmentsPage,
    meta: null,
  },
  {
    path: "/lab-tests/details/:id",
    exact: true,
    permission: "view_order",
    role: "admin",
    component: OrderDetailsPage,
    meta: {
      title: "Order details",
      breadcrumbs: [
        {
          name: <FormattedMessage id={"words.common.orders"} />,
          path: "/lab-tests",
        },
      ],
    },
  },
  {
    path: "/payments",
    exact: true,
    permission: "view_payment",
    role: "admin",
    component: PaymentsPage,
    meta: null,
  },
  {
    path: "/coupons",
    exact: true,
    permission: "view_promocode",
    role: "admin",
    component: CouponsPage,
    meta: {
      title: <FormattedMessage id={"words.common.coupons"} />,
    },
  },
  {
    path: "/coupons/create",
    exact: true,
    permission: "add_promocode",
    role: "admin",
    component: CreateCouponPage,
    meta: {
      title: "Create a coupon",
      breadcrumbs: [
        {
          name: <FormattedMessage id={"words.common.coupons"} />,
          path: "/coupons",
        },
      ],
    },
  },
  {
    path: "/coupons/edit/:id/:activeTab?",
    exact: true,
    permission: "change_promocode",
    role: "admin",
    component: EditCouponPage,
    meta: {
      title: <FormattedMessage id={"words.common.edit"} />,
      breadcrumbs: [
        {
          name: <FormattedMessage id={"words.common.coupons"} />,
          path: "/coupons",
        },
        { name: "Coupons profile", path: "/coupons/profile/:id" },
      ],
    },
  },
  {
    path: "/ads",
    exact: true,
    permission: "view_ad",
    //role: "admin",
    component: AdsPage,
    meta: {
      title: "Ads",
    },
  },
  {
    path: "/ads/create",
    exact: true,
    permission: "add_ad",
    role: "admin",
    component: CreateAdPage,
    meta: {
      title: "Create an ad",
      breadcrumbs: [
        {
          name: "Ads",
          path: "/ads",
        },
      ],
    },
  },
  {
    path: "/ads/edit/:id/:activeTab?",
    exact: true,
    permission: "change_ad",
    role: "admin",
    component: EditAdPage,
    meta: {
      title: <FormattedMessage id={"words.common.edit"} />,
      breadcrumbs: [
        {
          name: "Ads",
          path: "/ads",
        },
        { name: "Ads profile", path: "/ads/profile/:id" },
      ],
    },
  },
  {
    path: "/advertisement",
    exact: true,
    permission: "view_ad",
    //role: "admin",
    component: AdvertisementPage,
    meta: {
      title: "Advertisement",
    },
  },
  {
    path: "/advertisement/create",
    exact: true,
    permission: "add_ad",
    role: "admin",
    component: CreateAdvertisementPage,
    meta: {
      title: "Create an advertisement",
      breadcrumbs: [
        {
          name: "Advertisement",
          path: "/advertisement",
        },
      ],
    },
  },
  {
    path: "/advertisement/edit/:id/:activeTab?",
    exact: true,
    permission: "change_ad",
    role: "admin",
    component: EditAdvertisementPage,
    meta: {
      title: <FormattedMessage id={"words.common.edit"} />,
      breadcrumbs: [
        {
          name: "Advertisement",
          path: "/advertisement",
        },
        { name: "Advertisement profile", path: "/advertisement/profile/:id" },
      ],
    },
  },

  {
    path: "/clinics",
    exact: true,
    permission: "view_clinic",
    role: "admin",
    component: ClinicsPage,
    meta: {
      title: "Clinics",
    },
  },
  {
    path: "/clinics/create",
    exact: true,
    permission: "add_clinic",
    role: "admin",
    component: CreateClinicPage,
    meta: {
      title: "Create a clinic",
      breadcrumbs: [
        {
          name: "Clinics",
          path: "/clinics",
        },
      ],
    },
  },
  {
    path: "/clinics/edit/:id/:activeTab?",
    exact: true,
    permission: "change_clinic",
    role: "admin",
    component: EditClinicPage,
    meta: {
      title: <FormattedMessage id={"words.common.edit"} />,
      breadcrumbs: [
        {
          name: "Clinics",
          path: "/clinics",
        },
        { name: "Clinics profile", path: "/clinics/profile/:id" },
      ],
    },
  },
  {
    path: "/packages",
    exact: true,
    permission: "view_package",
    role: "admin",
    component: PackagesPage,
    meta: {
      title: "Packages",
    },
  },
  {
    path: "/packages/create",
    exact: true,
    permission: "add_package", //
    role: "admin",
    component: CreatePackagePage, //
    meta: {
      title: "Create a package",
      breadcrumbs: [
        {
          name: "Packages", //
          path: "/packages", //
        },
      ],
    },
  },
  {
    path: "/packages/edit/:id/:activeTab?", //
    exact: true,
    permission: "change_package",
    role: "admin",
    component: EditPackagePage,
    meta: {
      title: <FormattedMessage id={"words.common.edit"} />,
      breadcrumbs: [
        {
          name: "Packages", //
          path: "/packages",
        },
        { name: "Packages profile", path: "/packages/profile/:id" }, //
      ],
    },
  },
  {
    path: "/subscriptions",
    exact: true,
    permission: "view_subscription",
    role: "admin",
    component: SubscriptionsPage,
    meta: {
      title: "Subscriptions",
    },
  },
];

export { adminPaths, adminRoutes };
