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
import { usePackagesApi } from "hooks/packages";

import tableConfig from "config/table.config";
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
import { FormattedMessage } from "react-intl";

const PackagesPage = ({ route }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { deletePackage } = usePackagesApi();
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
  } = useTable(tableConfig.packages);

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
    state.packageProfileRedirect(GlobalAppRouter.paths.packages);
    history.push(GlobalAppRouter.paths.packagesEdit + `${selectedRow.id}`);
  };

  const handleOnCancel = () => {
    close();
  };

  const handleAddClick = () => {
    history.push(GlobalAppRouter.paths.packagesCreate);
  };

  const deletePackageConfirmation = () => {
    setPopoverAnchor(null);
    open(
      ConfirmationDialog,
      {
        onConfirm: handleDeletePackage,
        onCancel: handleOnCancel,
        text: "Are you sure you want to delete this package?",
      },
      { title: "Confirmation" }
    );
  };

  const handleDeletePackage = () => {
    deletePackage({ packageId: selectedRow?.id }).then((data) => {
      close();
      if (data?.success) {
        enqueueSnackbar("Package was deleted");
        history.push(GlobalAppRouter.paths.packages);
        refetchData();
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
          editTitle="Edit package"
          onArchive={deletePackageConfirmation}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={
              <FormattedMessage
                id={"admin.package.packages"}
                values={{ count: rowsCount }}
              />
            }
          />
        </PageMetadata>
        <PageActions>
          <SearchInput
            placeholder={`Search package by name`}
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
        emptyMessage={"You have no created any packages yet"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.packages.columns}
        limit={itemsPerPage}
        onCellButtonClick={handleMenuClicked}
        onSortModelChange={onChangeSort}
      />
    </div>
  );
};

export default PackagesPage;
