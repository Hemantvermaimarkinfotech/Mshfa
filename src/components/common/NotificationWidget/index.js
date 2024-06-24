import React, { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useAppointmentsEvents } from "hooks/appointments";
import { useLabTestOrderPaid } from "hooks/orders";
import { useUser } from "hooks/user";

const NotificationWidget = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useUser();
  const { notification, loading } = useAppointmentsEvents(
    { room: user.id },
    { skip: !user.id }
  );

  const { notification: labTestNotification, loading: labTestLoading } =
    useLabTestOrderPaid({ room: user.id });

  function play() {
    var audio = new Audio("/appointment_starting.mp3");
    audio.play();
  }
  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification);
      play();
    } else if (labTestNotification) {
      enqueueSnackbar(labTestNotification);
      play();
    }
  }, [notification, loading, labTestNotification, labTestLoading]);

  return <div />;
};

export default NotificationWidget;
