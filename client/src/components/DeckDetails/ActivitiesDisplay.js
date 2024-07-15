import { GraduationCap, Notebook, NotebookPen, Puzzle, School, SquarePen } from "lucide-react";
import { TbCards } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ActivitiesDisplay( {largeScreen}) {
  return (
    <div
      className={` ${
        largeScreen
          ? "space-y-4 grid grid-row-3 pr-2"
          : "flex justify-between gap-2 w-full pt-4"
      }`}
    >
      <Link
        to="flashcards"
        className={`bg-white w-full border rounded-lg p-4 md:px-6 flex items-center text-[#6B46C1] transition-colors duration-300 hover:bg-[#ebe6f5] ${
          largeScreen ? "row-span-1" : "flex-1"
        }`}
      >
        <div className="flex gap-2 justify-center">
          <div className="flex justify-end items-center h-12 w-12">
            <TbCards size={38} />
          </div>
          <div className="hidden min-[700px]:block min-[900px]:w-40 text-left">
            <div className="text-2xl font-semibold">Flashcards</div>
            <div className="text-sm font-normal">
              Master the basics or revisit key concepts
            </div>
          </div>
        </div>
      </Link>

      <Link
        to="matching"
        className={`bg-white w-full border rounded-lg p-4 md:px-6 flex items-center text-emerald-600 transition-colors duration-300 hover:bg-emerald-100 ${
          largeScreen ? "row-span-1" : "flex-1"
        }`}
      >
        <div className="flex gap-2 justify-center">
          <div className="flex justify-end items-center h-12 w-12">
            <Puzzle size={36} />
          </div>
          <div className="hidden min-[700px]:block min-[900px]:w-40 text-left">
            <div className="text-2xl font-semibold">Matching</div>
            <div className="text-sm font-normal">
              See how fast you can match all the cards
            </div>
          </div>
        </div>
      </Link>

      <Link
        to="practice-quiz"
        className={`bg-white w-full border rounded-lg p-4 md:px-6 flex items-center text-sky-600 transition-colors duration-300 hover:bg-sky-100 ${
          largeScreen ? "row-span-1" : "flex-1"
        }`}
      >
        <div className="flex gap-2 justify-center">
          <div className="flex justify-end items-center h-12 w-12">
            <NotebookPen size={36} />
          </div>
          <div className="hidden min-[700px]:block min-[900px]:w-40 text-left">
            <div className="text-2xl font-semibold">Practice quiz</div>
            <div className="text-sm font-normal">
              Put your knowledge to the test
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
