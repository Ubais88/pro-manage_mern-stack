const moment = require("moment");

exports.formatDateWithColor = (date) => {
  const formattedDate = moment(date).format("MMM Do");
  const today = moment();
  const targetDate = moment(date);

  const daysDifference = targetDate.diff(today, "days");

  let color = "";
  if (daysDifference <= -1) {
    color = "#CF3636"; // Expired
  } else {
    color = "#DBDBDB"; // Upcoming (including today)
  }


  return { formattedDate, color };
};
