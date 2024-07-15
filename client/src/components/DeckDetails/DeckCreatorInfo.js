import { Link } from "react-router-dom";

export default function DeckCreatorInfo({user, isCurrentUser, largeScreen}) {
  return (
    <Link
      to={
        isCurrentUser
          ? `/user/${user.id}/library/0`
          : `/user/${user.id}/library/`
      }
      className={`border rounded-lg bg-white p-4 flex gap-2 items-center font-semibold h-full transition-colors duration-300 hover:bg-gray-100 ${
        largeScreen ? "col-span-2" : "w-full"
      }`}
    >
      <img
        src={user.profilePhoto}
        alt="profile"
        className="h-8 w-8 rounded-full"
      />
      <div>
        <div className="text-sm font-light">Created by:</div>
        <div className="hover:text-[#6B46C1] hover:underline">
          {user.name}
        </div>
      </div>
    </Link>
  );
}
