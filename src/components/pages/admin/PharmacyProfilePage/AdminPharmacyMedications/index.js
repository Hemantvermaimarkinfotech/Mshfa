import './index.scss';

import React, { useState } from "react";
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import tableConfig from "config/table.config";
import { useTable } from "hooks/table";
import { useDialog } from "hooks/common";
import { useMedicineAPI } from "hooks/medicine";

import { ConfirmationDialog, Popover, Table } from "components/common";

import { SelectInput, SearchInput, BulkUploadForm } from "components/forms";

import { reduceRedundantColumns } from "utils/table";
import { useConfig } from "hooks/config";
import { PrimaryButton, SecondaryButton } from "components/layout/buttons";
import UploadIcon from "assets/images/upload-icon";
import MedicineIcon from "assets/images/medicine-icon";
import { MedicationActionsDropdown } from "components/common";
import { useSnackbar } from "notistack";
import { AddMedicineForm } from "components/forms";
import { PageActions } from "components/layout";

const AdminPharmacyMedications = ({ pharmacyId }) => {

  const EXTERNAL_ID = uuidv4();

  const { enqueueSnackbar } = useSnackbar();
  const { medicineStatuses } = useConfig();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const { open, close } = useDialog();

  const {
    rows,
    dataIsLoading,
    dataError,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setSearch,
    getParam,
    setParam,
    refetchData
  } = useTable(tableConfig.medications, { pharmacy: pharmacyId});

  const { approveMedicine, rejectMedicine, deleteMedicine, bulkUpload, bulkArchiveUpload } = useMedicineAPI();

  const tableColumns = reduceRedundantColumns(tableConfig.medications.columns, ['actions']);

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row)
    handleOpenPopover(ref.current);
  }

  const handleOpenPopover = (anchor) => {
    setPopoverAnchor(anchor);
  };

  const handleClosePopover = () => {
    setSelectedRow(null)
    setPopoverAnchor(null);
  };

  const onApprove = () => {
    approveMedicine(selectedRow.id)
        .then(response => {
          handleClosePopover();
          if (response.success) {
            enqueueSnackbar('Medicine was approved');
          }
        })
  };

  const onReject = () => {
    rejectMedicine(selectedRow.id)
        .then(response => {
          handleClosePopover();
          if (response.success) {
            enqueueSnackbar('Medicine was rejected');
          }
        })
  };

  const deleteMedicineConfirmation = () => {
    setPopoverAnchor(null);
    open(ConfirmationDialog, { onConfirm: onArchive, onCancel: close, text: "Are you sure you want to delete the medicine?" }, { title: 'Confirmation' });
  }


  const onArchive = () => {
    deleteMedicine(selectedRow.id)
        .then(response => {
          close();
          handleClosePopover();
          if (response.success) {
            enqueueSnackbar('Medicine deleted');
          }
        })
  }

  const handleUploadBulk = (files) => {

    if (files.zip) {
      bulkArchiveUpload({ file: files.zip, pharmacyId: pharmacyId })
          .then(response => {
            if (response.success) {
              enqueueSnackbar('Files successfully uploaded');
            } else {
              enqueueSnackbar('Sorry, something went wrong');
            }
          })
          .catch(() => enqueueSnackbar('Sorry, something went wrong'))
    }

    if (files.csv) {
      bulkUpload({ file: files.csv, pharmacyId: pharmacyId })
          .then(response => {
            if (response.success) {
              enqueueSnackbar('Files successfully uploaded');
            } else {
              enqueueSnackbar('Sorry, something went wrong');
            }
          })
          .catch(() => enqueueSnackbar('Sorry, something went wrong'))
    }
    close();

  }

  const onAdd = () => {
    open(AddMedicineForm, { initialValues: {pharmacyId, externalId: EXTERNAL_ID.substring(0, 15) }, onAddMedicine: close, onCancel: close }, { title: 'Add new medicine' });
  }

  const openUploadPopup = () => {
    open(BulkUploadForm, { onSubmit: handleUploadBulk, onCancel: close }, { title: 'Bulk upload' });
  }


  const onEdit = () => {
    handleClosePopover();
    const { id, status, picture, descriptionNew, prescriptionRequiredNew, priceNew, titleNew, __typename, ...medicine } = selectedRow;
    open(AddMedicineForm, { initialValues: { ...medicine, preview: picture, medicineId: id, externalId: EXTERNAL_ID.substring(0, 15) }, onAddMedicine: close, onCancel: close }, { title: 'Edit medicine' });
  }

  const handleChangeStatus = (event) => {
    setParam('status', event.target.value);
  }

  return <div className={'medications'}>
    <Popover
        open={Boolean(popoverAnchor)}
        anchor={popoverAnchor}
        onClose={handleClosePopover}
    >
      <MedicationActionsDropdown
          onApprove={onApprove}
          onReject={onReject}
          onEdit={onEdit}
          onArchive={deleteMedicineConfirmation}
          status={selectedRow && selectedRow.status.key}
      />
    </Popover>
    <div className={'medications__header'}>
      <PageActions>
        <SearchInput placeholder={`Search by Name of medicine`} onChange={setSearch} />
        <SelectInput size="small" label={"Filter by statuses"} value={getParam("status")} onChange={handleChangeStatus} options={medicineStatuses} />
        <SecondaryButton icon={<UploadIcon/>} className="pharmacists-page__button" text="" onClick={openUploadPopup}/>
        <PrimaryButton classes="pharmacists-page__button" text="Add new medicine" onClick={onAdd}/>
      </PageActions>
    </div>
    {rows && rows.length || dataIsLoading ?
        <Table
          limit={itemsPerPage}
          page={currentPage}
          loading={dataIsLoading}
          emptyMessage={'You have no payments yet'}
          columns={tableColumns}
          onPageChange={onPageChange}
          rowCount={rowsCount}
          items={rows}
          paginationMode={tableConfig.paginationModes.SERVER}
          onCellButtonClick={handleMenuClicked}
        /> :
    <div className="medications--empty-page">
      <div className="icon"><MedicineIcon/></div>
      <div className="description">
        <FormattedMessage id="pharmacy.medicine-not-found.description"/>
      </div>
      <div className="buttons">
        <SecondaryButton icon={<UploadIcon/>} className="pharmacists-page__button" text="Bulk upload" onClick={openUploadPopup}/>
        <div className="divider"><FormattedMessage id="words.common.or"/></div>
        <PrimaryButton classes="pharmacists-page__button" text="Add new medicine" onClick={onAdd}/>
      </div>
    </div>}
  </div>
}

export default AdminPharmacyMedications;