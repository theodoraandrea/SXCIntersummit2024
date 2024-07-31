import { API_GET_TEAM_DETAILS_BY_USER } from "../config/endpoints";

// Function to calculate days and hours until the event
const getDaysUntilEvent = (eventDate) => {
  const today = new Date();
  const event = new Date(eventDate);
  const diffTime = event - today;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  let message;
  let status;

  if (diffTime <= 0) {
    message = "Event has started";
    status = "started";
  } else {
    if (diffDays > 0) {
      message = `${diffDays} days to go`;
    } else if (diffHours > 0) {
      message = `${diffHours} hours to go`;
    } else if (diffMinutes > 0) {
      message = `Starting in < 1 hour`;
    } else {
      message = "Event has started";
    }
  }

  return {
    message,
    status,
  };
};

// Function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to get team detail url
const getTeamDetailsUrl = (userId) => {
  return API_GET_TEAM_DETAILS_BY_USER.replace(":userId", userId);
};

export { getDaysUntilEvent, formatDate, getTeamDetailsUrl };
