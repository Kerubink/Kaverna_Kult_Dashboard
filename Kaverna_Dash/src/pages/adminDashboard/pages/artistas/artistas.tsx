import { ScrollArea } from "@/components/ui/scroll-area"
import { Outlet } from "react-router-dom";

function Artistas() {
    return ( 
        <>
        <ScrollArea className="flex-1 h-full flex flex-col rounded-md border">
          <Outlet/>
        </ScrollArea>
        </>
     );
}

export default Artistas;