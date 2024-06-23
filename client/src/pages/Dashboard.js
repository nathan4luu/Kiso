import { useUser } from "../api/user";
import DeckCard from "../components/DeckCard";

export default function Dashboard() {
  const user = useUser();
  const decks = [
    {
      id: 1,
      title: "CS 2120 first test",
      description:
        "This flashcard set covers fundamental concepts and topics in discrete mathematics, essential for computer science and mathematical reasoning.",
      termCount: 10,
      author: "Nathan Luu",
      profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c"
    },
    {
      id: 2,
      title: "CS 2130 first test",
      description:
        "CSO",
      termCount: 24,
      author: "Bob Smith",
      profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c"
    },
    {
      id: 3,
      title: "SDE Final UVA McBurney",
      description:
        "This is not cheating",
      termCount: 50,
      author: "Jane Doe",
      profilePhoto: "https://lh3.googleusercontent.com/a/ACg8ocID3K2wYQno8i_NGSuReI6ZqAOZI1iBAa6LiW8UeNHaXw87xw=s96-c"
    },
  ];

  if (user.status === "success") {
    return (
      <div>
        <h1 className="text-3xl font-bold py-4">Recent</h1>
        <div className="flex gap-3">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id} // Adding key prop for React
              id={deck.id}
              title={deck.title}
              description={deck.description}
              termCount={deck.termCount}
              author={deck.author}
              profilePhoto= {deck.profilePhoto}
            />
          ))}
        </div>
        <p>This is EduCards</p>
      </div>
    );
  }
}
