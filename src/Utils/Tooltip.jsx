import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const Tooltip = (props) => {
  return (
    <ReactTooltip
      anchorId={props.title}
      place="bottom"
      content={props.content}
    />
  );
};

export default Tooltip;
