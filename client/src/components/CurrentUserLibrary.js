import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteDecks from "./CurrentUserLibraryTabs/FavoriteDecks";
import YourDecks from "./CurrentUserLibraryTabs/YourDecks";

export default function CurrentUserLibrary() {
  const { pageId, userId } = useParams();
  const tabChoices = ["Your decks", "Recent activity", "Favorite decks"];

  const [activeTab, setActiveTab] = useState(tabChoices[pageId]);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-medium py-6">Your library</h1>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex -mb-px">
          {tabChoices.map((tab, index) => (
            <li key={tab} className="me-2">
              <Link
                to={`/user/${userId}/library/${index}`}
                onClick={() => handleClick(tab)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab
                    ? "text-[#6B46C1] border-[#6B46C1]"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-6">
      <div className="p-2">
        {activeTab === "Your decks" && (
          <YourDecks currentUserId={userId} />
        )}
        {activeTab === "Recent activity" && (
          <p>All quiet on the study front. Time to hit the books!</p>
        )}
        {activeTab === "Favorite decks" && (
          <FavoriteDecks currentUserId={userId} />
        )}
        </div>
      </div>
    </div>
  );
}
