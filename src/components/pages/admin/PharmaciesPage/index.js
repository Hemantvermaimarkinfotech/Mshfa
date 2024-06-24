import './index.scss';

import React, { useRef, useState } from "react";
import { GlobalAppRouter } from "routes";
import { Link, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { PageTitle, PageHeader, PageMetadata, PageActions } from "components/layout";
import { Popover, Table } from "components/common";
import { SearchInput } from "components/forms";
import tableConfig from 'config/table.config';
import { useTable } from "hooks/table";
import PharmacyActionsDropdown from "components/common/ProfileActionsDropdown";
import { usePharmacyAPI } from "hooks/pharmacy";

const PharmaciesPage = ({ route }) => {

  const ref = useRef();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  const [selectedRow, setSelectedRow] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const {
    rows,
    dataIsLoading,
    dataError,
    itemsPerPage,
    currentPage,
    onPageChange,
    rowsCount,
    setSearch,
  } = useTable(tableConfig.pharmacies);

  const { togglePharmacyStatus, deletePharmacy } = usePharmacyAPI();

  const handleOpenPopover = (anchor) => {
    setPopoverAnchor(anchor);
  };

  const handleClosePopover = () => {
    setSelectedRow(null)
    setPopoverAnchor(null);
  };

  const onActiveToggle = () => {
    togglePharmacyStatus(selectedRow.id)
        .then(response => {
          handleClosePopover();
          if (response.success) {
            enqueueSnackbar(response.isBlocked ? 'Pharmacy was blocked' : 'Pharmacy was activated');
          }
        })
  };

  const onArchive = () => {
      deletePharmacy(selectedRow.id)
        .then(response => {
          handleClosePopover();
          if (response.success) {
            enqueueSnackbar('Pharmacy archived');
          }
        })
  }

  const handleRowClick = (params) => {
    history.push(GlobalAppRouter.paths.pharmaciesProfile + `${params.row.id}`)
  }

    const handleEditClick = (params) => {
        history.push(GlobalAppRouter.paths.pharmaciesEdit + `${selectedRow.id}`)
    }

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row)
    handleOpenPopover(ref.current);
  }

  return (
    <div className={'page page--with-table pharmacies-page'}>
      <Popover
          open={Boolean(popoverAnchor)}
          anchor={popoverAnchor}
          onClose={handleClosePopover}
      >
        <PharmacyActionsDropdown
            onEdit={handleEditClick}
            onActiveToggle={onActiveToggle}
            onArchive={onArchive}
            isBlocked={selectedRow && selectedRow.isBlocked}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle title={route.meta.title} caption={`${rowsCount} pharmacies`} />
        </PageMetadata>
        <PageActions>
          <SearchInput placeholder={`Search Pharmacy by Name`} onChange={setSearch} />
          <Link to={GlobalAppRouter.paths.pharmaciesCreate}>
            <button className="pharmacies-page__button">+ Create</button>
          </Link>
        </PageActions>
      </PageHeader>
      <Table
          loading={dataIsLoading}
          page={currentPage}
          onRowClick={handleRowClick}
          onCellButtonClick={handleMenuClicked}
          onPageChange={onPageChange}
          items={rows}
          rowCount={rowsCount}
          paginationMode={tableConfig.paginationModes.SERVER}
          columns={tableConfig.pharmacies.columns}
          limit={itemsPerPage}
      />
    </div>
  )
}

export default PharmaciesPage;