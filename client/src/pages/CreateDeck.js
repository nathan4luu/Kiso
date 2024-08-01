import { useEffect, useRef, useState } from "react";
import CreateNewCards from "../components/CreateNewCards";
import { Link } from "react-router-dom";
import { useUser } from "../api/user";
import { useCreateDeck } from "../api/deck";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function CreateDeck() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");

  const [cards, setCards] = useState([
    { term: "", definition: "", error: "" },
    { term: "", definition: "", error: "" },
    { term: "", definition: "", error: "" },
    { term: "", definition: "", error: "" },
  ]);
  const user = useUser();

  const descriptionRef = useRef(null);

  const maxDescriptionChars = 250;

  useEffect(() => {
    if (descriptionRef.current) {
      handleTextAreaResize(descriptionRef.current);
    }
  }, [descriptionRef.current]);
  
  const handleTextAreaResize = (textarea) => {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const createDeckMutation = useCreateDeck();

  const handleSubmit = () => {
    //submit the thing using mutation
    //get response from successful input to db
    //then redirect to page using created deck id
    let error = false;

    if (!title.slice()) {
      setTitleError(true);
      error = true;
    } else {
      setTitleError(false);
    }

    cards.forEach((card, index) => {
      if (!card.term.slice() || !card.definition.slice()) {
        const newCards = [...cards];
        newCards[index].error = "*Term and Definition cannot be empty*";
        setCards(newCards);
        error = true;
      } else {
        const newCards = [...cards];
        newCards[index].error = "";
        setCards(newCards);
      }
    });

    if (!error) {
      try {
        createDeckMutation.mutate({
          userId: user.data.id,
          title: title.trim(),
          description: description.trim(),
          cards: cards,
        });
      } catch (error) {
        console.error("Error creating deck:", error);
      }
    }
  };
  if (user.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-4 pb-4">
      <div className="mt-8 border-b-4">
        <div className="relative flex font-bold text-4xl items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b-2 pr-4 border-gray-300 focus:border-purple-main outline-none flex-grow bg-transparent"
            placeholder="Enter title"
          />
          {titleError && (
            <div className="absolute right-0 top-0 text-2xl text-red-500">
              *
            </div>
          )}
        </div>
        <div className="my-4">
          <textarea
            ref={descriptionRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInput={(e) => handleTextAreaResize(e.target)}
            className="bg-white focus:bg-purple-secondary rounded-lg w-full p-2 mt-2 outline-none text-xl resize-none overflow-hidden"
            placeholder="Enter description (optional)"
            rows="1"
            maxLength={maxDescriptionChars}
          />
          <div className="italic">
            {description.length} / {maxDescriptionChars}{" "}
          </div>
        </div>
      </div>
      <div>
        <CreateNewCards cards={cards} setCards={setCards} />
      </div>

      <div className="flex justify-between border-t-4 pt-4">
        <Link
          className=" w-1/4 btn border bg-gray-500 hover:bg-gray-600 rounded-lg p-2 text-white focus:outline-none text-center text-xl"
          to={`/user/${user.data.id}/library/0`}
        >
          <span className="hidden md:inline">Back to library</span>
          <span className="inline md:hidden">Back</span>
        </Link>
        <Link
          className="w-1/4 btn border bg-emerald-500 hover:bg-emerald-600 rounded-lg p-2 text-white focus:outline-none text-center text-xl"
          onClick={() => handleSubmit()}
        >
          <span className="hidden sm:inline">Create deck</span>
          <span className="inline sm:hidden">Create</span>
        </Link>
      </div>
    </div>
  );
}
