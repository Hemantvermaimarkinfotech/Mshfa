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
import { useAdsAPI } from "hooks/ads";

import tableConfig from "config/table.config";
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
import { FormattedMessage } from "react-intl";

const AdsPage = ({ route }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { deleteAd } = useAdsAPI();
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
  } = useTable(tableConfig.ads);
 
  useEffect(() => {
   refetchData();
   console.log(tableConfig.advertisement);
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
    state.adProfileRedirect(GlobalAppRouter.paths.ads);
    history.push(GlobalAppRouter.paths.adsEdit + `${selectedRow.id}`);
  };

  const handleOnCancel = () => {
    close();
  };

  const handleAddClick = () => {
    history.push(GlobalAppRouter.paths.adsCreate);
  };

  const deleteAdConfirmation = () => {
    setPopoverAnchor(null);
    open(
      ConfirmationDialog,
      {
        onConfirm: handleDeleteAd,
        onCancel: handleOnCancel,
        text: "Are you sure you want to delete the ad?",
      },
      { title: "Confirmation" }
    );
  };
 
  const handleDeleteAd = () => {
    deleteAd({ id: selectedRow?.id }).then((data) => {
      console.log('data ad delete:', data);
      console.log(GlobalAppRouter.paths.ads);
      close();
      if (data?.success) {
        enqueueSnackbar("Ad was deleted");
        history.push(GlobalAppRouter.paths.ads);
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
          editTitle="Edit ad"
          onArchive={deleteAdConfirmation}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={
              <FormattedMessage
                id={"admin.ad.ads"}
                values={{ count: rowsCount }}
              />
            }
          />
        </PageMetadata>
        <PageActions>
          <SearchInput
            placeholder={`Search ad by Name`}
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
        emptyMessage={"You have no created any ads yet"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.ads.columns}
        limit={itemsPerPage}
        onCellButtonClick={handleMenuClicked}
        onSortModelChange={onChangeSort}
      />
    </div>
  );
};

export default AdsPage;
