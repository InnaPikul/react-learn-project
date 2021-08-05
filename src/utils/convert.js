import dayjs from "dayjs";

export const convertPercentToHours = (value) => {
  const hourInPercent = 100 / 24; //value in % of one hour
  let result = value / hourInPercent;
  let resultInHours = Math.round(value / hourInPercent);
  let resultInMinutes = Math.round((result - resultInHours) * 60);
  let convertedValue = [resultInHours, resultInMinutes];
  return convertedValue;
};

export const getHoursDiff = (param1, param2) => {
  const [resultInHoursParam1, resultInMinutesParam1] = convertPercentToHours(param1);
  const [resultInHoursParam2, resultInMinutesParam2] = convertPercentToHours(param2);

  let date1 = dayjs().hour(resultInHoursParam1).minute(resultInMinutesParam1);
  let date2 = dayjs().hour(resultInHoursParam2).minute(resultInMinutesParam2);

  let diffInHours = date1.diff(date2, 'hour');
  let diffInMinutes = (date1.diff(date2, 'minute') % 60);

  if (diffInHours > 0) {
    return `${diffInHours}h ${diffInMinutes}min`;
  } else {
    return `${diffInMinutes}min`;
  }
}
