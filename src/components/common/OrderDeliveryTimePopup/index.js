import "./index.scss";
import React, { useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment";
import { formatISOtoHumanReadable, READABLE_DATE_FORMAT } from "utils/date";
import { PrimaryButton, NeutralButton } from "components/layout/buttons";
import { useConfig } from "hooks/config";
import { DateInput, SelectInput } from "components/forms";

const OrderDeliveryTimePopup = ({ onConfirm, onCancel, order }) => {
  const labTestAvailableSlots = useConfig("labTestAvailableSlots");
  const intl = useIntl();

  const [orderDate, setOrderDate] = useState("");
  const [orderTime, setOrderTime] = useState("");

  const getIndex = labTestAvailableSlots.findIndex((x) => x?.date == orderDate);
  const getAvailableTimes = labTestAvailableSlots[getIndex]?.availableTimes;
  
  const daysEnabled = labTestAvailableSlots.map(y => y.date)
  const availableTimeSlots = getAvailableTimes?.map((v) => ({ key: v, val: v }));

  const timeSlots = useMemo(() => {
    if (moment().startOf("day").format("YYYY-MM-DD") === orderDate) {
      const hours = moment().hours();

      return availableTimeSlots?.map((slot) => {
        if (!isNaN(slot.key) && slot.key <= hours) slot.disabled = true;
        return slot;
      });
    }
    return availableTimeSlots;
  }, [orderDate]);
 
  useEffect(() => {
    if (order) {
      setOrderDate(formatISOtoHumanReadable(order.deliveryDate, "YYYY-MM-DD"));
      setOrderTime(order.deliveryTime);
    }
  }, [order]);

  const handleConfirm = () => {
    onConfirm(orderDate, orderTime);
  };

  const confirmIsEnabled = () => {
    return orderDate && orderTime;
  };

  const onDateChanged = (event) => {
    setOrderTime("");
    setOrderDate(event.target.value);
  };
 
  return (
    <div className="delivery-order-popup">
      <div className="delivery-order-popup__content">
        <div className="timeslot-select">
          <DateInput
            label={intl.formatMessage({ id: "words.common.date" })}
            value={orderDate}
            onChange={onDateChanged}
            dateFormat={READABLE_DATE_FORMAT}
            daysEnabled={daysEnabled}
          />
          <SelectInput
            label={intl.formatMessage({ id: "words.common.time" })}
            value={orderTime}
            options={timeSlots}
            onChange={(event) => setOrderTime(event.target.value)}
          />
        </div>
      </div>
      <div className="delivery-order-popup__buttons">
        <NeutralButton
          text={<FormattedMessage id={"words.common.cancel"} />}
          onClick={onCancel}
        />
        <PrimaryButton
          text="Save"
          disabled={!confirmIsEnabled()}
          onClick={() => handleConfirm()}
        />
      </div>
    </div>
  );
};

export default OrderDeliveryTimePopup;
