import './index.scss';

import React, { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { GlobalAppRouter } from "routes";

import { useSnackbar } from "notistack";
import { useDialog } from "hooks/common";
import tableConfig from "config/table.config";
import { usePharmacistAPI } from "hooks/pharmacists";

import { Popover, SimpleActionsDropdown, Table } from "components/common";
import { PrimaryButton } from "components/layout/buttons";
import PharmacistIcon from "assets/images/pharmacist-icon";
import { AddPharmacistForm } from "components/forms";

const AdminPharmacyPharmacists = ({ pharmacyId, pharmacists = [] }) => {

  const { enqueueSnackbar } = useSnackbar();
  const { deletePharmacist } = usePharmacistAPI()
  const [selectedRow, setSelectedRow] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const { open, close } = useDialog();


  const rowsCount = pharmacists.length;
  const rows = pharmacists;

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


  const onAddPharmacist = (data) => {
    close();
  }

  const onCloseForm = () => {
    close();
  }

  const onAdd = () => {
    open(AddPharmacistForm, { pharmacyId: pharmacyId, initialValues: {pharmacyId}, onAddPharmacist: onAddPharmacist, onCancel: onCloseForm }, { title: 'Create a pharmacist' });
  }

  const onEdit = () => {
    handleClosePopover();
    const { __typename, ...pharmacist } = selectedRow;
    open(AddPharmacistForm, { pharmacyId: pharmacyId, initialValues: { ...pharmacist }, onAddPharmacist: onAddPharmacist, onCancel: onCloseForm }, { title: 'Edit a pharmacist' });
  }

  const onArchive = () => {
    deletePharmacist({ id: selectedRow.id }, pharmacyId)
        .then(response => {
          handleClosePopover();
          if (response.success) {
            enqueueSnackbar('Pharmacist archived');
          }
        })
  }


  return <div className={'pharmacists'}>
    <Popover
        open={Boolean(popoverAnchor)}
        anchor={popoverAnchor}
        onClose={handleClosePopover}
    >
      <SimpleActionsDropdown
          onEdit={onEdit}
          onArchive={onArchive}
      />
    </Popover>
    {rows && rows.length ?
        <Fragment>
          <div className={'pharmacists__header'}>
            <Link to={GlobalAppRouter.paths}>
              <PrimaryButton classes="pharmacists-page__button" text="+ Create" onClick={onAdd}/>
            </Link>
          </div>
          <Table
              emptyMessage={'There are no pharmacists yet'}
              columns={tableConfig.pharmacists.columns}
              rowCount={rowsCount}
              items={rows}
              onCellButtonClick={handleMenuClicked}
          />
        </Fragment>
      :
        <div className="pharmacists--empty-page">
          <div className="icon"><PharmacistIcon/></div>
          <div className="description">
            <FormattedMessage id="pharmacy.pharmacists-not-found.description"/>
          </div>
          <div className="buttons">
            <PrimaryButton classes="pharmacists-page__button" text="+ Create a pharmacist" onClick={onAdd}/>
          </div>
        </div>}
  </div>
}

export default AdminPharmacyPharmacists;