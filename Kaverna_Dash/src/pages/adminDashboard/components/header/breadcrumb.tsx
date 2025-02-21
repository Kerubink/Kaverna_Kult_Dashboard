import { useLocation, Link } from "react-router-dom";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // ajuste o path conforme sua estrutura

function BreadcrumbHeader() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Se mobile, mostra apenas o último segmento (rota atual)
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <Breadcrumb className="text-white">
      <BreadcrumbList>
        {isMobile ? (
          // Apenas a rota atual
          <BreadcrumbItem>
            <BreadcrumbPage>{pathSegments[pathSegments.length - 1] || "Dashboard"}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const pathTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;

              return (
                <React.Fragment key={pathTo}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{segment}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={pathTo}>{segment}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbHeader;
