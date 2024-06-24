import "./index.scss";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { omit } from "lodash";
import { Block, Edit } from "@material-ui/icons";

import { useOrder, useOrderAPI } from "hooks/orders";
import tableConfig from "config/table.config";
import { orderStatus } from "config/order";
import { useDialog } from "hooks/common";
import { formatCurrency } from "utils/common";
import { reduceRedundantColumns } from "utils/table";
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
import { PrimaryButton, SecondaryButton } from "components/layout/buttons";
import PrintIcon from "assets/images/print-icon";
import {
  OrderPatientInfo,
  Table,
  AddMedicineInput,
  OrderRejectPopup,
} from "components/common";
import { AddOrderItemForm } from "../../../forms";
import { FormattedMessage } from "react-intl";
import { useConfig } from "hooks/config";

const OrderDetailsPage = ({ route }) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { open, close } = useDialog();
  const { order, orderLoading } = useOrder(id);

  const {
    updateOrder,
    rejectOrder,
    approveOrder,
    completeOrder,
    confirmOrder,
  } = useOrderAPI();

  const [isEditing, setIsEditing] = useState(false);
  const [labTestRows, setLabTestRows] = useState([]);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const visibleMedications = useMemo(
    () => labTestRows.filter((labTest) => !labTest.delete),
    [labTestRows]
  );

  // const selectedMedications = useMemo(() => {
  //     return visibleMedications.map(orderMedication => orderMedication.medicine)
  // }, [visibleMedications])

  const labTestsColumns = useMemo(() => {
    return reduceRedundantColumns(
      tableConfig.orderItems.columns,
      isEditing
        ? ["qty", "homeService"]
        : ["qty_edit", "homeService_edit", "remove"]
    );
  }, [isEditing]);

  useEffect(() => {
    setLabTestRows(order && order.items ? [...order.items] : []);
  }, [isEditing, order]);

  const { printFile, printImage, previewFile } = useFile();

  const onPrintOrderClick = () => generateOrder();

  const handleApproveOrder = () => {
    approveOrder(id).then((response) => {});
  };

  const handleCompleteOrder = () => {
    completeOrder(id).then((response) => {});
  };

  const handleConfirmOrder = () => {
    confirmOrder(id).then((response) => {});
  };

  const generateOrder = () => {
    printFile(
      `pdf/order/${id}/${TokenStorage.getToken()}`,
      `order${order?.orderNum || ""}.pdf`
    );
  };

  const isEditBtnVisible = useMemo(() => {
    if (!order || isEditing) return false;
    return [orderStatus.REVIEWING].indexOf(order.status.key) !== -1;
  }, [order, isEditing]);

  const isRejectBtnVisible = useMemo(() => {
    if (!order || isEditing) return false;
    return (
      [orderStatus.REVIEWING, orderStatus.APPROVING].indexOf(
        order.status.key
      ) !== -1
    );
  }, [order, isEditing]);

  const isCompletedBtnVisible = useMemo(() => {
    if (!order || isEditing) return false;
    return [orderStatus.CONFIRMED].indexOf(order.status.key) !== -1;
  }, [order, isEditing]);

  const isConfirmBtnVisible = useMemo(() => {
    if (!order || isEditing) return false;
    return [orderStatus.REVIEWING].indexOf(order.status.key) !== -1;
  }, [order, isEditing]);

  const isPrintBtnVisible = useMemo(() => {
    if (!order) return false;
    return [orderStatus.DRAFT].indexOf(order.status.key) === -1;
  }, [order]);

  const addOrderItem = (item) => {
    setLabTestRows((labTestRows) => [
      ...labTestRows,
      {
        ...omit(item, "id"),
        relationId: item.id,
        prescriptionRequired: false,
        price: 0,
      },
    ]);
    close();
  };

  const onAdd = () => {
    open(
      AddOrderItemForm,
      {
        initialValues: {},
        onAddOrderItem: addOrderItem,
        onCancel: close,
      },
      { title: "Add new Lab Test" }
    );
  };

  const handleCellChanged = (action, row, newVal) => {
    switch (action) {
      case "edit_qty":
        setLabTestRows((labTestRows) =>
          labTestRows.map((labTest) => {
            if (labTest.id === row.id) {
              if (newVal) {
                return { ...labTest, qty: newVal, delete: false };
              }
            }
            return labTest;
          })
        );
        break;
      case "edit_home-service":
        setLabTestRows((labTestRows) =>
          labTestRows.map((labTest) => {
            if (labTest.id === row.id) {
              return { ...labTest, homeService: newVal };
            }
            return labTest;
          })
        );
        break;
      case "remove":
        setLabTestRows((labTestRows) =>
          labTestRows.map((labTest) => {
            if (labTest.id === row.id) {
              return { ...labTest, delete: true };
            }
            return labTest;
          })
        );
        break;
      case "preview":
        if (row?.prescriptionFile?.file) {
          window.open(row.prescriptionFile.file, "_blank");
        } else if (row?.prescription?.appointmentId) {
          previewFile(
            `pdf/prescription/${
              row.prescription.appointmentId
            }/${TokenStorage.getToken()}`,
            `prescription${order?.orderNum || ""}.pdf`
          );
        }
        break;
      case "print":
        if (row?.prescription?.appointmentId) {
          printFile(
            `pdf/prescription/${
              row.prescription.appointmentId
            }/${TokenStorage.getToken()}`,
            `prescription${order?.orderNum || ""}.pdf`
          );
        } else if (row?.prescriptionFile?.file) {
          printImage(
            row.prescriptionFile.file,
            `prescription_${row.medicine.id}.pdf`
          );
        }
        break;
    }
  };

  const confirmRejection = (reason) => {
    closePopup();
    rejectOrder({ id: order.id, reason })
      .then((data) => {
        if (data.success) {
          enqueueSnackbar("Order rejected");
          setIsEditing(false);
        } else {
          enqueueSnackbar("Error");
        }
      })
      .catch((e) => enqueueSnackbar("Error"));
  };

  const closePopup = () => close();

  const onRejectOrderClick = () => {
    open(
      OrderRejectPopup,
      { onCancel: closePopup, onConfirm: confirmRejection },
      {
        title: "Reject order",
        maxWidth: false,
      }
    );
  };

  const onEditOrderToggle = () => setIsEditing((isEditing) => !isEditing);

  const onSaveOrder = () => {
    const getOrderData = () => {
      return {
        orderId: order.id,
        category: 2,
        items: labTestRows.map((orderItem) => {
          const item = {
            qty: orderItem.qty,
            homeService: orderItem.homeService,
          };
          if (orderItem.relationId) {
            item.relationId = orderItem.relationId;
          }
          if (orderItem.id) {
            item.id = orderItem.id;
          }
          if (orderItem.delete) {
            item.delete = true;
          }
          return item;
        }),
      };
    };
    updateOrder(getOrderData())
      .then((resp) => {
        if (resp.success) {
          enqueueSnackbar("Order saved");
          setIsEditing(false);
        } else {
          enqueueSnackbar("Error");
        }
      })
      .catch((e) => enqueueSnackbar("Error"));
  };

  const getSubtotal = () => {
    if (!labTestRows) return 0;
    return labTestRows
      .filter((item) => !item.delete)
      .reduce((acc, item) => {
        return acc + item.qty * (item.priceAfterDiscount ?? item.price);
      }, 0);
  };
  // const getDeliveryPrice = () => getSubtotal() < order?.pharmacy?.minimumOrderPrice || 0
  //     ? parseInt(order?.pharmacy?.deliveryFee) || 0
  //     : 0;

  const getDeliveryFee = () => parseInt(order?.deliveryFee || 0);

  const getHomeServiceFee = () => parseInt(order.homeServicePrice || 0);
  const homeServiceStatus = labTestRows?.map((item) => item.homeService);
  const discountStatus = labTestRows?.map((item) => item.priceAfterDiscount);

  const getTotal = () =>
    getSubtotal() +
    getDeliveryFee() +
    (homeServiceStatus[0] ? getHomeServiceFee() : 0);

  if (orderLoading) {
    return <GlobalLoader />;
  }
  const isApproving = order.status.key === "7";

  const beforeDiscount = order.beforeDiscount;
  const afterDiscount = order.total;

  const getPromoDiscount = () => {
    if (discountStatus) {
      return beforeDiscount - afterDiscount;
    }
  };

  return (
    <div className={"page page--blue order-details-page"}>
      <PageHeader>
        <PageMetadata>
          <Breadcrumbs route={route} />
          <PageTitle title={`Order ${order ? "№" + order.orderNum : ""}`} />
        </PageMetadata>
        <PageActions>
          {isPrintBtnVisible && (
            <SecondaryButton
              text={"Print order"}
              icon={<PrintIcon />}
              onClick={onPrintOrderClick}
              classes={"pull-left"}
            />
          )}
          {isRejectBtnVisible && (
            <SecondaryButton
              text={"Reject"}
              icon={<Block />}
              onClick={onRejectOrderClick}
              classes={"fill-icon-gray"}
            />
          )}
          {isEditBtnVisible && (
            <PrimaryButton
              text={<FormattedMessage id={"words.common.edit"} />}
              icon={<Edit />}
              onClick={onEditOrderToggle}
            />
          )}
          {isCompletedBtnVisible && (
            <PrimaryButton
              text={"Complete"}
              classes={"complete-button"}
              onClick={handleCompleteOrder}
            />
          )}
          {isConfirmBtnVisible && (
            <PrimaryButton
              text={"Confirm"}
              classes={"confirm-button"}
              onClick={handleConfirmOrder}
            />
          )}
          {isApproving && (
            <PrimaryButton
              text={"Prescription approved"}
              onClick={handleApproveOrder}
            />
          )}
          {isEditing && (
            <SecondaryButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={onEditOrderToggle}
            />
          )}
          {isEditing && <PrimaryButton text={"Add Lab Test"} onClick={onAdd} />}
          {isEditing && <PrimaryButton text={"Save"} onClick={onSaveOrder} />}
        </PageActions>
      </PageHeader>
      <PageBody>
        <Paper className={"order-details-page__sidebar"}>
          <OrderPatientInfo order={order} />
        </Paper>
        <Paper className={"order-details-page__content"}>
          {/*{isEditing && order?.pharmacy?.id &&*/}
          {/*<AddMedicineInput*/}
          {/*    pharmacyId={order.pharmacy.id}*/}
          {/*    selected={selectedMedications}*/}
          {/*    onSelect={onAddMedicine}*/}
          {/*/>*/}
          {/*}*/}
          <Table
            onPageChange={handleChangePage}
            loading={orderLoading}
            items={visibleMedications}
            rowCount={visibleMedications.length || 0}
            limit={6}
            rowHeight={88}
            page={page}
            onCellButtonClick={handleCellChanged}
            emptyMessage={"There are no lab tests in the order"}
            columns={labTestsColumns}
            getRowId={(row) => row.title}
          />
          <div className="order-total-block">
            <div className="order-total-block__row subtotal">
              <div className="title">
                <FormattedMessage id={"words.common.subtotal"} />:
              </div>
              <div className="value">{formatCurrency(getSubtotal())}</div>
            </div>

            {order.homeServicePrice > 0 &&(
              <div className="order-total-block__row subtotal">
                <div className="title">
                  <FormattedMessage id={"words.common.homeservice"} />:
                </div>
                <div className="value">
                  {formatCurrency(getHomeServiceFee())}
                </div>
              </div>
            )}

            {discountStatus && getPromoDiscount() !== 0 && (
              <div className="order-total-block__row subtotal">
                <div className="title">Promo Discount:</div>
                <div className="value">
                  {formatCurrency(getPromoDiscount())}
                </div>
              </div>
            )}

            <div className="order-total-block__row total">
              <div className="title">
                <FormattedMessage id={"words.common.total"} />:
              </div>
              {beforeDiscount === afterDiscount ? (
                <div className={"value"}>{formatCurrency(getTotal())}</div>
              ) : beforeDiscount > afterDiscount && afterDiscount != null ? (
                <div className={"column"}>
                  <div className={"value break-through"}>
                    {formatCurrency(getTotal())}
                  </div>
                  <div className={"cell__discount-total"}>
                    {formatCurrency(getTotal() - getPromoDiscount())}
                  </div>
                </div>
              ) : (
                <div className={"value"}>{formatCurrency(getTotal())}</div>
              )}
            </div>
          </div>
        </Paper>
      </PageBody>
    </div>
  );
};

export default OrderDetailsPage;
