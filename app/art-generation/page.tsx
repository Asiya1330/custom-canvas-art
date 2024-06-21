import { FaHeart } from "react-icons/fa";
import ArtGenerator from "../components/ArtGenerator/ArtGenerator";

const ArtGenerationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-between items-start ">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="md:w-3/5">
          <ArtGenerator />
        </div>
        <div className="md:w-2/5 flex justify-center items-start mt-2">
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            Go to Saved Art
            <FaHeart className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtGenerationPage;
