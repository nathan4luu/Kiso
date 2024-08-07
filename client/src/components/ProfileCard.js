import { Link } from "react-router-dom";
import { TbCards } from "react-icons/tb";

export default function ProfileCard({ id, account, profilePhoto, deckCount }) {
    
  return (
    <div className="p-4 h-39 rounded-lg border-b-4 border-gray-100 bg-white transition-all duration-300 ease-in-out hover:bg-gray-100 hover:border-b-4 hover:border-[#6B46C1] hover:shadow-xl hover:shadow-[#ebe6f5]">
      <Link to={"/user/" + id + "/library/"}>
        <img
          src={profilePhoto}
          alt="Profile"
          className="rounded-full md:w-20 md:h-20"
        ></img>
        <p className="font-bold text-lg md:text-2xl pt-3 pb-1">{account}</p>
        <div className="inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
          <TbCards className="mr-1" />
          <span>
            {deckCount} {deckCount === 1 ? "deck" : "decks"} created
          </span>
        </div>
      </Link>
    </div>
  );
}
//className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold "
