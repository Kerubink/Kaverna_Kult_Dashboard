import React from "react";

interface HeaderDashboardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({ isOpen, setIsOpen }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b p-4">
      <button
        className="p-2 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Fechar Sidebar" : "Abrir Sidebar"}
      </button>
    </header>
  );
};

export default HeaderDashboard;
