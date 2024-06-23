import { Link } from "react-router-dom";

export default function DeckCard({
  id,
  title,
  description,
  termCount,
  author,
  profilePhoto,
}) {
  return (
    <div className="w-1/3 p-2 rounded-xl border-b-2 border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-b-4 hover:border-[#6B46C1] hover:drop-shadow-lg">
      <Link to={"/decks/" + id}>
        <h1 className="text-2xl font-semibold py-1 line-clamp-1 hover:text-[#6B46C1]">
          {title}
        </h1>
        <div className="inline-block rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold">
          {termCount} terms
        </div>

        <p className="pt-3 line-clamp-2 h-16">{description}</p>
        <div className="pt-6 flex gap-2 items-center">
          <img
            src={profilePhoto}
            alt="Profile photo"
            className="rounded-full w-6 h-6"
          ></img>
          <p className="hover:text-[#6B46C1]">{author}</p>
        </div>
      </Link>
    </div>
  );
}
