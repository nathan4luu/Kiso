import { set } from "date-fns";
import { Check, SquarePen, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Tooltip from "../ui/Tooltip";
import { useEditDeck } from "../../api/deck";

export default function DeckDescriptionBox({
  deckId,
  title,
  description,
  largeScreen,
  isCurrentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const descriptionRef = useRef(null);
  const modalRef = useRef(null);

  const editDeckMutation = useEditDeck();

  const maxDescriptionChars = 250;

  useEffect(() => {
    if (isEditing) {
      handleTextAreaResize(descriptionRef.current);
    }
  }, [isEditing]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && e.target === modalRef.current) {
        modalRef.current.close();
        setIsEditing(false);
        setNewTitle(title);
        setNewDescription(description);
        setError("");
      }
    };

    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener("click", handleOutsideClick);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("click", handleOutsideClick);
      }
    };
  }, []);

  const handleTextAreaResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmitDeck = async () => {
    if (!newTitle.slice()) {
      setError("Please provide a title.");
      return;
    }
    try {
      editDeckMutation.mutate({
        deckId: deckId,
        title: newTitle,
        description: newDescription,
      });
      setIsEditing(false);
      setError("");
      modalRef.current.close();
    } catch (error) {
      console.error("Error editing deck:", error);
    }
  };

  return (
    <>
      <div
        className={`border rounded-lg bg-white p-2 text-md h-full${
          largeScreen ? " col-span-3" : "w-full"
        }`}
        style={{ minHeight: "fit-content" }}
      >
        <div className="flex font-bold items-center justify-between">
          {title}
          {isCurrentUser && (
            <button
              className="flex p-2 justify-end rounded-full items-start text-gray-400 hover:text-black hover:bg-gray-200 transition-all duration-300"
              onClick={() => {
                setIsEditing(true);
                document.getElementById("editDescriptionModal").showModal();
              }}
            >
              <SquarePen width={18} height={18} />
            </button>
          )}
        </div>
        {description ? (
          <div className="line-clamp-3 overflow-hidden">{description}</div>
        ) : (
          <button
            className="line-clamp-3 overflow-hidden text-purple-main hover:underline"
            onClick={() => {
              setIsEditing(true);
              document.getElementById("editDescriptionModal").showModal();
            }}
          >
            Add a description!
          </button>
        )}
      </div>

      <dialog id="editDescriptionModal" className="modal" ref={modalRef}>
        <div className="relative modal-box">
          <div
            className={`rounded-lg bg-white text-md h-full${
              largeScreen ? " col-span-3" : "w-full"
            }`}
            style={{ minHeight: "fit-content" }}
          >
            <div className="flex font-bold text-xl items-center justify-between">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border-b-2 border-gray-300 focus:border-purple-main outline-none flex-grow"
                placeholder="Enter title"
              />
            </div>
            <div className="mt-2">
              <textarea
                ref={descriptionRef}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onInput={(e) => handleTextAreaResize(e.target)}
                className="bg-gray-50 focus:bg-purple-secondary rounded-lg w-full p-2 mt-2 outline-none resize-none overflow-hidden"
                placeholder="Enter description (or don't, we won't care)"
                rows="1"
                maxLength={maxDescriptionChars}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex justify-between">
              <div className="italic">
                {newDescription.length} / {maxDescriptionChars}
              </div>
              <Tooltip text="Save changes" position="left">
                <button
                  className="rounded-full p-2 text-white bg-emerald-400 hover:bg-emerald-600"
                  onClick={() => {
                    handleSubmitDeck();
                  }}
                >
                  <Check width={18} height={18} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
