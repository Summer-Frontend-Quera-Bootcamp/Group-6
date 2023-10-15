import { useState } from "react";

interface Row {
  icon: string;
  text: string;
}

interface Props {
  rows: Row[];
  ref: React.RefObject<HTMLDivElement>;
  className: string;
}

const ModalSm: React.FC<Props> = ({ rows, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div
      className={`bg-white shadow-md p-2 rounded-lg absolute z-50 ${className}`}
    >
      {rows.map((row, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 py-2 px-1 cursor-pointer rounded-md ${
            hoveredIndex === index ? "bg-cyan-50" : ""
          }`}
          onMouseOver={() => {
            setHoveredIndex(index);
          }}
          onMouseLeave={() => {
            setHoveredIndex(-1);
          }}
        >
          <span>
            <img src={row.icon} alt="icon" />
          </span>
          <span className="text-sm">{row.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ModalSm;
