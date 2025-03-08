import { Command } from "lucide-react";

function HeaderSidebar() {
  return (
    <>
      <header className="flex flex-col gap-2 p-2">
        <a href="#" className=" flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-12 text-sm">
          <div className="flex bg-[#6495ed] aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Kaverna Kult</span>
            <span className="truncate text-xs">Admin</span>
          </div>
        </a>
      </header>
    </>
  );
}

export default HeaderSidebar;
