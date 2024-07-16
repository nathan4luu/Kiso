import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <ClipLoader size={50} color={"#6B46C1"} />
    </div>
  );
}

export default LoadingSpinner;
