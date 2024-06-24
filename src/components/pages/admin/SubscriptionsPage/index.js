import "./index.scss";

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import state from "apollo/state";
import { Popover, Table } from "components/common";
import { SearchInput, SelectInput } from "components/forms";
import { GlobalAppRouter } from "routes";
import {
  PageTitle,
  PageHeader,
  PageMetadata,
  PageActions,
  GlobalError,
} from "components/layout";
import { useSubscriptionsApi } from "hooks/subscriptions";
import { getTranslatedStatusId } from "utils/text";

import tableConfig from "config/table.config";
import { useConfig } from "hooks/config";
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
import { FormattedMessage, useIntl } from "react-intl";

const SubscriptionsPage = ({ route }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  
  const statusArray = [
    { key: 0, val: "Draft" },
    { key: 1, val: "Cancelled" },
    { key: 2, val: "Payment processing" },
    { key: 3, val: "Paid" },
  ];
  //  const { subscriptionDelete } = useSubscriptionsApi();
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
    setParam,
    rowsCount,
    getParam,
    setSearch,
    onChangeSort,
    refetchData,
  } = useTable(tableConfig.subscriptions);

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
    state.adProfileRedirect(GlobalAppRouter.paths.subscriptions);
    history.push(GlobalAppRouter.paths.adsEdit + `${selectedRow.id}`);
  };

  const handleOnCancel = () => {
    close();
  };

  const handleAddClick = () => {
    history.push(GlobalAppRouter.paths.adsCreate);
  };

  // const subscriptionDeleteConfirmation = () => {
  //   setPopoverAnchor(null);
  //   open(
  //     ConfirmationDialog,
  //     {
  //       onConfirm: handleDeleteSubscription,
  //       onCancel: handleOnCancel,
  //       text: "Are you sure you want to delete the subscription?",
  //     },
  //     { title: "Confirmation" }
  //   );
  // };

  // const handleDeleteSubscription = () => {
  //   subscriptionDelete({ id: selectedRow?.id }).then((data) => {
  //     close();
  //     if (data?.success) {
  //       enqueueSnackbar("Subscription was deleted");
  //       history.push(GlobalAppRouter.paths.subscriptions);
  //     }
  //   });
  // };

  const handleRowClick = (params) => {
    history.push(
      GlobalAppRouter.paths.subscriptionProfile + `${params.row.id}`
    );
  };

  const handleChangeStatusSearch = (event) => {
    setParam("status", event.target.value);
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
          //onArchive={subscriptionDeleteConfirmation}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={
              <FormattedMessage
                id={"admin.subscription.subscriptions"}
                values={{ count: rowsCount }}
              />
            }
          />
        </PageMetadata>
        <PageActions>
          <SearchInput
            placeholder={`Search subscription by name`}
            onChange={setSearch}
          />
        <SelectInput
            multiple
            size="small"
            label={"Filter by statuses"}
            value={getParam("status") || []}
            onChange={handleChangeStatusSearch}
            options={statusArray?.map((status) => ({
              ...status,
              key: status.key.toString(),
              val: status.val,
            }))}
          /> 
          {/* <PrimaryButton text={"+ Create"} onClick={handleAddClick} />  */}
        </PageActions>
      </PageHeader>
      <Table
        loading={dataIsLoading}
        page={currentPage}
        //onRowClick={handleRowClick}
        onPageChange={onPageChange}
        items={rows}
        rowCount={rowsCount}
        emptyMessage={"You have no created any subscriptions yet"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.subscriptions.columns}
        limit={itemsPerPage}
        onCellButtonClick={handleMenuClicked}
        onSortModelChange={onChangeSort}
      />
    </div>
  );
};

export default SubscriptionsPage;
