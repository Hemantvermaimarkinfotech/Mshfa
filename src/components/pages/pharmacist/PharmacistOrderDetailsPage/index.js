import './index.scss';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {useIntl} from "react-intl";

import { useOrder, useOrderAPI } from "hooks/orders";
import { useDialog } from "hooks/common";
import { formatCurrency } from "utils/common";
import { useFile } from "hooks/file";
import { TokenStorage } from "services";
import {
    Breadcrumbs,
    GlobalLoader,
    PageActions,
    PageBody,
    PageHeader,
    PageMetadata,
    PageTitle,
    Paper,
} from "components/layout";
import { PrimaryButton, SecondaryButton, InDeliveryButton } from "components/layout/buttons";
import PrintIcon from "assets/images/print-icon";
import { OrderRejectPopup, Table, OrderPatientInfo } from "components/common";
import { reduceRedundantColumns } from "utils/table";

import tableConfig from "config/table.config";


const PharmacistOrderDetailsPage = ({ route }) => {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const { open, close } = useDialog();
    const { order, orderLoading } = useOrder(id);
    const intl = useIntl()

    const { declineOrder, confirmOrder, rejectOrder } = useOrderAPI();

    const [medicationRows, setMedicationRows] = useState([]);

    const medicationsColumns = reduceRedundantColumns(tableConfig.orderItems.columns, ['qty_edit', 'remove'])

    useEffect(() => {
        if (order && order.items) {
            setMedicationRows(order.items);
        }
    }, [order]);

    const { printFile, previewFile } = useFile();

    const onPrintOrderClick = () => {
        printFile(`pdf/order/${id}/${TokenStorage.getToken()}`, `order${order?.orderNum || ''}.pdf`);
    }

    const confirmRejection = (reason) => {
        rejectOrder({id: order.id, reason})
            .then(data => {
                if (data.success) {
                    enqueueSnackbar('Order was successfully rejected');
                } else {
                    enqueueSnackbar('Error');
                }
            })
            .catch(() => enqueueSnackbar('Error'))
            .finally(close)
    }

    const onRejectOrder = () => {
        open(OrderRejectPopup, { onCancel: close, onConfirm: confirmRejection }, { title: "Reject order", maxWidth: false });
    }

    const onDeclineOrder = () => {
        declineOrder({ id })
            .then((response) => {
                if (response.success) {
                    enqueueSnackbar('Order was successfully declined')
                }
            })
    }

    const onConfirmOrder = () => {
        confirmOrder({ id })
            .then((response) => {
                if (response.success) {
                    enqueueSnackbar('Order was successfully confirmed')
                }
            })
    }

    const handleCellChanged = (action, row, newVal) => {
        switch(action) {
            case 'preview':
                if (row?.prescriptionFile?.file) {
                    window.open(row.prescriptionFile.file, "_blank")
                } else if (row?.prescription?.appointmentId) {
                    previewFile(`pdf/prescription/${row.prescription.appointmentId}/${TokenStorage.getToken()}`, `prescription${order?.orderNum || ''}.pdf`)
                }
                break;
        }
    }

    const getSubtotal = () => {
        if (!medicationRows) return 0;
        return medicationRows.filter(item => !item.delete).reduce((acc, item) => {
            return acc + item.qty * item.price;
        }, 0);
    }

    const getDeliveryPrice = () => getSubtotal() < order?.pharmacy?.minimumOrderPrice || 0
        ? parseInt(order?.pharmacy?.deliveryFee) || 0
        : 0;

    const getTotal = () => getDeliveryPrice() + getSubtotal();

    if (orderLoading) {
        return <GlobalLoader />
    }

    const orderStatus = order?.status?.val;

    return <div className={'page page--blue pharmacist-order-details-page'}>
        <PageHeader>
            <PageMetadata>
                <Breadcrumbs route={route} />
                <PageTitle title={`Order ${order ? '№' + order.orderNum : ''}`} />
            </PageMetadata>
            <PageActions>
                <SecondaryButton text={'Print order'} icon={<PrintIcon />} onClick={onPrintOrderClick} classes={'pull-left'}/>
                {orderStatus === 'Reviewing' && <SecondaryButton text={'Decline'} onClick={onDeclineOrder} />}
                {(orderStatus === 'Reviewing' || orderStatus === 'Confirmed') && <SecondaryButton text={'Reject'} onClick={onRejectOrder} />}
                {orderStatus === 'Reviewing' && <PrimaryButton text={'Confirm'} onClick={onConfirmOrder} />}
            </PageActions>
        </PageHeader>
        <PageBody>
            <Paper className={'pharmacist-order-details-page__sidebar'}>
                <OrderPatientInfo order={order}/>
            </Paper>
            <Paper className={'pharmacist-order-details-page__content'}>
                <Table
                    loading={orderLoading}
                    items={medicationRows}
                    rowCount={medicationRows.length}
                    rowHeight={88}
                    onCellButtonClick={handleCellChanged}
                    emptyMessage={"There are no medicine in order"}
                    columns={medicationsColumns}
                    // getRowId={(row) => row.medicine.title}
                />
                <div className="order-total-block">
                    <div className="order-total-block__row subtotal">
                        <div className="title">{intl.formatMessage({id: 'words.common.subtotal'})}:</div>
                        <div className="value">{formatCurrency(getSubtotal())}</div>
                    </div>
                    <div className="order-total-block__row delivery-price">
                        <div className="title">{intl.formatMessage({id: 'words.common.delivery-price'})}:</div>
                        <div className="value">{formatCurrency(getDeliveryPrice())}</div>
                    </div>
                    <div className="order-total-block__row total">
                        <div className="title">{intl.formatMessage({id: 'words.common.total'})}:</div>
                        <div className="value">{formatCurrency(getTotal())}</div>
                    </div>
                </div>
            </Paper>
        </PageBody>
    </div>

}

export default PharmacistOrderDetailsPage;
