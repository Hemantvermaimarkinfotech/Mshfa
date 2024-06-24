import moment from "moment";

export const createRangeArray = (from, to) => {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};

export const createHoursArray = () => {
  const result = [];
  const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];
  const minutes = ["00", "30"];
  const am = "AM";
  const pm = "PM";

  [am, pm].forEach((dayPart) => {
    hours.forEach((hour) => {
      minutes.forEach((minute) => {
        const date = `${
          dayPart === pm && hour === "00" ? "12" : hour
        }:${minute} ${dayPart}`;
        result.push({
          key: moment(date, "h:mm A").format("HH:mm:ss"),
          val: date,
        });
      });
    });
  });

  return result;
};

export const formatCurrency = (cost, defaultValue = "N/A") => {
  return !isNaN(cost) ? `KD ${Number(cost).toFixed(3)}` : defaultValue;
};

export const serviceType = [
  {
    key: "0",
    val: "Scheduled",
  },
  {
    key: "1",
    val: "Walk-in",
  },
  {
    key: "2",
    val: "New appointment",
  },
  {
    key: "3",
    val: "Followup appointment",
  },
  {
    key: "5",
    val: "Lab test",
  },
];

export const serviceTypeArray = [
  {
    key: "0",
    val: "A_0",
  },
  {
    key: "1",
    val: "A_1",
  },
  {
    key: "2",
    val: "A_2",
  },
  {
    key: "3",
    val: "A_3",
  },
  {
    key: "5",
    val: "A_5",
  },
];

export const homeServiceArray = [
  {
    key: "0",
    val: "A_0",
  },
  {
    key: "1",
    val: "A_1",
  },
  {
    key: "2",
    val: "A_2",
  },
  {
    key: "4",
    val: "A_4",
  },
];

export const homeService = [
  {
    key: "0",
    val: "Lab test with home service",
  },
  {
    key: "1",
    val: "Home Service Only",
  },
  {
    key: "2",
    val: "Lab test without home service",
  },
  {
    key: "4",
    val: "Custom lab test",
  },
];

export const discountType = [
  {
    key: "0",
    val: "Fixed Amount",
  },
  {
    key: "1",
    val: "Percentage",
  },
];

export const promoCodeType = [
  {
    key: "0",
    val: "Discount",
  },
  {
    key: "1",
    val: "Cash back",
  },
];

export const createToOpenArray = [
  {
    key: "0",
    val: "Null",
  },
  {
    key: "1",
    val: "Doctor",
  },
  {
    key: "2",
    val: "Walk-In",
  },
  {
    key: "3",
    val: "Lab test",
  },
  {
    key: "4",
    val: "Schedule Appointment ",
  },
];


export const updateToOpenArray = [
  {
    key: "0",
    val: null,
  },
  {
    key: "1",
    val: "A_1",
  },
  {
    key: "2",
    val: "A_2",
  },
  {
    key: "3",
    val: "A_3",
  },
  {
    key: "4",
    val: "A_4",
  },
];