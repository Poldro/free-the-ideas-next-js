import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


export const Tooltip = ({ children, text }: {children: React.ReactNode, text: string}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <p className="inline-block">{children}</p>
      <button
        className="absolute top-0 right-0 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors focus:outline-none"
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <InformationCircleIcon className="text-gray-500 w-4 h-4" />
      </button>
      {showTooltip && (
        <div className="absolute top-0 w-full left-0 p-2 bg-gray-700 text-white rounded shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}
