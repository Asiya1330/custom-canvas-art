import { FaHeart } from "react-icons/fa";
import ArtGenerator from "../components/ArtGenerator";
import ArtGeneratorMobile from "../components/ArtGenerator-mobile";

const ArtGenerationPage: React.FC = () => {
  return (
    <div className="min-h-screenflex justify-between items-start">
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="hidden md:block md:w-3/5 pr-4">

          <ArtGenerator />
        </div>
        <div className=" block md:hidden w-full md:w-3/5">
        
          <ArtGeneratorMobile />
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
