import { useState } from "react";

interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

const Tooltip = ({ label, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const mouseEnter = () => {
    setVisible(true);
  };

  const mouseLeave = () => {
    setVisible(false);
  };

  return (
    <div
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className="group relative"
    >
      {visible && (
        <p className="absolute -top-10 w-full rounded bg-gray-900 bg-opacity-75 p-2 text-center text-xs text-white">
          {label}
        </p>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
