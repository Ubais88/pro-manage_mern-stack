import moment from "moment";

const formatDateWithColor = (date) => {
  const formattedDate = moment(date).format("MMM Do");
  const today = moment();
  const targetDate = moment(date);
  
  // Calculate the difference in days between today and the target date
  const daysDifference = targetDate.diff(today, 'days');

  // Define thresholds for color indication
  const expiredThreshold = -1; // Days before today (expired)
  const upcomingThreshold = 3; // Days after today (upcoming)

  // Determine the color based on the difference in days
  let color = '';
  if (daysDifference <= expiredThreshold) {
    color = 'red'; // Expired
  } else if (daysDifference <= upcomingThreshold) {
    color = 'orange'; // Upcoming
  } else {
    color = 'black'; // Default color
  }

  // Return the formatted date and color indicator
  return { formattedDate, color };
};

export default formatDateWithColor;
