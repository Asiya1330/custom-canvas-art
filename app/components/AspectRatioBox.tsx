// components/AspectRatioBox.tsx
interface AspectRatioBoxProps {
    aspectRatio: string;
    selected: boolean;
    onClick: (aspectRatio: string) => void;
  }
  
  const AspectRatioBox: React.FC<AspectRatioBoxProps> = ({ aspectRatio, selected, onClick }) => {
    return (
      <div
        className={`cursor-pointer m-1 flex items-center justify-center text-white text-xs px-2 h-9 md:h-auto rounded md:rounded-none ${selected ? 'bg-purple-500' : 'bg-green-500'}`}
        onClick={() => onClick(aspectRatio)}
      >
        {aspectRatio}
      </div>
    );
  };
  
  export default AspectRatioBox;
  