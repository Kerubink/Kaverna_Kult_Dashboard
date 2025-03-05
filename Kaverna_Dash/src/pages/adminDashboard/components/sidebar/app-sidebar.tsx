import { Home, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { NavUser } from "./nav-user";
import HeaderSidebar from "./header-sidebar";
import { NavMain } from "./nav-main";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Shirt,
  Send,
  Settings2,
} from "lucide-react"

type SidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  closeSidebar: () => void;
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Pedidos",
      url: "/pedidos",
      icon: ShoppingCart,
      items: [
        {
          title: "Todos os Pedidos",
          url: "/admin/pedidos/todos_os_pedidos",
        },
        {
          title: "Pedidos para devolução",
          url: "/admin/pedidos/pedidos_devolucao",
        },
        {
          title: "Pedidos cancelados",
          url: "/admin/pedidos/pedidos_cancelados",
        },
      ],
    },
    {
      title: "Parceiros",
      url: "/parceiros",
      icon: Users,
      items: [
        {
          title: "Artistas",
          url: "/admin/parceiros/artistas",
        },
        {
          title: "Graficas",
          url: "/admin/parceiros/graficas",
        },
        // {
        //   title: "Meus Designs",
        //   url: "/artistas/meus-designs",
        // },
      ],
    },
    {
      title: "Produtos",
      url: "/produtos",
      icon: Shirt,
      items: [
        {
          title: "Adicionar Produtos",
          url: "/admin/produtos/criar_produto",
        },
        {
          title: "Todas as Camisetas",
          url: "/admin/produtos/lista_de_produtos",
        },
        {
          title: "Coleções",
          url: "/admin/produtos/colecoes",
        },
      ],
    },
    {
      title: "Configurações",
      url: "/configuracoes",
      icon: Settings2,
      items: [
        {
          title: "Geral",
          url: "/configuracoes/geral",
        },
        {
          title: "Equipe",
          url: "/configuracoes/equipe",
        },
        {
          title: "Pagamentos",
          url: "/configuracoes/pagamentos",
        },
        {
          title: "Limites",
          url: "/configuracoes/limites",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

const AppSidebar = ({ isOpen, isMobile, closeSidebar }: SidebarProps) => {
  return (
    <div
      className={`
        bg-[#18181b] text-white flex flex-col overflow-hidden transition-all duration-300
        ${
          isMobile
            ? isOpen
              ? "fixed top-0 left-0 h-screen p-2 w-64 z-50"
              : "hidden"
            : isOpen
            ? "w-64"
            : "w-0"
        }
      `}
    >
      {/* Botão de fechar no mobile */}
      {isMobile && (
        <button
          className="p-4 text-white self-end hidden"
          onClick={closeSidebar}
        >
          ✖
        </button>
      )}
      <main className={`h-full flex flex-col ${isMobile ? isOpen ? "mr-0" : "mr-2" : isOpen ? "mr-2" : "mr-0"}`}
      >
        <HeaderSidebar />

        <NavMain items={data.navMain}/>

        {/* Links da Sidebar */}
        {/* <nav className="flex-1">
          <ul className="space-y-2">
            <SidebarItem
              to="/"
              icon={<Home size={24} />}
              label="Dashboard"
              isOpen={isOpen}
            />
            <SidebarItem
              to="/pedidos"
              icon={<ShoppingCart size={24} />}
              label="Pedidos"
              isOpen={isOpen}
            />
            <SidebarItem
              to="/usuarios"
              icon={<Users size={24} />}
              label="Usuários"
              isOpen={isOpen}
            />
          </ul>
        </nav> */}

        <NavUser />
      </main>
    </div>
  );
};



export default AppSidebar;
