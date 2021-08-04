import dayjs from "dayjs";

export const convertToHours = (fieldValue) => {
  const hourInPercent = 100 / 24; //value in % of one hour
  let result = fieldValue / hourInPercent;
  let resultInHours = Math.floor(fieldValue / hourInPercent);
  let resultInMinutes = Math.floor((result - resultInHours) * 60);

  let newRes = dayjs()
    .hour(resultInHours)
    .minute(resultInMinutes)
    .format("HH:mm");
  return newRes.toString();
};

export const getDiff = (param1, param2) => {
  const hourInPercent = 100 / 24; //value in % of one hour
  let resultParam1 = param1 / hourInPercent;
  let resultInHoursParam1 = Math.round(param1 / hourInPercent);
  let resultInMinutesParam1 = Math.round((resultParam1 - resultInHoursParam1) * 60);

  let resultParam2 = param2 / hourInPercent;
  let resultInHoursParam2 = Math.round(param2 / hourInPercent);
  let resultInMinutesParam2 = Math.round((resultParam2 - resultInHoursParam2) * 60);


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
