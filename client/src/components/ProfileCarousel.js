import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ProfileCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  useEffect(() => {
    // Determine itemsPerPage based on screen width
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2); // Mobile view
      } else if (window.innerWidth >= 1024){
        setItemsPerPage(3); // Desktop or laptop view
      }
    };

    // Initial call
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const profiles = [
    {
      id: 4,
      account: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 1,
    },
    {
      id: 2,
      account: "Bathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 20,
    },
    {
      id: 3,
      account: "Cathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 30,
    },
    {
      id: 4,
      account: "Dathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 40,
    },
    {
      id: 5,
      account: "Eathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 50,
    },
    {
      id: 6,
      account: "Fathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 60,
    },
  ];

  const next = () => {
    const newIndex = Math.min(
      startIndex + itemsPerPage,
      profiles.length - itemsPerPage
    );
    setStartIndex(newIndex);
  };

  const prev = () => {
    const newIndex = Math.max(startIndex - itemsPerPage, 0);
    setStartIndex(newIndex);
  };
  return (
    <div className="relative w-full overflow-hidden group">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
        }}
      >
        {profiles.map((profile, index) => (
          <div key={index} className={`relative w-1/2 md:w-1/3 lg:w-1/4 px-2 flex-none`}>
            <ProfileCard
              id={profile.id}
              account={profile.account}
              profilePhoto={profile.profilePhoto}
              deckCount={profile.deckCount}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-2 gap-2 invisible group-hover:visible">
        <button
          disabled={startIndex <= 0}
          className={`flex items-center justify-center rounded-full w-10 h-10 p-1 bg-white dark:border-[#6B46C1] dark:border-2 dark:text-[#6B46C1] ${
            startIndex > 0 ? "hover:bg-[#6B46C1] hover:text-white" : "invisible"
          }`}
          onClick={prev}
        >
          <ChevronLeft />
        </button>
        <button
          disabled={startIndex >= profiles.length - itemsPerPage}
          className={`flex items-center justify-center rounded-full w-10 h-10 p-1 bg-white dark:border-[#6B46C1] dark:border-2 dark:text-[#6B46C1] ${
            startIndex < profiles.length - itemsPerPage
              ? "hover:bg-[#6B46C1] hover:text-white"
              : "invisible"
          }`}
          onClick={next}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
