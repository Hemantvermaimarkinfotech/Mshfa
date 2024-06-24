import "./index.scss";

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import state from "apollo/state";
import { Popover, Table } from "components/common";
import { SearchInput } from "components/forms";
import { GlobalAppRouter } from "routes";
import {
  PageTitle,
  PageHeader,
  PageMetadata,
  PageActions,
  GlobalError,
} from "components/layout";
import { useClinicsAPI } from "hooks/clinics";

import tableConfig from "config/table.config";
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
import { FormattedMessage } from "react-intl";

const ClinicsPage = ({ route }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { deleteClinic } = useClinicsAPI();
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
    onChangeSort,
    refetchData,
  } = useTable(tableConfig.clinics);
 
  useEffect(() => {
   refetchData();
  }, []);

  const handleOpenPopover = (anchor) => {
    setPopoverAnchor(anchor);
  };

  const handleClosePopover = () => {
    setSelectedRow(null);
    setPopoverAnchor(null);
  };

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row);
    handleOpenPopover(ref.current);
  };

  const handleEditClick = () => {
    state.clinicProfileRedirect(GlobalAppRouter.paths.clinics);
    history.push(GlobalAppRouter.paths.clinicsEdit + `${selectedRow.id}`);
  };

  const handleOnCancel = () => {
    close();
  };

  const handleAddClick = () => {
    history.push(GlobalAppRouter.paths.clinicsCreate);
  };

  const deleteClinicConfirmation = () => {
    setPopoverAnchor(null);
    open(
      ConfirmationDialog,
      {
        onConfirm: handleDeleteClinic,
        onCancel: handleOnCancel,
        text: "Are you sure you want to delete the clinic?",
      },
      { title: "Confirmation" }
    );
  };
 
  const handleDeleteClinic = () => {
    deleteClinic({ id: selectedRow?.id }).then((data) => {
      close();
      if (data?.success) {
        enqueueSnackbar("Clinic was deleted");
        history.push(GlobalAppRouter.paths.clinics);
      }
    });
  };
 

  if (dataError && !rows.length) {
    return <GlobalError />;
  }
 
  return (
    <div className={"page page--with-table doctors-page"}>
      <Popover
        open={Boolean(popoverAnchor)}
        anchor={popoverAnchor}
        onClose={handleClosePopover}
      >
        <ProfileActionsDropdown
          onEdit={handleEditClick}
          editTitle="Edit clinic"
          onArchive={deleteClinicConfirmation}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={
              <FormattedMessage
                id={"admin.clinic.clinics"}
                values={{ count: rowsCount }}
              />
            }
          />
        </PageMetadata>
        <PageActions>
          <SearchInput
            placeholder={`Search clinic by name`}
            onChange={setSearch}
          />
          <PrimaryButton text={"+ Create"} onClick={handleAddClick} />
        </PageActions>
      </PageHeader>
      <Table
        loading={dataIsLoading}
        page={currentPage}
        //onRowClick={handleRowClick}
        onPageChange={onPageChange}
        items={rows}
        rowCount={rowsCount}
        emptyMessage={"You have no clinics yet"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.clinics.columns}
        limit={itemsPerPage}
        onCellButtonClick={handleMenuClicked}
        onSortModelChange={onChangeSort}
      />
    </div>
  );
};

export default ClinicsPage;
