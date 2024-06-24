import './index.scss';

import React, { useMemo } from "react";
import { useHistory, useParams } from 'react-router-dom';

import { Paper, PageHeader, PageTitle, PageMetadata, Breadcrumbs, GlobalLoader, GlobalError } from 'components/layout';
import { CreatePharmacyForm } from 'components/forms';
import { usePharmacy, usePharmacyAPI } from "hooks/pharmacy";

import { GlobalAppRouter } from "routes";

const EditPharmacyPage = ({ route }) => {

    const title = route.meta?.title;

    const history = useHistory();
    const { id } = useParams();

    const { pharmacy, pharmacyLoading, pharmacyError, refetchPharmacy } = usePharmacy(id);
    const { updatePharmacy } = usePharmacyAPI();

    const preparedValues = useMemo(() => {
        if (!pharmacy) return null;
        const { __typename, id, isBlocked, phones, medications, pharmacists, workingHours, ...rest } = pharmacy;
        const preparedWorkingHours = {};
        Object.keys(workingHours).forEach(day => {
            if(day === "__typename") return;
            preparedWorkingHours[day] = workingHours[day].map(workingDay => {
                const { __typename, ...rest } = workingDay;
                delete rest['delete'];
                return { ...rest };
            })
        });
        return {
            pharmacyId: id,
            phones: phones.map(phone => {
                const { __typename, ...rest } = phone;
                return { ...rest };
            }),
            workingHours: preparedWorkingHours,
            ...rest
        }
    }, [pharmacy]);

    if (pharmacyLoading) {
        return <GlobalLoader />
    }
    if (pharmacyError) {
        return <GlobalError />
    }

    const handleSubmit = (data) => {
        updatePharmacy(data)
            .then(response => {
                if (response) {
                    if (response.success) {
                        history.push(`${GlobalAppRouter.paths.pharmaciesProfile}${pharmacy.id}`)
                    }
                }
            })
    }

    return (
        <div className={'page page--thin page--blue page--scroll edit-pharmacy-page'}>
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={title} />
                </PageMetadata>
            </PageHeader>
            <Paper>
                <CreatePharmacyForm onSubmit={handleSubmit} initialValues={preparedValues} />
            </Paper>
        </div>
    )
}

export default EditPharmacyPage;