// Function to calculate days until the event
const getDaysUntilEvent = (eventDate) => {
  const today = new Date();
  const event = new Date(eventDate);
  const diffTime = event - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return {
    message: diffDays <= 0 ? "Event has started" : `${diffDays} days to go`,
    status: diffDays <= 0 ? "started" : "upcoming",
  };
};

// Function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export { getDaysUntilEvent, formatDate };
