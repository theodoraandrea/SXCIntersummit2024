import { API_GET_FCEO_REGISTRATION } from "../config/endpoints";
import { BMC_REGIST_SUMMARY, FCEO_REGIST_SUMMARY } from "../constants/routes";

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

const getCompetitionSummaryLink = (competitionId) => {
  switch (competitionId) {
    case 1:
      return FCEO_REGIST_SUMMARY;
    default:
      return "#";
  }
};

const getEventSummaryLink = (eventId) => {
  switch (eventId) {
    case 1:
      return BMC_REGIST_SUMMARY;
    default:
      return "#";
  }
};

// Function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to get team detail url
const getTeamDetailsUrl = (userId) => {
  return API_GET_FCEO_REGISTRATION.replace(":userId", userId);
};

// Function to normalize data in /events page
const normalizeData = (data, type) => {
  return data.map((item) => {
    if (type === "event") {
      return {
        id: `event_${item.id}`,
        type: type,
        title: item.eventName,
        description: item.description || item.shortDesc,
        category: item.category,
        date: item.eventDate,
        location: item.eventLocation,
      };
    } else if (type === "competition") {
      return {
        id: `comp_${item.id}`,
        type: type,
        title: item.competitionName,
        description: item.shortDesc,
        category: "Competition",
        date: item.competitionDate,
        location: item.competitionLocation,
      };
    } else {
      return {};
    }
  });
};

export {
  getDaysUntilEvent,
  formatDate,
  getTeamDetailsUrl,
  normalizeData,
  getCompetitionSummaryLink,
  getEventSummaryLink,
};
