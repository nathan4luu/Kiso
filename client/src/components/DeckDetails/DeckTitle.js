import { getTimeAgo } from "../CurrentUserLibraryTabs/YourDecks";

export default function DeckTitle({ title, editedAt }) {
  return (
    <div className="p-2">
      <h1 className="text-4xl font-bold">{title}</h1>
      <h1 className="text-gray-500 italic">
        Last edited {getTimeAgo(editedAt)}
      </h1>
    </div>
  );
}
