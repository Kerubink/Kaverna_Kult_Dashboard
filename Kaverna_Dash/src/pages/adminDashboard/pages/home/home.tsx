import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumeCards from "./homeComponents/resumeCards";
import { ChartOrders } from "./homeComponents/chartOrders";
import RecentSales from "./homeComponents/RecentSales";

function Home() {
  return (
    <>
      <ScrollArea className="flex-1 rounded-md border ">
        <ResumeCards />
        <div className="mt-8 rounded-xl max-h-[500px] shadow-md grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartOrders />
          <RecentSales />
        </div>
      </ScrollArea>
    </>
  );
}

export default Home;
