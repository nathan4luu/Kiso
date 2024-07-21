import { IconDotsVertical } from "@tabler/icons-react";
import { Check, SquarePen, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDeleteCard, useEditCard } from "../../api/card";
import Tooltip from "../ui/Tooltip";

export default function TermCard({
  id,
  term,
  definition,
  isCurrentUser,
  deckId,
  totalCardsCount,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTerm, setTerm] = useState(term);
  const [editDefinition, setDefinition] = useState(definition);
  const [error, setError] = useState(null);

  const [modalError, setModalError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const termRef = useRef(null);
  const definitionRef = useRef(null);
  const deleteCardMutation = useDeleteCard(deckId);
  const editCardMutation = useEditCard(deckId);

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleDefinitionChange = (event) => {
    setDefinition(event.target.value);
  };

  const handleTextAreaResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleDeleteCard = async (cardId) => {
    try {
      deleteCardMutation.mutate({ cardId });
      setIsEditing(false);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleSubmitCard = async (cardId) => {
    try {
      editCardMutation.mutate({
        cardId: cardId,
        term: editTerm,
        definition: editDefinition,
      });
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error("Error editing card:", error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      handleTextAreaResize(termRef.current);
      handleTextAreaResize(definitionRef.current);
    }
  }, [isEditing]);
  return (
    <>
      {!isEditing ? (
        <div className="relative flex py-6">
          <div className="border-r w-2/5 flex justify-center items-center p-4">
            {term}
          </div>
          <div className="border-l w-3/5 flex items-center px-4 md:px-8">
            {definition}
          </div>

          <div className="absolute top-0 right-1">
            {isCurrentUser && (
              <Tooltip text="Edit card" position="right">
                <button
                  className="flex p-2 justify-end rounded-full items-start text-gray-400 hover:text-black hover:bg-gray-200 transition-all duration-300"
                  onClick={() => setIsEditing(true)}
                >
                  <SquarePen width={18} height={18} />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex py-6">
            <div className="border-r w-2/5 flex justify-center items-center p-4">
              <textarea
                ref={termRef}
                type="text"
                value={editTerm}
                onChange={handleTermChange}
                onInput={(e) => handleTextAreaResize(e.target)}
                className="mt-1 block w-full p-2 border-b-2 border-gray-300 text-center focus:text-start focus:border-purple-main focus:outline-none focus:ring-0 resize-none"
                rows="1"
                placeholder="Enter term"
              />
            </div>
            <div className="border-l w-3/5 flex items-center px-8">
              <textarea
                ref={definitionRef}
                value={editDefinition}
                onChange={handleDefinitionChange}
                onInput={(e) => handleTextAreaResize(e.target)}
                className="mt-1 block w-full p-2 border-b-2 border-gray-300 focus:border-purple-main focus:outline-none focus:ring-0 resize-none"
                rows="1"
                placeholder="Enter definition"
              />
            </div>
            <div className="absolute top-0 right-1">
              {isCurrentUser && (
                <Tooltip text="Discard changes" position="right">
                  <button
                    className="flex p-2 justify-end rounded-full items-start text-gray-400 hover:text-black hover:bg-gray-200 transition-all duration-300"
                    onClick={() => {
                      setIsEditing(false);
                      setError(null);
                    }}
                  >
                    <X width={18} height={18} />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center px-8">
            <div className="text-red-600">{error}</div>
            <div className="space-x-4">
              <Tooltip text="Delete card" position="bottom">
                <button
                  className="rounded-full p-2 text-white bg-red-400 hover:bg-red-600"
                  onClick={() => {
                    if (totalCardsCount <= 4) {
                      setError("Decks must contain a minimum of four cards.");
                    } else
                      document.getElementById(`deleteModal${id}`).showModal();
                  }}
                >
                  <Trash2 />
                </button>
              </Tooltip>
              <Tooltip text="Save changes" position="bottom">
                <button
                  className="rounded-full p-2 text-white bg-emerald-400 hover:bg-emerald-600"
                  onClick={() => {
                    handleSubmitCard(id);
                  }}
                >
                  <Check />
                </button>
              </Tooltip>
            </div>
          </div>
        </>
      )}
      <dialog id={`deleteModal${id}`} className="modal">
        <div className="modal-box">
          <div className="bg-white rounded-lg ">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this card?</p>
            <form method="dialog" className="mt-6 flex justify-end space-x-4">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => {
                  handleDeleteCard(id);
                  setShowModal(false);
                }}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
