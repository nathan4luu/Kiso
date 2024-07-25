import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search Kiso...");


  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setPlaceholder(window.innerWidth < 500 ? "Search..." : "Search Kiso...");
    };

    // Set initial placeholder
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("");
    }
  }, [location]);


  return (
    <>
      <form
        className="flex gap-2 text-gray-600 border border-gray-300 bg-white rounded-lg w-full px-4 py-1"
        onSubmit={(e) => {
          e.preventDefault();
          if (query) {
            navigate(`/search?query=${query}`);
          }
        }}
      >
        <Search />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none"
        />
        {query && (
          <X
            onClick={() => setQuery("")}
            className="self-center cursor-pointer"
          />
        )}
        <button type="submit" className="hidden">
          Search
        </button>
      </form>
    </>
  );
}
