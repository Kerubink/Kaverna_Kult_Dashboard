import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/database/firebase_config";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


function TableAllOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para busca
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Quantidade de pedidos por página

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pedidos"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filtrar pedidos com base no termo de busca
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.includes(searchTerm) || // Filtra pelo ID do pedido
      order.cliente?.nome?.toLowerCase().includes(searchLower) || // Filtra pelo nome do cliente
      order.status?.statusAtual?.toLowerCase().includes(searchLower) || // Filtra pelo nome do cliente
      order.cliente?.telefone?.includes(searchTerm) // Filtra pelo telefone
    );
  });

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Pedidos da página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Card className="text-white h-[750px] lg:h-[950px] border-none overflow-hidden flex gap-4 flex-col">
      <CardHeader className="rounded-2xl p-0 py-3">
        <CardTitle className="text-2xl font-bold">PEDIDOS</CardTitle>
        <CardDescription className="text-white">
          Página de gerenciamento de pedidos
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 bg-neutral-900 rounded-2xl flex-1 flex flex-col">
        <Card className="text-white border-none flex flex-1 flex-col gap-5">
          <CardHeader className="m-0 p-0">
            <CardTitle className="flex justify-between">
              <Input
                placeholder="Buscar por ID, Nome ou Telefone..."
                className="w-[160px] lg:w-[350px]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Resetar para a primeira página ao buscar
                }}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 rounded-md flex-1">
            <ScrollArea className="h-full max-w-[300px] min-w-full lg:w-full whitespace-nowrap rounded-md border">
              {loading ? (
                <div className="text-white text-center py-5">Carregando...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>

                          <TableCell>
                            <div>
                              <h2>
                                {order.cliente?.nome || "Nome não disponível"}
                              </h2>
                              <p className="text-sm text-neutral-500">
                                {order.cliente?.telefone || "Sem telefone"}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>{order.data}</TableCell>
                          <TableCell className="text-right">
                            R${order.total}
                          </TableCell>

                          <TableCell className="text-right">
                            <h2>
                              {order?.status?.statusAtual
                                ? order.status.statusAtual || "Sem status"
                                : "N/A"}
                            </h2>
                            <p>
                              {order?.status?.updatedAt
                                ? new Intl.DateTimeFormat("pt-BR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  }).format(new Date(order.status.updatedAt))
                                : "Data não disponível"}
                            </p>
                          </TableCell>

                          <TableCell className="text-right">
                            <Button
                              onClick={() => navigate(`/admin/pedidos/todos_os_pedidos/${order.id}`)}
                              className="w-6 h-6 p-4 bg-transparent cursor-pointer"
                            >
                              <Eye size={20} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-5">
                          Nenhum pedido encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-0 flex justify-center items-center mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                      className="bg-transparent"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </CardContent>
    </Card>
  );
}

export default TableAllOrders;
