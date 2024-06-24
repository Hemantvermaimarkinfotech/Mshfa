import './index.scss';

import React, { useRef, useState } from "react";

import { GlobalAppRouter } from "routes";
import { useHistory } from "react-router-dom";
import tableConfig from 'config/table.config';

import { useTable } from "hooks/table"
import { usePatientAPI } from "hooks/patients";
import { useSnackbar } from "notistack";
import { useDialog } from "hooks/common";

import UserActionsDropdown from "components/common/UserActionsDropdown"
import { PageTitle, PageHeader, PageMetadata, PageActions, GlobalError } from "components/layout";
import { ConfirmationDialog, Popover, Table } from "components/common";
import { SearchInput } from "components/forms";


const PatientsPage = ({ route }) => {
  const ref = useRef();
  const history = useHistory();
  const { open, close } = useDialog();
  const [selectedRow, setSelectedRow] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const {
    rows,
    dataIsLoading,
    dataError,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setSearch,
    onChangeSort
  } = useTable(tableConfig.patients);

  const { togglePatientStatus, deletePatient } = usePatientAPI();

  const handleOpenPopover = (anchor) => {
    setPopoverAnchor(anchor);
  };

  const handleClosePopover = () => {
    setSelectedRow(null)
    setPopoverAnchor(null);
  };

  const handleRowClick = (params) => {
    history.push(GlobalAppRouter.paths.patientsProfile + `${params.row.id}`)
  }

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row)
    handleOpenPopover(ref.current);
  }

  if (dataError) {
    if (!rows) {
      return <GlobalError />
    }
  }

  const handleOnCancel = () => {
    close();
  }

  const deletePatientConfirmation = () => {
    setPopoverAnchor(null);
    open(ConfirmationDialog, { onConfirm: onArchive, onCancel: handleOnCancel, text: "Are you sure you want to archive the patient?" }, { title: 'Confirmation' });
  }

  const onActiveToggleConfirmation = () => {
    if (!selectedRow.isBlocked) {
      setPopoverAnchor(null);
      open(ConfirmationDialog, { onConfirm: onActiveToggle, onCancel: handleOnCancel, text: `Are you sure you want to block the patient?` }, { title: 'Confirmation' });
    } else {
      onActiveToggle();
    }
  }

  const onActiveToggle = () => {
    togglePatientStatus({ id: selectedRow.id, action: "block" })
      .then(response => {
        close();
        handleClosePopover();
        if (response.success) {
          enqueueSnackbar(response.isBlocked ? 'Patient was blocked' : 'Patient was activated');
        }
      })
  };

  const onArchive = () => {
      deletePatient({ id: selectedRow.id, action: "archive" })
      .then(response => {
        close();
        handleClosePopover();
        if (response.success) {
          enqueueSnackbar('Patient archived');
        }
      })
  }

  return (
    <div className='page page--with-table patients-page'>
      <Popover
        open={Boolean(popoverAnchor)}
        anchor={popoverAnchor}
        onClose={handleClosePopover}
      >
        <UserActionsDropdown onActiveToggle={onActiveToggleConfirmation} onArchive={deletePatientConfirmation} isBlocked={selectedRow && selectedRow.isBlocked}/>
      </Popover>
      <div ref = {ref} />
      <PageHeader>
        <PageMetadata>
          <PageTitle title={route.meta.title} caption={`${rowsCount} patients`} />
        </PageMetadata>
        <PageActions>
          <SearchInput placeholder={`Search patient by Name, UHI, Email or Phone number`} onChange={setSearch} />
        </PageActions>
      </PageHeader>
      <Table
        onSortModelChange={onChangeSort}
        loading={dataIsLoading}
        page={currentPage}
        onRowClick={handleRowClick}
        onCellButtonClick={handleMenuClicked}
        onPageChange={onPageChange}
        items={rows}
        rowCount={rowsCount}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.patients.columns}
        limit={itemsPerPage}
      />
    </div>
  )
}

export default PatientsPage;