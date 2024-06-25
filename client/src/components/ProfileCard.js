import { Link } from "react-router-dom";

export default function ProfileCard({ id, account, profilePhoto, deckCount }) {
  return (
    <div className="p-4 h-40 rounded-lg border-b-4 border-gray-100 bg-gray-50 hover:bg-gray-100 hover:border-b-4 hover:border-[#6B46C1] hover:drop-shadow-lg">
      <Link to={"/user/" + id}>
        <img
          src={profilePhoto}
          alt="Profile"
          className="rounded-full w-16 h-16"
        ></img>
        <p className="font-bold text-xl pt-2">{account}</p>
        <div className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
          {deckCount} decks created 
        </div>
      </Link>
    </div>
  );
}
