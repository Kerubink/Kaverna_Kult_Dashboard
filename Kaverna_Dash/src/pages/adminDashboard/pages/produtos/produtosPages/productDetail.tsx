import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, doc, getDoc, updateDoc } from "@/database/firebase_config";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductDetail = () => {
  const { id } = useParams(); // Pega o id do produto da URL
  const navigate = useNavigate(); // Para navegar para outra página após a edição
  const [produto, setProduto] = useState<any>(null); // Estado para armazenar o produto
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar o carregamento
  const [formData, setFormData] = useState<any>({}); // Estado para armazenar os dados do formulário
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar o modo de edição

  useEffect(() => {
    // Função para buscar os detalhes do produto
    const fetchProduto = async () => {
      if (!id) return; // Se o id não existir na URL, não faz nada

      const produtoRef = doc(db, "products", id); // Referência ao produto no Firestore
      const produtoSnapshot = await getDoc(produtoRef);

      if (produtoSnapshot.exists()) {
        const produtoData = produtoSnapshot.data();
        setProduto(produtoData); // Atualiza o estado com os dados do produto
        setFormData(produtoData); // Atualiza o estado do formulário com os dados iniciais
      } else {
        console.log("Produto não encontrado");
      }
      setLoading(false); // Atualiza o estado de carregamento
    };

    fetchProduto();
  }, [id]); // Executa quando o id mudar

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!id) return;

    const produtoRef = doc(db, "products", id);
    await updateDoc(produtoRef, formData); // Atualiza o produto no Firestore
    setIsEditing(false); // Desativa o modo de edição após salvar
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <span>Carregando...</span>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <span>Produto não encontrado</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="bg-transparent text-white shadow-md">
        <CardHeader className="p-3">
          <CardTitle className="text-2xl font-bold">Detalhes do Produto</CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          {!isEditing ? (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-bold">Nome:</h3>
                <p>{produto.name || "Produto não encontrado"}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold">Descrição:</h3>
                <p>{produto.description || "Descrição não disponível"}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold">Autor:</h3>
                <p>{produto.autor || "N/A"}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold">Preço Final:</h3>
                <p>{produto.finalPrice || "Preço não disponível"}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold">Imagem:</h3>
                <img src={produto.image} alt={produto.name} className="w-full h-auto mb-4" />
              </div>
              <Button onClick={() => setIsEditing(true)} className="bg-blue-500">
                Editar Produto
              </Button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nome do Produto</label>
                <Input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Nome do Produto"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Descrição</label>
                <Input
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Descrição do Produto"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Autor</label>
                <Input
                  name="autor"
                  value={formData.autor || ""}
                  onChange={handleChange}
                  placeholder="Autor do Produto"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Preço Final</label>
                <Input
                  name="finalPrice"
                  value={formData.finalPrice || ""}
                  onChange={handleChange}
                  placeholder="Preço Final"
                  type="number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Imagem (URL)</label>
                <Input
                  name="image"
                  value={formData.image || ""}
                  onChange={handleChange}
                  placeholder="URL da Imagem"
                />
              </div>

              <Button onClick={handleSave} className="bg-green-500">
                Salvar Alterações
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 ml-4"
              >
                Cancelar
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
