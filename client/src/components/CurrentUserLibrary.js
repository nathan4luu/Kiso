import { useState } from "react";
import { Link } from "react-router-dom";

export default function CurrentUserLibrary() {
  const [activeTab, setActiveTab] = useState("Your decks");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const tabChoices = ["Your decks", "Recent activity", "Favorite decks"];

  return (
    <div>
      <h1 className="text-3xl font-medium py-6">Your library</h1>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {tabChoices.map((tab) => (
            <li key={tab} className="me-2">
              <Link
                to='#'
                onClick={() => handleClick(tab)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab
                    ? "text-[#6B46C1] border-[#6B46C1] dark:text-blue-500 dark:border-blue-500"
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
      <div className= "py-6">
          {activeTab === "Your decks" && <p>Be the hero your study sessions need. Create your first deck!</p>}
          {activeTab === "Recent activity" && <p>All quiet on the study front. Time to hit the books!</p> }
          {activeTab === "Favorite decks" && <p>Favorites? What favorites? You haven't picked any yet!</p>}
      </div>
    </div>
  );
}
