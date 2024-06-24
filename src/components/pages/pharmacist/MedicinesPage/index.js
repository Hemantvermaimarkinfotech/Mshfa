import './index.scss';

import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from 'uuid';

import { useTable } from "hooks/table";
import { useConfig } from "hooks/config";

import { PageHeader, PageActions, PageMetadata, PageTitle } from "components/layout";
import { SearchInput, SelectInput, AddMedicineForm, BulkUploadForm } from "components/forms";
import { Popover, MedicineActionsDropdown, Table, ConfirmationDialog } from "components/common";
import { PrimaryButton, SecondaryButton } from "components/layout/buttons";
import { useDialog } from "hooks/common";
import { useMedicineAPI } from "hooks/medicine";

import tableConfig from 'config/table.config';
import UploadIcon from "assets/images/upload-icon";
import { useUser } from "hooks/user";

const MedicinesPage = ({ route }) => {

    const EXTERNAL_ID = uuidv4();

    const { user } = useUser();
    const { medicineStatuses } = useConfig();
    const { enqueueSnackbar } = useSnackbar();

    const [selectedRow, setSelectedRow] = useState(null);
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const { open, close } = useDialog();

    const { deleteMedicine, bulkUpload, bulkArchiveUpload } = useMedicineAPI();

    const {
        rows,
        dataIsLoading,
        itemsPerPage,
        currentPage,
        rowsCount,
        onPageChange,
        getParam,
        setParam,
        setSearch,
    } = useTable(tableConfig.medicines);
    console.log('dataaaaaaaaaaaaaaaaaaaaa>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',rows)
    const deleteMedicineConfirmation = () => {
        setPopoverAnchor(null);
        open(ConfirmationDialog, { onConfirm: handleDeleteMedicine, onCancel: close, text: "Are you sure you want to delete the medicine?" }, { title: 'Confirmation' });
    }

    const handleDeleteMedicine = () => {
        deleteMedicine(selectedRow.id)
            .then(data => {
                close();
                handleClosePopover();
                if (data?.success) {
                    enqueueSnackbar('Medicine was deleted');
                }
            });
    }

    const handleChangeStatusSearch = (event) => {
        if (event.target.value) {
            setParam('status', event.target.value);
        } else {
            setParam('status', null);
        }
    }

    const getMedicineStatusFilter = () => {
        const status = getParam("status");
        if (status && status.length) return status[0];
        return '';
    }

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

    const handleUploadBulk = (files) => {

        if (files.zip) {
            bulkArchiveUpload({ file: files.zip, pharmacyId: user?.pharmacyId })
                .then(response => {
                    if (response.success) {
                        enqueueSnackbar('Files successfully uploaded');
                    } else {
                        if (response.errors?.[0]) {
                            enqueueSnackbar(response.errors[0]);
                        } else {
                            enqueueSnackbar('Sorry, something went wrong');
                        }

                    }
                })
                .catch(() => enqueueSnackbar('Sorry, something went wrong'))
        }

        if (files.csv) {
            bulkUpload({ file: files.csv, pharmacyId: user?.pharmacyId })
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

    const handleAddClick = () => {
        open(AddMedicineForm, { initialValues: { pharmacyId: user?.pharmacyId, externalId: EXTERNAL_ID.substring(0, 15)}, onAddMedicine: close, onCancel: close }, { title: 'Add new medicine' });
    }

    const handleEditClick = () => {
        handleClosePopover();
        const { id, status, picture, descriptionNew, prescriptionRequiredNew, priceNew, titleNew, __typename, ...medicine } = selectedRow;
        open(AddMedicineForm, { initialValues: { ...medicine, prescriptionRequiredNew, preview: picture, medicineId: id, externalId: EXTERNAL_ID.substring(0, 15) }, onAddMedicine: close, onCancel: close }, { title: 'Edit medicine' });
    }

    const openUploadPopup = () => {
        open(BulkUploadForm, { onSubmit: handleUploadBulk, onCancel: close }, { title: 'Bulk upload' });
    }

    return (
        <div className={'page page--with-table medicines-page'}>
            <Popover
                open={Boolean(popoverAnchor)}
                anchor={popoverAnchor}
                onClose={handleClosePopover}
            >
                <MedicineActionsDropdown
                    onEdit={handleEditClick}
                    onDelete={deleteMedicineConfirmation}
                />
            </Popover>
            <PageHeader>
                <PageMetadata>
                    <PageTitle title={route.meta.title} caption={'341 medicines'} />
                </PageMetadata>
                <PageActions>
                    <SearchInput placeholder={`Search medicine by Order ID, Name or Phone number`} onChange={setSearch} />
                    <SelectInput size="small" label={"Filter by statuses"} value={getMedicineStatusFilter()} onChange={handleChangeStatusSearch} options={medicineStatuses} />
                    <SecondaryButton icon={<UploadIcon/>} className="pharmacists-page__button" onClick={openUploadPopup} />
                    <PrimaryButton text={'Add new medicine'} onClick={handleAddClick} />
                </PageActions>
            </PageHeader>
            <Table
                limit={itemsPerPage}
                page={currentPage}
                loading={dataIsLoading}
                emptyMessage={'You have no medicines yet'}
                columns={tableConfig.medicines.columns}
                onPageChange={onPageChange}
                rowCount={rowsCount}
                items={rows}
                paginationMode={tableConfig.paginationModes.SERVER}
                onCellButtonClick={handleMenuClicked}
            />
        </div>
    )
}

export default MedicinesPage;