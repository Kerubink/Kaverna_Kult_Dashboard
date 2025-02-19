import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import React from "react";

interface HeaderDashboardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({ isOpen, setIsOpen }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b p-4">
      <button
        className="text-white p-1 rounded-md hover:bg-neutral-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ?  <PanelLeftClose /> : <PanelLeftOpen />}
      </button>
    </header>
  );
};

export default HeaderDashboard;
