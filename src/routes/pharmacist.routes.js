import { ActiveOrdersPage, ArchivedOrdersPage, MedicinesPage, PharmacistOrderDetailsPage,CreatePharmacistStaffPage, PharmacyStaffPage} from 'components/pages';
import EditPharmacyStaffPage from 'components/pages/admin/EditPharmacyStaffPage';

const pharmacistPaths = {
    activeOrders: '/active-orders',
    activeOrdersDetails: '/active-orders/details/',
    archivedOrders: '/archived-orders',
    archivedOrdersDetails: '/archived-orders/details/',
    medicines: '/medicines',
    Pharmacist: '/pharmacist/',
    pharmacistStaffEdit: "/pharmacist-staff/edit/",
    pharmacistStaff: "/pharmacist-staff/",

}

const pharmacistRoutes = [
    {
        path: '/active-orders',
        exact: true,
        component: ActiveOrdersPage,
        meta: {
            title: 'Active Orders',
        }
    },
    {
        path: '/pharmacist/',
        exact: true,
        component: CreatePharmacistStaffPage,
        meta: {
            title: 'Pharmacist',
        }
    },
    {
        path: '/pharmacist-staff/',
        exact: true,
        component: PharmacyStaffPage,
        meta: {
            title: 'Pharmacist-staff',
        }
    },
    {
        path: "/pharmacist-staff/edit/:id/",
        exact: true,
        // permission: "change_ad",
        // role: "admin",
        component: EditPharmacyStaffPage,
        meta: {
        //   title: <FormattedMessage id={"words.common.edit"} />,
          breadcrumbs: [
            {
              name: "Pharmacist",
              path: "/pharmacist",
            },
            { name: "Pharmacist profile", path: "/Pharmacist-staff" }
          ],
        },
      },
    {
        path: '/active-orders/details/:id',
        exact: true,
        component: PharmacistOrderDetailsPage,
        meta: {
            title: 'Order details',
            breadcrumbs: [
                { name: 'Active Orders', path: '/active-orders' }
            ]
        }
    },
    {
        path: '/archived-orders',
        exact: true,
        component: ArchivedOrdersPage,
        meta: {
            title: 'Archived Orders',
        }
    },
    {
        path: '/archived-orders/details/:id',
        exact: true,
        component: PharmacistOrderDetailsPage,
        meta: {
            title: 'Order details',
            breadcrumbs: [
                { name: 'Archived Orders', path: '/archived-orders' }
            ]
        }
    },
    {
        path: '/medicines',
        exact: true,
        component: MedicinesPage,
        meta: {
            title: 'Medicines',
        }
    },
];

export { pharmacistPaths, pharmacistRoutes };