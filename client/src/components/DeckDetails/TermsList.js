import TermCard from "./TermCard";

export default function TermsList({ deckId, cards, isCurrentUser }) {
  return (
    <div className="space-y-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="w-full border rounded-lg bg-white shadow shadow-[#ebe6f5] md:text-xl py-4"
        >
          <TermCard
            id={card.id}
            term={card.term}
            definition={card.definition}
            isCurrentUser={isCurrentUser}
            deckId={deckId}
          />
        </div>
      ))}
    </div>
  );
}
