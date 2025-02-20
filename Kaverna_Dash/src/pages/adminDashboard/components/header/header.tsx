import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import BreadcrumbHeader from "./breadcrumb";
import { Separator } from "@/components/ui/separator";

interface HeaderDashboardProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b-2 border-b-neutral-700 mb-3">
      <div className="flex items-center gap-2">
        <button
          className="text-white p-1 rounded-md hover:bg-neutral-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <PanelLeftClose size={20}/> : <PanelLeftOpen size={20}/>}
        </button>
        <Separator orientation="vertical" className="mr-2 h-4 bg-white" />
        <BreadcrumbHeader />
      </div>
    </header>
  );
};

export default HeaderDashboard;
