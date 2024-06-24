import './index.scss';

import React from "react";
import { useHistory, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import config from 'config/forms.config';
import { Paper, PageHeader, PageTitle, PageMetadata, Breadcrumbs } from 'components/layout';
import { CreateDoctorForm } from 'components/forms';
import { useDoctorAPI } from "hooks/doctors";

import { GlobalAppRouter } from "routes";

const CreateDoctorPage = ({ route }) => {

    const params = useParams();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const type = params.type === config.doctorTypes.schedule.toString() ?
        config.doctorTypes.schedule :
        config.doctorTypes.walkIn;

    const title = route.meta?.title;

    const { createDoctor } = useDoctorAPI();
    const history = useHistory();

    const handleSubmit = (data) => {

        return createDoctor(data)
            .then(response => {
                if (response) {
                    if (response.success) {
                        let key = enqueueSnackbar('Doctor created', {
                            onClick: () => {
                                closeSnackbar(key);
                            }})
                        history.push(GlobalAppRouter.paths.doctors)
                    } else {
                        enqueueSnackbar('Error while creating doctor', { variant: 'error' })
                    }
                    return response;
                }

            }).catch(e => {
                enqueueSnackbar('Error while creating doctor', { variant: 'error' })
            })
    }

    return (
        <div className={'page page--thin page--blue page--scroll create-doctor-page'}>
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={title} />
                </PageMetadata>
            </PageHeader>
            <Paper>
                <CreateDoctorForm onSubmit={handleSubmit} workModel={type}/>
            </Paper>
        </div>
    )
}

export default CreateDoctorPage;