// src/components/commons/TooltipWrapper.jsx
import { Tooltip } from "neetoui";

const TooltipWrapper = ({ showTooltip, children, ...tooltipProps }) => {
  console.log("Called tooltip, children are showToolTip = ", showTooltip);
  if (!showTooltip) return children;

  return (
    <Tooltip {...tooltipProps}>
      <div>{children}</div>
    </Tooltip>
  );
};

export default TooltipWrapper;
