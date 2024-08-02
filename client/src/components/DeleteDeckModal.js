import { useDeleteDeck } from "../api/deck";

export default function DeleteDeckModal({ deckId }) {
  const deleteDeckMutation = useDeleteDeck();
  const handleDeleteDeck = async (deckId) => {
    try {
      deleteDeckMutation.mutate({ deckId });
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };
  return (
    <dialog id={`deleteDeckModal${deckId}`} className="modal">
      <div className="modal-box">
        <div className="bg-white rounded-lg ">
          <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this deck? This action cannot be undone.</p>
          <form method="dialog" className="mt-6 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => {
                handleDeleteDeck(deckId);
              }}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
