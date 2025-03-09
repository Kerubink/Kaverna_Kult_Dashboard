import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  onSnapshot, // 🔥 Importação do onSnapshot
} from "firebase/firestore";
import { db } from "@/database/firebase_config";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

function OrderDetails() {
  const { id } = useParams(); // Obtém o ID da URL
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gráficas, setGráficas] = useState<any[]>([]); // Lista de gráficas
  const [statusOptions] = useState(["Pendente", "Em produção", "Pronto", "Cancelado"]); // Status dos itens
  const [statusGeralOptions] = useState([
    "Recebido",
    "Pagamento Pendente",
    "Pagamento Confirmado",
    "Em Produção",
    "Empacotando",
    "Enviado",
    "A Caminho",
    "Entregue",
    "Cancelado", // Novo status
    "Devolução", // Novo status
  ]); // Status dos itens

  const [statusGeral, setStatusGeral] = useState<string>(""); // Status geral do pedido

  const statusColors = {
    Recebido: "bg-blue-500", // Azul
    "Pagamento Pendente": "bg-yellow-500", // Amarelo
    "Pagamento Confirmado": "bg-green-500", // Verde
    "Em Produção": "bg-orange-500", // Laranja
    Empacotando: "bg-purple-500", // Roxo
    Enviado: "bg-teal-500", // Verde-água
    "A Caminho": "bg-indigo-500", // Índigo
    Entregue: "bg-gray-700", // Cinza escuro
    Cancelado: "bg-red-500", // Vermelho para Cancelado
    Devolução: "bg-pink-500", // Rosa para Devolução
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Criando um listener para atualizações em tempo real do pedido
    const orderRef = doc(db, "pedidos", id);
    const unsubscribeOrder = onSnapshot(orderRef, (orderSnap) => {
      if (orderSnap.exists()) {
        setOrder({ id: orderSnap.id, ...orderSnap.data() });
        setStatusGeral(orderSnap.data().status?.statusAtual || ""); // Atualiza o status geral
      } else {
        console.error("Pedido não encontrado!");
        setOrder(null);
      }
      setLoading(false);
    });

    // Buscando gráficas (não precisa de listener pois não muda com frequência)
    const fetchGraphics = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "graphic"));
        const querySnapshot = await getDocs(q);
        const graphicsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGráficas(graphicsList);
      } catch (error) {
        console.error("Erro ao buscar gráficas:", error);
      }
    };

    fetchGraphics();

    // Cleanup function para remover o listener ao desmontar o componente
    return () => unsubscribeOrder();
  }, [id]);

  const handleGraficaChange = (index: number, graficaId: string) => {
    // Atualiza a gráfica de um item específico pelo índice
    setOrder((prevOrder: any) => {
      const updatedItens = [...prevOrder.itens]; // Copia o array de itens
      updatedItens[index] = {
        ...updatedItens[index],
        graficaResponsavel: graficaId,
      }; // Atualiza o item específico
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
      if (!id) return;

      const orderRef = doc(db, "pedidos", id);

      // Verifica se o status mudou para adicionar um novo updatedAt
      const newStatus = {
        statusAtual: statusGeral,
        updatedAt:
          order?.status?.statusAtual !== statusGeral
            ? new Date().toISOString()
            : order?.status?.updatedAt,
      };

      await updateDoc(orderRef, {
        itens: order.itens, // Atualiza os itens com gráficas e status
        status: newStatus, // Atualiza o status geral do pedido
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
      {/* <CardHeader className="rounded-2xl p-0 py-3 flex  items-center justify-between">
        <CardTitle className="text-2xl font-bold">Detalhes do Pedido</CardTitle>
        <Button onClick={() => navigate(-1)} className="flex gap-2">
          <ArrowLeft size={18} /> Voltar
        </Button>
      </CardHeader> */}

      <CardContent className="p-4 bg-neutral-900 rounded-2xl flex-1 flex flex-col gap-4">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">Detalhes do pedido</h1>
          <div>
            <div
              className={`rounded-full text-sm text-center font-bold mb-1 p-1 ${
                statusColors[order?.status?.statusAtual] || "bg-gray-500" // Cor padrão
              }`}
            >
              {order?.status?.statusAtual}
            </div>
            <p>{order.id}</p>
          </div>
        </header>
        {/* Informações do Cliente */}
        <Card className="border-none bg-neutral-800 text-neutral-400 p-4 flex justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Cliente</h2>
            <p>Nome: {order.cliente?.nome || "N/A"}</p>
            <p>Telefone: {order.cliente?.telefone || "N/A"}</p>
            <p>Email: {order.cliente?.email || "N/A"}</p>
          </div>

          <div className="text-right">
            <h2 className="text-lg font-semibold text-white">Endereço</h2>
            <p>
              {order.cliente?.endereco?.logradouro},{" "}
              {order.cliente?.endereco?.numeroCasa || "Sem número"} -{" "}
              {order.cliente?.endereco?.cidade} -{" "}
              {order.cliente?.endereco?.estado} - {order.cliente?.endereco?.cep}
              ;
            </p>
            <p>
              <span className="font-bold">Complemento: </span>
              {order.cliente?.endereco?.complemento}.
            </p>
          </div>
        </Card>
        {/* Produtos Comprados */}
        <Card className="border-none bg-neutral-800 text-white p-4 flex-1">
          <h2 className="text-lg font-bold mb-2">Itens</h2>
          <Table className="text-white">
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead className="text-center">
                  Gráfica Responsável
                </TableHead>
                <TableHead className="text-right">Status</TableHead>
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
                    <TableCell>
                      <p>{produto.tamanho}</p>
                      <div className="flex items-center gap-1">
                        <p>{produto.cor}</p>
                        <div
                          className="rounded-full w-3 h-3"
                          style={{ backgroundColor: produto.cor }} // Usando estilo inline para aplicar a cor
                        ></div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <select
                        value={produto.graficaResponsavel || ""}
                        onChange={(e) =>
                          handleGraficaChange(index, e.target.value)
                        }
                      >
                        <option value="">Selecione uma gráfica</option>
                        {gráficas.map((grafica) => (
                          <option key={grafica.id} value={grafica.id}>
                            {grafica.name}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          produto.status === "Em produção"
                            ? "bg-purple-600"
                            : produto.status === "Pronto"
                            ? "bg-green-500"
                            : produto.status === "Cancelado" ? "bg-red-500" : "bg-orange-500"
                        }`}
                      ></div>
                      <select
                        value={produto.status || "Pendente"}
                        onChange={(e) =>
                          handleStatusChange(index, e.target.value)
                        }
                      >
                        <option value="">Selecione o status</option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
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
        <Card className="border-none bg-neutral-800 text-white p-4">
          <h2 className="text-lg font-semibold">Cupom e Total</h2>
          <p>Cupom: {order.cupom || "N/A"}</p>
          <p>Total: R${order.total?.toFixed(2) || "0.00"}</p>
        </Card>

        <CardFooter className="flex items-center justify-end gap-2">
          <select
            value={statusGeral}
            onChange={(e) => handleStatusGeralChange(e.target.value)}
            className="p-2 bg-neutral-700 border rounded-md"
          >
            <option value="">Selecione o status geral</option>
            {statusGeralOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <Button
            onClick={handleSaveChanges}
            className="self-end h-full cursor-pointer bg-blue-600 hover:bg-blue-800"
          >
            Salvar Alterações
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default OrderDetails;
