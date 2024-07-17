import { Check, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateCard } from "../../api/card";
import { createId } from "@paralleldrive/cuid2";
import Tooltip from "../ui/Tooltip";

export default function NewCards() {
  const [cards, setCards] = useState([]);
  const lastCardRef = useRef(null);
  const { deckId } = useParams();

  const mutation = useCreateCard(deckId);

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }, [cards]); // Trigger scrollIntoView when cards array changes

  const handleAddNewCard = () => {
    const newCard = { term: "", definition: "", error: "" };
    setCards([...cards, newCard]);
  };

  const handleDeleteNewCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleSubmitNewCard = (index) => {
    const { term, definition } = cards[index];
    const newCardId = createId();

    if (!term.slice() || !definition.slice()) {
      const newCards = [...cards];
      newCards[index].error = "Term and Definition cannot be empty.";
      setCards(newCards);
      return;
    }

    try {
      mutation.mutate({ newCardId, term, definition, deckId });
      handleDeleteNewCard(index);
    } catch (error) {
      console.log("Error creating card", error);
    }
  };

  const handleTermChange = (index, event) => {
    const newCards = [...cards];
    newCards[index].term = event.target.value;
    setCards(newCards);
  };

  const handleDefinitionChange = (index, event) => {
    const newCards = [...cards];
    newCards[index].definition = event.target.value;
    setCards(newCards);
  };

  const handleTextAreaResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {cards.map((item, index) => (
        <div
          key={index}
          ref={index === cards.length - 1 ? lastCardRef : null}
          className="w-full border border-purple-main rounded-lg bg-white shadow shadow-[#ebe6f5] md:text-xl py-4"
        >
          <div className="relative flex py-6">
            <div className="border-r w-2/5 flex justify-center items-center p-4">
              <textarea
                type="text"
                value={item.term}
                onChange={(event) => handleTermChange(index, event)}
                onInput={handleTextAreaResize}
                className="mt-1 block w-full p-2 border-b-2 border-gray-300 text-center focus:text-start focus:border-purple-main focus:outline-none focus:ring-0 resize-none"
                rows="1"
                placeholder="Enter term"
              />
            </div>
            <div className="border-l w-3/5 flex items-center px-8">
              <textarea
                value={item.definition}
                onChange={(event) => handleDefinitionChange(index, event)}
                onInput={handleTextAreaResize}
                className="mt-1 block w-full p-2 border-b-2 border-gray-300 focus:border-purple-main focus:outline-none focus:ring-0 resize-none"
                rows="1"
                placeholder="Enter definition"
              />
            </div>
            <div className="absolute top-0 right-0">
              <div className="px-4 text-purple-main italic">Unsaved</div>
            </div>
          </div>
          <div className="flex justify-between items-center px-8">
            <div className="text-red-600">{item.error}</div>
            <div className="space-x-4">
              <Tooltip text="Delete card" position="bottom">
                <button
                  className="rounded-full p-2 text-white bg-red-400 hover:bg-red-600"
                  onClick={() => handleDeleteNewCard(index)}
                >
                  <Trash2 />
                </button>
              </Tooltip>
              <Tooltip text="Save changes" position="bottom">
                <button
                  className="rounded-full p-2 text-white bg-emerald-400 hover:bg-emerald-600"
                  onClick={() => handleSubmitNewCard(index)}
                >
                  <Check />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      ))}
      <div
        id="add-new-card-bottom"
        className="w-full border rounded-lg gap-1 shadow text-xl font-normal py-4 bg-white text-[#6B46C1] hover:bg-[#ebe6f5] hover:font-bold hover:shadow-lg cursor-pointer flex items-center justify-center"
        onClick={handleAddNewCard}
      >
        <Plus />
        Add New Term(s)
      </div>
    </div>
  );
}
