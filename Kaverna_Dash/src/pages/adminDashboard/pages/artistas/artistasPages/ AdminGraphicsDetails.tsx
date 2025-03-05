import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/database/firebase_config";
import { Button } from "@/components/ui/button";

const AdminGraphicsDetails = () => {
  const { id } = useParams();
  const [graphic, setGraphic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphicDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGraphic(docSnap.data());
        } else {
          console.error("Gráfica não encontrada!");
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
      setLoading(false);
    };

    fetchGraphicDetails();
  }, [id]);

  if (loading) return <p className="text-white">Carregando...</p>;
  if (!graphic) return <p className="text-white">Gráfica não encontrada.</p>;

  return (
    <div className="p-6 border border-gray-700 rounded-md text-white">
      <h1 className="text-2xl mb-4">{graphic.name}</h1>
      <p><strong>Email:</strong> {graphic.email}</p>
      <p><strong>Telefone:</strong> {graphic.phone}</p>
      <p><strong>Custo de Produção:</strong> R$ {graphic.productionCost.toFixed(2)}</p>
      <p><strong>Pedidos Enviados:</strong> {graphic.ordersSent || 0}</p>
      <p><strong>Itens Produzidos:</strong> {graphic.itensProduzidos || 0}</p>
      <p><strong>Faturamento Total:</strong> R$ {graphic.faturamentoTotal ? graphic.faturamentoTotal.toFixed(2) : "0.00"}</p>

      <Button className="mt-4 bg-blue-500 text-white" onClick={() => window.history.back()}>
        Voltar
      </Button>
    </div>
  );
};

export default AdminGraphicsDetails;
