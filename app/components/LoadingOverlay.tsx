import { MoonLoader } from "react-spinners";
export const getHeightFromAspectRatio = (aspectRatio: string, width: number): number => {
  const [w, h] = aspectRatio.split(':').map(Number);
  return (h / w) * width;
};

export const LoadingOverlay: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div
    className="flex items-center justify-center bg-gray-200 bg-opacity-75"
    style={{ width: `${width}px`, height: `${height}px` }}
  >
    <MoonLoader size={20} color="#000000" />
  </div>
);