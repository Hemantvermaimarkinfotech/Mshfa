import React from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Paper, PageHeader, PageTitle, PageMetadata, Breadcrumbs } from 'components/layout';
import { CreatePharmacistStaffForm } from 'components/forms';
import { usePharmacistStaffAPI } from "hooks/pharmacyStaff";
import { GlobalAppRouter } from "routes";

const CreatePharmacistStaffPage = ({ route }) => {
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { createPharmacistStaff } = usePharmacistStaffAPI();
    const history = useHistory();
    const title = route.meta?.title;

    const handleSubmit = (data) => {
        createPharmacistStaff(data)
            .then(response => {
                if (response && response.success) {
                    const key = enqueueSnackbar('Pharmacy Staff created', {
                        onClick: () => { enqueueSnackbar.closeSnackbar(key); }
                    });
                    history.push(GlobalAppRouter.paths.doctors);
                } else {
                    enqueueSnackbar('Error while creating Pharmacy Staff ', { variant: 'error' });
                }
            })
            .catch(() => {
                enqueueSnackbar('Error while creating Pharmacy Staff ', { variant: 'error' });
            });
    };

    return (
        <div className="page page--thin page--blue page--scroll create-doctor-page">
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={title} />
                </PageMetadata>
            </PageHeader>
            <Paper>
                <CreatePharmacistStaffForm onSubmit={handleSubmit} />
            </Paper>
        </div>
    );
};

export default CreatePharmacistStaffPage;
