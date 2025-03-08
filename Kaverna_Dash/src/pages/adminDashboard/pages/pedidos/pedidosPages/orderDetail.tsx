import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/database/firebase_config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

function OrderDetails() {
  const { id } = useParams(); // Obtém o ID da URL
  const navigate = useNavigate(); // Navegação para voltar
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gráficas, setGráficas] = useState<any[]>([]); // Lista de gráficas
  const [statusOptions] = useState(["Em produção", "Pronto"]); // Status dos itens
  const [statusGeral, setStatusGeral] = useState<string>(""); // Status geral do pedido

  useEffect(() => {
    const fetchOrderAndGraphics = async () => {
      if (!id) return;
      try {
        // Buscar pedido
        const orderRef = doc(db, "pedidos", id);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          setOrder({ id: orderSnap.id, ...orderSnap.data() });
          setStatusGeral(orderSnap.data().status?.statusAtual || ""); // Definindo o status geral
        } else {
          console.error("Pedido não encontrado!");
        }

        // Buscar gráficas (usuários com role "graphic")
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "graphic"));
        const querySnapshot = await getDocs(q);
        const graphicsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGráficas(graphicsList);
      } catch (error) {
        console.error("Erro ao buscar detalhes do pedido ou gráficas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndGraphics();
  }, [id]);

  const handleGraficaChange = (index: number, graficaId: string) => {
    // Atualiza a gráfica de um item específico pelo índice
    setOrder((prevOrder: any) => {
      const updatedItens = [...prevOrder.itens]; // Copia o array de itens
      updatedItens[index] = { ...updatedItens[index], graficaResponsavel: graficaId }; // Atualiza o item específico
      return { ...prevOrder, itens: updatedItens };
    });
  };

  const handleStatusChange = (index: number, status: string) => {
    // Atualiza o status de um item específico pelo índice
    setOrder((prevOrder: any) => {
      const updatedItens = [...prevOrder.itens]; // Copia o array de itens
      updatedItens[index] = { ...updatedItens[index], status: status }; // Atualiza o item específico
      return { ...prevOrder, itens: updatedItens };
    });
  };

  const handleStatusGeralChange = (status: string) => {
    // Atualiza o status geral do pedido
    setStatusGeral(status);
  };

  const handleSaveChanges = async () => {
    try {
      const orderRef = doc(db, "pedidos", id);
      await updateDoc(orderRef, {
        itens: order.itens, // Atualiza os itens com gráficas e status
        status: { statusAtual: statusGeral }, // Atualiza o status geral do pedido
      });
      alert("Alterações salvas!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-10">Carregando detalhes...</div>
    );
  }

  if (!order) {
    return (
      <div className="text-white text-center py-10">Pedido não encontrado!</div>
    );
  }

  return (
    <Card className="text-white h-[750px] lg:h-[950px] border-none overflow-hidden flex gap-4 flex-col">
      <CardHeader className="rounded-2xl p-0 py-3 flex items-center justify-between">
        <CardTitle className="text-2xl font-bold">Detalhes do Pedido</CardTitle>
        <Button onClick={() => navigate(-1)} className="flex gap-2">
          <ArrowLeft size={18} /> Voltar
        </Button>
      </CardHeader>

      <CardContent className="p-4 bg-neutral-900 rounded-2xl flex-1 flex flex-col gap-4">
        {/* Informações do Cliente */}
        <Card className="border-none bg-neutral-800 p-4">
          <h2 className="text-lg font-semibold">Cliente</h2>
          <p>Nome: {order.cliente?.nome || "N/A"}</p>
          <p>Telefone: {order.cliente?.telefone || "N/A"}</p>
          <p>Email: {order.cliente?.email || "N/A"}</p>
        </Card>

        {/* Status Geral do Pedido */}
        <Card className="border-none bg-neutral-800 p-4">
          <h2 className="text-lg font-semibold">Status Geral do Pedido</h2>
          <select
            value={statusGeral}
            onChange={(e) => handleStatusGeralChange(e.target.value)}
            className="p-2 bg-neutral-700 border rounded-md"
          >
            <option value="">Selecione o status geral</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Card>

        {/* Produtos Comprados */}
        <Card className="border-none bg-neutral-800 p-4 flex-1">
          <h2 className="text-lg font-semibold mb-2">Produtos</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Gráfica Responsável</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order?.itens &&
              Array.isArray(order.itens) &&
              order.itens.length > 0 ? (
                order.itens.map((produto: any, index: number) => (
                  <TableRow key={produto.id || produto.nome}>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.quantidade}</TableCell>
                    <TableCell>{produto.tamanho}</TableCell>
                    <TableCell>
                      <select
                        value={produto.graficaResponsavel || ""}
                        onChange={(e) => handleGraficaChange(index, e.target.value)}
                      >
                        <option value="">Selecione uma gráfica</option>
                        {gráficas.map((grafica) => (
                          <option key={grafica.id} value={grafica.id}>
                            {grafica.nome}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>
                      <select
                        value={produto.status || ""}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                      >
                        <option value="">Selecione o status</option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          produto.status === "Em produção" ? "bg-yellow-500" : produto.status === "Pronto" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Nenhum item encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {/* Cupom e Total do Pedido */}
        <Card className="border-none bg-neutral-800 p-4">
          <h2 className="text-lg font-semibold">Cupom e Total</h2>
          <p>Cupom: {order.cupom || "N/A"}</p>
          <p>Total Pago/Devido: R${order.total?.toFixed(2) || "0.00"}</p>
        </Card>

        <Button onClick={handleSaveChanges} className="self-end mt-4">
          Salvar Alterações
        </Button>
      </CardContent>
    </Card>
  );
}

export default OrderDetails;
