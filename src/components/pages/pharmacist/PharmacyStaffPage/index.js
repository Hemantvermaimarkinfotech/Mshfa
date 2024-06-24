import './index.scss';

import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import state from 'apollo/state';
import { Popover, Table } from "components/common";
import { SearchInput } from "components/forms";
import { GlobalAppRouter } from 'routes';
import { PageTitle, PageHeader, PageMetadata, PageActions, GlobalError } from "components/layout";

import tableConfig from 'config/table.config';
import { useDialog } from "hooks/common";
import { useTable } from "hooks/table";
import { ProfileActionsDropdown, ConfirmationDialog } from "components/common";
import { useDoctorAPI, useDoctorsEvents } from "hooks/doctors";
import { usePharmacistStaffAPI } from "hooks/pharmacyStaff";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "components/layout/buttons";
// import DoctorTypeSelect from "./DoctorTypeSelect";
import {useUser} from "hooks/user";
import {FormattedMessage} from "react-intl";


const PharmacyStaffPage = ({ route }) => {

    const {user} = useUser();
    console.log("user",user)
    useDoctorsEvents({room: user.id})

    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();

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
    onChangeSort
  } = useTable(tableConfig.pharmacyStaff);
  console.log("tableConfig.pharmacyStaff",tableConfig.pharmacyStaff)

  const { deletePharmacyStaff, toggleDoctorsStatus } = usePharmacistStaffAPI();

  const handleOpenPopover = (anchor) => {
    setPopoverAnchor(anchor);
  };

  const handleClosePopover = () => {
    setSelectedRow(null)
    setPopoverAnchor(null);
  };

  const handleMenuClicked = (ref, row) => {
    setSelectedRow(row)
    handleOpenPopover(ref.current);
  }

  // const handleRowClick = (params) => {
  //   history.push(GlobalAppRouter.paths.doctorsProfile + `${params.row.id}`)
  // }

  const handleEditClick = () => {
    state.doctorProfileRedirect(GlobalAppRouter.paths.Pharmacist);
    history.push(GlobalAppRouter.paths.pharmacistStaffEdit + `${selectedRow.id}`)
  }

  const handleOnSelect = (doctorType) => {
      close();
      history.push(GlobalAppRouter.paths.Pharmacist + `/${doctorType}`)
  }

  const handleOnCancel = () => {
      close();
  }

    const handleAddDoctor = () => {
      history.push(GlobalAppRouter.paths.Pharmacist);

    }

    const deleteDoctorConfirmation = () => {
        setPopoverAnchor(null);
        open(ConfirmationDialog, { onConfirm: handleDeleteDoctor, onCancel: handleOnCancel, text: "Are you sure you want to delete the staff? " }, { title: 'Confirmation' });
    }

    const onActiveToggleConfirmation = () => {
        if (!selectedRow.isBlocked) {
            setPopoverAnchor(null);
            open(ConfirmationDialog, { onConfirm: onActiveToggle, onCancel: handleOnCancel, text: `Are you sure you want to block the ${selectedRow.firstName} ${selectedRow.lastName}? (all future appointments of the doctor would be rejected and the doctor would not be available for booking)` }, { title: 'Confirmation' });
        } else {
            onActiveToggle();
        }
    }

    const handleDeleteDoctor = () => {
      deletePharmacyStaff({ id: selectedRow.id })
            .then(data => {
                close();
                handleClosePopover();
                if (data?.success) {
                    enqueueSnackbar('Staff was deleted');
                }
            });
    }

    const onActiveToggle = () => {
        toggleDoctorsStatus({ id: selectedRow.id, action: "block" })
            .then((data) => {
                close();
                handleClosePopover();
                if (data?.success) {
                    enqueueSnackbar(data.isBlocked ? 'Staff was blocked' : 'Doctor was activated');
                }
            });
    }

  if (dataError && !rows.length) {
    return <GlobalError />
  }
  return (
    <div className={'page page--with-table doctors-page'}>
      <Popover
          open={Boolean(popoverAnchor)}
          anchor={popoverAnchor}
          onClose={handleClosePopover}
      >
        <ProfileActionsDropdown
            onEdit={handleEditClick}
            editTitle="Edit doctor"
            onActiveToggle={onActiveToggleConfirmation}
            onArchive={deleteDoctorConfirmation}
            isBlocked={selectedRow && selectedRow.isBlocked}
        />
      </Popover>
      <PageHeader>
        <PageMetadata>
          <PageTitle title={route.meta.title} caption={<FormattedMessage id={'admin.doctor.doctors'} values={{count: rowsCount}}/>} />
        </PageMetadata>
        <PageActions>
          <SearchInput placeholder={`Search Staff by Name, Email or Phone number`} onChange={setSearch} />
          <PrimaryButton text={'+ Create'} onClick={handleAddDoctor}/>
        </PageActions>
      </PageHeader>
      <Table
          loading={dataIsLoading}
          page={currentPage}
          // onRowClick={handleRowClick}
          onPageChange={onPageChange}
          items={rows}
          rowCount={rowsCount}
          emptyMessage={"You have no created any Staff yet"}
          paginationMode={tableConfig.paginationModes.SERVER}
          columns={tableConfig.pharmacyStaff.columns}
          limit={itemsPerPage}
          onCellButtonClick={handleMenuClicked}
          onSortModelChange={onChangeSort}
      />
    </div>
  )
}

export default PharmacyStaffPage;
