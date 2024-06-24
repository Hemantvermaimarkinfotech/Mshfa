import './index.scss';

import React from "react";
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Block, CheckCircleOutline, Edit, ExpandMore } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { TextFormatter } from "services";
import { GlobalAppRouter } from "routes";



import {
    PageHeader,
    PageActions,
    PageMetadata,
    Breadcrumbs,
    PageTitle,
    GlobalLoader,
    GlobalMessage,
    Tabs,
    Paper, PageBody,
} from "components/layout";
import { PrimaryButton, SecondaryButton } from 'components/layout/buttons';
import { usePharmacy, usePharmacyAPI } from "hooks/pharmacy";
import AdminPharmacyPharmacists from "./AdminPharmacyPharmacists";
import AdminPharmacyMedications from "./AdminPharmacyMedications";
import AdminPharmacyOrders from "./AdminPharmacyOrders";
import { PharmacyInfo } from "components/common";

const PharmacyProfilePage = ({ route }) => {

    const history = useHistory();

    const { id, tabName } = useParams();

    const { pharmacy, pharmacyLoading, pharmacyError, refetchPharmacy } = usePharmacy(id);
    const { togglePharmacyStatus, deletePharmacy } = usePharmacyAPI();
    const { enqueueSnackbar } = useSnackbar();

    const getActiveTab = () => {
        switch (tabName) {
            case 'orders':
                return 2;
            default:
                return 0;
        }
    }
    const handleEditPharmacy = () => {
        history.push(`${GlobalAppRouter.paths.pharmaciesEdit}${pharmacy.id}`)
    }

    const changePharmacyStatus = () => {
        togglePharmacyStatus(pharmacy.id)
          .then(response => {
              refetchPharmacy();
              if (response.success) {
                  enqueueSnackbar(<FormattedMessage
                      id={response.isBlocked ? "snackbar.pharmacy-blocked" : "snackbar.pharmacy-activated"}
                  />);
              }
          })
    }

    const formatPhoneNumbers = (numbers) => {
        if (!numbers || (Array.isArray(numbers) && numbers.length === 0)) return <FormattedMessage id="fields.values.na"/>;
        return numbers.map((number, key) => <div key={key} className="phone-number">
            {number.phone}
            {key === 0 && <span className="phone-number-primary">(<FormattedMessage id="fields.suffixes.primary"/>)</span>}
        </div>)
    };

    if (pharmacyLoading) {
        return <GlobalLoader />
    }

    if (pharmacyError && !pharmacy) {
        return <GlobalMessage message={<FormattedMessage
            id="admin.errors.pharmacy.pharmacy-not-found"
            values={{id}}
        />} />
    }

    return (
        <div className={'page page--blue pharmacy-profile-page'}>
            <PageHeader>
                <PageMetadata>
                    <Breadcrumbs route={route} />
                    <PageTitle title={route.meta?.title} />
                </PageMetadata>
                <PageActions>
                    {
                        pharmacy.isBlocked ?
                            <SecondaryButton text={'Activate'} icon={<CheckCircleOutline />} onClick={changePharmacyStatus} /> :
                            <SecondaryButton text={'Block'} icon={<Block />} onClick={changePharmacyStatus} />

                    }
                    <PrimaryButton text={<FormattedMessage id={'words.common.edit'}/>} icon={<Edit />} onClick={handleEditPharmacy} />
                </PageActions>
            </PageHeader>
            <PageBody>
                <Paper className={'pharmacy-profile-page__sidebar'}>
                    <PharmacyInfo pharmacy={pharmacy}/>
                </Paper>
                <Paper className={'pharmacy-profile-page__content'}>
                    <Tabs
                        classes = {"pharmacy-profile-page__tabs"}
                        initialValue={getActiveTab()}
                        items={['Pharmacists', 'Medications', 'Orders']}
                    >
                        <div className="profile-info profile-info--pharmacists">
                            <AdminPharmacyPharmacists pharmacyId={pharmacy.id} pharmacists={pharmacy.pharmacists}/>
                        </div>
                        <div className="profile-info profile-info--medications">
                            <AdminPharmacyMedications pharmacyId={pharmacy.id}/>
                        </div>
                        <div className="profile-info profile-info--orders">
                            <AdminPharmacyOrders pharmacyId={pharmacy.id}/>
                        </div>
                    </Tabs>
                </Paper>
            </PageBody>
        </div>
    )
}

export default PharmacyProfilePage;
