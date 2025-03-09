import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, collection, getDocs } from "@/database/firebase_config";  // Importando a função do Firebase
import { useNavigate } from "react-router-dom";  // Usando o hook useNavigate para navegação

function GaleriaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();  // Usando o hook de navegação para redirecionar

  useEffect(() => {
    // Função para buscar os dados do Firestore
    const fetchProdutos = async () => {
      const produtosCollection = collection(db, "products");  // Coleção onde os produtos estão armazenados
      const produtosSnapshot = await getDocs(produtosCollection);
      const produtosList = produtosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(produtosList);
    };

    fetchProdutos();
  }, []); 

  // Função para navegar para a página de detalhes do produto
  const goToProduto = (id) => {
    navigate(`/admin/produtos/lista_de_produtos/${id}`);  // Usando navigate para redirecionar para a página de detalhes do produto
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Galeria de Produtos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {produtos.map((produto) => (
          <Card
            key={produto.id}
            className="bg-transparent overflow-hidden flex flex-col text-white shadow-md"
          >
            <CardHeader className="p-3">
              <CardTitle className="text-md font-bold">
                {produto.name || "N/A"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex-1">
              <img src={produto.image} alt={produto.nome} />
            </CardContent>
            <CardFooter className="bg-neutral-900 flex justify-between items-center p-3">
              <div>
                <h1>{produto.autor || "N/A"}</h1>
                <span>{produto.finalPrice || "N/A"}</span>
              </div>
              <Button onClick={() => goToProduto(produto.id)}>
                <Eye size={20} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default GaleriaProdutos;
