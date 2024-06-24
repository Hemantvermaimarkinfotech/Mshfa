import './index.scss';

import React from "react";
import { useHistory } from 'react-router-dom';

import { Paper, PageHeader, PageTitle, PageMetadata, Breadcrumbs } from 'components/layout';
import { CreatePharmacyForm } from 'components/forms';

import { GlobalAppRouter } from "routes";
import { usePharmacyAPI } from "hooks/pharmacy";

const CreatePharmacyPage = ({ route }) => {

    const title = route.meta?.title;

    const { createPharmacy } = usePharmacyAPI();

    const history = useHistory();

    const handleSubmit = (data) => {
        createPharmacy(data)
            .then(response => {
                if (response) {
                    if (response.success) {
                        history.push(GlobalAppRouter.paths.pharmacies)
                    }
                }

            })
    }

    return (
        <div className={'page page--thin page--blue page--scroll create-pharmacy-page'}>
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={title} />
                </PageMetadata>
            </PageHeader>
            <Paper>
                <CreatePharmacyForm onSubmit={handleSubmit} />
            </Paper>
        </div>
    )
}

export default CreatePharmacyPage;