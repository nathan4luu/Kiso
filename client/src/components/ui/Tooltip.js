import { useState } from "react";

export default function Tooltip({ text, position, children }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "origin-bottom";
      case "bottom":
        return "origin-top";
      case "left":
        return "origin-right";
      case "right":
        return "origin-left";
      default:
        return "origin-bottom";
    }
  };

  const getTooltipPositionClass = () => {
    switch (position) {
      case "top":
        return "bottom-12 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "top-12 left-1/2 transform -translate-x-1/2";
      case "left":
        return "top-1/2 right-10 transform -translate-y-1/2";
      case "right":
        return "top-1/2 left-10 transform -translate-y-1/2";
      default:
        return "bottom-12 left-1/2 transform -translate-x-1/2";
    }
  };

  return (
    <div className={`relative inline-block ${getPositionClass()}`}>
      <div
        className={`absolute z-10 bg-gray-800 text-white text-sm py-1 px-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 whitespace-nowrap ${
          showTooltip
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } ${getTooltipPositionClass()}`}
      >
        {text}
      </div>
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
    </div>
  );
}
