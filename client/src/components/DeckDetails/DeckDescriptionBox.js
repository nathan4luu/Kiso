import { SquarePen } from "lucide-react";

export default function DeckDescriptionBox({title, description, largeScreen, isCurrentUser}) {
  return (
    <div
      className={`border rounded-lg bg-white p-2 text-md h-full${
        largeScreen ? " col-span-3" : "w-full"
      }`}
      style={{ minHeight: "fit-content" }}
    >
      <div className="flex font-bold items-center justify-between">{title}
      {isCurrentUser && (
          <button className="flex p-2 justify-end rounded-full items-start text-gray-400 hover:text-black hover:bg-gray-200 transition-all duration-300">
            <SquarePen width={18} height={18} />
          </button>
        )}
      </div>
      <div className="line-clamp-3 overflow-hidden">{description}</div>
    </div>
  );
}
