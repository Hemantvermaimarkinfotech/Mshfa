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
import { useAdvertisementAPI } from "hooks/advertisement";

import tableConfig from "config/table.config";
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
import { FormattedMessage } from "react-intl";

const AdvertisementPage = ({ route }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { deleteAdvertisement } = useAdvertisementAPI();
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
  } = useTable(tableConfig.advertisement);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
   refetchData();
   console.log(tableConfig.advertisement);
  }, [deleted]);

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
    state.advertisementProfileRedirect(GlobalAppRouter.paths.advertisement);
    history.push(GlobalAppRouter.paths.advertisementEdit + `${selectedRow.id}`);
    // /ads/edit/QWRUeXBlMjoyNDA=
    // /advertisement/edit/QWR2ZXJ0aXNlVHlwZTI6Nw==
  };

  const handleOnCancel = () => {
    close();
  };

  const handleAddClick = () => {
    history.push(GlobalAppRouter.paths.advertisementCreate);
  };

  const deleteAdConfirmation = () => {
    setPopoverAnchor(null);
    open(
      ConfirmationDialog,
      {
        onConfirm: handleDeleteAd,
        onCancel: handleOnCancel,
        text: "Are you sure you want to delete the advertisement?",
      },
      { title: "Confirmation" }
    );
  };
 
  const handleDeleteAd = () => {
    deleteAdvertisement({ id: selectedRow?.id }).then((data) => {
      console.log('data advertisement delete:', data);
      console.log(GlobalAppRouter.paths.advertisement);
      close();
      if (data?.success) {
        enqueueSnackbar("Advertisement was deleted");
        history.push(GlobalAppRouter.paths.advertisement);
        setDeleted(!deleted);

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
          editTitle="Edit Advertisement"
          onArchive={deleteAdConfirmation}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={
              <FormattedMessage
                id={"admin.ad.advertisement"}
                values={{ count: rowsCount }}
              />
            }
          />
        </PageMetadata>
        <PageActions>
          <SearchInput
            placeholder={`Search advertisement by Name`}
            onChange={setSearch}
          />
          <PrimaryButton text={"+ Create"} onClick={handleAddClick} />
        </PageActions>
      </PageHeader>
      <Table
        loading={dataIsLoading}
        page={currentPage}
        onPageChange={onPageChange}
        items={rows}
        rowCount={rowsCount}
        emptyMessage={"You have no created any advertisement yet"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.advertisement.columns}
        limit={itemsPerPage}
        onCellButtonClick={handleMenuClicked}
        onSortModelChange={onChangeSort}
      />
    </div>
  );
};

export default AdvertisementPage;
