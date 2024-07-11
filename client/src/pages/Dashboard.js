import { useState, useEffect } from "react";
import { useUser } from "../api/user";
import DeckCard from "../components/DeckCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import DeckCarousel from "../components/DeckCarousel";
import ProfileCarousel from "../components/ProfileCarousel";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (user.data === null) {
      navigate("/");
    }
  }, [user, navigate]);
  if (user.isLoading) {
    return <LoadingSpinner />;
  }
  if (user.data && user.fetchStatus !== "fetching") {
    return (
      <div className="py-6 space-y-20">
        <div className="space-y-6">
          <h1 className="text-3xl font-medium ">Recent activity</h1>
          <DeckCarousel currentUser={user.data.id} />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-medium">See what others are studying</h1>
          <DeckCarousel currentUser={user.data.id} />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-medium">Popular accounts</h1>
          <ProfileCarousel />
        </div>
      </div>
    );
  }
}
