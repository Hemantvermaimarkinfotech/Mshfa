import './index.scss';

import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDialog } from "hooks/common";
import { useConfig } from "hooks/config";
import { usePharmacies, useLazyPharmacy } from "hooks/pharmacy";
import { useMedicineAPI } from "hooks/medicine";

import { Table, PharmacyInfo } from "components/common";
import {
    PageTitle,
    PageHeader,
    PageMetadata,
    GlobalError,
    Paper, PageBody
} from "components/layout";

import infoIcon from "assets/images/info.svg";
import tableConfig from 'config/table.config';
import { reduceRedundantColumns } from "utils/table";
import cx from "classnames";

const MedicationsPage = ({ route }) => {

  const { enqueueSnackbar } = useSnackbar();

  const [pharmacyId, setPharmacyId] = useState(null);
  const { open } = useDialog();
  const { medicineStatuses } = useConfig();
  const { approveMedicine, rejectMedicine } = useMedicineAPI();

  const awaitingStatus = medicineStatuses && medicineStatuses[0].key;

  const { pharmacies, pharmaciesLoading, pharmaciesError } = usePharmacies({awaitingConfirmation: true});

  const { pharmacy, getMockPharmacy, pharmacyLoading, pharmacyError } = useLazyPharmacy(pharmacyId);

  useEffect(() => {
    pharmacyId && getMockPharmacy({ variables: { id: pharmacyId } });
  }, [pharmacyId, getMockPharmacy]);

  useEffect(() => {
      pharmacies?.[0]?.id && setPharmacyId(pharmacies[0].id);
  }, [pharmacies[0]?.id, setPharmacyId]);

  const awaitingMedications = pharmacy?.medications?.filter(medication => medication.status.key === awaitingStatus);
  const rowsMedicationsCount = awaitingMedications?.length;

  const handleMedicineAction = (action, row) => {
    action === 'reject' ? handleReject(row) : handleApprove(row);
  }

  const handleReject = (row) => {
    rejectMedicine(row.id)
        .then(response => {
          if (response.success) {
            enqueueSnackbar('The request has been rejected');
          }
        })
  }

  const handleApprove = (row) => {
    approveMedicine(row.id)
        .then(response => {
          if (response.success) {
            enqueueSnackbar('The request has been approved');
          }
        })

  }

  if (pharmacyError || pharmaciesError) {
    if ((!pharmacies || pharmacies === []) && (!pharmacy || pharmacy === [])) {
      return <GlobalError />
    }
  }
  const tableColumns = reduceRedundantColumns(tableConfig.medications.columns, ['popup_actions']);

  const handleRowClick = (pharmacy) => {
    setPharmacyId(pharmacy.id);
  };

  const handleOpenModal = (type) => {
    open(modalPharmacyInfo, null, { title: 'Pharmacy info' });
  }

  const modalPharmacyInfo = () =>
    <div className={'medications-page__modal'}>
      <PharmacyInfo pharmacy={pharmacy} />
    </div>;

    const pharmacyRowClassNames = (row) => cx('pharmacy-row', {
        ['pharmacy-row__selected']: row.id === pharmacyId
    });

  return (
    <div className={'page page--blue medications-page'}>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={`${rowsMedicationsCount} medications`}
          />
        </PageMetadata>
      </PageHeader>
      <PageBody>
        <Paper className={'medications-page__sidebar'}>
            {pharmacies?.length ? pharmacies.map(pharmacy => <div key={pharmacy.id}
                    onClick={() => handleRowClick(pharmacy)}
                    className={pharmacyRowClassNames(pharmacy)}
                >
                    <div className={'pharmacy-row__content'}>
                        <span className={'pharmacy-row__text'}>{pharmacy.title}</span>
                        <span className={'pharmacy-row__label'}>{pharmacy.phones[0]?.phone}</span>
                    </div>
                    <img className={'pharmacy-row__image'} src={infoIcon} alt={'Pharmacy info'} onClick={() => handleOpenModal()} />
                </div>
            ) : <div className={'pharmacy-row'}
            >
                No pharmacies
            </div>}
        </Paper>
        <Paper className={'medications-page__content'}>
          <Table
            loading={pharmacyLoading}
            items={awaitingMedications}
            rowCount={rowsMedicationsCount}
            emptyMessage={"No medications"}
            onCellButtonClick={handleMedicineAction}
            columns={tableColumns}
          />
        </Paper>
      </PageBody>
    </div>
  )
}

export default MedicationsPage;