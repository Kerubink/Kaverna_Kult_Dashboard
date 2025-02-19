import React, { useState, useEffect } from "react";
import AppSidebar from "./components/sidebar/app-sidebar";
import HeaderDashboard from "./components/header";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="p-2 bg-[#18181b] h-screen flex">
      <div className="flex w-full overflow-hidden relative">
        {/* Sidebar */}
        <AppSidebar isOpen={isOpen} isMobile={isMobile} closeSidebar={() => setIsOpen(false)} />

        {/* Overlay no Mobile */}
        {isMobile && isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20" 
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Conteúdo principal */}
        <main className="flex-1 bg-[#09090b] rounded-2xl w-full p-3 relative z-10">
          {/* Passando `isOpen` e `setIsOpen` para o HeaderDashboard */}
          <HeaderDashboard isOpen={isOpen} setIsOpen={setIsOpen} />

          <p>Conteúdo do dashboard</p>
        </main>
      </div>
    </section>
  );
};

export default AdminDashboard;
