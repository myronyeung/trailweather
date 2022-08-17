const DAY_NAME = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTH_NAME = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMeridiem = (hour: number) => {
  return hour < 12 ? "AM" : "PM";
};

const getDateFromString = (date: string): string => {
  const dateObj = new Date(date);
  return `${DAY_NAME[dateObj.getDay()]} ${
    MONTH_NAME[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${dateObj.getHours()}:${String(
    dateObj.getMinutes()
  ).padStart(2, "0")} ${getMeridiem(dateObj.getHours())}`;
};

export default getDateFromString;
