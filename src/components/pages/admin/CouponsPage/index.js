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
import { useCouponsAPI } from "hooks/coupons";

import tableConfig from "config/table.config";
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
import { FormattedMessage } from "react-intl";

const CouponsPage = ({ route }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { toggleStatus } = useCouponsAPI();
  const [getId, setGetId] = useState(null);
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
  } = useTable(tableConfig.coupons);

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
    setGetId(row);
    handleOpenPopover(ref.current);
  };

  const handleEditClick = () => {
    state.couponProfileRedirect(GlobalAppRouter.paths.coupons);
    history.push(GlobalAppRouter.paths.couponsEdit + `${selectedRow.id}`);
  };

  const handleOnCancel = () => {
    close();
  };

  const handleAddCoupon = () => {
    history.push(GlobalAppRouter.paths.couponsCreate);
  };

  const handleDeleteCoupon = () => {
    toggleStatus({
      promoCodeId: getId?.id,
      isActive: false,
    }).then((data) => {
      close();
      handleClosePopover();
      if (data?.success) {
        enqueueSnackbar("Coupon was deleted");
      }
    });
  };

  const deleteCouponConfirmation = () => {
    setPopoverAnchor(null);
    open(
      ConfirmationDialog,
      {
        onConfirm: handleDeleteCoupon,
        onCancel: handleOnCancel,
        text: "Are you sure you want to delete the coupon?",
      },
      { title: "Confirmation" }
    );
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
          editTitle="Edit coupon"
          onArchive={deleteCouponConfirmation}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle
            title={route.meta.title}
            caption={
              <FormattedMessage
                id={"admin.coupon.coupons"}
                values={{ count: rowsCount }}
              />
            }
          />
        </PageMetadata>
        <PageActions>
          <SearchInput
            placeholder={`Search coupon by Name or ID`}
            onChange={setSearch}
          />
          <PrimaryButton text={"+ Create"} onClick={handleAddCoupon} />
        </PageActions>
      </PageHeader>
      <Table
        loading={dataIsLoading}
        page={currentPage}
        //onRowClick={handleRowClick}
        onPageChange={onPageChange}
        items={rows}
        rowCount={rowsCount}
        emptyMessage={"You have no created any coupons yet"}
        paginationMode={tableConfig.paginationModes.SERVER}
        columns={tableConfig.coupons.columns}
        limit={itemsPerPage}
        onCellButtonClick={handleMenuClicked}
        onSortModelChange={onChangeSort}
      />
    </div>
  );
};

export default CouponsPage;
