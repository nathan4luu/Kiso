import { useState, useEffect } from "react";
import { useUser } from "../api/user";
import DeckCard from "../components/DeckCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import DeckCarousel from "../components/DeckCarousel";

export default function Dashboard() {
  const user = useUser();

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const profiles = [
    {
      id: 1,
      account: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 10,
    },
    {
      id: 1,
      account: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 20,
    },
    {
      id: 1,
      account: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 30,
    },
    {
      id: 1,
      account: "Nathan Luu",
      profilePhoto:
        "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c",
      deckCount: 40,
    },
  ];

  if (user.status === "success") {
    return (
      <div>
        <h1 className="text-3xl font-medium py-4">
          See what others are studying
        </h1>

        <DeckCarousel />

        <h1 className="text-3xl pt-6 font-medium py-4">Popular accounts</h1>
        <div className="relative w-full overflow-hidden group">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {profiles
              //.slice(startIndex, startIndex + itemsPerPage)
              .map((profile, index) => (
                <div key={index} className={`relative w-1/4 px-2 flex-none`}>
                  <ProfileCard
                    id={profile.id}
                    account={profile.account}
                    profilePhoto={profile.profilePhoto}
                    deckCount={profile.deckCount}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
