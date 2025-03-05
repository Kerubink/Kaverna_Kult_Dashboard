import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/database/firebase_config";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/service/authService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const AdminGraphicsPage = () => {
  const [productionCost, setProductionCost] = useState<number>(0);
  const [graphicsList, setGraphicsList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Buscar as gráficas no Firestore
  useEffect(() => {
    const fetchGraphics = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("role", "==", "graphic"));
        const querySnapshot = await getDocs(q);

        const graphics: any[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          contato: doc.data().phone,
          email: doc.data().email,
          custo_producao: doc.data().productionCost || 0,
          faturamento_total: doc.data().faturamentoTotal || 0, // Faturamento total da gráfica
          itens_produzidos: doc.data().itensProduzidos || 0, // Total de itens produzidos
          endereco: doc.data().endereco || "Não informado", // Endereço da gráfica
        }));

        setGraphicsList(graphics);
      } catch (error) {
        console.error("Erro ao buscar gráficas:", error);
      }
    };

    fetchGraphics();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser({
        name,
        email,
        phone,
        productionCost,
        endereco: "",
        ordersSent: 0,
        faturamentoTotal: 0,
        itensProduzidos: 0,
        password,
        role: "graphic",
      });
      navigate("/admin/parceiros/graficas");
    } catch (err) {
      console.error(err);
      setError("Erro ao criar a conta. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="p-4 border rounded-md border-gray-700 mt-4">
      <h1 className="text-white text-xl mb-4">Cadastrar Gráficas</h1>

      <Dialog>
        <DialogTrigger className="mb-4 p-2 rounded-lg bg-blue-500 text-white">
          Adicionar Gráfica
        </DialogTrigger>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Custo de Produção</TableHead>
              <TableHead>Faturamento Total</TableHead>
              <TableHead>Itens Produzidos</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {graphicsList.length > 0 ? (
              graphicsList.map((graphic) => (
                <TableRow key={graphic.id}>
                  <TableCell>{graphic.name}</TableCell>
                  <TableCell>{graphic.email}</TableCell>
                  <TableCell>{graphic.contato}</TableCell>
                  <TableCell>R$ {graphic.custo_producao.toFixed(2)}</TableCell>
                  <TableCell>R$ {graphic.faturamento_total.toFixed(2)}</TableCell>
                  <TableCell>{graphic.itens_produzidos}</TableCell>
                  <TableCell>{graphic.endereco}</TableCell>
                  <TableCell className="text-right">
                    <Eye
                      size={20}
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/parceiros/graficas/${graphic.id}`)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Nenhuma gráfica cadastrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DialogContent className="bg-neutral-900 text-white p-6 rounded-md">
          <DialogHeader>
            <DialogTitle>Cadastrar Gráfica</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-1" htmlFor="name">
                  Nome da Gráfica
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome da gráfica"
                  className="w-full p-2 bg-gray-700 text-white"
                />
              </div>

              <div>
                <label
                  className="block text-white mb-1"
                  htmlFor="productionCost"
                >
                  Custo de Produção
                </label>
                <Input
                  type="number"
                  id="productionCost"
                  value={productionCost}
                  onChange={(e) =>
                    setProductionCost(parseFloat(e.target.value))
                  }
                  placeholder="Custo de produção"
                  className="w-full p-2 bg-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-white mb-1" htmlFor="phone">
                  Contato
                </label>
                <Input
                  type="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contato"
                  className="w-full p-2 bg-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-white mb-1" htmlFor="email">
                  Email para Acesso
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 bg-gray-700 text-white"
                />
              </div>

              <div>
                <label className="block text-white mb-1" htmlFor="password">
                  Senha
                </label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-full p-2 bg-gray-700 text-white"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white">
                Adicionar Gráfica
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGraphicsPage;
