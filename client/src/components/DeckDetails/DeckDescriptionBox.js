import { set } from "date-fns";
import { SquarePen } from "lucide-react";
import { useState } from "react";

export default function DeckDescriptionBox({
  title,
  description,
  largeScreen,
  isCurrentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      className={`border rounded-lg bg-white p-2 text-md h-full${
        largeScreen ? " col-span-3" : "w-full"
      }`}
      style={{ minHeight: "fit-content" }}
    >
      <div className="flex font-bold items-center justify-between">
        {title}
        {isCurrentUser && (
          <button
            className="flex p-2 justify-end rounded-full items-start text-gray-400 hover:text-black hover:bg-gray-200 transition-all duration-300"
            onClick={() => setIsEditing(true)}
          >
            <SquarePen width={18} height={18} />
          </button>
        )}
      </div>
      {description ? (
        <div className="line-clamp-3 overflow-hidden">{description}</div>
      ) : (
        <button className="line-clamp-3 overflow-hidden text-purple-main hover:underline">
          Add a description!
        </button>
      )}
    </div>
  );
}
