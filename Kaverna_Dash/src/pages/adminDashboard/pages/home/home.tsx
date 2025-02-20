import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumeCards from "./components/resumeCards";
import { ChartOrders } from "./components/chartOrders";
import RecentSales from "./components/RecentSales";

function Home() {
  return (
    <>
      <ScrollArea className="flex-1 rounded-md border ">
        <ResumeCards />
        {/* Gráfico ou Tabela de resumo */}

        <div className="mt-8 rounded-xl max-h-[500px] shadow-md grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartOrders />
          <RecentSales />
        </div>
      </ScrollArea>
    </>
  );
}

export default Home;
