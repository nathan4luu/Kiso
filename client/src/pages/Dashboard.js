import { useState, useEffect } from "react";
import { useUser } from "../api/user";
import DeckCard from "../components/DeckCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import DeckCarousel from "../components/DeckCarousel";
import ProfileCarousel from "../components/ProfileCarousel";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user.data && user.fetchStatus !== "fetching") {
    return (
      <div className="pb-6">

        <h1 className="text-3xl font-medium py-6">Recent activity</h1>
        <DeckCarousel currentUser={user.data.id} />

        <h1 className="text-3xl font-medium pt-20 pb-6">
          See what others are studying
        </h1>
        <DeckCarousel currentUser={user.data.id} />

        <h1 className="text-3xl font-medium pt-20 pb-6">Popular accounts</h1>
        <ProfileCarousel />
        
      </div>
    );
  }
}
