import { LuRectangleHorizontal } from "react-icons/lu";

// components/AspectRatioBox.tsx
interface AspectRatioBoxProps {
  aspectRatio: string;
  selected: boolean;
  onClick: (aspectRatio: string) => void;
}

const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({ aspectRatio, selected, onClick }) => {
  return (
    <div>
      <LuRectangleHorizontal className="m-1" />
      <div
        className={`cursor-pointer m-1 flex items-center justify-center text-white pt-1 text-xs px-2 h-9 md:h-auto rounded md:rounded-none ${selected ? 'bg-custom-purple' : 'bg-custom-green'}`}
        onClick={() => onClick(aspectRatio)}
      >
        {aspectRatio}
      </div>
    </div>
  );
};

export default AspectRatioBox;
