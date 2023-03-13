import React from "react";

const CustomTooltipForCalender = ({ event }) => {
  console.log("eventevent", event);
  return (
    <div className="custom-tooltip">
      <div>{event.title}</div>
      <div>{event.start.toLocaleDateString()}</div>
      <div>{event.start.toLocaleTimeString()}</div>
    </div>
  );
};

export default CustomTooltipForCalender;
